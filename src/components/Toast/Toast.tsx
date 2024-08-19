import * as S from "./styles";

export type ToastProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  type: "success" | "error";
  title: string;
  description: string;
};

export const Toast = ({
  isOpen,
  onOpenChange,
  title,
  description,
}: ToastProps) => {
  return (
    <S.ToastRoot
      className="ToastRoot"
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <S.ToastTitle className="ToastTitle">{title}</S.ToastTitle>
      <S.ToastDescription>{description}</S.ToastDescription>
    </S.ToastRoot>
  );
};
