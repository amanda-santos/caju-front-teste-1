import { api } from "~/lib/axios";

export const deleteRegistration = (id: string) => {
  return api.delete(`/registrations/${id}`).then((response) => response.data);
};
