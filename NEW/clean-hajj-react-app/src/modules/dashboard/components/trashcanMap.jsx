import React from 'react'
import Map from './Map'

const trashcanMap = ({ trashcans }) => (
	<Map
		trashcans={trashcans}
		googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
		loadingElement={<div style={{ height: '100%' }} />}
		containerElement={<div style={{ height: '600px', width: '600px' }} />}
		mapElement={<div style={{ height: '100%' }} />}
	/>
)

export default trashcanMap
