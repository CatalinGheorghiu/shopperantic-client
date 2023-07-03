import styled from 'styled-components';

export const Image = styled.div`
  max-width: 320px;
  width: 320px;
  overflow-x: auto;

  @media screen and (min-width: 768px) {
    max-width: unset;
    width: 100%;
  }
`;
