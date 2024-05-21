
const Mathml2latex = require('mathml-to-latex');
const fs = require('fs');
const csvParser = require('csv-parser');
// Replace 'your_input_csv_file.csv' with the path to your CSV file
const inputFilePath = './matml_questions.csv';

// Specify the column name you want to read from the CSV
const columnNameToRead = 'question';

const valuesInColumn = [];

fs.createReadStream(inputFilePath)
  .pipe(csvParser())
  .on('data', (row) => {
    // Assuming the column you want to read is a string type.
    // If it's another data type (e.g., number), you might need to parse it accordingly.
    const value = row[columnNameToRead];
    if (value !== undefined) {
      valuesInColumn.push(value);
    }
  })
  .on('end', () => {

    const latexValues = valuesInColumn.map(convertToLatex);

    // Log the converted LaTeX values to the console
   // console.log('Original values in column:', valuesInColumn);
    //console.log('Converted LaTeX values:', latexValues);
    // const convertedData = valuesInColumn.map(convertToLatex);

    // console.log(`Original values in column '${columnNameToRead}':`, valuesInColumn);
    // console.log(`Converted values (uppercase) in column '${columnNameToRead}':`, convertedData);
   
})
  .on('error', (error) => {
    console.error('Error reading CSV file:', error);
  });

    //converting to mathml to latex format
    function convertToLatex(value){
        try{
     const latexdata    =    Mathml2latex.convert(value);
    console.log(latexdata);
        }catch(err){
    console.log(err);
        }
    }
		
    //now add converted values in csv column