// Pure pet simulation. All randomness is deterministic from generation and choices.
export const STAGES=[0,35,100,210,360];
export const NAMES=['タイヤのたね','足まわりが生えた','ハンドルの芽','ボディの予感','相棒、誕生！'];
export const FORMS={
 comet:{name:'流星スプリンター',color:'#fe8bb8',kind:'sport',clue:'夕焼けのカーブを、風と競った記憶。'},
 velvet:{name:'月光リムジン',color:'#b4a0ff',kind:'limo',clue:'きれい好き。でも大切なのは、誰かを迎えたこと。'},
 rover:{name:'山猫ローバー',color:'#a8df77',kind:'truck',clue:'泥だらけの探検と、道を選んだ勇気。'},
 camper:{name:'星くずキャンパー',color:'#ffcf78',kind:'camper',clue:'遠回りして休む。寄り道の達人。'},
 taxi:{name:'おせっかいタクシー',color:'#ffe86f',kind:'taxi',clue:'速さより、困った誰かのところへ。'},
 submarine:{name:'水たまり潜水号',color:'#74d9ed',kind:'submarine',clue:'洗うより先に、水たまりへ飛び込んだ。'},
 toaster:{name:'こんがりトースター',color:'#f4bb80',kind:'toaster',clue:'お腹いっぱいなのに、おかわりが止まらない。'},
 bathtub:{name:'泡ぶろクルーザー',color:'#b4edf0',kind:'bath',clue:'洗車好きが高じて、自分がお風呂になった。'},
 mushroom:{name:'きのこワゴン',color:'#fd9799',kind:'mushroom',clue:'汚れも思い出。森からおみやげが生えた。'},
 snail:{name:'ロケットかたつむり',color:'#bda6ff',kind:'snail',clue:'急ぎたい気持ちと、のんびりしたい気持ち。'},
 rescue:{name:'つぎはぎレスキュー',color:'#ffad78',kind:'rescue',clue:'壊れた日もあった。助けてもらった優しさを運ぶ。'},
 ufo:{name:'未確認走行物体',color:'#a5ffdc',kind:'ufo',clue:'知らない道、妙なおやつ、説明できない成長。'}
};
export const ACTIONS={fuel:{name:'ごはん',icon:'⛽',desc:'元気を補給。満腹ならほどほどに'},wash:{name:'洗車',icon:'🫧',desc:'泥を落とす。旅の後は格別'},rest:{name:'ひと休み',icon:'🌙',desc:'熱を冷まして、耐久を回復'},snack:{name:'ふしぎなおやつ',icon:'🍩',desc:'成長＋25 / 熱＋24。連続は危険'}};
export const ROADS={alley:{name:'夕焼けの街',icon:'🌆',desc:'初めての道。おだやかな寄り道',cost:10},forest:{name:'雨あがりの森',icon:'🌲',desc:'泥と発見。少し丈夫さが必要',cost:15},ridge:{name:'雲の上の峠',icon:'⛰',desc:'大きな報酬、熱とキズのリスク',cost:20}};
const clamp=(n,a=0,b=100)=>Math.min(b,Math.max(a,n));
const numeric=(v,d=0)=>Number.isFinite(v)?v:d;
const known=(o,k)=>typeof k==='string'&&Object.hasOwn(o,k);
export function create(now=Date.now()){return {version:2,last:now,growth:0,generation:1,needs:{energy:80,clean:80,mood:80,health:100},heat:0,parts:3,memory:{bold:0,kind:0,wild:0,calm:0,glutton:0,polish:0,mud:0,boost:0,water:0,odd:0},cooldowns:{},trips:0,broken:false,breakdowns:0,repairStep:0,collection:[],legacy:[],history:[],final:null,trip:null,log:['小さなタイヤと、まだ知らない未来。'],settings:{sound:false,reduced:false},tutorial:false};}
export function stage(s){return STAGES.reduce((a,n,i)=>s.growth>=n?i:a,0)}
export function form(s){let m=s.memory;if(s.breakdowns>=1&&m.kind>=2)return'rescue';if(m.boost>=4&&m.odd>=3)return'ufo';if(m.boost>=3&&m.calm>=4)return'snail';if(m.glutton>=4)return'toaster';if(m.polish>=5)return'bathtub';if(m.mud>=4)return'mushroom';if(m.water>=4)return'submarine';if(m.kind>=5)return'taxi';if(m.calm>=5&&m.wild>=2)return'camper';if(m.wild>m.bold&&m.wild>=3)return'rover';if(m.kind+m.polish>m.bold+m.wild)return'velvet';return'comet'}
function note(s,t){s.log.unshift(t);s.log=s.log.slice(0,8);return {ok:true,message:t}}
function finish(s){if(s.growth>=360&&!s.final){s.final=form(s);if(!s.collection.includes(s.final))s.collection.push(s.final);s.history.unshift({id:s.final,generation:s.generation});s.history=s.history.slice(0,50);note(s,`新発見！ ${FORMS[s.final].name}。${FORMS[s.final].clue}`)}}
function damage(s,n){s.needs.health=clamp(s.needs.health-n);if(s.needs.health<=0&&!s.broken){s.broken=true;s.breakdowns++;s.trip=null;note(s,'ぷすん…。故障しちゃった。ガレージで一緒に直そう。')}}
export function advance(s,now=Date.now()){if(!Number.isFinite(now)||now<s.last)return s;let elapsed=(now-s.last)/1000,dt=Math.min(elapsed,120);s.last=now;if(!s.broken){s.growth=clamp(s.growth+dt,0,360);s.needs.energy=clamp(s.needs.energy-dt*.025);s.needs.clean=clamp(s.needs.clean-dt*.015);s.needs.mood=clamp(s.needs.mood-dt*.02);s.heat=clamp(s.heat-dt*.22);if(elapsed<30&&Math.min(s.needs.energy,s.needs.clean,s.needs.mood)<10)damage(s,dt*.12);}finish(s);return s}
export function care(s,a,now=Date.now()){advance(s,now);if(!ACTIONS[a])return {ok:false,message:'知らないお世話です'};if(s.broken)return {ok:false,message:'先に故障を直してあげよう'};if(s.trip)return {ok:false,message:'旅が終わったらお世話しよう'};if((s.cooldowns[a]||0)>now)return {ok:false,message:'ちょっと待ってね'};s.cooldowns[a]=now+(a==='snack'?12000:4000);let n=s.needs,m=s.memory,t='';
 if(a==='fuel'){if(n.energy>85){m.glutton++;t='満腹なのに食べちゃった。お腹からトーストの香り？';}else t='もぐもぐ。元気が戻った！';n.energy=clamp(n.energy+25);n.mood=clamp(n.mood+4)}
 if(a==='wash'){if(n.clean>90){m.polish++;t='ぴかぴかを越えて、泡が住みつきそう。';}else{m.kind+=n.clean<50?1:0;t='泥を落としたら、旅の模様がきらり。'}n.clean=clamp(n.clean+30);n.mood=clamp(n.mood+5)}
 if(a==='rest'){m.calm++;n.health=clamp(n.health+14);n.energy=clamp(n.energy+10);n.mood=clamp(n.mood+8);s.heat=clamp(s.heat-24);t='ふう。エンジンも気持ちもクールダウン。'}
 if(a==='snack'){m.boost++;s.growth=clamp(s.growth+25,0,360);s.heat=clamp(s.heat+24);n.energy=clamp(n.energy-5);if(s.heat>=65){damage(s,22);m.odd++;t='成長＋25！ でも熱すぎる…耐久−22。休ませよう。'}else t='成長＋25！ 熱＋24。急ぐほど、ちょっと不思議な予感。'}
 finish(s);return note(s,t)}
const EVENTS=[
 {title:'小さな分かれ道',text:'風の音と、遠くの話し声。どっちへ行こう？',options:[['景色を眺める','元気＋3 / のんびり', {calm:1},0,3],['風を追いかける','成長＋8 / 熱＋8',{bold:2},8,-3],['声のほうへ','優しい出会い / パーツ＋1',{kind:2},0,-2]]},
 {title:'水たまりの向こう',text:'空が水面に映っている。あの向こうには何がある？',options:[['橋を渡る','安全な道 / 耐久＋3',{calm:1},0,0],['ざぶん！','泥＋18 / 発見と成長＋8',{wild:2,water:2},5,-4],['葉っぱの船を流す','不思議な記憶 / ごきげん＋8',{odd:1,kind:1},0,0]]},
 {title:'道ばたの迷子',text:'小さなボルトが、帰る道を忘れたみたい。',options:[['ガレージまで送る','パーツ＋2 / 元気−4',{kind:2},0,-4],['地図を描いてあげる','ごきげん＋5 / 元気−1',{kind:1,calm:1},0,-1],['一緒に未知の道へ','発見 / 熱＋8',{wild:2,odd:1},8,-4]]},
 {title:'きらきら直線',text:'道がひらけた。相棒がアクセルを見つめている。',options:[['ゆっくり流す','冷却−12 / 元気＋4',{calm:2},-12,4],['駆け抜ける','成長＋12 / 熱＋15',{bold:3},15,-6],['森の小道へ','泥＋12 / 不思議な記憶',{wild:2,odd:1},0,-3]]},
 {title:'古い自販機',text:'「なかみは、おたのしみ」って書いてある。',options:[['お水を飲む','元気＋8 / 冷却−8',{calm:1},-8,8],['謎のジュース','成長＋10 / 熱＋12',{odd:2,glutton:1},12,-2],['誰かのために残す','優しい記憶 / パーツ＋1',{kind:2},0,0]]},
 {title:'帰り道の丘',text:'ガレージの灯りが見えた。この旅を、どんな思い出にする？',options:[['夕日を一緒に見る','ごきげん＋12 / パーツ＋1',{calm:1,kind:1},0,0],['最後まで競争！','成長＋12 / 熱＋12',{bold:2},12,-5],['おみやげを探す','泥＋15 / パーツ＋2',{wild:2},0,-4]]}
];
const REWARDS=[
 [{},{growth:8},{parts:1}],
 [{health:3},{clean:-18,growth:8},{mood:8}],
 [{parts:2},{mood:5},{}],
 [{},{growth:12},{clean:-12}],
 [{},{growth:10},{parts:1}],
 [{mood:12,parts:1},{growth:12},{clean:-15,parts:2}]
];
export function event(s){return s.trip?EVENTS[(s.trip.step+s.trip.offset)%EVENTS.length]:null}
export function startTrip(s,road,now=Date.now()){advance(s,now);if(s.broken||s.trip||!ROADS[road])return {ok:false,message:'いまは出発できません'};if(s.needs.energy<ROADS[road].cost+5)return {ok:false,message:'出発前にごはんで元気を補給しよう'};s.needs.energy-=ROADS[road].cost;s.trip={road,step:0,offset:s.trips%6,score:0};return note(s,`${ROADS[road].name}へ出発！ 6つの寄り道が待っている。`)}
export function choose(s,index,now=Date.now()){advance(s,now);let e=event(s);if(!e||![0,1,2].includes(index))return {ok:false,message:'道を選んでね'};let [label,,mem,heat,energy]=e.options[index],road=s.trip.road;s.needs.energy=clamp(s.needs.energy+energy);s.heat=clamp(s.heat+heat);for(let k in mem)s.memory[k]+=mem[k];let reward=REWARDS[(s.trip.step+s.trip.offset)%6][index];for(let k of ['clean','health','mood'])s.needs[k]=clamp(s.needs[k]+(reward[k]||0));s.growth=clamp(s.growth+(reward.growth||0),0,360);s.parts+=reward.parts||0;if(mem.wild&&s.needs.clean<30)s.memory.mud++;if(s.heat>70)damage(s,road==='ridge'?16:10);if(!s.trip)return {ok:true,message:'熱で故障。ガレージへ戻って修理しよう。'};s.trip.step++;let t=`${label}。${s.heat>70?'熱い！ 耐久にキズがついた。':'またひとつ、思い出ができた。'}`;if(s.trip.step>=6){s.parts+=road==='ridge'?5:3;s.growth=clamp(s.growth+25,0,360);s.needs.mood=clamp(s.needs.mood+15);s.trips++;s.trip=null;t='おかえり！ 成長＋25、パーツを獲得。旅の記憶が相棒の中に。'}finish(s);return note(s,t)}
export function abandon(s){if(!s.trip)return {ok:false,message:'ガレージにいます'};s.trip=null;return note(s,'途中で帰ってきた。思い出は消えない。また行こう。')}
export function repair(s,action,now=Date.now()){advance(s,now);if(!s.broken)return {ok:false,message:'まだ元気だよ'};if(action==='parts'){if(s.parts<5)return {ok:false,message:'パーツが5個必要。手作業でも直せます'};s.parts-=5;s.repairStep=2;}else if(action==='diagnose'&&s.repairStep===0){s.repairStep=1;return note(s,'原因が分かった！ 熱でゆるんだボルトを締めよう。')}else if(action==='patch'&&s.repairStep===1){s.repairStep=2;return note(s,'ボルトを締めて配線をつないだ。最後は再始動！')}else if(!(action==='restart'&&s.repairStep===2))return {ok:false,message:'順番に修理しよう'};s.broken=false;s.repairStep=0;s.heat=20;s.needs.health=65;s.needs.energy=Math.max(35,s.needs.energy);s.memory.kind++;return note(s,'ぶるるん！ 傷あとも、相棒の個性になった。')}
export function next(s,now=Date.now()){let n=create(now);for(let k of ['collection','history','legacy'])n[k]=[...s[k]];n.settings={...s.settings};n.generation=s.generation+1;n.tutorial=true;return n}
export function migrate(x,now=Date.now()){let n=create(now);if(x?.version===1){n.legacy=Array.isArray(x.collection)?x.collection.filter(v=>/^(sport|luxury|adventure)-[123]$/.test(v)):[];n.generation=Math.max(1,Math.floor(numeric(x.generation,1)));n.settings={sound:!!x.settings?.sound,reduced:!!x.settings?.reduced};n.log=['v1の図鑑を保管しました。新しい進化の旅へ。旧セーブはそのまま残っています。']}return n}
export function valid(x){return x?.version===2&&Number.isFinite(x.growth)&&Number.isFinite(x.last)&&x.needs&&Object.keys(create(0).needs).every(k=>Number.isFinite(x.needs[k]))&&x.memory&&Object.keys(create(0).memory).every(k=>Number.isFinite(x.memory[k]))}
export function restore(raw,now=Date.now()){try{let x=JSON.parse(raw);if(x.version===1)return migrate(x,now);if(!valid(x))return create(now);let n=create(now);for(let k in n.needs)n.needs[k]=clamp(x.needs[k]);for(let k in n.memory)n.memory[k]=clamp(x.memory[k],0,100000);for(let k of ['growth','heat','parts','trips','breakdowns','generation','repairStep'])n[k]=clamp(numeric(x[k],n[k]),0,k==='growth'?360:k==='heat'?100:100000);n.generation=Math.max(1,n.generation);n.repairStep=clamp(n.repairStep,0,2);n.broken=!!x.broken;n.last=Math.min(numeric(x.last,now),now);n.collection=Array.isArray(x.collection)?[...new Set(x.collection.filter(k=>known(FORMS,k)))]:[];n.legacy=Array.isArray(x.legacy)?x.legacy.filter(k=>/^(sport|luxury|adventure)-[123]$/.test(k)):[];n.history=Array.isArray(x.history)?x.history.filter(v=>v&&known(FORMS,v.id)).slice(0,50).map(v=>({id:v.id,generation:Math.max(1,Math.floor(numeric(v.generation,1)))})):[];n.final=n.growth>=360&&known(FORMS,x.final)?x.final:null;if(n.final&&!n.collection.includes(n.final))n.collection.push(n.final);n.tutorial=!!x.tutorial;n.settings={sound:!!x.settings?.sound,reduced:!!x.settings?.reduced};for(let k in ACTIONS)n.cooldowns[k]=Math.min(now+12000,numeric(x.cooldowns?.[k]));if(x.trip&&known(ROADS,x.trip.road)&&Number.isInteger(x.trip.step)&&x.trip.step>=0&&x.trip.step<6)n.trip={road:x.trip.road,step:x.trip.step,offset:clamp(Math.floor(numeric(x.trip.offset)),0,5)};return advance(n,now)}catch{return create(now)}}
