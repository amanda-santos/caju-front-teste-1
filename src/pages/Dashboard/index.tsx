import { Columns } from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { getRegistrations } from "~/api/getRegistrations";
import { useQuery } from "@tanstack/react-query";

export const DashboardPage = () => {
  const { data: registrations } = useQuery({
    queryKey: ["registrations"],
    queryFn: getRegistrations,
  });

  return (
    <S.Container>
      <SearchBar />
      <Columns registrations={registrations} />
      <S.ToastViewport />
    </S.Container>
  );
};
