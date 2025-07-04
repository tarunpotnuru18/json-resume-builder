import fs from "fs";
import path from "path";

const htmlFile = path.join(process.cwd(), "/src/resume.html");
const scriptFile = path.join(process.cwd(), "scripts/script.js");

// Read files
let html = fs.readFileSync(htmlFile, "utf8");
const scriptContent = fs.readFileSync(scriptFile, "utf8");

// Generate meta tags HTML



// Create the inline script tag with the content
const inlineScript = `<script>\n${scriptContent}\n</script>`;

// Find the position to insert the script (before closing html tag)
const insertPosition = html.lastIndexOf("</html>");

// Insert the script
const newHtml =
  html.slice(0, insertPosition) +
  "\n  " +
  inlineScript +
  "\n" +
  html.slice(insertPosition);

// Write back to the file
fs.writeFileSync(htmlFile, newHtml);

console.log(
  "Successfully injected script content and meta tags into resume.html"
);
