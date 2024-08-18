import { forwardRef, InputHTMLAttributes } from "react";

import * as S from "./styles";

type TextFieldProps = {
  label?: string;
  error?: string;
  mask?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const TextField = forwardRef(
  ({ label, error, mask, ...props }: TextFieldProps, ref) => {
    return (
      <div>
        <label htmlFor={props.id}>{label}</label>

        {mask ? (
          <S.InputWithMask mask={mask} {...props} ref={ref} />
        ) : (
          <S.Input {...props} ref={ref} />
        )}

        <S.ErrorMessage>{error}</S.ErrorMessage>
      </div>
    );
  }
);
