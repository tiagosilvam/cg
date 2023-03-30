import { useRef, useState } from "react";

// Styled components
import { Content, Alert, Input, Canvas, Button, Title } from "./styles.js";

import { Alert as Msg, Stack } from "@mui/material";
import { inp_to_ndc, ndc_to_dc, ndc_to_user, user_to_ndc } from '../functions'

export const Pixel = () => {
  const [posX, setPosX] = useState();
  const [posY, setPosY] = useState();
  const [error, setError] = useState();
  const canvasRef = useRef();

  const setPixel = () => {
    if (
      !posX ||
      !posY ||
      posX > 400 ||
      posY > 300 ||
      posX < -400 ||
      posY < -300 ||
      isNaN(posX) ||
      isNaN(posY)
    ) {
      setError("Os pixels não foram informados corretamente.");
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Calcula centro da tela
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Colocar pixel
    //context.clearRect(0, 0, 800, 600);
    setLines(context);
    context.fillStyle = "red";
    context.fillRect(
      parseFloat(posX) + centerX,
      centerY - parseFloat(posY),
      1,
      1
    );
    setError(null);
    // Testes
    console.log(`${(posX * 2) / 800 - 1}, ${(posY * 2) / 600 - 1}`);
    console.log(
      `${((posX - 0) * (1 - -1)) / (800 - 0) + -1}, ${
        ((posY - 0) * (1 - -1)) / (600 - 0) + -1
      }`
    );
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
        <Title>Desenhar Pixel</Title>
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
        <Button name="Test" onClick={setPixel} variant="outlined">
          Desenhar
        </Button>
        <label>
          inp_to_ndc:{" "}
          {inp_to_ndc([posX, posY]).join(", ")}
        </label>
        <label>
          ndc_to_user:{" "}
          {ndc_to_user([posX, posY]).join(", ")}
        </label>
        <label>
          user_to_ndc:{" "}
          {user_to_ndc(posX, posY).join(", ")}
        </label>
        <label>
          ndc_to_dc:{" "}
          {ndc_to_dc(posX, posY).join(", ")}
        </label>
      </Stack>
    </Content>
  );
};
