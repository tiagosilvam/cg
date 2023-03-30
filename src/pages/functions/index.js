// tamanho da tela
const LARGURA = 1920;
const ALTURA = 1080;

// intervalo de entrada
const INTERVALO_X_INPUT = [-parseInt(LARGURA / 2), parseInt(LARGURA / 2)];
const INTERVALO_Y_INPUT = [-parseInt(ALTURA / 2), parseInt(ALTURA / 2)];

// intervalo NDC: [-1, 1] para X e Y
const INTERVALO_X_NDC = [-1, 1];
const INTERVALO_Y_NDC = [-1, 1];

const INTERVALO_X_USER = [0, 50];
const INTERVALO_Y_USER = [0, 50];

function to_ndc(ponto, intervalo_x, intervalo_y) {
    let [x, y] = ponto;
    let [xmin, xmax] = intervalo_x;
    let [ymin, ymax] = intervalo_y;
    let [ndcxmin, ndcxmax] = INTERVALO_X_NDC;
    let [ndcymin, ndcymax] = INTERVALO_Y_NDC;

    // fórmula completa para calcular o NDC
    let ndcx = ((x - xmin) * (ndcxmax - ndcxmin)) / (xmax - xmin) + ndcxmin;
    let ndcy = ((y - ymin) * (ndcymax - ndcymin)) / (ymax - ymin) + ndcymin;

    return [ndcx, ndcy];
}

export function inp_to_ndc(ponto) {
    return to_ndc(ponto, INTERVALO_X_INPUT, INTERVALO_Y_INPUT);
}

export function ndc_to_user(ponto) {
    return to_coordinates(ponto, INTERVALO_X_USER, INTERVALO_Y_USER);
}

function to_coordinates(ponto, intervalo_x, intervalo_y) {
  let [ndcx, ndcy] = ponto;
  let [xmin, xmax] = intervalo_x;
  let [ymin, ymax] = intervalo_y;
  let [ndh, ndv] = [xmax - xmin, ymax - ymin];

  let dcx = Math.round(ndcx * (ndh - 1));
  let dcy = Math.round(ndcy * (ndv - 1));
  
  return [dcx, dcy];
}

export function ndc_to_dc(userX, userY) {
  // Calculando NDCX e NDCY para usar em sequência
  const [NDCX, NDCY] = user_to_ndc(userX, userY);

  // Calculando DCX e DCY
  const DCX = Math.round(NDCX * (LARGURA - 1))
  const DCY = Math.round(NDCY * (LARGURA - 1))

  return [DCX, DCY]
}

export function user_to_ndc(userX, userY) {
  // Definindo Máximos e Mínimos
  const [minX, maxX] = INTERVALO_X_USER;
  const [minY, maxY] = INTERVALO_Y_USER;

  // Calcula a variação de largura e altura da caixa delimitadora em coordenadas de usuário
  const userWidth = maxX - minX;
  const userHeight = maxY - minY;

  // Converte as coordenadas de usuário para NDC
  const ndcX = (userX - minX) / userWidth;
  const ndcY = (userY - minY) / userHeight;

  return [ndcX, ndcY];
}
