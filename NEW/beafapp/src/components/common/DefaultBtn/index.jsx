import styled from 'styled-components'

export const DefaultBtn = styled.button`
  cursor: pointer;
  background: unset;
  color: #848484;
  border: unset;
  font-size: 12pt;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    cursor: text;

    &:hover {
      text-decoration: unset;
    }
  }
`
