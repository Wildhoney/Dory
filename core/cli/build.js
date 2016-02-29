import { exec } from 'shelljs';

exec('mkdir -p core/build/assets/posts');
exec('webpack');
exec('sass public/sass/default.scss core/build/assets/dory.css');
exec('npm run catalogue');
exec('html-minifier public/index.html --collapse-whitespace > core/build/index.html');
exec('uglifyjs --compress --mangle --source-map core/build/assets/dory.js.map -- core/build/assets/dory.js > core/build/assets/dory.min.js');
exec('cp public/favicon.ico core/build/assets/favicon.ico');
exec('rimraf core/build/assets/dory.js && mv core/build/assets/dory.min.js core/build/assets/dory.js');
