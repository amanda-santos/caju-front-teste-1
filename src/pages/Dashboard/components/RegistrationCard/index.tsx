import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { Registration, RegistrationStatus } from "~/types/Registration";

type RegistrationCardProps = {
  data: Pick<
    Registration,
    "employeeName" | "email" | "admissionDate" | "status"
  >;
};

export const RegistrationCard = ({
  data: { admissionDate, email, employeeName, status },
}: RegistrationCardProps) => {
  const isRegistrationReviewed =
    status === RegistrationStatus.Approved ||
    status === RegistrationStatus.Reproved;
  const isRegistrationPending = status === RegistrationStatus.Review;

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
        <HiOutlineTrash />
      </S.Actions>
    </S.Card>
  );
};
