import styled from 'styled-components';
import { ButtonStyle } from '@/components/styles/Button.styled';

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
