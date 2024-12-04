// المسار: /src/routes/resources.js
const express = require('express');
const Resource = require('../model/association').Resources;
const isAdmin = require('../middleware/isAdmin');
const uploadMiddleware = require('../middleware/uploadMulter');
const { cloudinary } = require('../config/cloudinary');
//const axiosInstance = require('../config/axios');
const axios = require('axios')
const mime = require('mime-types');

const fs = require('fs');
const path = require('path');
const { gameNames } = require('../controller/gameName');

const route = express.Router();



route.get('/', async (req, res) => {
    try {
        const resources = await Resource.findAll({where:{lessonId : null}});
        res.render('resources/index', { pageTitle: 'Resources',
            resources,
            gameNames
        });  
    } catch (error) {
        console.error('Error fetching resources:', error);
        req.flash('error_msg', 'Failed to load resources. Please try again later.');
        res.redirect('/');
    }
}); 

route.get('/upload', isAdmin, (req, res, next) => {
    res.render('resources/upload',{pageTitle: 'رفع مصادر', gameNames});
});

/*
//رفع الملفات
route.post('/upload', isAdmin, uploadMiddleware,
 async (req, res) => {
    try {
        if (!req.files || !req.files['file'] || req.files['file'].length === 0) {
            return res.status(400).json({ error: 'يرجى تحميل ملف.' });
        }

        const { title } = req.body;
        console.log("-----------"+title)
        const file = req.files['file'][0];
        const fileUrl = file.path;
        const filePublicId = file.filename;
        const thumbnail = req.files['thumbnail'] ? req.files['thumbnail'][0] : null;
 
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/msword', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/vnd.ms-powerpoint'];
        if (!allowedTypes.includes(file.mimetype)) {
            return res.status(400).json({ error: 'تنسيق غير مدعوم' });
        } 

        let fileType;
        if (file.mimetype.startsWith('image')) {
            fileType = 'image';
        } else if (file.mimetype === 'application/pdf') {
            fileType = 'pdf';
        } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                file.mimetype === 'application/msword') {
            fileType = 'docx';
        } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
                file.mimetype === 'application/vnd.ms-powerpoint') {
            fileType = 'pptx';
        }

        let fileResult;
        try {
            fileResult = await cloudinary.uploader.upload(file.path, {
                folder: 'educational-resources',
                resource_type: fileType === 'image' ? 'image' : 'raw'
            });
        } catch (uploadError) {
            console.error('Error uploading file to Cloudinary:', uploadError);
            return res.status(500).json({ error: 'خطأ في رفع الملف إلى Cloudinary' });
        }

        let thumbnailResult;
        if (thumbnail) {
            try {
                thumbnailResult = await cloudinary.uploader.upload(thumbnail.path, {
                    folder: 'educational-resources',
                    resource_type: 'image'
                });
            } catch (uploadError) {
                console.error('Error uploading thumbnail to Cloudinary:', uploadError);
                return res.status(500).json({ error: 'خطأ في رفع الصورة المصغرة إلى Cloudinary' });
            }
        }

        await Resource.create({
            title,
            url: fileResult.secure_url,
            thumbnailUrl: thumbnailResult ? thumbnailResult.secure_url : null,
            type: fileType,
            publicId: filePublicId,
            thumbnailPublicId: thumbnailResult ? thumbnailResult.original_filename : null,
        });

        res.status(201).json({ success:true, message: 'تم رفع المصادر التعليمية بنجاح' });
    } catch (error) {
        console.error('Error uploading resource:', error);
        res.status(500).json({ error: 'فشل في رفع المورد. يرجى المحاولة لاحقًا.' });
    }
});
*/
// /src/routes/resources.js

route.post('/upload', isAdmin, uploadMiddleware, async (req, res) => {
    try {
        const file = req.files['file'][0];
        const thumbnail = req.files['thumbnail'] ? req.files['thumbnail'][0] : null;

        // إذا كان العنوان فارغًا، نستخدم اسم افتراضي
        const title = req.body.title && req.body.title.trim() !== '' ? req.body.title : 'Unknown Title ' + Date.now();

        // رفع الملف الرئيسي إلى Cloudinary
        const fileResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    resource_type: 'auto',
                    folder: 'educational-resources',
                    public_id: 'file-' + Date.now()
                },
                (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                }
            ).end(file.buffer);
        });

        console.log("fileResult ---"+ JSON.stringify(fileResult))

        // رفع الصورة المصغرة إذا وجدت
        let thumbnailResult = null;
        if (thumbnail) {
            thumbnailResult = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        resource_type: 'image',
                        folder: 'educational-resources',
                        public_id: 'thumbnail-' + Date.now()
                    },
                    (error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        resolve(result);
                    }
                ).end(thumbnail.buffer);
            });
        }

        console.log('thumbnailResult ---'+ JSON.stringify(thumbnailResult))

        // استخدام mime-types لاستخراج الامتداد الصحيح للملف
        const fileType = mime.extension(file.mimetype);
        console.log("fileType "+ JSON.stringify(fileType))

        // حفظ البيانات في قاعدة البيانات
        await Resource.create({
            title: title,
            url: fileResult.secure_url,
            thumbnailUrl: thumbnailResult ? thumbnailResult.secure_url : null,
            type: file.mimetype,
            publicId: fileResult.public_id,
            thumbnailPublicId: thumbnailResult ? thumbnailResult.public_id : null,
        });

        res.status(201).json({ success: true, message: 'تم رفع المصادر التعليمية بنجاح' });
    } catch (error) {
        console.error('Error uploading resource:', error);
        res.status(500).json({ error: 'فشل في رفع المورد. يرجى المحاولة لاحقًا.' });
    }
});




/*

// DELETE: حذف الملفات
route.delete('/:id', isAdmin, async (req, res) => {
    try {
        const resourceId = req.params.id;
        const resource = await Resource.findByPk(resourceId);
        if (!resource) {
            return res.status(404).json({ error: 'المورد غير موجود' });
        }

        await cloudinary.uploader.destroy(resource.publicId);
        if (resource.thumbnailPublicId) {
            await cloudinary.uploader.destroy('educational-resources/' + resource.thumbnailPublicId);
        }

        await resource.destroy();
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'خطأ داخلي في الخادم' });
    }
});


*/

route.delete('/:id', isAdmin, async (req, res) => {
    try {
        const resourceId = req.params.id;
        const resource = await Resource.findByPk(resourceId);

        if (!resource) {
            return res.status(404).json({ error: 'المورد غير موجود' });
        }

        // Delete the main file from Cloudinary using the publicId from the database
        await cloudinary.uploader.destroy(resource.publicId, {resource_type: 'raw'});

        // If there's a thumbnail, delete it from Cloudinary using the thumbnailPublicId from the database
        if (resource.thumbnailPublicId) {
            await cloudinary.uploader.destroy(resource.thumbnailPublicId); // Removed folder prefix
        }

        // Delete the resource record from the database
        await resource.destroy();

        res.status(204).send(); // Successfully deleted
    } catch (error) {
        console.error('Error deleting resource:', error);
        res.status(500).json({ error: 'خطأ داخلي في الخادم' });
    }
});


// GET: تنزيل الملفات

route.get('/download/:id', async (req, res) => {
    try {
        const resourceId = req.params.id;
        const resource = await Resource.findByPk(resourceId);
        if (!resource) {
            return res.status(404).json({ error: 'المورد غير موجود' });
        }

        const fileUrl = resource.url;
        const fileExtension = mime.extension(resource.type); // استخدام mime-types لاستخراج الامتداد
        const fileName = `${resource.title || 'unknownFile'}.${fileExtension}`;

        console.log('---fileUrl---'+fileUrl)
        console.log("---fileExtension---"+fileExtension)
        console.log("---fileName---"+fileName)

        const response = await axios({
            url: fileUrl,
            method: 'GET',
            responseType: 'stream',
            timeout: 60000, // 60 ثانية
        });

        const temporaryFilePath = path.join(__dirname, '..', 'temp', fileName);
        const writer = fs.createWriteStream(temporaryFilePath);
        response.data.pipe(writer);

        writer.on('finish', () => {
            res.download(temporaryFilePath, fileName, (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'خطأ داخلي في الخادم' });
                }
                fs.unlinkSync(temporaryFilePath);
            });
        });

        writer.on('error', (err) => {
            console.error(err);
            res.status(500).json({ error: 'خطأ داخلي في الخادم' });
        });
    } catch (error) {
        console.error('Error downloading resource:', error);
        res.status(500).json({ error: 'خطأ داخلي في الخادم' });
    }
});



module.exports = route;
