import { ButtonSmall } from "~/components/Buttons";
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

type RegistrationCardProps = {
  registration: Registration;
};

export const RegistrationCard = ({ registration }: RegistrationCardProps) => {
  const isRegistrationReviewed =
    registration.status === RegistrationStatus.Approved ||
    registration.status === RegistrationStatus.Reproved;
  const isRegistrationPending =
    registration.status === RegistrationStatus.Review;

  const queryClient = useQueryClient();

  const { mutate: onUpdateRegistration } = useMutation({
    mutationFn: updateRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
    },
  });

  const { mutate: onDeleteRegistration } = useMutation({
    mutationFn: deleteRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
    },
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
        <span>{registration.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {isRegistrationPending && (
          <>
            <ButtonSmall
              bgcolor="rgb(255, 145, 154)"
              onClick={() =>
                handleUpdateRegistrationStatus(RegistrationStatus.Reproved)
              }
            >
              Reprovar
            </ButtonSmall>
            <ButtonSmall
              bgcolor="rgb(155, 229, 155)"
              onClick={() =>
                handleUpdateRegistrationStatus(RegistrationStatus.Approved)
              }
            >
              Aprovar
            </ButtonSmall>
          </>
        )}
        {isRegistrationReviewed && (
          <ButtonSmall
            bgcolor="#ff8858"
            onClick={() =>
              handleUpdateRegistrationStatus(RegistrationStatus.Review)
            }
          >
            Revisar novamente
          </ButtonSmall>
        )}
        <S.DeleteButton type="button" onClick={handleDeleteRegistration}>
          <HiOutlineTrash />
        </S.DeleteButton>
      </S.Actions>
    </S.Card>
  );
};
