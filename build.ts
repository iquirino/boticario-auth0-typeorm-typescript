import s from 'shelljs';
const outDir = 'dist';

s.rm('-rf', outDir);
s.mkdir(outDir);
s.cp('.env', `${outDir}/.env`);
s.mkdir('-p', `${outDir}/common/swagger`);
s.cp('src/common/api.yml', `${outDir}/common/api.yml`);
s.cp('src/ormconfig.json', `${outDir}/ormconfig.json`);
