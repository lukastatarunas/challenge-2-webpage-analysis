import styled from "styled-components";
import { css } from "@emotion/core";

export const AppContainer = styled.div``;

export const FlexboxContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Input = styled.input`
  margin-top: 300px;
  padding: 20px;
  width: 1000px;
  cursor: pointer;
  font-size: 20px;
`;

export const Button = styled.button`
  margin: 100px 10px 0px 10px;
  cursor: pointer;
  padding: 20px;
  font-size: 15px;
`;

export const List = styled.ul``;

export const ListItem = styled.li`
  list-style: none;
`;

export const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
