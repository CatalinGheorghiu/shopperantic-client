import Link from 'next/link';
import styled from 'styled-components';

export const NavLink = styled(Link)`
  display: block;
  color: #fff;
  min-width: 30px;
  padding: 10px 0;
  font-weight: 700;
  text-decoration: none;

  svg {
    height: 20px;
  }

  @media screen and (min-width: 768px) {
    padding: 0;
    color: #171617;
  }
`;
