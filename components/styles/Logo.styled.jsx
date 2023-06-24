import Link from 'next/link';
import styled from 'styled-components';

export const Logo = styled(Link)`
  color: #121112;
  text-decoration: none;
  position: relative;
  z-index: 3;

  @media screen and (min-width: 768px) {
    font-size: 1.5rem;
  }
`;
