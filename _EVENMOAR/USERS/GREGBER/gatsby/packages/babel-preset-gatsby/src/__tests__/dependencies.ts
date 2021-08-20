import preset from "../dependencies"
import * as pathSerializer from "../utils/path-serializer"

expect.addSnapshotSerializer(pathSerializer)

describe(`dependencies`, () => {
  it(`should specify proper presets and plugins`, () => {
    expect(preset()).toMatchSnapshot()
  })
})
