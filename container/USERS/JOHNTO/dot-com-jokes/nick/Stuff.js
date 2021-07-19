import React, { Component } from 'react'
import Typist from 'react-typist'

import { stuff } from './constants'
import { random } from './util'
import { Layout } from './ui'

class Stuff extends Component {
  state = {
    thingNickLikes: random(stuff)
  }

  render() {
    const { thingNickLikes } = this.state

    return (
      <Layout>
        <Typist>{thingNickLikes}</Typist>
      </Layout>
    )
  }
}

export default Stuff
