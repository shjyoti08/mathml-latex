const fs = require('fs');
const csvParser = require('csv-parser');
const mathmlToLatex = require('mathml-to-latex');

// Replace 'your_input_csv_file.csv' with the path to your CSV file
const inputFilePath = './matml_questions_latex.csv';

// Specify the column names you want to read and convert
const inputColumnName = 'question';
const outputColumnName = 'latexdata';

fs.createReadStream(inputFilePath)
  .pipe(csvParser())
  .on('data', (row) => {
    const mathmlData = row[inputColumnName];
    if (mathmlData) {
      // Convert MathML to LaTeX
      const latexData = mathmlToLatex.convert(mathmlData);

      // Update the CSV with the converted LaTeX data in the output column
      row[outputColumnName] = latexData;

      // Save the updated row to the CSV file
      const outputData = Object.values(row).join(',');
      fs.appendFileSync(inputFilePath, outputData + '\n');
    }
  })
  .on('end', () => {
    console.log('CSV processing completed.');
  })
  .on('error', (error) => {
    console.error('Error reading CSV file:', error);
  });
