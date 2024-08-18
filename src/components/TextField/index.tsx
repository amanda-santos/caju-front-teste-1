import React, { forwardRef } from "react";
import * as S from "./styles";
import ReactInputMask from "react-input-mask";

type TextFieldProps = {
  label?: string;
  error?: string;
  mask?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, mask, ...props }: TextFieldProps, ref) => {
    const inputRef = ref as
      | React.RefObject<HTMLInputElement>
      | React.RefObject<ReactInputMask>
      | null;

    return (
      <div>
        <label htmlFor={props.id}>{label}</label>

        {mask ? (
          <S.InputWithMask
            mask={mask}
            {...props}
            ref={inputRef as React.Ref<ReactInputMask>}
          />
        ) : (
          <S.Input {...props} ref={inputRef as React.Ref<HTMLInputElement>} />
        )}

        <S.ErrorMessage>{error}</S.ErrorMessage>
      </div>
    );
  }
);

TextField.displayName = "TextField";

export { TextField };
