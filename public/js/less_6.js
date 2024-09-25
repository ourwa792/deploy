import { ComputeEngine } from "https://unpkg.com/@cortex-js/compute-engine?module";
import {
  MathfieldElement,
  renderMathInElement,
  renderMathInDocument,
} from "//unpkg.com/mathlive?module";


const ce = new ComputeEngine();

window.addEventListener("DOMContentLoaded", () => {
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
  renderMathInDocument();

  // التحقق من LCM
  document.getElementById("checkLCM").addEventListener("click", function () {
    const mf = document.getElementById("lcm-answer");
    const correctLCM = ce.parse("12");
    const userLCM = ce.parse(mf.getPromptValue("answer")).simplify();

    const feedback = document.getElementById("lcm-feedback");

    if (userLCM.isSame(correctLCM)) {
      feedback.textContent = "إجابة صحيحة!";
      feedback.classList.remove("incorrect");
    } else {
      feedback.textContent = "إجابة خاطئة، حاول مرة أخرى.";
      feedback.classList.add("incorrect");
    }
  });

  // التحقق من توحيد المقامات
  const mf = document.getElementById("fraction1");
  // console.log(mf.getPrompts()) -->  ['x', 'y'] مصفوفة من كل الفراغات
  /* mf.addEventListener("input", function () {
    const num = mf.getPromptValue("x");
    const den = mf.getPromptValue("y");

    mf.setPromptState("x", num === 10 ? "correct" : "incorrect");
    mf.setPromptState("y", den === 12 ? "correct" : "incorrect");

    const feedback = document.getElementById("fraction-feedback");

    if (num === "10" && den === "12") {
      feedback.textContent = "الكسر الأول موحد بشكل صحيح";
      feedback.classList.remove("incorrect");
    } else {
      feedback.textContent = "حاول مرة أخرى في الكسر الأول";
      feedback.classList.add("incorrect");
    }
  }); */
  const mf1 = document.getElementById("fraction2");
  /* mf1.addEventListener("input", function () {
    const num = mf1.getPromptValue("numerator");
    const den = mf1.getPromptValue("denominator");

    mf1.setPromptState("numerator", num === 9 ? "correct" : "incorrect");
    mf1.setPromptState("denominator", den === 12 ? "correct" : "incorrect");

    const feedback = document.getElementById("fraction-feedback");

    if (num === "9" && den === "12") {
      feedback.textContent = "الكسر الثاني موحد بشكل صحيح";
      feedback.classList.remove("incorrect");
    } else {
      feedback.textContent = "حاول مرة أخرى في الكسر الثاني";
      feedback.classList.add("incorrect");
    }
  }); */

  const mf2 = document.getElementById("fraction3")

  function verifyAllPlaceholders(mf, correctValues) {
    // نحصل على قائمة بكل الـ placeholders في الحقل
    const placeholders = mf.getPrompts();

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




verifyAllPlaceholders(mf, {"numerator": 10, "denominator": 12})
verifyAllPlaceholders(mf1, {"numerator": 9, "denominator": 12})
verifyAllPlaceholders(mf2, {"numerator1": 3, "numerator2": 8})


// التحقق من النتيجة النهائية
const checkFinalAnswer = document.getElementById("checkFinalAnswer");
checkFinalAnswer.addEventListener("click", function () {
  const userAnswer = document.getElementById("final-answer").expression;
  const correctAnswer = ce.parse("\\frac{19}{12}").simplify();

  console.log("correctAnswer is:" + correctAnswer);
  console.log("userAnswer is:" + userAnswer);

  const feedback = document.getElementById("final-feedback");
  if (userAnswer.isSame(correctAnswer)) {
    feedback.textContent = "إجابة صحيحة!";
    feedback.classList.remove("incorrect");
  } else {
    feedback.textContent = "إجابة خاطئة، حاول مرة أخرى.";
    feedback.classList.add("incorrect");
  }
});



}) // DOMContentLoad


// section-2 exercies

//window.addEventListener('DOMContentLoaded', (event)=>{

const problems = [
  "\\frac{-7}{5} + \\frac{-3}{5}",
  "\\frac{4}{7} - \\frac{9.1}{7}",
  "\\frac{-4}{3} + \\frac{5}{3}",
  "\\frac{13}{-6} + \\frac{-5}{6}",
  "\\frac{4}{1.2} - \\frac{5.3}{1.2} - \\frac{0.7}{1.2}",
  "\\frac{-6}{7} + \\frac{21.3}{35}",
];
function displayProblems() {
  const container = document.getElementById("problems-container");

  //let problems = Array.from(problems1);
  problems.forEach((problemLatex, index) => {
    const problemDiv = document.createElement("div");
    problemDiv.className = "col-12 col-md-6 col-lg-6 p-3"; // تقسيم النصفي الصفحة
    problemDiv.innerHTML = `
    <div class="problem-box p-3">
      <div>
        <math-field read-only>${problemLatex}</math-field>
        </div>
        <div>
            <math-field id="answer-${index}"></math-field>
            </div>
            <div>
                <button onclick="checkAnswer(${index})">تحقق من الإجابة</button>
                </div>
                <div id="feedback-${index}" class="feedback"></div>
                </div>
                `;
    container.appendChild(problemDiv);
  });
}

window.onload = displayProblems;

window.checkAnswer = function (index) {
  const correctAnswerLatex = problems[index];
  console.log("correctAnswerLatex " + correctAnswerLatex);
  const userInput = document
    .getElementById(`answer-${index}`)
    .getValue("latex");

  const userAnswer = ce.parse(userInput).simplify();
  console.log("userAnswer " + userAnswer);
  const correctAnswer = ce.parse(correctAnswerLatex).simplify();
  console.log("correctAnswer " + correctAnswer);

  const feedbackDiv = document.getElementById(`feedback-${index}`);

  if (userAnswer.isEqual(correctAnswer)) {
    feedbackDiv.textContent = "إجابة صحيحة!";
    feedbackDiv.classList.remove("incorrect");
    feedbackDiv.classList.add("correct");
  } else {
    feedbackDiv.textContent = "إجابة غير صحيحة، حاول مرة أخرى.";
    feedbackDiv.classList.remove("correct");
    feedbackDiv.classList.add("incorrect");
  }
};

/*
 const mathfield = new MathfieldElement({
  mathVirtualKeyboardPolicy: 'auto', // Automatically show virtual keyboard on touch devices
});
document.body.appendChild(mathfield);
 */