import React from 'react'
import '../assets/styles/icons.css'

const Icon = (props) =>(
    <div className="icon-weather">
        <span className={`${props.icon}-icon icon`}></span>
    </div>
)

export default Icon