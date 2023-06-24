import styled from 'styled-components';

export const WishlistButton = styled.button`
  border: 0;
  width: 24px;
  height: 24px;
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
  padding: 0;
  background: unset;

  ${({ wished }) =>
    wished
      ? `
    color:red;
  `
      : `
    color: #fff;
  `}
  svg {
    width: 24px;
  }
`;
