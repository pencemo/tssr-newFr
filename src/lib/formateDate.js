import { TZDate } from "@date-fns/tz";
import { format, parseISO } from "date-fns";

export const formateDateToIST = (date, formatType = "PPP") => {

    // Example UTC DOB (from DB)
    const dob = new Date(date)

    
    // Convert into IST Date
    const istDate = new TZDate(dob, "Asia/Kolkata");
    
    const formatted = format(istDate, formatType);
    return formatted;
}


export const formatDateOnly = (date, formatType = "PPP") => {
    // Cut only the date part
    const onlyDate = date.slice(0, 10); // "2025-10-03"
    return format(parseISO(onlyDate), formatType);
  };