import { useEffect, useRef, useState } from "react";
import { Stack, Box, Alert as Msg } from "@mui/material";
import { Content, Input, Button, Title, Alert, Text } from "./styles";
import { Canvas } from "../../components/Canvas";

import { inp_to_ndc, ndc_to_dc, user_to_ndc } from "../../functions";

export const Home = () => {
  const canvasRef = useRef();
  const [canvasContext, setCanvasContext] = useState(null);
  const [posX, setPosX] = useState();
  const [posY, setPosY] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    setCanvasContext(context);
  }, [canvasRef]);

  const checkError = () => {
    if (isNaN(posX) || isNaN(posY)) {
      return Promise.reject("Informe os valores de X e Y.");
    }
    return Promise.resolve("O pixel foi desenhado na tela.");
  };

  const setPixel = () => {
    // Calcula centro da tela
    const centerX = 800 / 2;
    const centerY = 600 / 2;

    // Colocar pixels
    canvasContext.fillStyle = "red";
    canvasContext.fillRect(posX + centerX, centerY - posY, 1, 1);
  };

  const clear = () => {
    canvasContext.clearRect(0, 0, 800, 600);
    setMessage(null);
  };

  const handleClick = () => {
    checkError()
      .then((msg) => {
        setPixel();
        setMessage({ type: "success", text: msg });
      })
      .catch((error) => setMessage({ type: "error", text: error }));
  };

  return (
    <Content>
      <Canvas innerRef={canvasRef} />
      <Stack direction="column" spacing={2} ml={2}>
        <Title>Desenhar Reta</Title>
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
          <Button onClick={handleClick} variant="outlined">
            Desenhar
          </Button>
          <Button variant="outlined" onClick={clear} style={{ marginLeft: 6 }}>
            Limpar
          </Button>
        </Box>
        {posX && posY && (
          <Stack>
            <Text>
              INP para NDC:{" "}
              {inp_to_ndc([posX, posY])
                .map((p) => p.toFixed(2))
                .join(", ")}
            </Text>
            <Text>User para NDC: {user_to_ndc(posX, posY).join(", ")}</Text>
            <Text>NDC para DC: {ndc_to_dc(posX, posY).join(", ")}</Text>
          </Stack>
        )}
      </Stack>
    </Content>
  );
};
