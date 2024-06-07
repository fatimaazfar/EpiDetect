const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

async function generatePDF(user, record) {
  const reportsDir = path.join(__dirname, '../reports');

  // Create reports directory if it doesn't exist
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir);
  }

  const doc = new PDFDocument();
  const pdfFilename = `${user._id}-${Date.now()}.pdf`;
  const pdfPath = path.join(reportsDir, pdfFilename);

  doc.pipe(fs.createWriteStream(pdfPath));

  doc.fontSize(25).text('Skin Disease Report', { align: 'center' });
  doc.moveDown();
  doc.fontSize(18).text(`User: ${user.name}`);
  doc.text(`Email: ${user.email}`);
  doc.text(`Prediction: ${record.prediction}`);
  doc.moveDown();

  // Add the image to the PDF
  if (record.imagePath) {
    const imagePath = path.resolve(__dirname, '..', record.imagePath);
    doc.image(imagePath, {
      fit: [250, 250],
      align: 'center',
      valign: 'center'
    });
  }

  doc.end();

  // Wait for the document to finish being written to disk
  await new Promise((resolve, reject) => {
    doc.on('finish', resolve);
    doc.on('error', reject);
  });

  return pdfFilename;
}

module.exports = { generatePDF };
