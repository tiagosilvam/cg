import { useEffect, useRef, useState } from "react";
import { Stack, Box, Alert as Msg } from "@mui/material";
import { Content, Input, Button, Title, Alert } from "./styles";
import { Canvas } from "../../components/Canvas";

export const Circunferencia = () => {
  const canvasRef = useRef();
  const [canvasContext, setCanvasContext] = useState(null);
  const [raio, setRaio] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    setCanvasContext(context);
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

  const handleClick = () => {
    checkError()
      .then((msg) => {
        setLines();
        desenharPontoMedio();
        setMessage({ type: "success", text: msg });
      })
      .catch((error) => setMessage({ type: "error", text: error }));
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
    if (isNaN(raio)) {
      return Promise.reject("Informe o raio do círculo.");
    } else if (raio <= 0) {
      return Promise.reject("O raio não pode ser menor ou igual a 0.");
    } else if (raio > 300) {
      return Promise.reject("O raio não pode ser maior que a tela.");
    }
    return Promise.resolve("O círculo foi desenhado.");
  };

  const setPixel = (x, y) => {
    // Calcula centro da tela
    const centerX = 800 / 2;
    const centerY = 600 / 2;

    // Colocar pixels
    canvasContext.fillStyle = "red";
    canvasContext.fillRect(x + centerX, centerY - y, 1, 1);
  };

  const clear = () => {
    canvasContext.clearRect(0, 0, 800, 600);
    canvasContext.beginPath();
    setMessage(null);
  };

  const setLines = () => {
    // Traça os quadrantes
    canvasContext.strokeStyle = "#E9E9E9";
    canvasContext.moveTo(0, 600 / 2);
    canvasContext.lineTo(800, 600 / 2);
    canvasContext.moveTo(800 / 2, 0);
    canvasContext.lineTo(800 / 2, 600);
    canvasContext.stroke();
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
          <Button onClick={handleClick} variant="outlined">
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
