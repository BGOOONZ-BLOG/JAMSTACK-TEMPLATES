import React from 'react'
import cx from 'classnames'
import { Button, Card } from '../../common'
import '../styles.scss'

const Item = ({ _id, name, date, lat, lng, filled, edit, checkFilled, report }) => {
	const dateObject = new Date(Date.parse(date))
	const dateReadable = dateObject.toDateString()
	return (
		<Card className="card-item">
			<h4>Name: {name}</h4>
			<p>Created at: {dateReadable}</p>
			<p>Lat: {lat}</p>
			<p>Lng: {lng}</p>
			<div className="item-details">
				<div className={cx({ 'flexed-buttons': edit })}>
					{edit && <Button href={`/edit-trashcan/${_id}`}>Edit</Button>}
				</div>
				<div style={{ textAlign: 'right', display: 'flex', alignItems: 'center' }}>
					<p style={{ marginRight: '1rem' }}>{edit ? 'Filled:' : 'Report:'}</p>
					<label className="switch">
						<input type="checkbox" onClick={edit ? checkFilled : report} checked={!filled} />
						<span className="slider" />
					</label>
				</div>
			</div>
		</Card>
	)
}

export default Item
