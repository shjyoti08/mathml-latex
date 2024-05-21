
const Mathml2latex = require('mathml-to-latex');

const mathml = `
<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">   <mtext>&#xA0;Find the middle terms in the expansion of&#xA0;</mtext>   <msup>     <mfenced open="(" close=")" separators="|">       <mrow>         <mfrac>           <mi>x</mi>           <mn>3</mn>         </mfrac>             <mo>+</mo>             <mn>9</mn>             <mi>y</mi>           </mrow>         </mfenced>     <mrow>       <mn>10</mn>     </mrow>   </msup> </math>

  `;

const latex = Mathml2latex.convert(mathml);
console.log(latex);
const testMathML = "<math><mi>x</mi></math>";
const testLatex = Mathml2latex.convert(testMathML);
console.log("Test LaTeX Data:", testLatex);