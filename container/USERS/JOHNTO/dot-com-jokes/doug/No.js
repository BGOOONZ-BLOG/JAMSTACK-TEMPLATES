import React, { Component } from 'react'
import Typist from 'react-typist'

import { dougisms } from './constants'
import { random } from './util'
import { Layout } from './ui'

class No extends Component {
  state = {
    dougism: random(dougisms)
  }

  render() {
    const { dougism } = this.state

    return (
      <Layout>
        <Typist>{dougism}</Typist>
      </Layout>
    )
  }
}

export default No
