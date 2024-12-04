import { ComputeEngine } from "https://unpkg.com/@cortex-js/compute-engine?module";
import {
  MathfieldElement,
  convertLatexToMarkup,
  renderMathInElement,
  renderMathInDocument,
} from "//unpkg.com/mathlive?module";  

window.addEventListener("DOMContentLoaded", (e) => {
  
  renderMathInDocument({
    TeX: {
      delimiters: {
        inline: [
          ["$", "$"],
          ["\\(", "\\)"],
        ],
        display: [
          ["\\[", "\\]"],
          ["$$", "$$"],
        ],
      },
    },
  }); 

//------- box2 ------


  var board2 = JXG.JSXGraph.initBoard("box2", {
    boundingbox: [-4, 4, 4, -4],
    keepaspectratio: true,
    axis: false,
  });

  var o2 = board2.create("point", [0, 0], { name: "O" });
  var circle2 = board2.create("circle", [o2, 3], {
    strokeWidth: 3,
    strokeColor: "black",
  });

  var M2 = board2.create("glider", [2, 4.5, circle2], { name: "M" });
  var N2 = board2.create("glider", [-3, 2, circle2], { name: "N" });
  var A2 = board2.create("glider", [1, -3, circle2], { name: "A" });
  var B2 = board2.create("glider", [3, 0, circle2], { name: "B" });

  board2.create("segment", [B2, o2], { strokeWidth: 3, strokeColor: "red" });
  board2.create("segment", [A2, o2], { strokeWidth: 3, strokeColor: "red" });
  board2.create("segment", [B2, M2], { strokeColor: "blue" });
  board2.create("segment", [A2, M2], { strokeColor: "blue" });
  board2.create("segment", [B2, N2], { strokeColor: "blue" });
  board2.create("segment", [A2, N2], { strokeColor: "blue" });

  // الزاوية المركزية O
  var centralAngle = board2.create("angle", [A2, o2, B2], {
    name: "O",
    radius: 0.5,
    fillColor: "orange",
    withLabel: true,
  });

  // زاوية عند M
  var inscribedAngleM = board2.create("angle", [A2, M2, B2], {
    name: "M",
    radius: 0.7,
    fillColor: "lightblue",
    withLabel: true,
    fontSize: 15,
  });

  // زاوية عند N
  var inscribedAngleN = board2.create("angle", [A2, N2, B2], {
    name: "N",
    radius: 0.7,
    fillColor: "lightblue",
    withLabel: true,
    fontSize: 15,
  });

  // ضمان حساب الزاوية الأقل
  function ensureMinorAngle2(angleValue) {
    return angleValue > 180 ? 360 - angleValue : angleValue;
  }

  // تعديل القيم لتكون الزاوية المحيطية هي نصف المركزية
  function updateInscribedAngles() {
    var centralAngleValue = ensureMinorAngle2(centralAngle.Value("degrees"));

    // الزاويتان المحيطيتان يجب أن تساويا نصف الزاوية المركزية
    var expectedInscribedAngle = centralAngleValue / 2;

    inscribedAngleM.setAngle(expectedInscribedAngle);
    inscribedAngleN.setAngle(expectedInscribedAngle);
  }

  // استدعاء الدالة عند أي تحديث
  board2.on("update", function () {
    updateInscribedAngles();
  });

  // إضافة النصوص مع القيم التي يتم تحديثها
  board2.create(
    "text",
    [
      () => o2.X() + 0.3,
      () => o2.Y() + 0.5,
      () =>
        " O: " +
        ensureMinorAngle2(centralAngle.Value("degrees")).toFixed(2) +
        "°",
    ],
    { fontSize: 15 }
  );

  board2.create(
    "text",
    [
      () => M2.X() + 0.3,
      () => M2.Y() + 0.5,
      () =>
        " M: " +
        (ensureMinorAngle2(centralAngle.Value("degrees")) / 2).toFixed(2) +
        "°",
    ],
    { fontSize: 15 }
  );

  board2.create(
    "text",
    [
      () => N2.X() + 0.3,
      () => N2.Y() + 0.5,
      () =>
        " N: " +
        (ensureMinorAngle2(centralAngle.Value("degrees")) / 2).toFixed(2) +
        "°",
    ],
    { fontSize: 15 }
  );

  //--mathlive

 function verifyAllPlaceholders(mf, correctValues) {
    // نحصل على قائمة بكل الـ placeholders في الحقل
    const placeholders = mf.getPrompts();
    console.log(placeholders)
    // إنشاء قسم للتغذية الراجعة ديناميكيًا إذا لم يكن موجودًا
    let feedbackSection = mf.nextElementSibling;
    if (!feedbackSection || !feedbackSection.classList.contains('feedback')) {
        feedbackSection = document.createElement("div");
        feedbackSection.classList.add('feedback');
        feedbackSection.style.marginTop = '10px';  // إضافة هامش أعلى قليلاً لتنسيق جيد
        feedbackSection.style.color = 'blue';  // تغيير لون النص
        feedbackSection.style.fontWeight = 'bold';  // جعل النص عريضاً
        mf.insertAdjacentElement('afterend', feedbackSection);  // إدراج بعد الحقل
    }

    mf.addEventListener("input", function () {
        let allCorrect = true;

        // التحقق من كل placeholder
        placeholders.forEach((placeholderId) => {
            const userInput = mf.getPromptValue(placeholderId);
            const correctValue = correctValues[placeholderId];

            // تعيين الحالة بناءً على مقارنة القيمة الصحيحة مع المدخلة
            mf.setPromptState(placeholderId, userInput == correctValue ? "correct" : "incorrect");

            // إذا كان أحد placeholders غير صحيح، نعين allCorrect إلى false
            if (userInput != correctValue) {
                allCorrect = false;
            }
        });

        // تحديث التغذية الراجعة بناءً على النتيجة النهائية
        if (allCorrect) {
            feedbackSection.textContent = "جميع القيم صحيحة!";
            feedbackSection.style.color = 'green';  // تغيير لون التغذية الراجعة إلى الأخضر للإشارة إلى النجاح
        } else {
            feedbackSection.textContent = "حاول مرة أخرى!";
            feedbackSection.style.color = 'red';  // تغيير لون التغذية الراجعة إلى الأحمر للإشارة إلى الخطأ
        }
    });
 }

 verifyAllPlaceholders(f1, {num1:1, den1:2, angel1:"AOB"})
 verifyAllPlaceholders(f2, {frown1: "BC"} )
 verifyAllPlaceholders(f3, {angel2: "BAC", angel3: "BMC"} )
 verifyAllPlaceholders(f4, {angel4: "ABC", angel5: "BCA", angel6:"CAB"} )
 

});
