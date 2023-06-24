import styled from 'styled-components';

const StyledArea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  margin-bottom: 16px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

export default function Textarea(props) {
  return <StyledArea {...props} />;
}
