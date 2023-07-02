import styled from 'styled-components';

export const ColumnsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;

  @media screen and (min-width: 768px) {
    justify-content: space-around;
  }
`;
