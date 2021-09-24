import React from 'react'
import { Btn } from './Button.module.scss'

const Button = ({type, children, onClick}) => <button className={Btn} type={type} onClick={onClick}>{children}</button>

export { Button }