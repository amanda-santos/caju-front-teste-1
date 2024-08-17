import axios from "axios";
import { Registration } from "~/types/Registration";

axios.defaults.baseURL = "http://localhost:3000";

export const getRegistrations = (): Promise<Registration[]> => {
  return axios
    .get<Registration[]>("/registrations")
    .then((response) => response.data);
};
