import React, { Component } from 'react'
import { connect } from 'react-redux'
import { branch, renderComponent, compose, lifecycle } from 'recompose'
import { editTrashcan, getTrashcanById } from '../actions'
import { Loader, Head } from '../../common'
import TrashcanForm from '../components/TrashcanForm'
import '../styles.scss'

class editTrashcanContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			id: props.trashcan.trashcans._id || '',
			name: props.trashcan.trashcans.name || '',
			lat: props.trashcan.trashcans.lat || '',
			lng: props.trashcan.trashcans.lng || '',
			errorName: undefined,
			errorLat: undefined,
			errorType: undefined,
			errorLng: undefined,
			error: undefined
		}
	}

    onSubmit = e => {
    	e.preventDefault()
    	const { id, name, lat, lng } = this.state
    	const { editTrashcan } = this.props
    	if (name === '') {
    		this.setState({ errorName: 'Name field is required' })
    	} else if (lat === '') {
    		this.setState({ errorLat: 'Lat field is required' })
    	} else if (lng === '') {
    		this.setState({ errorLng: 'Lng field is required' })
    	}

    	editTrashcan(id, name, lat, lng)
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    render() {
    	return (
    		<React.Fragment>
    			<Head
    				url={`https://cleanify.netlify.com/edit-trashcan/${this.props.match.params.id}`}
    				title="Edit trash can"
    				description="Edit trash can"
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
	connect(mapStateToProps, { editTrashcan, getTrashcanById }),
	lifecycle({
		componentWillMount() {
			this.props.getTrashcanById(this.props.match.params.id)
		},
		componentWillReceiveProps(nextProps) {
			if (nextProps.trashcan.error) {
				this.setState({ error: nextProps.trashcan.error.error })
			}
			if (nextProps.trashcan.trashcans) {
				this.setState({
					name: nextProps.trashcan.trashcans.name,
					lat: nextProps.trashcan.trashcans.lat,
					lng: nextProps.trashcan.trashcans.lng
				})
			}
		}
	}),
	branch(
		({ trashcan }) => trashcan.loading === undefined || trashcan.loading,
		renderComponent(Loader)
	)
)

export default enhance(editTrashcanContainer)
