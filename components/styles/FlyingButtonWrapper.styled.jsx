import { ButtonStyle } from '@/components/styles/Button.styled';
import { primaryColor } from '@/lib/colors';
import styled from 'styled-components';

export const FlyingButtonWrapper = styled.div`
  button {
    ${ButtonStyle};
    ${({ main }) =>
      main
        ? `
      background-color: ${primaryColor};
      color:white;
    `
        : `
      background-color: white;
      border: 1px solid ${primaryColor};
      color: ${primaryColor};
    `}
    ${({ white }) =>
      white &&
      `
      background-color: white;
      border: 1px solid white;
      font-weight:500;
      color: #000;
    `}
  }

  @keyframes fly {
    100% {
      top: 0;
      left: 65%;
      opacity: 0;
      display: none;
      max-width: 150px;
      max-height: 150px;
    }
  }

  img {
    display: none;
    max-width: 100px;
    max-height: 100px;
    opacity: 1;
    position: fixed;
    z-index: 5;
    animation: fly 1s;
    border-radius: 10px;
  }
`;
