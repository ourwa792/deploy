// المسار: /src/routes/resources.js
const express = require('express');
const Resource = require('../model/association').Resources;
const isAdmin = require('../middleware/isAdmin');
const uploadMiddleware = require('../middleware/uploadMulter');
const { cloudinary } = require('../config/cloudinary');
//const axiosInstance = require('../config/axios');
const axios = require('axios')

const fs = require('fs');
const path = require('path');

const route = express.Router();



route.get('/', async (req, res) => {
    try {
        const resources = await Resource.findAll({where:{lessonId : null}});
        res.render('resources/index', { pageTitle: 'Resources', resources });  
    } catch (error) {
        console.error('Error fetching resources:', error);
        req.flash('error_msg', 'Failed to load resources. Please try again later.');
        res.redirect('/');
    }
}); 

route.get('/upload', isAdmin, (req, res, next) => {
    res.render('resources/upload',{pageTitle: 'رفع مصادر'});
});

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
 
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf',
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

// GET: تنزيل الملفات
route.get('/download/:id', async (req, res) => {
    try {
        const resourceId = req.params.id;
        const resource = await Resource.findByPk(resourceId);
        if (!resource) {
            return res.status(404).json({ error: 'المورد غير موجود' });
        }

        const fileUrl = resource.url;
        const fileExtension = path.extname(fileUrl);
        const fileName = `${resource.title || 'unknownFile'}${fileExtension}`;
        console.log('fileName is ----------->>'+fileName);


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
                    console.log("===err==="+err)
                    res.status(500).json({ error: 'res.downloadخطأ داخلي في الخادم' });
                }
                //fs.unlinkSync(temporaryFilePath);
            });
        });

        writer.on('error', (err) => {
            console.log("erore"+err)
            console.error(err);
            res.status(500).json({ error: 'write.onخطأ داخلي في الخادم' });
        });
    } catch (error) {
        console.log("cacherr0r"+error)
        res.status(500).json({ error: 'cacherrorخطأ داخلي في الخادم' });
    }
});

module.exports = route;
