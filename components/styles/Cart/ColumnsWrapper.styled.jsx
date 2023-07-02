import styled from 'styled-components';

export const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin: 40px 0;
  overflow-x: scroll;

  table thead tr th:nth-child(3),
  table tbody tr td:nth-child(3),
  table tbody tr.subtotal td:nth-child(2) {
    text-align: right;
  }

  table tbody tr td div {
    display: flex;
    align-items: center;
  }

  table tbody tr td .product-price {
    font-weight: bold;
  }

  table tr.subtotal td {
    padding: 15px 0;
  }

  table tbody tr.subtotal td:nth-child(2) {
    font-size: 1.4rem;
  }

  tr.total td {
    font-weight: bold;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
