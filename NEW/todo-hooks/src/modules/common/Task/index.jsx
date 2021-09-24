import React from 'react'
import { Wrapper, Card, Label, Slider, Switch } from './Task.module.scss'

const Task = ({ title, onClick, isDone, color }) => (
    <div className={Wrapper}>
        <div
            className={Card}
            style={{
                background: color === 'light' ? '#fff' : '#212121',
                color: color === 'light' ? '#212121' : '#fff',
                opacity: isDone && '.4'
            }}
        >
            <h2
                style={{ textDecoration: isDone && 'line-through' }}
            >{title}</h2>
            <div className={Switch}>
                <label className={Label}>
                    <input defaultChecked={isDone} onChange={onClick} type="checkbox" />
                    <span className={Slider} />
                </label>
            </div>
        </div>
    </div>
)

export { Task }