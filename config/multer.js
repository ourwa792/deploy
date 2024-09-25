// المسار: /src/config/multer.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary, uploadOptions } = require('./cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        let folder = 'educational-resources';
        let format;
        let resource_type = uploadOptions.resource_type;
        //بناءً على نوع الملف، يتم تحديد التنسيق الصحيح لتخزينه في Cloudinary

        if (file.mimetype.startsWith('image')) {
            format = undefined; 
        } else if (file.mimetype === 'application/pdf') {
            format = 'pdf';
        } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                   file.mimetype === 'application/msword') {
            format = 'docx';
        } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
                   file.mimetype === 'application/vnd.ms-powerpoint') {
            format = 'pptx';
        }

        return {
            folder: folder,
            format: format,  // تحديد تنسيق الملفات المرفوعة (يمكنك تغييره حسب نوع الملف
            resource_type: resource_type,
            public_id: file.fieldname + '-' + Date.now(),  // تحديد معرّف فريد للملف (اختياري) تم إنشاء معرف فريد (public ID) لكل ملف يتم رفعه استنادًا إلى اسم الحقل (field name) والطابع الزمني (timestamp) لضمان عدم وجود تضارب في الأسماء.
        };
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => { 
        const allowedTypes = ['image/jpg', 'image/png', 'image/gif', 'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/msword', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/vnd.ms-powerpoint'];

        const allowedImageTypes = ["image/jpg", "image/png"];
        /* 
        if (file.mimetype === 'video/mp4') {
            return cb(new Error('غير مسموح رفع الفيديو بصيغة MP4'));
        } */

        if (file.fieldname === 'file') {
            if (allowedTypes.includes(file.mimetype)) {
                return cb(null, true);
            } else {
                return cb(new Error('تنسيق الملف غير صالح!'));
            }
        } else if (file.fieldname === 'thumbnail') {
            if (allowedImageTypes.includes(file.mimetype)) {
                return cb(null, true);
            } else {
                cb(new Error('تنسيق الصورة المصغرة غير صالح!'));
            }
        } else {
            cb(new Error('حقل غير مدعوم!'));
        }
    }
});

module.exports = upload;
