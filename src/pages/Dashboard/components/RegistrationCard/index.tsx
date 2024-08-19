import { SmallButton } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { Registration, RegistrationStatus } from "~/types/Registration";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRegistration } from "~/api/deleteRegistration";
import { updateRegistration } from "~/api/updateRegistration";
import { formatDate } from "./helpers/formatDate";
import { Dialog } from "~/components/Dialog";
import { ToastProps } from "~/components/Toast";

type RegistrationCardProps = {
  registration: Registration;
  onShowToast: (
    toastProps: Pick<ToastProps, "title" | "description" | "type">
  ) => void;
};

export const RegistrationCard = ({
  registration,
  onShowToast,
}: RegistrationCardProps) => {
  const isRegistrationReviewed =
    registration.status === RegistrationStatus.Approved ||
    registration.status === RegistrationStatus.Reproved;
  const isRegistrationPending =
    registration.status === RegistrationStatus.Review;

  const queryClient = useQueryClient();

  const { mutate: onUpdateRegistration } = useMutation({
    mutationFn: updateRegistration,
    onSuccess: () => {
      onShowToast({
        title: "Registro atualizado com sucesso",
        description: "O registro foi atualizado com sucesso",
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
    },
    onError: () =>
      onShowToast({
        title: "Erro ao atualizar o registro",
        description: "Por favor, tente novamente",
        type: "error",
      }),
  });

  const { mutate: onDeleteRegistration } = useMutation({
    mutationFn: deleteRegistration,
    onSuccess: () => {
      onShowToast({
        title: "Registro excluído com sucesso",
        description: "O registro foi excluído com sucesso",
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
    },
    onError: () =>
      onShowToast({
        title: "Erro ao excluir o registro",
        description: "Por favor, tente novamente",
        type: "error",
      }),
  });

  const handleUpdateRegistrationStatus = (newStatus: RegistrationStatus) => {
    onUpdateRegistration({ ...registration, status: newStatus });
  };

  const handleDeleteRegistration = () => {
    onDeleteRegistration(registration.id);
  };

  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{registration.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{registration.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{formatDate(registration.admissionDate)}</span>
      </S.IconAndText>
      <S.Actions>
        {isRegistrationPending && (
          <>
            <Dialog
              title="Reprovar registro"
              description="Tem certeza de que deseja reprovar este registro?"
              submitLabel="Reprovar"
              onSubmit={() =>
                handleUpdateRegistrationStatus(RegistrationStatus.Reproved)
              }
            >
              <SmallButton bgcolor="rgb(255, 145, 154)">Reprovar</SmallButton>
            </Dialog>

            <Dialog
              title="Aprovar registro"
              description="Tem certeza de que deseja aprovar este registro?"
              submitLabel="Aprovar"
              onSubmit={() =>
                handleUpdateRegistrationStatus(RegistrationStatus.Approved)
              }
            >
              <SmallButton bgcolor="rgb(155, 229, 155)">Aprovar</SmallButton>
            </Dialog>
          </>
        )}

        {isRegistrationReviewed && (
          <Dialog
            title="Revisar registro novamente"
            description="Tem certeza de que deseja revisar este registro novamente?"
            submitLabel="Revisar novamente"
            onSubmit={() =>
              handleUpdateRegistrationStatus(RegistrationStatus.Review)
            }
          >
            <SmallButton bgcolor="#ff8858">Revisar novamente</SmallButton>
          </Dialog>
        )}

        <Dialog
          title="Deletar registro"
          description="Tem certeza de que deseja deletar este registro?"
          submitLabel="Deletar"
          onSubmit={handleDeleteRegistration}
        >
          <S.DeleteButton type="button">
            <HiOutlineTrash />
          </S.DeleteButton>
        </Dialog>
      </S.Actions>
    </S.Card>
  );
};
