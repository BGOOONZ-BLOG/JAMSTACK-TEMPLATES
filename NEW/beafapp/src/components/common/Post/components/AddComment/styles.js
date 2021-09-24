import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 1rem;
  border-top: 1px solid #eee;
`

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

export const Column = styled.div`
  &:first-child {
    padding-right: 1rem;
    width: 100%;
    text-align: left;
  }
`

export const InputField = styled.div`
  border: unset;
  resize: unset;
  border-bottom: 1px solid #adadad;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
  text-align: left;
  -webkit-appearance: none;
  font-size: 12pt;

  &::placeholder {
    color: #adadad;
  }
`

export const Button = styled.button`
  color: #fff;
  background: #ff6347;
  text-transform: uppercase;
  border-radius: 0.3rem;
  border: none;
  cursor: pointer;
  font-size: 12pt;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  line-height: 36px;
`
