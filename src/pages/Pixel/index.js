import { useRef, useState } from "react";

// Styled components
import { Content, Alert, Input, Canvas, Button, Title } from "./styles.js";

import { Alert as Msg, Stack } from "@mui/material";

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

  // Início algoritmos
  const LARGURA = 800;
  const ALTURA = 600;

  const INTERVALO_X_NDC = [-1, 1];
  const INTERVALO_Y_NDC = [-1, 1];

  const INTERVALO_X_DC = [0, LARGURA];
  const INTERVALO_Y_DC = [0, ALTURA];

  function to_ndc(ponto, intervalo_x, intervalo_y) {
    let [x, y] = ponto;
    let [xmin, xmax] = intervalo_x;
    let [ymin, ymax] = intervalo_y;
    let [ndcxmin, ndcxmax] = INTERVALO_X_NDC;
    let [ndcymin, ndcymax] = INTERVALO_Y_NDC;

    // fórmula completa para calcular o NDC
    let ndcx = ((x - xmin) * (ndcxmax - ndcxmin)) / (xmax - xmin) + ndcxmin;
    let ndcy = ((y - ymin) * (ndcymax - ndcymin)) / (ymax - ymin) + ndcymin;

    // fórmula reduzida do NDC
    let ndcx_aux = (x - xmin) / (xmax - xmin);
    let ndcy_aux = (y - ymin) / (ymax - ymin);

    return [ndcx, ndcy, ndcx_aux, ndcy_aux];
  }

  function to_coordinates(ponto, intervalo_x, intervalo_y) {
    let [ndcx, ndcy, ndcx_aux, ndcy_aux] = ponto;
    let [xmin, xmax] = intervalo_x;
    let [ymin, ymax] = intervalo_y;
    let [ndh, ndv] = [xmax - xmin, ymax - ymin];

    let dcx = Math.round(ndcx_aux * (ndh - 1));
    let dcy = Math.round(ndcy_aux * (ndv - 1));

    return [dcx, dcy];
  }
  // Fim algoritmos

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
          {to_ndc([posX, posY], INTERVALO_X_DC, INTERVALO_Y_DC).join(", ")}
        </label>
        <label>
          ndc_to_user:{" "}
          {/*to_coordinates([posX, posY], INTERVALO_X_USER, INTERVALO_Y_USER)*/}
        </label>
        <label>
          user_to_ndc:{" "}
          {/*to_ndc([posX, posY], INTERVALO_X_USER, INTERVALO_Y_USER)*/}
        </label>
        <label>
          ndc_to_dc:{" "}
          {to_coordinates([posX, posY], INTERVALO_X_DC, INTERVALO_Y_DC).join(", ")}
        </label>
      </Stack>
    </Content>
  );
};
