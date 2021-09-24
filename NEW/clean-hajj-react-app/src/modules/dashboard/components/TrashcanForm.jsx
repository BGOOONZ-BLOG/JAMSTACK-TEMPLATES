import React from 'react'
import { Container, Button, Input, Card } from '../../common'
import '../styles.scss'

const TrashcanForm = ({
	name,
	lat,
	lng,
	// filled,
	handleChange,
	onSubmit,
	errorName,
	errorLat,
	errorLng
}) => (
	<Container className="trashcan-container">
		<Card className="trashcan-form">
			<form onSubmit={onSubmit}>
				<Input name="name" value={name} onChange={handleChange} label="Name" error={errorName} />
				<Input name="lat" value={lat} onChange={handleChange} label="Lat" error={errorLat} />
				<Input name="lng" value={lng} onChange={handleChange} label="Lng" error={errorLng} />
				<div className="center">
					<Button type="submit">Submit</Button>
				</div>
			</form>
		</Card>
	</Container>
)

export default TrashcanForm
