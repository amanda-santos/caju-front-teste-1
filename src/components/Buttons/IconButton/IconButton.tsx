import { HTMLAttributes, PropsWithChildren } from "react";
import * as S from "./styles";

type IconButtonProps = PropsWithChildren<HTMLAttributes<HTMLButtonElement>>;

export const IconButton = (props: IconButtonProps) => {
  return <S.IconButton {...props}>{props.children}</S.IconButton>;
};
