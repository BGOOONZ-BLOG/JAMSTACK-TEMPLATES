import React from 'react'

const Button = ({ children }) => (
  <button type="button" onClick={() => alert('hello')}>{children}</button>
)

export default Button