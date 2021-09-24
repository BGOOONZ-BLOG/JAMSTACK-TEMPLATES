import React, { Component } from 'react'
import { compose, branch, renderComponent, lifecycle } from 'recompose'
import cx from 'classnames'
import { connect } from 'react-redux'
import Map from '../components/Map'
import { Loader, Button, Container, Head } from '../../common'
import { getTrashcans, filledTrashcan, report } from '../actions'
import Item from '../components/Item'
import DashbordIcon from '../../../assets/trash.svg'
import '../styles.scss'

class Dashboard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			trashcans: undefined,
			selectedTrashcan: undefined,
			loading: true,
			myLat: '',
			myLng: ''
		}
	}

	componentDidMount() {
		// this.props.getTrashcans()
		if ('geolocation' in window.navigator) {
			window.navigator.geolocation.getCurrentPosition(position => {
				this.setState({ myLat: position.coords.latitude, myLng: position.coords.longitude })
			}, (error_message) => {
				console.error('An error has occured while retrieving location', error_message)
			})
		} else {
			console.log('geolocation is not enabled on this browser')
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.trashcan.trashcans) {
			this.setState({
				trashcans: nextProps.trashcan.trashcans,
				selectedTrashcan: nextProps.trashcan.trashcans[0],
				loading: false
			})
		}
	}

	checkFilled = id => {
		this.props.filledTrashcan(id)
		setTimeout(() => {
			window.document.location.reload()
		}, 3000)
	}

	report = id => {
		// eslint-disable-next-line
		window.alert('Reported')
		this.props.report(id)
	}

	updateMarker = trashcan => this.setState({ selectedTrashcan: trashcan })

	render() {
		const { trashcans, selectedTrashcan, loading, myLat, myLng } = this.state
		const { auth } = this.props
		return (
			<React.Fragment>
				{loading ? (
					<Loader />
				) : (
					<Container className="dashboard-container">
						<Head
							url="https://cleanify.netlify.com/dashboard"
							title="Nearby trash cans"
							description="Find nearby trash cans on the map"
						/>
						{
							trashcans === undefined || trashcans.isEmpty ? (
								<div className="empty-state">
									<div className="responsive-img">
										<img src="https://cdn.dribbble.com/users/231299/screenshots/4873214/garbage.png" alt="trashcans not available" />
									</div>
									<h2>No trashcans are available right now! {auth.user.type === 'admin' && 'start adding a new one!'}</h2>
									{auth.user.type === 'admin' && <Button href="/add-trashcan">Add trashcan</Button>}
								</div>
							) : (
								<div className="trashcans-container-map">
									<div className="meh-trashcans">
										{
											auth.user.type === 'customer' ? (
												<Item
													{...selectedTrashcan}
													itemOnMap={this.itemOnMap}
													report={() => this.report(selectedTrashcan._id)}
												/>
											) : (
												<React.Fragment>
													<Item
														{...selectedTrashcan}
														checkFilled={() => this.checkFilled(selectedTrashcan._id)}
														edit
													/>
													<div style={{ marginTop: '2rem' }}>
														<Button href="/add-trashcan">Add trashcan</Button>
													</div>
												</React.Fragment>
											)
										}
									</div>
									<div className="meh-map">
										{<Map {...selectedTrashcan}>
											{trashcans.map(trashcan => (
												<div
													key={trashcan._id}
													className={cx('marker', { 'marker-empty': !trashcan.filled, 'marker-filled': trashcan.filled })}
													lat={trashcan.lat}
													lng={trashcan.lng}
													onClick={() => this.updateMarker(trashcan)}
													text={trashcan.name.split('')[0].toUpperCase()}
												>
													<img src={DashbordIcon} alt="trash can icon" />
												</div>
											))}
											<div
												className="current-location"
												lat={myLat}
												lng={myLng}
												text="current location"
											/>
										</Map>}
									</div>
								</div>
							)
						}
					</Container>
				)}
			</React.Fragment>
		)
	}
}

const mapStateToProps = ({ auth, trashcan }) => ({
	auth,
	trashcan
})

const enhance = compose(
	connect(mapStateToProps, { getTrashcans, filledTrashcan, report }),
	lifecycle({
		componentWillMount() {
			this.props.getTrashcans()
		}
	}),
	branch(
		({ auth }) => auth.user === undefined || auth.loading,
		renderComponent(Loader)
	)
)

export default enhance(Dashboard)
