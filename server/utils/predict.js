const { exec } = require('child_process');
const path = require('path');
const User = require('../models/User'); // Import User model

async function predictDisease(imagePath, userId) {
  return new Promise((resolve, reject) => {
    const scriptPath = path.resolve(__dirname, '../predict.py');
    const command = `python "${scriptPath}" "${imagePath}"`;

    exec(command, async (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        reject(stderr);
        return;
      }
      
      const prediction = stdout.trim();

      try {
        // Save prediction to user's records
        const user = await User.findById(userId);
        user.records.push({ imagePath, prediction });
        await user.save();

        resolve(prediction);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  });
}

module.exports = { predictDisease };
