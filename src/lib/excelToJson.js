import * as XLSX from "xlsx";

export const excelToJson = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

        resolve(jsonData);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
};

export const jsonToExcel = (data, filename = 'data.xlsx') => {
  const wb = XLSX.utils.book_new();
  
  // Convert array to worksheet (each element becomes a column header)
  const ws = XLSX.utils.aoa_to_sheet([data]);
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  
  // Write file
  XLSX.writeFile(wb, filename);
}