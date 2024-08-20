import { api } from "~/lib/axios";
import { Registration } from "~/types/Registration";

export const getRegistrations = (cpf?: string): Promise<Registration[]> => {
  const params = cpf ? { cpf } : {};

  return api
    .get<Registration[]>("/registrations", { params })
    .then((response) => response.data);
};
