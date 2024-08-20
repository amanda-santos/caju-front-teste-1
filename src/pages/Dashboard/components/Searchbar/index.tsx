import { HiRefresh, HiX } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { Button, IconButton } from "~/components/Buttons";
import { TextField } from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import { useQueryClient } from "@tanstack/react-query";
import { removeSpecialCharacters } from "../../../../helpers/removeSpecialCharacters";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SearchFormFields } from "./types/SearchFormFields";
import { SEARCH_FORM_SCHEMA } from "./constants/searchFormSchema";

type SearchBarProps = {
  onSearch: (searchedCpf: string) => void;
};

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState, resetField } =
    useForm<SearchFormFields>({
      resolver: zodResolver(SEARCH_FORM_SCHEMA),
      defaultValues: {
        cpf: "",
      },
    });

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const onSubmit = (data: SearchFormFields) => {
    const inputValue = removeSpecialCharacters(data.cpf);
    onSearch(inputValue);
  };

  const handleClearSearch = () => {
    resetField("cpf");
    onSearch("");
  };

  const handleRefetch = () => {
    queryClient.refetchQueries({
      queryKey: ["registrations"],
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit(onSubmit)(event);
    }
  };

  return (
    <S.Container>
      <S.SearchContainer>
        <TextField
          onKeyDown={handleKeyDown}
          placeholder="Digite um CPF válido"
          mask="999.999.999-99"
          error={formState.errors.cpf?.message}
          {...register("cpf")}
        />
        <IconButton
          aria-label="Limpar busca"
          onClick={handleClearSearch}
          disabled={!formState.isDirty}
        >
          <HiX />
        </IconButton>
      </S.SearchContainer>

      <S.Actions>
        <IconButton aria-label="Recarregar dados" onClick={handleRefetch}>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
