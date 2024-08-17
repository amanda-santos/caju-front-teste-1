import { api } from "~/lib/axios";
import { Registration } from "~/types/Registration";

export const updateRegistration = (registration: Registration) => {
  return api
    .put<Registration>(`/registrations/${registration.id}`, registration)
    .then((response) => response.data);
};
