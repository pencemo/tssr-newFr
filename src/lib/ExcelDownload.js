import * as XLSX from "xlsx";

export const excelDownload = async(jsonData, fileName = "data") => {
  // Flatten nested arrays and stringify objects
  const flattenedData = jsonData.map((item) => {
    const flattenedItem = {};

    Object.entries(item).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // Convert arrays to comma-separated string
        
        
        flattenedItem[key] = value.join(", ");
      } else if (typeof value === "object" && value !== null) {
        // Convert nested objects to string
        flattenedItem[key] = JSON.stringify(value);
      } else {
        // Keep primitive values as is
        flattenedItem[key] = value;
      }
    });

    return flattenedItem;
  });

  // Create worksheet from the flattened data
  const ws = XLSX.utils.json_to_sheet(flattenedData);

  // Create a new workbook and append the worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Export the Excel file
  XLSX.writeFile(wb, `${fileName}.xlsx`);
};
