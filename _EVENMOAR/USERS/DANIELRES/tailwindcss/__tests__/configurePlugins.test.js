import configurePlugins from '../src/util/configurePlugins'

test('setting a plugin to false removes it', () => {
  const plugins = {
    fontSize: () => 'fontSize',
    display: () => 'display',
    backgroundPosition: () => 'backgroundPosition',
  }

  const configuredPlugins = configurePlugins(
    {
      display: false,
    },
    plugins
  )

  expect(configuredPlugins).toEqual(['fontSize', 'backgroundPosition'])
})

test('passing only false removes all plugins', () => {
  const plugins = {
    fontSize: () => 'fontSize',
    display: () => 'display',
    backgroundPosition: () => 'backgroundPosition',
  }

  const configuredPlugins = configurePlugins(false, plugins)

  expect(configuredPlugins).toEqual([])
})

test('passing an array whitelists plugins', () => {
  const plugins = {
    fontSize: () => 'fontSize',
    display: () => 'display',
    backgroundPosition: () => 'backgroundPosition',
  }

  const configuredPlugins = configurePlugins(['display'], plugins)

  expect(configuredPlugins).toEqual(['display'])
})
