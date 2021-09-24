import React, { Component } from 'react'
import { connect } from 'react-redux'
import { branch, renderComponent, compose, lifecycle } from 'recompose'
import { addNewTrashCan } from '../actions'
import { Loader, Head } from '../../common'
import TrashcanForm from '../components/TrashcanForm'
import '../styles.scss'

class addTrashcanContainer extends Component {
    state = {
    	name: '',
    	lat: '',
    	lng: '',
    	errorName: undefined,
    	errorLat: undefined,
    	errorLng: undefined
    }

    onSubmit = e => {
    	e.preventDefault()
    	const { name, lat, lng } = this.state
    	const { addNewTrashCan } = this.props
    	if (name === '') {
    		this.setState({ errorName: 'Name field is required' })
    	} else if (lat === '') {
    		this.setState({ errorLat: 'Lat field is required' })
    	} else if (lng === '') {
    		this.setState({ errorLng: 'Lng field is required' })
    	}

    	addNewTrashCan(name, lat, lng)
    }

	handleChange = e => this.setState({ [e.target.name]: e.target.value })

	render() {
    	return (
			<React.Fragment>
				<Head
    				url="https://cleanify.netlify.com/add-trashcan"
    				title="Add new trash can"
    				description="Add new trash can"
				/>
				<TrashcanForm
					{...this.state}
					onSubmit={this.onSubmit}
					handleChange={this.handleChange}
				/>
			</React.Fragment>
    	)
	}
}

const mapStateToProps = ({ trashcan }) => ({
	trashcan
})

const enhance = compose(
	connect(mapStateToProps, { addNewTrashCan }),
	lifecycle({
		componentWillReceiveProps(nextProps) {
			if (nextProps.trashcan.error) {
				this.setState({ error: nextProps.trashcan.error })
			}
		}
	}),
	branch(
		({ trashcan }) => trashcan.loading === undefined || trashcan.loading,
		renderComponent(Loader)
	)
)

export default enhance(addTrashcanContainer)
