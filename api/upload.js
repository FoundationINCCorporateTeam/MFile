const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

module.exports = (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ success: false, message: 'No files were uploaded.' });
    }

    let sampleFile = req.files.file;
    let uploadPath = path.join(uploadDir, sampleFile.name);

    sampleFile.mv(uploadPath, function(err) {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }

        res.json({ success: true, message: 'File uploaded!' });
    });
};
