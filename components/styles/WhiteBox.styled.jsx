import Link from 'next/link';
import styled from 'styled-components';

export const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;

  img {
    max-width: 100%;
    max-height: 80px;
  }
`;
