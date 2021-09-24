import styled from 'styled-components';

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  &:after {
    content: '';
    max-width: 48%;
    width: 100%;

    @media (max-width: 960px) {
      content: unset;
    }
  }
`;
