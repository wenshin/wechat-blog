import showdown from 'showdown';
import glob from 'glob';
import { readFileSync, writeFileSync } from 'fs';
import { ChildProcess } from 'child_process';


glob('*.md', {}, (err, files) => {
  if (err) {
    console.error(err)
    return;
  }
  console.log(files);
  files.map((file) => {
    const md = readFileSync(file, 'utf-8')
    const parser = new showdown.Converter();
    const html = parser.makeHtml(md);
    const tmpl = readFileSync('template.html', 'utf-8')
    writeFileSync(`html/${file.replace('.md', '.html')}`, tmpl.replace('{mdbody}', html))
  });
});