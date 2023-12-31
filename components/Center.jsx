import styled from 'styled-components';

const StyledDiv = styled.div`
  max-width: 1064px;
  margin: 0 auto;
  padding: 0 20px;

  @media screen and (min-width: 768px) {
    padding: 0 40px;
  }
`;

export default function Center({ children }) {
  return <StyledDiv>{children}</StyledDiv>;
}
