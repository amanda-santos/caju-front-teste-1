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

type RegistrationCardProps = {
  data: Registration;
};

export const RegistrationCard = ({
  data: { admissionDate, email, employeeName, status, id },
}: RegistrationCardProps) => {
  const isRegistrationReviewed =
    status === RegistrationStatus.Approved ||
    status === RegistrationStatus.Reproved;
  const isRegistrationPending = status === RegistrationStatus.Review;

  const queryClient = useQueryClient();

  const { mutate: onDeleteRegistration } = useMutation({
    mutationFn: deleteRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
    },
  });

  const handleDeleteRegistration = () => {
    onDeleteRegistration(id);
  };

  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {isRegistrationPending && (
          <>
            <ButtonSmall bgcolor="rgb(255, 145, 154)">Reprovar</ButtonSmall>
            <ButtonSmall bgcolor="rgb(155, 229, 155)">Aprovar</ButtonSmall>
          </>
        )}
        {isRegistrationReviewed && (
          <ButtonSmall bgcolor="#ff8858">Revisar novamente</ButtonSmall>
        )}
        <S.DeleteButton type="button" onClick={handleDeleteRegistration}>
          <HiOutlineTrash />
        </S.DeleteButton>
      </S.Actions>
    </S.Card>
  );
};
