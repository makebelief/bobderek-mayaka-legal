import fs from 'fs'; import path from 'path';
const root=process.cwd();
const html=[];function walk(d){for(const f of fs.readdirSync(d)){const p=path.join(d,f);const s=fs.statSync(p);if(s.isDirectory())walk(p);else if(p.endsWith('.html'))html.push(p)}}walk(root);
let fail=0;for(const p of html){const t=fs.readFileSync(p,'utf8');for(const m of t.matchAll(/(?:href|src)="([^"]+)"/g)){let u=m[1];if(u.startsWith('http')||u.startsWith('mailto:')||u.startsWith('tel:')||u.startsWith('#')||u.startsWith('data:'))continue;u=u.split('#')[0].split('?')[0];if(!u)continue;let target;if(u.startsWith('/'))target=path.join(root,u);else target=path.join(path.dirname(p),u);if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'index.html');if(!fs.existsSync(target)){console.error('BROKEN',path.relative(root,p),'->',m[1]);fail++}}}
if(!fs.existsSync(path.join(root,'assets/css/site.css')))fail++;
if(!fs.existsSync(path.join(root,'assets/js/site.js')))fail++;
console.log(`${html.length} HTML pages checked`);if(fail){console.error(`${fail} failures`);process.exit(1)}console.log('All internal links and core assets passed.');
