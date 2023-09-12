const express = require("express");
const qr = require("qrcode");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Function to generate QR code with URL to the HTML content
async function generateQRCode(text, fileName) {
  try {
    await qr.toFile(fileName, text);
    console.log(`QR code saved as ${fileName}`);
  } catch (error) {
    console.error("Error generating QR code:", error);
  }
}

const htmlFileName = "qr_code_content.html"; // Name of your HTML file
const qrCodeFileName = "qr_code_with_content.png";

generateQRCode(`http://localhost:${port}/${htmlFileName}`, qrCodeFileName);

// Serve the HTML file when accessing the root URL ("/")
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, htmlFileName));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
