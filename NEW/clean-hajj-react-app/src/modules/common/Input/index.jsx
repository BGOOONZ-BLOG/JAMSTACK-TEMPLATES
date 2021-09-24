import React from 'react'
import cx from 'classnames'
import './styles.scss'

const Input = ({ type, name, value, onChange, label, error }) => (
	<div className="input-field">
		<input type={type} name={name} value={value} onChange={onChange} className={cx({ 'red-border': !!error, focus: value })} required />
		<span className="highlight" />
		<span className="bar" />
		<label>{label}</label>
		{error && <span className="error">{error}</span>}
	</div>
)

export { Input }
