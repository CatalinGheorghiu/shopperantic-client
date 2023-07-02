import { ButtonStyle } from '@/components/styles/Button.styled';
import styled from 'styled-components';

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
