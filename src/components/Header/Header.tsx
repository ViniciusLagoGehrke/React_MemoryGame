import React from "react";
import styled from "styled-components";

export interface HeaderProps {
  isWinner: boolean;
  gridSize: number;
  onClick: (event: React.MouseEvent<HTMLSpanElement>) => void;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

const StyledHeader = styled.header`
  min-width: 35rem;
  min-height: 14rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding-left: 2.5rem;
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
    width: 2rem;
    padding: 0 12px;
    vertical-align: top;
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    outline: none;
    border: 1px solid #ccc;
    height: 2.5rem;
    user-select: none;
  }

  span {
    border: 1px solid #ccc;
    height: 2.5rem;
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

  span:first-of-type {
    border-right: none;
    border-radius: 4px 0 0 4px;
  }

  span:last-of-type {
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
      {isWinner ? <h2>Congratulations!!!</h2> : <br></br>}
      <div>
        <label htmlFor="grid-size">Grid Size:</label>

        <span data-shouldincrement={false} onClick={onClick}>
          –
        </span>
        <input
          id="grid-size"
          type="text"
          placeholder="Choose Grid Size"
          min="2"
          max="10"
          value={gridSize}
          onChange={onChange}
        ></input>
        <span data-shouldincrement={true} onClick={onClick}>
          +
        </span>
      </div>
    </StyledHeader>
  );
}
