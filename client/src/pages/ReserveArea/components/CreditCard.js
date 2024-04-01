import React from "react";
import styled from "@emotion/styled";

const Container = styled.section`
  //   border: 1px solid red;
  margin: 1rem 0;
  padding: 0.75rem 0.5rem;

  .card-number {
    display: flex;
    flex-direction: column;

    label {
      padding: 0.5rem 0;
      font-size: 1.25rem;

      &::before {
        content: "*";
        color: red;
      }
    }

    input {
      border: 1px solid black;
      width: 80%;
      padding: 0.25rem 0.5rem;
      margin-left: 0.5rem;
    }
  }

  .date_check {
    display: flex;
    margin: 1rem 0;

    .card-date {
      display: flex;
      flex-direction: column;

      label {
        padding: 0.5rem 0;
        font-size: 1.25rem;

        &::before {
          content: "*";
          color: red;
        }
      }

      input {
        border: 1px solid black;
        width: 30%;
        padding: 0.25rem 0.5rem;
        margin-left: 0.5rem;
      }
    }

    .card-check {
      display: flex;
      flex-direction: column;

      label {
        padding: 0.5rem 0;
        font-size: 1.25rem;

        &::before {
          content: "*";
          color: red;
        }
      }

      input {
        border: 1px solid black;
        width: 50%;
        padding: 0.25rem 0.5rem;
        margin-left: 0.75rem;
      }
    }
  }
`;

const CreditCard = () => {
  return (
    <Container>
      <div className="card-number">
        <label htmlFor="">信用卡卡號</label>
        <input type="text" placeholder="0000 0000 0000 0000" />
      </div>
      <div className="date_check">
        <div className="card-date">
          <label htmlFor="">信用卡有效月年</label>
          <span>
            <input type="text" placeholder="月份" />
            <input type="text" placeholder="年份" />
          </span>
        </div>
        <div className="card-check">
          <label htmlFor="">信用卡檢查碼</label>
          <input type="text" placeholder="123" />
        </div>
      </div>
    </Container>
  );
};

export default CreditCard;
