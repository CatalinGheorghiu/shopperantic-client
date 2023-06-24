import styled from 'styled-components';

export const Grid = styled.div`
  display: flex;
  gap: 1rem;
  overflow: scroll;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
