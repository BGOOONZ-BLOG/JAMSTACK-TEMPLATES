import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 0 1rem;
  border-top: 1px solid #eee;
  text-align: left;
`

export const SingleComment = styled.div`
  border-bottom: 1px solid #eee;
  padding: 0.8rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:last-child {
    border-bottom: unset;
  }

  i {
    color: #adadad;
    font-size: 8pt;
    font-weight: lighter;
  }
`

export const CommentDetails = styled.div`
  flex: 1 auto;
  width: 100%;
  max-width: 88%;
`

export const Flex = styled.div`
  display: flex;
  align-items: flex-start;

  p {
    margin: 0 0 0 0.5rem;
    font-size: 10pt;
    color: #202020;
    word-break: break-all;
  }
`

export const SubFlex = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  a {
    font-weight: 600;
    font-size: 10pt;
    margin-bottom: 0.2rem;
  }
`

export const More = styled.div`
  padding: 1rem 0;

  a {
    color: #03a9f4;
  }
`
