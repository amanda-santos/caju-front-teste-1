import { SmallButton } from "~/components/Buttons";
import * as S from "./styles";
import * as RadixDialog from "@radix-ui/react-dialog";
import { PropsWithChildren } from "react";

type DialogProps = PropsWithChildren<{
  title: string;
  description: string;
  submitLabel: string;
  onSubmit: () => void;
}>;

export const Dialog = ({
  title,
  description,
  submitLabel,
  onSubmit,
  children,
}: DialogProps) => {
  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger asChild>{children}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <S.DialogOverlay />

        <S.DialogContent>
          <S.DialogTitle>{title}</S.DialogTitle>
          <RadixDialog.Description>{description}</RadixDialog.Description>

          <S.DialogFooter>
            <RadixDialog.Close asChild>
              <SmallButton>Cancelar</SmallButton>
            </RadixDialog.Close>
            <RadixDialog.Close asChild>
              <SmallButton bgcolor="#ff8858" onClick={onSubmit}>
                {submitLabel}
              </SmallButton>
            </RadixDialog.Close>
          </S.DialogFooter>
        </S.DialogContent>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
