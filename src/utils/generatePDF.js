// utils/generatePdf.js
import jsPDF from "jspdf";

export const generatePdf = (data) => {
  const doc = new jsPDF();

  // Example: Adding text to PDF
  doc.text("Data from Database:", 10, 10);
  doc.text(JSON.stringify(data, null, 2), 10, 20);

  return doc.output("blob");
};
