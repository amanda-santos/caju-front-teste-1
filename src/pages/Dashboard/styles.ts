import styled from "styled-components";
import * as Toast from "@radix-ui/react-toast";

export const Container = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

export const ToastViewport = styled(Toast.Viewport)`
  --viewport-padding: 25px;
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: var(--viewport-padding);
  gap: 10px;
  width: 390px;
  max-width: 100vw;
  margin: 0;
  list-style: none;
  z-index: 2147483647;
  outline: none;
`;
