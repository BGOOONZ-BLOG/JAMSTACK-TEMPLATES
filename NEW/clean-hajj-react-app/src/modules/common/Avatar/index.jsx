import React from 'react'
import customerAvatar from './assets/customer.svg'
import workerAvatar from './assets/worker.svg'
import adminAvatar from './assets/admin.svg'
import './styles.scss'

const types = {
	customer: { img: customerAvatar },
	worker: { img: workerAvatar },
	admin: { img: adminAvatar }
}

const Avatar = ({ type, size = '60' }) => {
	const element = types[type]
	if (element) {
		return (
			<img
				alt={type}
				src={element.img}
				className="avatar"
				width={size}
				height={size}
			/>
		)
	}
	return null
}

export { Avatar }
