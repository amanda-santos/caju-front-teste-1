import { ComponentProps, PropsWithChildren } from "react";
import * as S from "./styles";

type IconButtonProps = PropsWithChildren<ComponentProps<"button">>;

export const IconButton = (props: IconButtonProps) => {
  return <S.IconButton {...props}>{props.children}</S.IconButton>;
};
