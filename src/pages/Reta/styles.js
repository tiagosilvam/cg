import styled from "styled-components";
import { TextField, Button as Btn } from "@mui/material";

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 70px;
  width: 88vw;
`;

export const Input = styled(TextField)`
  width: 200px;
`;

export const Alert = styled.div`
  height: 50px;
`;

export const Canvas = styled.canvas`
  background-color: #000000;
`;

export const Button = styled(Btn)`
  width: 100px;
`;

export const Title = styled.h1`
  margin: 0;
`;
