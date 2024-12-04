const route = require("express").Router();
const bcrypt = require("bcryptjs");
const PDFDocument = require("pdfkit");
const { cloudinary } = require("../config/cloudinary");
/* const fs = require('fs');
const multer = require('multer');
*/
const path = require("path");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../model/association").User;
const Resource = require("../model/association").Resources;
const Video = require("../model/association").VideoLesson;
const { Quiz, QuizResult } = require("../model/association");

const { transformQuizData } = require("../middleware/mobileQuizHandeler");

const JWT_SECRET = "mySecret";

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // بلكي بدو يسجل لأول مرة
  /*
    
   if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Token is missing or invalid' });
    } 
    //const token = authHeader.split(' ')[1];   
    
    */

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401).json({ message: "غير مصرح" });

  try {
    const decoded = jwt.decode(token);
    // إنشاء توقيع المستخدم باستخدام ID
    const userSecret = `${JWT_SECRET}-${decoded.id}`;

    //التحقق من التوكين
    jwt.verify(token, userSecret);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(403).json({ message: "المستخدم غير موجود" });
    }

    req.user = decoded; // تخزين بيانات المستخدم
    console.log("===decoded===" + JSON.stringify(decoded));
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "التوكين منتهي الصلاحية" });
    }
    return res.status(403).json({ message: "التوكين غير صالح" });
  }
};

// Sign up
route.post(
  "/register",
  [
    check("userName", "اسم المستخدم مطلوب").trim().notEmpty(),
    check("email", "ادخل ايميل صالح").isEmail().normalizeEmail(),
    check("password", "ادخل كلمة مرور بطول 5 محارف على الاقل")
      .trim()
      .isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userName, email, password } = req.body;

    try {
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          errors: [
            {
              msg: "الإيميل موجود بالفعل !!",
            },
          ],
        });
      }
      const hashedPassword = await bcrypt.hash(password, 5); // تشفير كلمة المرور

      const newUser = await User.create({
        userName,
        email,
        password: hashedPassword,
      });

      const userSecret = `${JWT_SECRET}-${newUser.id}`;
      const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        userSecret,
        { expiresIn: "12h" }
      );

      return res.status(200).json({
        message: "تم التسجيل بنجاح",
        user: newUser,
        token: token,
      });
    } catch (err) {
      console.log(err);
      console.error(err);
      return res
        .status(500)
        .json({ message: "Server error during registration" });
    }
  }
);

// logIn
route.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      console.log(user);

      const userSecret = `${JWT_SECRET}-${user.id}`;
      const token = jwt.sign({ id: user.id, email: user.email }, userSecret, {
        expiresIn: "12h",
      });

      return res.status(200).json({
        message: "تم تسجيل الدخول بنجاح",
        user: user,
        token: token, // إرسال التوكين
      });
    } else {
      return res.status(400).json({ message: "إحدى المدخلات غير صحيحة" });
    }
  } catch (error) {
    console.log("error from mobile " + error);
    console.error(error);
    return res.status(500).json({ message: "Server error during login" });
  }
});

// check Session
route.get("/checkSession", authenticateToken, (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      loggedIn: false,
      message: "الجلسة منتهية، يرجى تسجيل الدخول مجددًا",
    });
  }

  res.status(200).json({
    loggedIn: true,
    message: "Session is active",
    user: req.user, // بيانات المستخدم المستخلصة من التوكين
  });
});

//profile inf
route.get("/profile",authenticateToken,  async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    res.status(200).json({
      message: "Profile data",
      user: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching profile" });
  }
});

// تسجيل الخروج
route.post("/logout", authenticateToken, (req, res) => {
  res.json({ message: "Logged out" });
});

//قائمة ملفات او صور
route.get("/files", authenticateToken, async (req, res) => {
  try {
    const files = await Resource.findAll({
      where: {
        type: ["application/pdf"], // جلب ملفات PDF و JPG و PNG
      },
    });
    res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ error: "خطأ في جلب الملفات" });
  }
});

// تنزيل ملف (PDF أو صورة)
route.get("/download/:id", authenticateToken, async (req, res) => {
  try {
    const resourceId = req.params.id;
    const resource = await Resource.findByPk(resourceId);
    if (!resource) {
      return res.status(404).json({ error: "المورد غير موجود" });
    }
    // إعادة رابط الملف
    res.json({ url: resource.url, type: resource.type, title: resource.title });
  } catch (error) {
    console.error("Error fetching resource:", error);
    res.status(500).json({ error: "خطأ داخلي في الخادم" });
  }
});

//video
route.get("/lessons", authenticateToken, async (req, res) => {
  const lessonList = await Video.findAll();

  res.status(200).json({ lessons: lessonList });
});

//video id
route.get("/lessons/:id", authenticateToken, async (req, res) => {
  const videoId = req.params.id;
  try {
    const video = await Video.findByPk(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    } else {
      res.status(200).json({ lessons: video });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "حدث خطأ أثناء جلب الدرس" });
  }
});

// quiz
route.get("/allQuiz", authenticateToken, async (req, res) => {
  try {
    const allQuiz = await Quiz.findAll({
      attributes: ["id", "title", "difficulty", "maxScore", "quizSchema"],
    });

    //const allQuiz = transformQuizData(quizzes[0].quizSchema)

    res.status(200).json({
      message: "تم جلب الكويزات بنجاح",
      allQuiz,
    });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ error: "خطأ داخلي في الخادم" });
  }
});

// quiz/id
route.get("/quiz/:id", authenticateToken, async (req, res) => {
  const quizId = req.params.id;
  try {
    const quiz = await Quiz.findByPk(quizId);
    quiz.quizSchema = transformQuizData(quiz.quizSchema);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    } else {
      res.status(200).json({ quiz: quiz });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "حدث خطأ أثناء جلب الدرس" });
  }
});

// save result and cert
route.post("/quiz/saveResult", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { quizId, userScore } = req.body;

  console.log("Received data:", req.body);

  try {
    const quiz = await Quiz.findByPk(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // البحث عن محاولة سابقة للكويز لنفس المستخدم
    let quizResult = await QuizResult.findOne({
      where: { userId: userId, quizId: quizId },
      include: [{ model: User }], // تضمين بيانات المستخدم
    });

    if (quizResult) {
      // إذا كانت هناك محاولة سابقة، تحديث النقاط وعدد المحاولات
      quizResult.userScore = userScore;
      quizResult.attempts += 1;
      quizResult.quizDate = new Date(); // ضبط تاريخ الكويز الحالي
      await quizResult.save();
    } else {
      // إذا لم تكن هناك محاولة سابقة، إنشاء نتيجة جديدة
      quizResult = await QuizResult.create({
        userId: userId,
        quizId: quizId,
        userScore: userScore,
        attempts: 1,
        quizDate: new Date(), // ضبط تاريخ الكويز الحالي
      });
      // جلب بيانات المستخدم المرتبطة
      quizResult = await QuizResult.findByPk(quizResult.id, {
        include: [{ model: User }],
      });
    }

    if (
      userScore === quiz.maxScore &&
      quiz.difficulty === "Hard" &&
      quizResult.attempts === 1
    ) {
      const doc = new PDFDocument();
      let buffers = [];
      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", async () => {
        const pdfData = Buffer.concat(buffers);

        cloudinary.uploader
          .upload_stream(
            { resource_type: "raw", folder: "quiz", format: "pdf" },
            async (error, result) => {
              if (error) return res.status(500).json({ error: error.message });

              // إرسال رابط التحميل للمستخدم
              quizResult.certificateUrl = result.secure_url;
              await quizResult.save();
              res.json({
                resultId: quizResult.id,
                certificateUrl: result.secure_url,
                userScore: userScore,
                maxScore: quiz.maxScore,
              });
            }
          )
          .end(pdfData);
      });

      // تحميل الخطوط والصور
      const arabicFontPath = path.join(
        __dirname,
        "../public/fonts/Amiri-Regular.ttf"
      );
      const backgroundImagePath = path.join(
        __dirname,
        "../public/image/certificate.jfif"
      );
      const logoImagePath = path.join(
        __dirname,
        "../public/icon/ourwaMath.png"
      );

      doc.image(backgroundImagePath, 0, 0, {
        width: doc.page.width,
        height: doc.page.height,
      });

      doc.image(logoImagePath, doc.page.width * 0.5 - 30, doc.page.height-210, {
        width: 120,
        height: 120,
      });

      // اختيار الخط بناءً على اللغة
      doc.registerFont("ArabicFont", arabicFontPath);
      // تنسيق النصوص
      const userName = quizResult.user.userName;
      const quizTitle = quiz.title;

      const textOptions = {
        align: "center",
        width: doc.page.width - 100,
      };

      doc
        .font("ArabicFont")
        .fontSize(25)
        .fillColor("blue")
        .text("شهادة الإنجاز", {
          ...textOptions,
          align: "center",
          features: ["rtla"],
        });

      doc.moveDown();
      doc
        .fontSize(20)
        .fillColor("black")
        .text("هذه الشهادة تؤكد أن الطالب", {
          ...textOptions,
          align: "center",
          features: ["rtla"],
        });

      doc.moveDown();
      doc
        .fontSize(30)
        .fillColor("red")
        .text(userName, {
          ...textOptions,
          align: "center",
          bold: true,
          features: ["rtla"],
        });

      doc.moveDown();
      doc
        .fontSize(20)
        .fillColor("black")
        .text("قد أكمل بنجاح الاختبار في", {
          ...textOptions,
          align: "center",
          features: ["rtla"],
        });

      doc.moveDown();
      doc
        .fontSize(25)
        .fillColor("blue")
        .text(quizTitle, {
          ...textOptions,
          align: "center",
          bold: true,
          features: ["rtla"],
        });

      doc.moveDown();
      doc
        .fontSize(20)
        .fillColor("black")
        .text(`من ${userScore} بدرجة ${quiz.maxScore}.`, {
          ...textOptions,
          align: "center",
          features: ["rtla"],
        });

      doc.end();
    } else {
      res.json({
        resultId: quizResult.id,
        message: "No certificate generated as conditions were not met.",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = route;