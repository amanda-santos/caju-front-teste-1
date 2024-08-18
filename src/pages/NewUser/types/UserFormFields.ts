import { z } from "zod";
import { USER_FORM_SCHEMA } from "../constants/userFormSchema";

export type UserFormFields = z.infer<typeof USER_FORM_SCHEMA>;
