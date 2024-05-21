const fs = require('fs');
const csv = require('csv-parser');
//const mathmlToLatex = require('mathml-to-latex');
const fastcsv = require('fast-csv');
const Mathml2latex = require('mathml-to-latex');

const inputFilePath = './matml_questions.csv';
const outputFilePath = 'output.csv';
const inputColumn = 'question'; // Replace with your input column name
const outputColumn = 'latexColumn'; // New column to store converted values

const rows = [];

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on('data', (row) => {
    rows.push(row);
  })
  .on('end', () => {
    // Process each row
    for (let i = 0; i < rows.length; i++) {
      const originalMathML = rows[i][inputColumn];
      try{
      const convertedLatex = Mathml2latex.convert(originalMathML);
      console.log(convertedLatex);
      }catch(err){
        console.log(err);
            }
      // Add the converted LaTeX to the new column
      rows[i][outputColumn] = convertedLatex;
    }

    // Write the modified rows back to the output CSV file
    const csvStream = fastcsv.format({ headers: true });
    csvStream.pipe(fs.createWriteStream(outputFilePath));
    rows.forEach((row) => {
      csvStream.write(row);
    });
    csvStream.end();

    console.log('Conversion completed and saved to output CSV file.');
  });
