import React, { Component } from 'react'
import Swiper from 'react-native-swiper'
import { View } from 'react-native'
import { Title, CustomButton } from '../../common'
import { Item, Icon, Thumbnail } from './styles'
import agreeImg from '../../../assets/agree.png'

const data = [
	{
		id: 0,
		img: agreeImg,
		text: 'dummy.title',
		description: 'dummy.description'
	},
	{
		id: 1,
		img: agreeImg,
		text: 'dummy.title',
		description: 'dummy.description'
	},
	{
		id: 2,
		img: agreeImg,
		text: 'dummy.title',
		description: 'dummy.description'
	}
]

class Swappable extends Component {
	state = {
		current: 0
	}

	nextScreen = () => {
		if (this.state.current === 2) {
			this.props.navigate('Auth')
		} else {
			this.refs.swiper.scrollBy(this.state.current + 1) // eslint-disable-line
		}
	}

	updateCurrent = index => this.setState({ current: index })

	render() {
		return (
			<React.Fragment>
				<Swiper
					onIndexChanged={this.updateCurrent}
					index={this.state.current}
					ref="swiper" // eslint-disable-line
					dot={(
						<View
							style={{ backgroundColor: '#EDEDED', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7 }}
						/>
					)}
					activeDot={(
						<View
							style={{ backgroundColor: '#6C63FF', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7 }}
						/>
					)}
					loop={false}
				>
					{data.map(({ id, img, text, description }) => (
						<Item key={id}>
							<Thumbnail>
								<Icon source={img} />
							</Thumbnail>
							<Title id={text} position="center" marginBottom={5} />
							<Title id={description} position="center" marginBottom={10} subtitle />
						</Item>
					))}
				</Swiper>
				{<CustomButton onPress={this.nextScreen} text="next" />}
			</React.Fragment>
		)
	}
}


export default Swappable
