import { z } from "zod";
import { removeSpecialCharacters, validateCPF } from "~/helpers";

export const SEARCH_FORM_SCHEMA = z.object({
  cpf: z.string().refine((cpf) => validateCPF(removeSpecialCharacters(cpf)), {
    message: "Por favor, insira um CPF válido.",
  }),
});
