import { Columns } from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { getRegistrations } from "~/api/getRegistrations";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const DashboardPage = () => {
  const [searchedCpf, setSearchedCpf] = useState("");

  const { data: registrations } = useQuery({
    queryKey: ["registrations", searchedCpf],
    queryFn: () => getRegistrations(searchedCpf),
  });

  const handleSearch = (cpf: string) => {
    setSearchedCpf(cpf);
  };

  return (
    <S.Container>
      <SearchBar onSearch={handleSearch} />
      <Columns registrations={registrations} />
      <S.ToastViewport />
    </S.Container>
  );
};
