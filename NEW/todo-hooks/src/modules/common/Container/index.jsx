import React from 'react'
import { Wrapper } from './Container.module.scss'

const Container = ({ children, className }) => (
    <div className={`${Wrapper} ${className}`}>{children}</div>
)

export { Container }