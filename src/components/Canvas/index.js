import { CanvasComp } from "./styles";

export const Canvas = ({ innerRef, idx }) => {
  return <CanvasComp width="800" height="600" ref={innerRef} id={ idx}/>;
};
