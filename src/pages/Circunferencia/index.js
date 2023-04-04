import { useEffect, useRef, useState } from "react";
import { Stack, Box, Alert as Msg } from "@mui/material";
import { Content, Input, Button, Title, Alert } from "./styles";
import { Canvas } from "../../components/Canvas";

export const Circunferencia = () => {
  const canvasRef = useRef();
  const [context, setContext] = useState(null);
  const [raio, setRaio] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    setContext(context);
  }, [canvasRef]);

  const desenharPontoMedio = () => {
    let y = raio;
    let d;
    if (y % 2 === 0) {
      d = 1 - raio;
    } else {
      d = 5 / 4 - raio;
    }
    let x = 0;
    pontoCirculo(x, y);
    while (y > x) {
      if (d < 0) {
        d += 2.0 * x + 3.0;
      } else {
        d += 2.0 * (x - y) + 5;
        y--;
      }
      x++;
      pontoCirculo(x, y);
    }
  };

  const pontoCirculo = (x, y) => {
    setPixel(x, y);
    setPixel(y, x);
    setPixel(y, -x);
    setPixel(x, -y);
    setPixel(-x, -y);
    setPixel(-y, -x);
    setPixel(-y, x);
    setPixel(-x, y);
  };

  const checkError = () => {
    if (!raio || raio < 1) {
      setMessage({
        type: "error",
        text: "Informe o valor do raio.",
      });
      return false;
    } else if (raio < 1) {
      setMessage({
        type: "error",
        text: "O raio não pode ser menor que 0.",
      });
      return false;
    } else if (raio > 300) {
      setMessage({
        type: "error",
        text: "O raio não pode ser maior que 300.",
      });
      return false;
    }
    setLines();
    return true;
  };

  //
  const setPixel = (x, y) => {
    if (checkError()) {
      // Calcula centro da tela
      const centerX = 800 / 2;
      const centerY = 600 / 2;

      // Colocar pixels
      context.fillStyle = "red";
      context.fillRect(x + centerX, centerY - y, 1, 1);
      setMessage({
        type: "success",
        text: "O círculo foi desenhado pelo algoritmo de Ponto Médio.",
      });
    }
  };

  const clear = () => {
    context.clearRect(0, 0, 800, 600);
    setMessage(null);
  };

  const setLines = () => {
    // Traça os quadrantes
    context.strokeStyle = "#E9E9E9";
    context.moveTo(0, 600 / 2);
    context.lineTo(800, 600 / 2);
    context.moveTo(800 / 2, 0);
    context.lineTo(800 / 2, 600);
    context.stroke();
  };

  return (
    <Content>
      <Canvas innerRef={canvasRef} />
      <Stack direction="column" spacing={2} ml={2}>
        <Title>Desenhar Circunferencia</Title>
        <Alert>
          {message && <Msg severity={message.type}>{message.text}</Msg>}
        </Alert>
        <Box>
          <Input
            label="Raio"
            size="small"
            onChange={(e) => setRaio(parseFloat(e.target.value))}
          />
        </Box>
        <Box>
          <Button onClick={desenharPontoMedio} variant="outlined">
            Desenhar
          </Button>
          <Button variant="outlined" onClick={clear} style={{ marginLeft: 6 }}>
            Limpar
          </Button>
        </Box>
      </Stack>
    </Content>
  );
};
