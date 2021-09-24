import React, { Component } from 'react'
import { SafeAreaView, Alert } from 'react-native'
import { WebView } from 'react-native-webview'
import AsyncStorage from '@react-native-community/async-storage'
import createInvoke from 'react-native-webview-invoke/native'
import { goToAuth } from 'src/config/navigation'
import { REACT_APP } from 'src/config/'

class Home extends Component {
  webview

  invoke = createInvoke(() => this.webview)

  componentDidMount() {
    this.invoke.define('onLogout', this.onLogout)
  }

  onLogout = async () => {
    try {
      AsyncStorage.clear()
      goToAuth()
    } catch (err) {
      Alert.alert('Something went wrong')
    }
  }

  render() {
    const { token } = this.props
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <WebView
          useWebKit
          ref={webview => (this.webview = webview)}
          onMessage={this.invoke.listener}
          source={{
            uri: `${REACT_APP}/?token=${token}`,
          }}
          bounces={false}
        />
      </SafeAreaView>
    )
  }
}

export default Home
