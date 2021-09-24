import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 1rem 0;
  width: 70%;
  margin: 0 auto;

  @media (max-width: 960px) {
    width: 90%;
  }

  @media (max-width: 680px) {
    text-align: center;
  }
`

export const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;

  @media (max-width: 680px) {
    flex-direction: column;
  }

  .avatar {
    border: 1px solid #eee;
    border-radius: 50%;
    width: 100px;
    height: 100px;

    @media (max-width: 680px) {
      order: 1;
    }
  }
`

export const Details = styled.div`
  max-width: 75%;
  width: 100%;

  img {
    cursor: pointer;
  }

  .jAfIlk {
    font-size: 10pt;
    font-weight: normal;
    white-space: nowrap;
    border-radius: 3px;
  }

  @media (max-width: 680px) {
    width: 100%;
    order: 2;
    text-align: center;

    .daZGjV {
      align-self: center;
    }
  }

  h2 {
    margin-bottom: 0.2rem;

    span {
      margin-right: 0.5rem;
    }

    @media (max-width: 680px) {
      display: flex;
      flex-direction: column;

      span {
        order: 2;
        margin-right: unset;
      }
    }
  }

  h4 {
    margin: 0.2rem 0 1rem 0;
    color: #848484;
  }

  p {
    color: #565656;
    line-height: 1.6;
  }
`

export const UnFollowBtn = styled.button`
  &:hover {
    span {
      display: none;
    }
  }
  &:hover:before {
    content: 'UNFOLLOW';
  }
`
