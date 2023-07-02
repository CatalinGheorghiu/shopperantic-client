import styled from 'styled-components';

export const ProductInfoCell = styled.td`
  padding: 10px 20px 10px 0;
  max-width: 160px;

  span {
    font-weight: 600;
    font-size: 12px;
  }

  button {
    padding: 0 !important;
  }

  @media screen and (min-width: 768px) {
    span {
      font-size: 16px;
    }
  }
`;
