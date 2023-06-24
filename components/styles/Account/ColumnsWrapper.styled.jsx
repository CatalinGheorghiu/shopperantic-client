import styled from 'styled-components';

export const ColsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0;

  p {
    margin: 5px;
  }

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;
