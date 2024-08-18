import { TextField } from "~/components/TextField";
import * as S from "./styles";
import Button from "~/components/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRegistration } from "~/api/createRegistration";
import { RegistrationStatus } from "~/types/Registration";

function validateCPF(cpf: string) {
  cpf = cpf.replace(/[^\d]+/g, ""); // Remove non-numeric characters
  if (cpf.length !== 11) return false;

  let sum;
  let remainder;
  sum = 0;
  if (cpf === "00000000000") return false;

  for (let i = 1; i <= 9; i++)
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

const userFormSchema = z.object({
  employeeName: z
    .string()
    .trim()
    .min(3, "O nome deve possuir no mínimo 3 caracteres.")
    .regex(
      /^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ\s]* [A-Za-zÀ-ÖØ-öø-ÿ\s]*$/,
      "Por favor, insira um nome válido."
    ),
  email: z.string().email("Por favor, insira um email válido."),
  cpf: z.string().refine((cpf) => validateCPF(cpf), {
    message: "Por favor, insira um CPF válido.",
  }),
  admissionDate: z
    .string()
    .date("Por favor, insira uma data de admissão válida."),
});

type UserFormFields = z.infer<typeof userFormSchema>;

export const NewUserPage = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormFields>({
    resolver: zodResolver(userFormSchema),
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
