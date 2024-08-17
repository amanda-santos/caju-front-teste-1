import { api } from "~/lib/axios";
import { Registration } from "~/types/Registration";

export const getRegistrations = (): Promise<Registration[]> => {
  return api
    .get<Registration[]>("/registrations")
    .then((response) => response.data);
};
