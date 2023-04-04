import { useEffect, useRef, useState } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Box,
  Alert as Msg,
} from "@mui/material";
import { Content, Input, Button, Title, Alert } from "./styles";
import { Canvas } from "../../components/Canvas";

export const Reta = () => {
  const canvasRef = useRef();
  const [canvasContext, setCanvasContext] = useState(null);
  const [posX, setPosX] = useState();
  const [posY, setPosY] = useState();
  const [posX2, setPosX2] = useState();
  const [posY2, setPosY2] = useState();
  const [message, setMessage] = useState();
  const [value, setValue] = useState("DDA");
  const pontos = [];

  useEffect(() => {
    const canvas = canvasRef.current;

    const context = canvas.getContext("2d");
    setCanvasContext(context);
  }, [canvasRef]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const getRetaPontoMedio = () => {
    let x0 = posX,
      y0 = posY,
      xEnd = posX2,
      yEnd = posY2;
    let dx = Math.abs(xEnd - x0),
      dy = Math.abs(yEnd - y0);
    let p = 2 * dy - dx;
    let twoDy = 2 * dy,
      twoDyMinusDx = 2 * (dy - dx);
    let x, y;

    if (x0 > xEnd) {
      x = xEnd;
      y = yEnd;
      xEnd = x0;
    } else {
      x = x0;
      y = y0;
    }
    setPixel(x, y);
    while (x < xEnd) {
      x++;
      if (p < 0) p += twoDy;
      else {
        y++;
        p += twoDyMinusDx;
      }
      setPixel(x, y);
    }
  };

  const desenharRetaDDA = () => {
    let x0 = posX,
      y0 = posY,
      xEnd = posX2,
      yEnd = posY2;
    let dx = xEnd - x0,
      dy = yEnd - y0,
      steps,
      k;

    let xIncrement,
      yIncrement,
      x = x0,
      y = y0;

    if (Math.abs(dx) > Math.abs(dy)) {
      steps = Math.abs(dx);
    } else {
      steps = Math.abs(dy);
    }
    xIncrement = dx / steps;
    yIncrement = dy / steps;
    setPixel(Math.round(x), Math.round(y));
    for (k = 0; k < steps; k++) {
      x += xIncrement;
      y += yIncrement;
      setPixel(Math.round(x), Math.round(y));
    }
    console.log(pontos);
  };

  const checkError = () => {
    if (isNaN(posX) || isNaN(posX2) || isNaN(posY) || isNaN(posY2)) {
      return Promise.reject("Informe todos os valores de X e Y.");
    } else if (
      posX > 400 ||
      posX2 > 400 ||
      posY > 300 ||
      posY2 > 300 ||
      posX < -400 ||
      posX2 < -400 ||
      posY < -300 ||
      posY2 < -300
    ) {
      return Promise.reject("Existem valores ultrapasando o limite da tela.");
    }
    return Promise.resolve(
      `A reta foi desenhada usando o algorítmo de ${value}.`
    );
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

  const handleClick = () => {
    checkError()
      .then((msg) => {
        setLines();
        value === "DDA" ? desenharRetaDDA() : getRetaPontoMedio();
        setMessage({ type: "success", text: msg });
      })
      .catch((error) => setMessage({ type: "error", text: error }));
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
        <Title>Desenhar Reta</Title>
        <FormControl>
          <FormLabel>Selecione o algoritmo: </FormLabel>
          <RadioGroup
            row
            defaultValue="DDA"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel control={<Radio />} label="DDA" value="DDA" />
            <FormControlLabel
              control={<Radio />}
              label="Ponto-Médio"
              value="Ponto Médio"
            />
          </RadioGroup>
        </FormControl>
        <Alert>
          {message && <Msg severity={message.type}>{message.text}</Msg>}
        </Alert>
        <Box>
          <Input
            label="Valor da coordenada X"
            size="small"
            onChange={(e) => setPosX(parseFloat(e.target.value))}
          />
          <Input
            style={{ marginLeft: 6 }}
            label="Valor da coordenada Y"
            size="small"
            onChange={(e) => setPosY(parseFloat(e.target.value))}
          />
        </Box>
        <Box>
          <Input
            label="Valor da coordenada X2"
            size="small"
            onChange={(e) => setPosX2(parseFloat(e.target.value))}
          />
          <Input
            style={{ marginLeft: 6 }}
            label="Valor da coordenada Y2"
            size="small"
            onChange={(e) => setPosY2(parseFloat(e.target.value))}
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
