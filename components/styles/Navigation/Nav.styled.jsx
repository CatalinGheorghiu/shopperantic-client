import styled from 'styled-components';

export const Nav = styled.nav`
  ${({ mobileNavActive }) =>
    mobileNavActive
      ? `
    display: block;
  `
      : `
    display: none;
  `}

  gap: 0.9375rem;
  position: fixed;
  top: 4.375rem;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 4.375rem 1.25rem 1.25rem;
  background-color: #152e21;

  @media screen and (min-width: 768px) {
    display: flex;
    align-items: center;
    position: static;
    padding: 0;
    background-color: #fff;
    color: #171617;
  }
`;
