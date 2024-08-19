import * as S from "./styles";
import { RegistrationCard } from "../RegistrationCard";
import { Registration, RegistrationStatus } from "~/types/Registration";
import { useState } from "react";
import { Toast, ToastProps } from "~/components/Toast";

const allColumns = [
  { status: RegistrationStatus.Review, title: "Pronto para revisar" },
  { status: RegistrationStatus.Approved, title: "Aprovado" },
  { status: RegistrationStatus.Reproved, title: "Reprovado" },
];

type ColumnsProps = {
  registrations?: Registration[];
};

export const Columns = (props: ColumnsProps) => {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastProps, setToastProps] = useState<
    Pick<ToastProps, "title" | "description" | "type">
  >({
    title: "",
    description: "",
    type: "success",
  });

  const handleShowToast = (
    toastProps: Pick<ToastProps, "title" | "description" | "type">
  ) => {
    setIsToastOpen(true);
    setToastProps(toastProps);
  };

  return (
    <S.Container>
      {allColumns.map((column) => {
        return (
          <S.Column status={column.status} key={column.title}>
            <>
              <S.TitleColumn status={column.status}>
                {column.title}
              </S.TitleColumn>
              <S.ColumnContent>
                {props?.registrations
                  ?.filter(
                    (registration) => registration.status === column.status
                  )
                  .map((registration) => {
                    return (
                      <RegistrationCard
                        registration={registration}
                        key={registration.id}
                        onShowToast={handleShowToast}
                      />
                    );
                  })}
              </S.ColumnContent>
            </>
          </S.Column>
        );
      })}

      <Toast
        isOpen={isToastOpen}
        onOpenChange={setIsToastOpen}
        {...toastProps}
      />
    </S.Container>
  );
};
