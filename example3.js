const fs = require('fs');
const csvParser = require('csv-parser');
const { convert } = require('mathml-to-latex');

// Replace 'your_input_csv_file.csv' with the path to your CSV file
const inputFilePath = './matml_questions.csv';

// Specify the column name you want to read from the CSV
const columnNameToRead = 'question';

const valuesInColumn = [];

fs.createReadStream(inputFilePath)
  .pipe(csvParser())
  .on('data', (row) => {
    const value = row[columnNameToRead];
    if (value !== undefined) {
      valuesInColumn.push(value);
    }
  })
  .on('end', () => {
    // Convert each value in the column to LaTeX format
    const latexValues = valuesInColumn.map(convertToLatex);

    // Log the converted LaTeX values to the console
    console.log('Original values in column:', valuesInColumn);
    console.log('Converted LaTeX values:', latexValues);
  })
  .on('error', (error) => {
    console.error('Error reading CSV file:', error);
  });

function convertToLatex(mathml) {
  return convert(mathml);
}
