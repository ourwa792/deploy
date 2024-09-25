const multer = require('multer');
const upload = require('../config/multer');

const uploadMiddleware = (req, res, next) => {
    try {
        upload.fields([{ name: 'file' }, { name: 'thumbnail' }])(req, res, (err) => {
            if (err) {
                let errorMessage = 'حدث خطأ أثناء رفع الملف.';
                if (err instanceof multer.MulterError) {
                    switch (err.code) {
                        case 'LIMIT_FILE_SIZE':
                            errorMessage = 'حجم الملف يتجاوز الحد المسموح به!';
                            break;
                        case 'LIMIT_UNEXPECTED_FILE':
                            errorMessage = 'تم رفع ملف غير متوقع!';
                            break;
                        default:
                            errorMessage = `Multer Error: ${err.message}`;
                    }
                } else {
                    errorMessage = err.message;
                }
                console.error('Upload error:', err.message);
                return res.status(400).json({ error: errorMessage });
            }

            if (!req.files || !req.files['file'] || req.files['file'].length === 0) {
                return res.status(400).json({ error: 'يرجى تحميل ملف.' });
            }

            const file = req.files['file'][0];
            console.log('--file---'+JSON.stringify(file))
            
            const thumbnail = req.files['thumbnail'] ? req.files['thumbnail'][0] : null;
            console.log('--thumbnail--'+JSON.stringify(thumbnail))

            if (!file && thumbnail) {
                return res.status(400).json({ error: 'لا يمكن تحميل صورة مصغرة بدون تحميل ملف رئيسي.' });
            }
            
            if (file.size > 5 * 1024 * 1024) { // 5MB
                return res.status(400).json({ error: 'حجم الملف يتجاوز 5MB!' });
            }

            if (thumbnail && thumbnail.size > 2 * 1024 * 1024) { // 2MB
                return res.status(400).json({ error: 'حجم الصورة المصغرة يتجاوز 2MB!' });
            }

            next();
        });
    } catch (error) {
        console.error('Unexpected upload error:', error.message);
        res.status(500).json({ message: 'حدث خطأ غير متوقع أثناء الرفع.' });
    }
};

module.exports = uploadMiddleware;
