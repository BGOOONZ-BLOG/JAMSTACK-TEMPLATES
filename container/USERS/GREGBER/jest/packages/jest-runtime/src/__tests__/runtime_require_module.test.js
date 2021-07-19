/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

import path from 'path';
import slash from 'slash';

let createRuntime;

describe('Runtime requireModule', () => {
  beforeEach(() => {
    createRuntime = require('createRuntime');
  });

  it('finds @providesModule modules', () =>
    createRuntime(__filename).then(runtime => {
      const exports = runtime.requireModule(
        runtime.__mockRootPath,
        'RegularModule',
      );
      expect(exports.isRealModule).toBe(true);
    }));

  it('provides `module` to modules', () =>
    createRuntime(__filename).then(runtime => {
      const exports = runtime.requireModule(
        runtime.__mockRootPath,
        'RegularModule',
      );
      expect(Object.keys(exports.module)).toEqual([
        'children',
        'exports',
        'filename',
        'id',
        'loaded',
        'parent',
        'paths',
      ]);
    }));

  it('provides `module.parent` to modules', () =>
    createRuntime(__filename).then(runtime => {
      const exports = runtime.requireModule(
        runtime.__mockRootPath,
        'RequireRegularModule',
      );
      expect(Object.keys(exports.parent)).toEqual([
        'children',
        'exports',
        'filename',
        'id',
        'loaded',
        'parent',
        'paths',
      ]);
    }));

  it('`module.parent` should be undefined for entrypoints', () =>
    createRuntime(__filename).then(runtime => {
      const exports = runtime.requireModule(
        runtime.__mockRootPath,
        'RegularModule',
      );
      expect(exports.parent).toBeNull();
    }));

  it('resolve module.parent.require correctly', () =>
    createRuntime(__filename).then(runtime => {
      const exports = runtime.requireModule(
        runtime.__mockRootPath,
        'inner_parent_module',
      );
      expect(exports.outputString).toEqual('This should happen');
    }));

  it('resolve module.parent.filename correctly', () =>
    createRuntime(__filename).then(runtime => {
      const exports = runtime.requireModule(
        runtime.__mockRootPath,
        'inner_parent_module',
      );

      expect(slash(exports.parentFileName.replace(__dirname, ''))).toEqual(
        '/test_root/inner_parent_module.js',
      );
    }));

  it('provides `module.loaded` to modules', () =>
    createRuntime(__filename).then(runtime => {
      const exports = runtime.requireModule(
        runtime.__mockRootPath,
        'RegularModule',
      );

      // `exports.loaded` is set while the module is loaded, so should be `false`
      expect(exports.loaded).toEqual(false);
      // After the module is loaded we can query `module.loaded` again, at which point it should be `true`
      expect(exports.isLoaded()).toEqual(true);
    }));

  it('provides `module.filename` to modules', () =>
    createRuntime(__filename).then(runtime => {
      const exports = runtime.requireModule(
        runtime.__mockRootPath,
        'RegularModule',
      );
      expect(
        exports.filename.endsWith('test_root' + path.sep + 'RegularModule.js'),
      ).toBe(true);
    }));

  it('provides `module.paths` to modules', () => {
    const altModuleDir = 'bower_components';
    const moduleDirectories = ['node_modules', altModuleDir];

    return createRuntime(__filename, {moduleDirectories}).then(runtime => {
      const exports = runtime.requireModule(
        runtime.__mockRootPath,
        'RegularModule',
      );
      expect(exports.paths.length).toBeGreaterThan(0);
      exports.paths.forEach(path => {
        expect(moduleDirectories.some(dir => path.endsWith(dir))).toBe(true);
      });
    });
  });
  it('provides `require.main` to modules', () =>
    createRuntime(__filename).then(runtime => {
      runtime._moduleRegistry[__filename] = module;
      [
        './test_root/modules_with_main/export_main.js',
        './test_root/modules_with_main/re_export_main.js',
      ].forEach(modulePath => {
        const mainModule = runtime.requireModule(__filename, modulePath);
        expect(mainModule).toBe(module);
      });
    }));

  it('throws on non-existent @providesModule modules', () =>
    createRuntime(__filename).then(runtime => {
      expect(() => {
        runtime.requireModule(runtime.__mockRootPath, 'DoesntExist');
      }).toThrow(new Error("Cannot find module 'DoesntExist' from 'root.js'"));
    }));

  it('finds relative-path modules without file extension', () =>
    createRuntime(__filename).then(runtime => {
      const exports = runtime.requireModule(
        runtime.__mockRootPath,
        './RegularModule',
      );
      expect(exports.isRealModule).toBe(true);
    }));

  it('finds relative-path modules with file extension', () =>
    createRuntime(__filename).then(runtime => {
      const exports = runtime.requireModule(
        runtime.__mockRootPath,
        './RegularModule.js',
      );
      expect(exports.isRealModule).toBe(true);
    }));

  it('throws on non-existent relative-path modules', () =>
    createRuntime(__filename).then(runtime => {
      expect(() => {
        runtime.requireModule(runtime.__mockRootPath, './DoesntExist');
      }).toThrow(
        new Error("Cannot find module './DoesntExist' from 'root.js'"),
      );
    }));

  it('finds node core built-in modules', () =>
    createRuntime(__filename).then(runtime => {
      expect(() => {
        runtime.requireModule(runtime.__mockRootPath, 'fs');
      }).not.toThrow();
    }));

  it('finds and loads JSON files without file extension', () =>
    createRuntime(__filename).then(runtime => {
      const exports = runtime.requireModule(
        runtime.__mockRootPath,
        './JSONFile',
      );
      expect(exports.isJSONModule).toBe(true);
    }));

  it('finds and loads JSON files with file extension', () =>
    createRuntime(__filename).then(runtime => {
      const exports = runtime.requireModule(
        runtime.__mockRootPath,
        './JSONFile.json',
      );
      expect(exports.isJSONModule).toBe(true);
    }));

  it('requires a JSON file twice successfully', () =>
    createRuntime(__filename).then(runtime => {
      const exports1 = runtime.requireModule(
        runtime.__mockRootPath,
        './JSONFile.json',
      );
      const exports2 = runtime.requireModule(
        runtime.__mockRootPath,
        './JSONFile.json',
      );
      expect(exports1.isJSONModule).toBe(true);
      expect(exports2.isJSONModule).toBe(true);
      expect(exports1).toBe(exports2);
    }));

  it('provides manual mock when real module doesnt exist', () =>
    createRuntime(__filename).then(runtime => {
      const exports = runtime.requireModule(
        runtime.__mockRootPath,
        'ExclusivelyManualMock',
      );
      expect(exports.isExclusivelyManualMockModule).toBe(true);
    }));

  it(`doesn't override real modules with manual mocks when explicitly unmocked`, () =>
    createRuntime(__filename, {
      automock: true,
    }).then(runtime => {
      const root = runtime.requireModule(runtime.__mockRootPath, './root.js');
      root.jest.resetModuleRegistry();
      root.jest.unmock('ManuallyMocked');
      const exports = runtime.requireModule(
        runtime.__mockRootPath,
        'ManuallyMocked',
      );
      expect(exports.isManualMockModule).toBe(false);
    }));

  it('resolves haste packages properly', () =>
    createRuntime(__filename).then(runtime => {
      const hastePackage = runtime.requireModule(
        runtime.__mockRootPath,
        'haste-package/core/module',
      );
      expect(hastePackage.isHastePackage).toBe(true);
    }));

  it('resolves node modules properly when crawling node_modules', () =>
    // While we are crawling a node module, we shouldn't put package.json
    // files of node modules to resolve to `package.json` but rather resolve
    // to whatever the package.json's `main` field says.
    createRuntime(__filename, {
      haste: {
        providesModuleNodeModules: ['not-a-haste-package'],
      },
    }).then(runtime => {
      const hastePackage = runtime.requireModule(
        runtime.__mockRootPath,
        'not-a-haste-package',
      );
      expect(hastePackage.isNodeModule).toBe(true);
    }));

  it('resolves platform extensions based on the default platform', () =>
    Promise.all([
      createRuntime(__filename).then(runtime => {
        const exports = runtime.requireModule(
          runtime.__mockRootPath,
          'Platform',
        );

        expect(exports.platform).toBe('default');
      }),
      createRuntime(__filename, {
        haste: {
          defaultPlatform: 'ios',
          platforms: ['ios', 'android'],
        },
      }).then(runtime => {
        const exports = runtime.requireModule(
          runtime.__mockRootPath,
          'Platform',
        );

        expect(exports.platform).toBe('ios');
      }),
      createRuntime(__filename, {
        haste: {
          platforms: ['ios', 'android'],
        },
      }).then(runtime => {
        const exports = runtime.requireModule(
          runtime.__mockRootPath,
          'Platform',
        );

        expect(exports.platform).toBe('default');
      }),
      createRuntime(__filename, {
        haste: {
          defaultPlatform: 'android',
          platforms: ['ios', 'android'],
        },
      }).then(runtime => {
        const exports = runtime.requireModule(
          runtime.__mockRootPath,
          'Platform',
        );

        expect(exports.platform).toBe('android');
      }),
      createRuntime(__filename, {
        haste: {
          defaultPlatform: 'windows',
          platforms: ['ios', 'android', 'native', 'windows'],
        },
      }).then(runtime => {
        const exports = runtime.requireModule(
          runtime.__mockRootPath,
          'Platform',
        );

        // We prefer `native` over the default module if the default one
        // cannot be found.
        expect(exports.platform).toBe('native');
      }),
    ]));

  it('finds modules encoded in UTF-8 *with BOM*', () =>
    createRuntime(__filename).then(runtime => {
      const exports = runtime.requireModule(
        runtime.__mockRootPath,
        './utf8_with_bom.js',
      );
      expect(exports).toBe('isModuleEncodedInUTF8WithBOM');
    }));

  it('finds and loads JSON files encoded in UTF-8 *with BOM*', () =>
    createRuntime(__filename).then(runtime => {
      const exports = runtime.requireModule(
        runtime.__mockRootPath,
        './utf8_with_bom.json',
      );
      expect(exports.isJSONModuleEncodedInUTF8WithBOM).toBe(true);
    }));
});
