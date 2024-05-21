const XLSX = require('xlsx');
const fs = require('fs');
//const { convert } = require('mathml-to-latex');
const Mathml2latex = require('mathml-to-latex');
// Load the input XLSX file
const workbook = XLSX.readFile('mathml_question.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

// Get the range of cells in the column you want to read
const columnToRead = 'question'; // Change this to the desired column (e.g., 'B' for the second column)
const columnToWrite = 'latexvalues'; // Change this to the column where you want to save LaTeX (e.g., 'C' for the third column)

// Loop through the rows in the worksheet
XLSX.utils.sheet_to_json(worksheet, { header: 1 }).forEach((row, rowIndex) => {
  // Skip the header row
  if (rowIndex === 0) return;

  const mathmlExpression = row[columnToRead - 'question']; // Subtract 'A' to convert 'A', 'B', 'C', etc., to 0, 1, 2, etc.

  // Convert MathML to LaTeX
  function convertToLatex(mathmlExpression){
    try{
 const latexdata   =    Mathml2latex.convert(mathmlExpression);
console.log(latexdata);
    }catch(err){
console.log(err);
    }
}
  const latexExpression = Mathml2latex.convert(mathmlExpression);;

  // Write the LaTeX expression to the next column
  worksheet[`${columnToWrite}${rowIndex + 1}`] = { t: 's', v: latexExpression };
});

// Save the updated worksheet to a new XLSX file
XLSX.writeFile(workbook, 'output.xlsx');

console.log('Conversion complete. Output saved to output.xlsx');
