import React from 'react'
import { Wrapper } from './styles'

export const Content = ({ title, description }) => (
  <Wrapper>
    <h2>{title}</h2>
    <p>{description}</p>
  </Wrapper>
)
