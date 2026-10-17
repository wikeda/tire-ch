import { test, expect } from '@playwright/test';
import { createGame } from '../../src/engine.js';
const KEY='tire-ch-v1';
async function seed(page, overrides={}) { const s=Object.assign(createGame(Date.now()),{tutorial:true},overrides); await page.addInitScript(({key,s})=>localStorage.setItem(key,JSON.stringify(s)),{key:KEY,s}); }
async function stored(page){return page.evaluate(k=>JSON.parse(localStorage.getItem(k)),KEY)}
test('natural care, cooldown, personality, autosave, reload and responsive bounds',async({page},info)=>{
 await page.goto('/'); await page.getByRole('button',{name:'相棒との暮らしをはじめる →'}).click();
 await page.getByRole('button',{name:'洗車',exact:true}).click();
 await expect(page.getByRole('button',{name:'洗車',exact:true})).toBeDisabled();
 await page.getByRole('button',{name:'おやつ',exact:true}).click();
 const s=await stored(page); expect(s.careCount).toBe(2);expect(s.personality.luxury).toBe(2);expect(s.growth).toBeGreaterThanOrEqual(60);
 await page.reload();expect((await stored(page)).careCount).toBe(2);await expect(page.locator('#welcome')).not.toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 await page.screenshot({path:info.outputPath('care.png'),fullPage:true});
});
test('offline growth adds chassis and preserves save',async({page})=>{
 await seed(page,{last:Date.now()-120000});await page.goto('/');await expect(page.locator('#pet-name')).toHaveText('シャーシ誕生');
 expect((await stored(page)).growth).toBeGreaterThanOrEqual(120);
 await expect(page.locator('#vehicle svg')).toBeVisible();
});
test('neglect breaks, care disabled, repair resumes growth',async({page},info)=>{
 await seed(page,{last:Date.now()-6*3600000});await page.goto('/');await expect(page.locator('#repair-panel')).toBeVisible();
 await expect(page.getByRole('button',{name:'ごはん',exact:true})).toBeDisabled();const before=await stored(page);expect(before.broken).toBe(true);
 await page.getByRole('button',{name:'🔧 修理して復活'}).click();expect((await stored(page)).broken).toBe(false);await expect(page.locator('#repair-panel')).toBeHidden();await expect(page.locator('#journal')).toContainText('修理完了！相棒が復活しました。');
 await page.screenshot({path:info.outputPath('repaired.png'),fullPage:true});
});
test('all routes complete, collection retained on new generation',async({page},info)=>{
 await seed(page,{growth:2698,careCount:20,personality:{sport:0,luxury:5,adventure:2},last:Date.now()-5000});await page.goto('/');
 await expect(page.locator('#pet-name')).toHaveText('ルミナス・リムジン');await expect(page.locator('#collection-count')).toHaveText('1 / 9');
 await page.screenshot({path:info.outputPath('final-car.png'),fullPage:true});
 page.once('dialog',d=>d.dismiss());await page.locator('#new-generation').click();expect((await stored(page)).generation).toBe(1);
 page.once('dialog',d=>d.accept());await page.locator('#new-generation').click();const s=await stored(page);expect(s.generation).toBe(2);expect(s.collection).toContain('luxury-3');expect(s.growth).toBeLessThan(5);
});
test('malformed storage remains usable',async({page})=>{await page.addInitScript(k=>localStorage.setItem(k,'{bad'),KEY);await page.goto('/');await expect(page.locator('#welcome')).toBeVisible();await expect(page.locator('#start')).toBeEnabled();});
test('storage unavailable gives honest warning',async({page})=>{await page.addInitScript(()=>{Storage.prototype.setItem=function(){throw new DOMException('Unavailable','QuotaExceededError')}});await page.goto('/');await page.locator('#start').click();await expect(page.locator('#save-status')).toContainText('保存できません');await page.getByRole('button',{name:'ごはん',exact:true}).click();await expect(page.locator('#toast')).toContainText('大成功');});
test('clock backwards does not grant growth or lose collection',async({page})=>{await seed(page,{growth:30,last:Date.now()+3600000,collection:['sport-1']});await page.goto('/');const s=await stored(page);expect(s.growth).toBeLessThan(40);expect(s.collection).toEqual(['sport-1']);});
test('imported save replaces journal with matching generation and care count',async({page})=>{
 await page.goto('/');await page.locator('#start').click();
 const imported={...createGame(Date.now()),tutorial:true,generation:4,careCount:12};
 page.once('dialog',dialog=>dialog.accept());
 await page.locator('#import-save').setInputFiles({name:'tire-ch-test-save.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(imported))});
 await expect(page.locator('#journal')).toContainText('第4世代 / お世話12回');
 await expect(page.locator('#journal')).toContainText('セーブを読み込みました');
 const s=await stored(page);expect(s.generation).toBe(4);expect(s.careCount).toBe(12);
});
