import { primaryColor } from '@/lib/colors';
import { css } from 'styled-components';

export const ButtonStyle = css`
  border: 0;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 0.9375rem;
  gap: 0.25rem;
  border-radius: 100px;

  &:disabled {
    background-color: #cacaca;
    cursor: not-allowed;
  }

  svg {
    height: 16px;
    margin-right: 5px;
  }

  ${({ block }) =>
    block &&
    css`
      display: block;
      width: 100%;
    `}
  ${({ white, outline }) =>
    white &&
    !outline &&
    css`
      background-color: #fff;
      color: #000;
    `}
  ${({ white, outline }) =>
    white &&
    outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
    `}
  ${({ black, outline }) =>
    black &&
    !outline &&
    css`
      background-color: #000;
      color: #fff;
    `}
  ${({ black, outline }) =>
    black &&
    outline &&
    css`
      background-color: transparent;
      color: #000;
      border: 1px solid #000;
    `}
  ${({ primary, outline }) =>
    primary &&
    !outline &&
    css`
      background-color: ${primaryColor};
      border: 1px solid #61d525;
      color: #fff;
    `}
  ${({ primary, outline }) =>
    primary &&
    outline &&
    css`
      background-color: transparent;
      border: 1px solid ${primaryColor};
      color: ${primaryColor};
    `}
  ${({ size }) =>
    size === 'l' &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;

      svg {
        height: 20px;
      }
    `}
`;
