import { api } from "~/lib/axios";
import { Registration } from "~/types/Registration";

export const createRegistration = (registration: Omit<Registration, "id">) => {
  return api
    .post<Registration>("/registrations", registration)
    .then((response) => response.data);
};
