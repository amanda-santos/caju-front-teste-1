import { format, isMatch, parse } from "date-fns";

export const formatDate = (dateString: string): string => {
  if (isMatch(dateString, "dd/MM/yyyy")) {
    return dateString;
  }

  const parsedDate = parse(dateString, "yyyy-MM-dd", new Date());
  return format(parsedDate, "dd/MM/yyyy");
};
