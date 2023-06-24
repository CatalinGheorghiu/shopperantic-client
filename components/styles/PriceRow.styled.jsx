import styled from 'styled-components';

export const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.25rem;

  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
`;
