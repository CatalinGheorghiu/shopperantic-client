import styled from 'styled-components';

export const Price = styled.div`
  color: var(--black-black-2, #171617);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.56px;
  padding: 10px 0;

  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: left;
  }
`;
