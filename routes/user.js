const route = require("express").Router();
const { protectedRoute } = require("../middleware/authMiddleWare");
const userController = require("../controller/user");
const multer = require('multer');

const {cloudinary} = require('../config/cloudinary')


route.get("/profile", protectedRoute, userController.getProfile);


// uploadProfileImage

/*
const uploadMiddleware = async (req, res, next) => {
    try {
        await userController.upload.single("profileImage")(req, res, (err) => {
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


            const thumbnail = req.files['profileImage'] ? req.files['profileImage'][0] : null;
console.log("=====thumbnail===="+thumbnail)
            if (!file) {
                return res.status(400).json({ error: 'يجب تحميل ملف رئيسي.' });
            }

            if (thumbnail && thumbnail.size > 2 * 1024 * 1024) { // 2MB
                return res.status(400).json({ error: 'حجم الصورة يتجاوز 2MB!' });
            }

            next();
        });
    } catch (error) {
        console.error('Unexpected upload error:', error.message);
        return res.status(500).json({ message: 'حدث خطأ غير متوقع أثناء الرفع.' });
    }
};

*/
// ========

/*

route.post(
    "/api/upload-profile-image", uploadMiddleware,
    //userController.upload.single("profileImage"),
    async (req, res) => {
      try {
        if (!req.user) {
          return res
            .status(401)
            .json({ success: false, message: "Unauthorized: Please log in." });
        }
  
        if (!req.file) {
          return res
            .status(400)
            .json({ success: false, message: "لا يوجد ملف مرفوع!" });
        }
  
        // حذف الصورة القديمة
        if (req.user.cloudinaryId) {
          await cloudinary.uploader.destroy(req.user.cloudinaryId);
        }
  
        // تحديث البيانات
        req.user.avatar = req.file.path;
        req.user.cloudinaryId = req.file.filename;
        await req.user.save();
  
        return res.status(200).json({
          success: true,
          message: "تم رفع الصورة بنجاح!",
          data: { avatar: req.user.avatar, cloudinaryId: req.user.cloudinaryId },
        });
      } catch (error) {
        console.error("Error uploading profile image:", error);
        /* let errorMessage = error.message || "حدث خطأ أثناء رفع الملف"
        if (error.code === "LIMIT_FILE_SIZE") {
            errorMessage = "حجم الملف يجب ألا يتجاوز 2 ميغا.";
        } 
        return res.status(400).json({
            success: false, message: errorMessage
        });
      }
    }
  );
  
*/


route.post(
    "/api/upload-profile-image",
    protectedRoute, // حماية المسار
    (req, res, next) => {
      userController.upload.single("profileImage")(req, res, (err) => {
        if (err) {
          let errorMessage = "حدث خطأ أثناء رفع الملف.";
          if (err instanceof multer.MulterError) {
            // أخطاء Multer
            switch (err.code) {
              case "LIMIT_FILE_SIZE":
                errorMessage = "حجم الملف يتجاوز 2 ميغا. يُرجى اختيار ملف أصغر.";
                break;
              case "LIMIT_UNEXPECTED_FILE":
                errorMessage = "تم رفع ملف غير متوقع.";
                break;
              default:
                errorMessage = `Multer Error: ${err.message}`;
            }
          } else {
            // أخطاء أخرى
            errorMessage = err.message || "خطأ غير معروف.";
          }
  
          console.error("Upload error:", err.message);
          return res.status(400).json({
            success: false,
            message: errorMessage,
          });
        }
        next();
      });
    },
    async (req, res) => {
      try {
        if (!req.file) {
          return res.status(400).json({
            success: false,
            message: "لم يتم اختيار أي ملف. يُرجى اختيار صورة.",
          });
        }
  
        // تحديث بيانات المستخدم مع حذف الصورة القديمة إذا وجدت
        const user = req.user;
        if (user.cloudinaryId) {
          await cloudinary.uploader.destroy(user.cloudinaryId);
        }
  
        user.avatar = req.file.path;
        user.cloudinaryId = req.file.filename;
        await user.save();
  
        return res.status(200).json({
          success: true,
          message: "تم رفع الصورة بنجاح!",
          data: {
            avatar: user.avatar,
            cloudinaryId: user.cloudinaryId,
          },
        });
      } catch (error) {
        console.error("Error uploading profile image:", error);
        return res.status(500).json({
          success: false,
          message: error.message || "حدث خطأ أثناء معالجة الطلب.",
        });
      }
    }
  );

module.exports = route;
