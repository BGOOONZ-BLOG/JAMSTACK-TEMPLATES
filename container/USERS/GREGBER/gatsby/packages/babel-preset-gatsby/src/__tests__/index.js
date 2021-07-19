import * as path from "path"
import preset from "../index"
import * as pathSerializer from "../utils/path-serializer"

expect.addSnapshotSerializer(pathSerializer)

describe(`babel-preset-gatsby`, () => {
  it.each([`build-stage`, `develop`, `build-javascript`, `build-html`])(
    `should specify proper presets and plugins when stage is %s`,
    stage => {
      expect(preset(null, { stage })).toMatchSnapshot()
    }
  )

  it(`Allows to configure browser targets`, () => {
    const targets = `last 1 version`
    const { presets } = preset(null, {
      stage: `build-javascript`,
      targets,
    })

    expect(presets[0]).toEqual([
      expect.stringContaining(path.join(`@babel`, `preset-env`)),
      expect.objectContaining({
        targets,
      }),
    ])
  })

  it(`Allows to configure react runtime`, () => {
    const { presets } = preset(null, {
      reactRuntime: `automatic`,
    })

    expect(presets[1]).toEqual([
      expect.stringContaining(path.join(`@babel`, `preset-react`)),
      expect.objectContaining({
        pragma: undefined,
        runtime: `automatic`,
      }),
    ])
  })
})
