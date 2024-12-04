require('dotenv').config()

const {cloudinary} = require('../config/cloudinary')
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const {User, FeedBack, Lesson} = require("../model/association") ;

const {gameNames} = require("./gameName")



const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "user_profiles",
      format: "png" || "jpg",
      public_id: `${req.user.id}-${Date.now()}`,
    };
  },
});


exports.upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!file) {
      return cb(new Error("لم يتم اختيار أي ملف! يُرجى اختيار صورة."), false);
    }
    if (!allowedImageTypes.includes(file.mimetype)) {
      return cb(new Error("تنسيق الملف غير مدعوم. يُرجى رفع صورة بصيغة JPG أو PNG فقط."), false);
    }
    cb(null, true);
  },
});


/* exports.upload = multer({ 
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedImageTypes = ["image/jpg", "image/png"];
    const maxThumbnailSize = 2 * 1024 * 1024;

    if (file.fieldname === 'profileImage'  && file.size > maxThumbnailSize) {
      return cb(new Error('حجم الصورة المصغرة يتجاوز الحد المسموح به وهو 2MB!'), false);
    }
    if (file.fieldname === 'profileImage' && !allowedImageTypes.includes(file.mimetype)) {
      return cb(new Error('تنسيق الصورة المصغرة غير صالح!'), false);
    }

    cb(null, true)
  }
}); */

// 

exports.getProfile = async (req, res, next) => {
    try {
        if (req.user){
            const userId = req.user.id ; 
            console.log('======='+userId+'=====')
            const feedbacks = await FeedBack.findAll({
                where: {userId: userId} ,
                include: [
                    { model: User, attributes: ['userName'] },
                    { model: Lesson, attributes: ['title'] }
                ] ,
                order: [['createdAt', 'DESC']]
            })
            console.log("feedback=========="+JSON.stringify(feedbacks))
            res.render('profile', {pageTitle: 'Profile',
              user: req.user, gameNames,
              feedbacks: feedbacks || [],
            }) 
        }
    } catch (error) {
      console.log(error);
      next(error);
    }
};

//module.exports = upload

/* exports.uploadProfileImage = [
  upload.single("profileImage"),
  async (req, res) => {
    if (!req.user) {
      return res.redirect("/login");
    }

    if (req.user.cloudinaryId) {
      await cloudinary.uploader.destroy(req.user.cloudinaryId);
    }

    req.user.avatar = req.file.path;
    req.user.cloudinaryId = req.file.filename;
    await req.user.save();
    console.log("THE PATH :" + req.file.path);
    console.log("THE FILEname :" + req.file.filename);
    res.redirect("/profile");
  },
];
 */


