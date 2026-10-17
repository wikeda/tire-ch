import test from 'node:test';import assert from 'node:assert/strict';import{writeSave,backup}from'../src/storage2.js';
const store=()=>{let data=new Map;return {getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v)}};
test('save refuses stale tab overwrite',()=>{let s=store();s.setItem('save','newer');let r=writeSave(s,'save',{growth:2},'older');assert.equal(r.conflict,true);assert.equal(s.getItem('save'),'newer')});
test('successful save returns next comparison token',()=>{let s=store();let r=writeSave(s,'save',{growth:2},null);assert.equal(r.ok,true);assert.equal(r.raw,s.getItem('save'))});
test('backup failure explicitly protects original',()=>{let s=store();s.setItem('save','broken');s.setItem=()=>{throw Error('full')};assert.equal(backup(s,'recovery','broken'),false);assert.equal(s.getItem('save'),'broken')});
