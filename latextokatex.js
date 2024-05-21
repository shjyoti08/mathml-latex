const katex = require('katex');
const fs = require('fs');

// LaTeX expression
const latexExpression = '\\text{ A bag contains tickets numbered }11,12,13,\hdots\hdots30\text{. A ticket is taken out from the bag at random. }\text{ Find the probability that the number on the drawn ticket is a multiple of }7.';

// Convert LaTeX to KaTeX
const katexHTML = katex.renderToString(latexExpression, {
  throwOnError: false, // Set to true to throw errors on invalid LaTeX
});

//Generate HTML output
const htmlOutput = `
  <!DOCTYPE html>
  <html>
    <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.11.1/katex.min.css">
    </head>
    <body>
      <div>${katexHTML}</div>
    </body>
  </html>
`;

// Write the HTML output to a file
fs.writeFileSync('output.html', htmlOutput);

console.log('HTML output saved to output.html');
