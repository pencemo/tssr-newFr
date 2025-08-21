import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";

export const formateDateToIST = (date, formatType = "PPP") => {

    
    // Example UTC DOB (from DB)
    const dob = new Date(date)
    
    // Convert into IST Date
    const istDate = new TZDate(dob, "Asia/Kolkata");
    
    const formatted = format(istDate, formatType);
    return formatted;
}
