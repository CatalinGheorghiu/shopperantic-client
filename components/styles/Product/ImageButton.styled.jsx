import styled from 'styled-components';

export const ImageButton = styled.div`
  border: 2px solid #ccc;
  ${({ active }) =>
    active
      ? `
      border-color: #ccc;
    `
      : `
      border-color: transparent;
    `}
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
`;
