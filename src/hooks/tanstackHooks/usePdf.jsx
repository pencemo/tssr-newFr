import { PDFService } from "@/API/services/pdfService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const usePDF = () => {
  return useMutation({
    mutationFn: (data) => {
      return PDFService.generatePDF(data);
    },
  });
};
