import styled from "styled-components";

export const IconButton = styled.button`
  cursor: pointer;
  border: 2px solid #64a98c;
  width: fit-content;
  padding: 4px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  svg {
    color: #64a98c;
  }

  &:disabled {
    cursor: not-allowed;
    border: 2px solid #ccc;

    svg {
      color: #ccc;
    }
  }
`;
