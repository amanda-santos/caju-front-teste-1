import { z } from "zod";
import { removeSpecialCharacters, validateCPF } from "~/helpers";

export const USER_FORM_SCHEMA = z.object({
  employeeName: z
    .string()
    .trim()
    .min(3, "O nome deve possuir no mínimo 3 caracteres.")
    .regex(
      /^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ\s]* [A-Za-zÀ-ÖØ-öø-ÿ\s]*$/,
      "Por favor, insira um nome válido."
    ),
  email: z.string().email("Por favor, insira um email válido."),
  cpf: z.string().refine((cpf) => validateCPF(removeSpecialCharacters(cpf)), {
    message: "Por favor, insira um CPF válido.",
  }),
  admissionDate: z
    .string()
    .date("Por favor, insira uma data de admissão válida."),
});
