import styled from 'styled-components';

export const Description = styled.p`
  color: var(--green-green-3, #d4ece0);
  font-size: 1rem;
  line-height: 1.5rem;
  letter-spacing: 0.04rem;
  text-align: justify;

  @media screen and (min-width: 768px) {
    font-size: 18px;
    line-height: 28px;
    letter-spacing: 0.72px;
    padding-bottom: 44px;
  }
`;
