import {mkdir,copyFile,cp,rm,readFile,access} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});await mkdir('dist');
for(let f of ['index.html','style.css','.nojekyll'])await copyFile(f,`dist/${f}`);
for(let d of ['src','v1','v2'])await cp(d,`dist/${d}`,{recursive:true});
for(let f of ['v2/src/app2.js','v2/style2.css','v1/index.html','v1/src/app.js'])await access(`dist/${f}`);
if(!(await readFile('dist/index.html','utf8')).includes('./v2/src/app2.js'))throw Error('Production root must load v2');
console.log('Static build ready: dist (v2 and v1 archive verified)');
