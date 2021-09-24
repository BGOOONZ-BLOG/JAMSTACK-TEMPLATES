import React from 'react'
import deleteIcon from './delete.svg'
import { Wrapper, CancelBtn } from './styles'

export const CancelMark = ({ toggle, alt, align, flex }) => (
  <Wrapper flex={flex} align={align}>
    <CancelBtn type="button" onClick={toggle}>
      <img src={deleteIcon} alt={alt} />
    </CancelBtn>
  </Wrapper>
)
