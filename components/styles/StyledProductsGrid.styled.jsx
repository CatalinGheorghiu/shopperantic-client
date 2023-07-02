import styled from 'styled-components';

export const StyledProductsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 2rem;

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`;
