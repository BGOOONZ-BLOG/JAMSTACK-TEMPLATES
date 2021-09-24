import React from 'react'
import { Marker } from 'react-google-maps'
import trashcanIcon from '../assets/trashcanIcon.png'

const trashcanMarker = ({ location }) => (
	<Marker
		position={location}
		icon={trashcanIcon}
	/>
)

export default trashcanMarker
