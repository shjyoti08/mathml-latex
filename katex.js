const Mathml2latex = require('mathml-to-latex');
const fs = require('fs');
const csvParser = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const katex = require('katex');

// Replace 'your_input_csv_file.csv' with the path to your CSV file
const inputFilePath = './matml_questions.csv';

// Specify the column name you want to read from the CSV
const columnNameToRead = 'question';

// Create a CSV writer to write the converted data to a new CSV file
const csvWriter = createCsvWriter({
  path: 'output.csv', // Change the filename as needed
  header: [
    { id: columnNameToRead, title: columnNameToRead },
    { id: 'converted_latex', title: 'converted_latex' },
    { id: 'html_output', title: 'html_output' } // New column for HTML output
  ]
});

const dataToWrite = []; // Array to store data for writing to CSV

fs.createReadStream(inputFilePath)
  .pipe(csvParser())
  .on('data', (row) => {
    // Assuming the column you want to read is a string type.
    // If it's another data type (e.g., number), you might need to parse it accordingly.
    const value = row[columnNameToRead];
    if (value !== undefined) {
      // Convert MathML to LaTeX
      const latexValue = convertToLatex(value);

      // Convert LaTeX to HTML using KaTeX
      const htmlValue = convertToHtml(latexValue);

      // Add data to the array
      dataToWrite.push({
        [columnNameToRead]: value,
        'converted_latex': latexValue,
        'html_output': htmlValue
      });
    }
  })
  .on('end', () => {
    // Write the data to the new CSV file
    csvWriter.writeRecords(dataToWrite)
      .then(() => {
        console.log('Conversion complete. Data saved to output.csv');
      })
      .catch((error) => {
        console.error('Error writing to CSV file:', error);
      });
  })
  .on('error', (error) => {
    console.error('Error reading CSV file:', error);
  });

// Function to convert MathML to LaTeX
function convertToLatex(value) {
  try {
    const latexData = Mathml2latex.convert(value);
    return latexData;
  } catch (err) {
    console.error('Error converting to LaTeX:', err);
    return ''; // Return an empty string if conversion fails
  }
}

// Function to convert LaTeX to HTML using KaTeX
function convertToHtml(latexValue) {
  try {
    const htmlData = katex.renderToString(latexValue, {
      throwOnError: false
    });
    return htmlData;
  } catch (err) {
    console.error('Error converting to HTML:', err);
    return ''; // Return an empty string if conversion fails
  }
}
