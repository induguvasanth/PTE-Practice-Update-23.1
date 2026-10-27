import {build} from 'esbuild';import {cp,mkdir,readdir,stat} from 'node:fs/promises';import path from 'node:path';
const dest='../PTE-Practice-Update2-main/pronunciation-assets';await mkdir(dest,{recursive:true});
await build({entryPoints:['entry.js'],bundle:true,format:'esm',platform:'browser',target:'es2022',outfile:path.join(dest,'hama-browser.js')});
async function walk(dir){for(const ent of await readdir(dir,{withFileTypes:true})){const f=path.join(dir,ent.name);if(ent.isDirectory())await walk(f);else if(['asr_waveform.hama','encoder.hama','decoder_step.hama','g2p_vocab.json','hama.wasm'].includes(ent.name)){await cp(f,path.join(dest,ent.name));console.log('Copied',ent.name)}}}
await walk('node_modules/hama-js');console.log('Build complete. Upload pronunciation-assets/ alongside speaking.html.');
