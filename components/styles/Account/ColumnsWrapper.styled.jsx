import styled from 'styled-components';

export const ColsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0;

  p {
    margin: 5px;
  }

  .col-left {
    max-height: 320px;
    overflow-y: scroll;
  }

  .address-form {
    max-width: 425px;

    .input-wrapper {
      margin-bottom: 10px;
    }

    input {
      margin-bottom: 0;
    }

    small {
      color: tomato;
      font-size: 12px;
      display: inline-block;
      padding-top: 6px;
    }
  }

  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;

    .col-left {
      max-height: 500px;
    }
  }
`;
