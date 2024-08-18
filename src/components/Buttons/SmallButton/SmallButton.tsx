import styled from "styled-components";

export const SmallButton = styled.button<{
  bgcolor?: string;
  color?: string;
}>`
  font-size: 12px;
  outline: none;
  border-radius: 4px;
  border: none;
  padding: 4px 16px;
  background-color: ${(props) => props.bgcolor ?? "none"};
  color: ${(props) => props.color ?? "#000"};
  cursor: pointer;
`;
