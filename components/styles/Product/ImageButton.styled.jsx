import { primaryColor } from '@/lib/colors';
import styled from 'styled-components';

export const ImageButton = styled.div`
  border: 2px solid ${primaryColor};
  width: 160px !important;
  height: 160px !important;

  ${({ active }) =>
    active
      ? `
      border-color: ${primaryColor};
    `
      : `
      border-color: transparent;
    `}
  cursor: pointer;
  border-radius: 5px;

  img {
    width: 160px !important;
    height: 160px !important;
    border-radius: 3px;
  }
`;
