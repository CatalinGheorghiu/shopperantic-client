import styled from 'styled-components';

export const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;

  @media screen and (min-width: 768px) {
    max-height: 80vh;
    overflow-y: scroll;
  }
`;
