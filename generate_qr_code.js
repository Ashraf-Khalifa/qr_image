const express = require('express');
const qr = require('qrcode');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000; // You can change the port if needed

// Serve static files from the current directory
app.use(express.static(__dirname));

// Function to generate QR code with URL to the HTML content
async function generateQRCode(text, fileName) {
  try {
    await qr.toFile(fileName, text);
    console.log(`QR code saved as ${fileName}`);
  } catch (error) {
    console.error('Error generating QR code:', error);
  }
}

const htmlFileName = 'image_and_text.html'; // Replace with the name of your HTML file
const qrCodeFileName = 'qr_code_with_content.png'; // Specify the QR code file name and format (e.g., qr_code_with_content.png)

generateQRCode(`http://localhost:${port}`, qrCodeFileName);

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/' + htmlFileName);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
