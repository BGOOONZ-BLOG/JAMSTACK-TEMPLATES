import React from 'react'
import { Field, Wrapper, FieldSet } from './Input.module.scss'

const Input = ({...props}) => (
    <div className={Wrapper}>
        <div className={FieldSet}>
            <input
                {...props}
                className={Field}
            />
        </div>
    </div>
)

export { Input }