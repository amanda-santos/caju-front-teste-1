import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { Registration, RegistrationStatus } from "~/types/Registration";

const allColumns = [
  { status: RegistrationStatus.Review, title: "Pronto para revisar" },
  { status: RegistrationStatus.Approved, title: "Aprovado" },
  { status: RegistrationStatus.Reproved, title: "Reprovado" },
];

type ColumnsProps = {
  registrations?: Registration[];
};

export const Columns = (props: ColumnsProps) => {
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
                        data={registration}
                        key={registration.id}
                      />
                    );
                  })}
              </S.ColumnContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
