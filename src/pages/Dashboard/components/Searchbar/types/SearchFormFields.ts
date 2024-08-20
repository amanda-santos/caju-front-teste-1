import { z } from "zod";
import { SEARCH_FORM_SCHEMA } from "../constants/searchFormSchema";

export type SearchFormFields = z.infer<typeof SEARCH_FORM_SCHEMA>;
