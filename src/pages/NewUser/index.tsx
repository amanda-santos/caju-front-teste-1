import { TextField } from "~/components/TextField";
import * as S from "./styles";
import Button from "~/components/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRegistration } from "~/api/createRegistration";
import { RegistrationStatus } from "~/types/Registration";
import { UserFormFields } from "./types/UserFormFields";
import { USER_FORM_SCHEMA } from "./constants/userFormSchema";
import { IconButton } from "~/components/Buttons/IconButton";

export const NewUserPage = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormFields>({
    resolver: zodResolver(USER_FORM_SCHEMA),
    defaultValues: {
      employeeName: "",
      email: "",
      cpf: "",
      admissionDate: "",
    },
  });

  const queryClient = useQueryClient();

  const { mutate: onCreateRegistration } = useMutation({
    mutationFn: createRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
      goToHome();
    },
  });

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const onSubmit = (user: UserFormFields) => {
    onCreateRegistration({
      ...user,
      status: RegistrationStatus.Review,
    });
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>

        <TextField
          placeholder="Nome"
          label="Nome"
          error={errors.employeeName?.message}
          {...register("employeeName")}
        />
        <TextField
          placeholder="Email"
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <TextField
          placeholder="CPF"
          label="CPF"
          mask="999.999.999-99"
          error={errors.cpf?.message}
          {...register("cpf")}
        />
        <TextField
          label="Data de admissão"
          type="date"
          error={errors.admissionDate?.message}
          {...register("admissionDate")}
        />

        <Button onClick={handleSubmit(onSubmit)}>Cadastrar</Button>
      </S.Card>
    </S.Container>
  );
};
