const route = require("express").Router();
const bcrypt = require("bcryptjs");
const fs = require('fs');

const mime = require('mime-types');
const multer = require('multer');
const path = require('path');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const {cloudinary} = require("../config/cloudinary")
const { check, validationResult } = require("express-validator")

const User = require("../model/association").User
const Resource = require("../model/association").Resources
const Video = require("../model/association").VideoLesson;
const { Quiz, QuizResult } = require("../model/association")

const { transformQuizData } = require("../middleware/mobileQuizHandeler")

/* const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      return {
        folder: "user_profiles",
        format: "png" || "jpg", // حدد الصيغ المقبولة هنا
        public_id: `${req.session.user.id}-${Date.now()}`, // استخدم معرف المستخدم مع وقت التحميل
      };
    },
}); */
/* 
const fileFilter = (req, file, cb) => {
    // السماح فقط بالصور بصيغ JPEG, PNG, GIF
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("نوع الملف غير مسموح. يرجى رفع صورة بصيغة JPEG أو PNG أو GIF."), false);
    }
  
    // التحقق من حجم الملف (1 ميغا بايت)
    const maxSizeInBytes = 1 * 1024 * 1024; // 1 ميغا بايت
    if (file.size > maxSizeInBytes) {
      return cb(new Error("حجم الصورة يتجاوز 1 ميغا. يرجى اختيار صورة أصغر."), false);
    }
  
    cb(null, true); // الملف مسموح
}; */

/* // إعداد Multer مع التخزين وفلترة الملفات
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1 * 1024 * 1024 }, // الحد الأقصى لحجم الملف: 1 ميغا بايت
}); */

// Sign up
route.post("/register", [
    check("userName", "اسم المستخدم مطلوب").trim().notEmpty(),
    check("email", "ادخل ايميل صالح").isEmail().normalizeEmail(),
    check("password", "ادخل كلمة مرور بطول 5 محارف على الاقل").trim().isLength({min:5})
    ]
    , async (req, res)=> {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const {userName, email, password} = req.body;

        try {
            const existingUser = await User.findByEmail(email);
            if (existingUser){
                return res.status(400).json({ 
                    "errors": [
                        {
                        "msg": "الإيميل موجود بالفعل !!",
                        }
                    ]  
                })
            }
            const hashedPassword = await bcrypt.hash(password, 5); // تشفير كلمة المرور

            const newUser = await User.create({
                userName,
                email,
                password: hashedPassword,              
            });

            req.session.user = newUser;
            req.session.save()
            return res.status(200).json({
                message: "تم التسجيل بنجاح",
                user: newUser,
                sessionId: req.sessionID
            })

        } catch (err) {
            console.log(err)
            console.error(err)
            return res.status(500).json({ message: 'Server error during registration' });
        }
} )

// logIn
route.post("/login", async (req, res)=> {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({
            where: { email }
        });
        if (user && (await bcrypt.compare(password, user.password))) {
            console.log(user);
            req.session.user = user;
            req.session.save()

            return res.status(200).json({
                message: "تم تسجيل الدخول بنجاح",
                sessionId: req.sessionID,
                user:user
            });
        } 
        else {
            return res.status(400).json({message: "إحدى المدخلات غير صحيحة"})    
        }
    } catch (error) {
        console.log("error from mobile " + error);
        console.error(error);
        return res.status(500).json({ message: 'Server error during login' });
    }
})

// check Session
route.get('/checkSession', (req, res) => {

  if (req.session.user) {
    return res.status(200).json({ loggedIn: true,
        message: "Session is active",
    });
  } else
  res.status(401).json({ loggedIn: false });
});

//profile inf
route.get('/profile', (req, res) => {
    if (req.session.user) {
        User.findByPk(req.session.user.id)
        .then(user => {
          if (!user) {
            return res.status(400).json({message:"user not found"})            
          }
          return res.status(200).json({
            message: "Profile data",
            user: req.session.user
          });         
        })
        .catch(err => {
            console.log(err)
        });
    } else {
        res.status(400).json({ message: "Unauthorized" });
    }
});
  

// تسجيل الخروج
route.post('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.json({ message: 'Logged out' });
});

//قائمة ملفات او صور
route.get('/files', async (req, res) => {
    try {
        const files = await Resource.findAll({
            where: {
                type: ['application/pdf'] // جلب ملفات PDF و JPG و PNG
            }
        });
        res.json(files);
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ error: 'خطأ في جلب الملفات' });
    }
});


// تنزيل ملف (PDF أو صورة)
route.get('/download/:id', async (req, res) => {
    try {
        const resourceId = req.params.id;
        const resource = await Resource.findByPk(resourceId);
        if (!resource) {
            return res.status(404).json({ error: 'المورد غير موجود' });
        }
        // إعادة رابط الملف
        res.json({ url: resource.url, type: resource.type, title: resource.title });
    } catch (error) {
        console.error('Error fetching resource:', error);
        res.status(500).json({ error: 'خطأ داخلي في الخادم' });
    }
});

/*
// مسار رفع الصورة
route.post("/imgProfile", upload.single("profileImage"), async (req, res) => {
    console.log("Session data:", req.session.user); // تحقق من الجلسة

    if (!req.session.user) {
      return res.status(400).json({ error: "unauthorized" });
    } 
  
    try {
        console.log("---------File data:-------", req.file); // تحقق من وجود الملف المرفوع
        // إذا كان لدى المستخدم صورة سابقة، احذفها من Cloudinary
        if (req.session.user.cloudinaryId) {
            await cloudinary.uploader.destroy(req.session.user.cloudinaryId);
        }
    
        // تحديث الصورة الجديدة
        req.session.user.cloudinaryId = req.file.public_id;
        req.session.user.avatar = req.file.path;
        await req.session.user.save();
    
        res.status(200).json({ avatarUrl: req.session.user.avatar });
    } catch (error) {
      console.error("Error uploading profile image:", error);
      res.status(500).json({ error: "Failed to upload profile image." });
    }
});

*/

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = 'uploads/';
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);  // تخزين الملفات في مجلد uploads
    },
    filename: (req, file, cb) => {
      // تسمية الصورة بناءً على userId + timestamp
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, req.body.userId + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
  
const upload = multer({ storage: storage });


/*
// Endpoint لرفع الصورة
route.post('/upload', upload.single('file'), async (req, res) => {
    try {
      const userId = req.body.userId;  // الحصول على userId
      const file = req.file;  // الصورة المرفوعة
  
      console.log('طلب وارد:', req.body);  // لعرض محتويات req.body
      console.log('ملف مرفوع:', req.file);  // لعرض محتويات req.file

      if (!file) {
        return res.status(400).json({ message: 'لم يتم رفع أي ملف' });
      }
  
      // تحديث بيانات المستخدم في قاعدة البيانات
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'المستخدم غير موجود' });
      }
  
      // حفظ مسار الصورة في قاعدة البيانات
      user.avatar = `/uploads/${file.filename}`;
      await user.save();
  
      res.status(200).json({ message: 'تم رفع الصورة بنجاح', imageUrl: user.avatar });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'حدث خطأ أثناء رفع الصورة' });
    }
});
*/

//video
route.get("/lessons", async (req, res)=> {
    const lessonList = await Video.findAll()

    res.status(200).json({lessons: lessonList})
})

//video id
route.get("/lessons/:id", async (req, res)=> {
    const videoId = req.params.id;
    try {
        const video = await Video.findByPk(videoId);
        
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        } else {
            res.status(200).json({lessons: video})
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: 'حدث خطأ أثناء جلب الدرس' });
    }    
})


// quiz
route.get('/allQuiz', async (req, res) => {
    try {
        const allQuiz = await Quiz.findAll({
            attributes: ['id', 'title', 'difficulty', 'maxScore', 'quizSchema']
        });

        //const allQuiz = transformQuizData(quizzes[0].quizSchema)

        res.status(200).json({
            message: "تم جلب الكويزات بنجاح",
            allQuiz
        }); 
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ error: 'خطأ داخلي في الخادم' });
    }
});

//video id
route.get("/quiz/:id", async (req, res)=> {
    const quizId = req.params.id;
    try {
        const quiz = await Quiz.findByPk(quizId);
        quiz.quizSchema = transformQuizData(quiz.quizSchema)

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        } else {
            res.status(200).json({quiz: quiz})
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: 'حدث خطأ أثناء جلب الدرس' });
    }    
})



module.exports = route;