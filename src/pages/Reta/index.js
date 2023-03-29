import { useRef, useState } from "react";

// Styled components
import {
  Content,
  Alert,
  Input,
  Canvas,
  Button,
  Title,
} from "./styles.js";

import { Alert as Msg, Stack } from "@mui/material";

export const Reta = () => {
  const [posX, setPosX] = useState();
  const [posY, setPosY] = useState();
  const [posX2, setPosX2] = useState();
  const [posY2, setPosY2] = useState();
  const [error, setError] = useState();
  const canvasRef = useRef();

  const desenharReta = () => {
    /* 
    // Algoritmo normal
    let dx = posX2 - posX;
    let dy = posY2 - posY;
    let p = 2 * dy - dx;
    let twoDy = 2 * dy;
    let twoDyMinusDx = 2 * (dy - dx);
    let x, y;

    if (posX > posX2) {
      x = posX2;
      y = posY2;
      setPosX2(posX);
    } else {
      x = posX;
      y = posY;
    }
    setPixel(x, y);
    while (x < posX2) {
      x++;
      if (p < 0) {
        p += twoDy;
      } else {
        y++;
        p += twoDyMinusDx;
      }
      setPixel(x, y);
    }
    */

    // Algoritmo ponto médio
    let dx = posX2 - posX;
    let dy = posY2 - posY;
    let d = 2 * dy - dx;

    let incE = 2 * dy;
    let incNE = 2 * (dy - dx);

    let x = posX;
    let y = posY;
    setPixel(x, y);

    while (x < posX2) {
      if (d <= 0) {
        d = d + incE;
        x++;
      } else {
        d = d + incNE;
        x++;
        y++;
      }
      setPixel(x, y);
    }
  };

  const setPixel = (x, y) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Calcula centro da tela
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Colocar pixel
    //context.clearRect(0, 0, 800, 600);
    setLines(context);
    context.fillStyle = "red";
    context.fillRect(x + centerX, centerY - y, 1, 1);
    setError(null);
  };

  const setLines = (ctx) => {
    // Traça os quadrantes
    ctx.strokeStyle = "#E9E9E9";
    ctx.moveTo(0, 600 / 2);
    ctx.lineTo(800, 600 / 2);
    ctx.moveTo(800 / 2, 0);
    ctx.lineTo(800 / 2, 600);
    ctx.stroke();
  };

  return (
    <Content>
      <Canvas width="800" height="600" ref={canvasRef} />
      <Stack direction="column" spacing={1} ml={2}>
        <Title>Desenhar Reta</Title>
        <Alert>{error && <Msg severity="error">{error}</Msg>}</Alert>
        <Input
          label="Valor da coordenada X"
          size="small"
          onChange={(e) => setPosX(e.target.value)}
        />
        <Input
          label="Valor da coordenada Y"
          size="small"
          onChange={(e) => setPosY(e.target.value)}
        />
        <Input
          label="Valor da coordenada X2"
          size="small"
          onChange={(e) => setPosX2(e.target.value)}
        />
        <Input
          label="Valor da coordenada Y2"
          size="small"
          onChange={(e) => setPosY2(e.target.value)}
        />
        <Button
          name="Test"
          onClick={desenharReta}
          variant="outlined"
          title="Test"
        >
          Desenhar
        </Button>
      </Stack>
    </Content>
  );
};
