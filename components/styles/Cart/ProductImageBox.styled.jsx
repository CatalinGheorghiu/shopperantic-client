import styled from 'styled-components';

export const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-bottom: 10px;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 10px;
  }

  @media screen and (min-width: 768px) {
    width: 160px;
    height: 160px;

    img {
      width: 160px;
      height: 160px;
    }
  }
`;
