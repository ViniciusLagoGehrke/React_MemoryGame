import React from "react";
import styled from "styled-components";

interface HeaderProps {
  isWinner: boolean;
  gridSize: number;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

const StyledHeader = styled.header`
  min-height: 14rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 3rem;
  color: white;
  font-size: 2rem;

  div {
    display: flex;
    align-items: center;
  }

  label {
    margin-right: 2rem;
  }

  input {
    width: 80px;
    padding: 0 12px;
    vertical-align: top;
    text-align: center;
    outline: none;
    border: 1px solid #ccc;
    height: 40px;
    user-select: none;
  }

  button {
    border: 1px solid #ccc;
    height: 40px;
    user-select: none;
    display: inline-block;
    width: 30px;
    line-height: 38px;
    background: #f1f1f1;
    color: #444;
    text-align: center;
    font-weight: bold;
    cursor: pointer;

    &:active {
      background: #ddd;
    }
  }

  button:first-of-type {
    border-right: none;
    border-radius: 4px 0 0 4px;
  }

  button:last-of-type {
    border-left: none;
    border-radius: 0 4px 4px 0;
  }
`;

export default function Header({
  isWinner,
  gridSize,
  onClick,
  onChange,
}: HeaderProps) {
  return (
    <StyledHeader>
      {isWinner ? <h1>Congratulations!!!</h1> : <br></br>}
      <div>
        <label htmlFor="grid-size">Grid Size:</label>

        <button data-shouldincrement={false} onClick={onClick}>
          –
        </button>
        <input
          id="grid-size"
          type="text"
          placeholder="Choose Grid Size"
          min="2"
          max="10"
          value={gridSize}
          onChange={onChange}
        ></input>
        <button data-shouldincrement={true} onClick={onClick}>
          +
        </button>
      </div>
    </StyledHeader>
  );
}
