/* eslint-disable no-console */

import path from 'path';
import fse from 'fs-extra';

function copyFile(file) {
  const buildPath = path.resolve(__dirname, './build/', path.basename(file));
  return new Promise(resolve => {
    fse.copy(file, buildPath, err => {
      if (err) throw err;
      resolve();
    });
  }).then(() => console.log(`Copied ${file} to ${buildPath}`));
}

function createPackageFile() {
  return new Promise(resolve => {
    fse.readFile(path.resolve(__dirname, './package.json'), 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      resolve(data);
    });
  })
    .then(data => JSON.parse(data))
    .then(packageData => {
      const minimalPackage = {
        ...packageData,
        name: 'material-ui-icons',
        main: './index.js',
        module: './index.es.js',
        'jsnext:main': './index.es.js',
        typings: './index.d.ts',
        private: false,
      };

      return new Promise(resolve => {
        const buildPath = path.resolve(__dirname, './build/package.json');
        const data = JSON.stringify(minimalPackage, null, 2);
        fse.writeFile(buildPath, data, err => {
          if (err) throw err;
          console.log(`Created package.json in ${buildPath}`);
          resolve();
        });
      });
    });
}

const files = ['../../LICENSE', './README.md'];

Promise.all(files.map(file => copyFile(file))).then(() => createPackageFile());
