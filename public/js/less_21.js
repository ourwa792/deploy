import JXG from "https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraphcore.mjs";
import { ComputeEngine } from "https://unpkg.com/@cortex-js/compute-engine?module";
import {
  MathfieldElement,
  renderMathInDocument,
  renderMathInElement,
} from "//unpkg.com/mathlive?module";
import zim from "https://zimjs.org/cdn/016/zim_game.js";

window.addEventListener("DOMContentLoaded",()=> {
    
    const scaling = "zim1";
    const width = 850;
    const height = 488;
    
    const assets = ["miss3.png", "school.jpg", "conan.png"]
    
    const path = "/assets/"
    
    var frame = new Frame({
      scaling,
      width,
      height,
      color: light,
      allowDefault: true,
      assets,
      path,
      progress: new Waiter({ backgroundColor: blue, corner: 10 }),
    });
    
    frame.on("ready", function ready() {
      var stage = frame.stage;
      let stageW = frame.width;
      let stageH = frame.height;
    
      asset("school.jpg").sca(.15).center()
    
      const miss = new Sprite({image:"conan.png",/*offsetX:-20*/ cols:6, rows:3}).pos(170,200)
      .sca(1.2)
      .run({loop:true, time:3, startFrame:4, endFrame:8})
    
      miss.on("mouseover", function(){
        new Aud('/sound/coin.mp3').play()
      })
    
      const words = ["هيا يا شطار","سنتعلم اليوم درساً جميلاً", "ما هي الكسور؟", "وعن ماذا تعبر؟", "كيف نسميها و نكتبها؟"]
      new Dialog({
        words: words ,
        width: 200,
        height: 140,
        dialogType: "oval",
        borderWidth: 3,
        size: 30,
        font: "Comic Sans MS",
        color: dark,
        corner: 50,
        tailH: LEFT,
        tailV: BOTTOM
      }).pos(300,40)
    
    });
    
    const board = JXG.JSXGraph.initBoard("jxgbox", {
      boundingbox: [-1.5, 1.5, 1.5, -1.5],
      axis: false,
      keepaspectratio: true,
    });
    
    let totalParts = 5; // المقام الابتدائي
    let coloredParts = 0; // عدد الأجزاء الملونة (البسط)
    const radius = 1;
    
    // إعداد النص لعرض قيمة الكسر داخل اللوح
    const fractionText = board.create(
      "text",
      [-1.2, -1.2, () => `الكسر: \\(\\frac{${coloredParts}}{${totalParts}}\\)`],
      {
        fontSize: 18,
        color: "black",
      }
    );
    
    // وظيفة لتحديث ترميز الكسر باستخدام Mathlive
    function updateFractionText() {
      fractionText.setText(`الكسر: \\(\\frac{${coloredParts}}{${totalParts}}\\)`);
      renderMathInElement(fractionText.rendNode); // تحديث العرض باستخدام Mathlive
    }
    
    // وظيفة لتحديث عدد القطاعات في الدائرة بناءً على المقام
    function updateSectors() {
      // إعادة تعيين العدد الملون
      coloredParts = 0;
      board.removeObject(
        board.objectsList.filter((obj) => obj.elType === "sector")
      ); // إزالة القطاعات القديمة
    
      // إنشاء القطاعات الجديدة
      for (let i = 0; i < totalParts; i++) {
        createSector(i);
      }
      updateFractionText(); // تحديث النص
      board.update();
    }
    
    // وظيفة لإنشاء وتلوين القطاعات الدائرية
    function createSector(index) {
      const angle1 = (index * 2 * Math.PI) / totalParts;
      const angle2 = ((index + 1) * 2 * Math.PI) / totalParts;
    
      const center = board.create("point", [0, 0], { visible: false });
      const point1 = board.create(
        "point",
        [radius * Math.cos(angle1), radius * Math.sin(angle1)],
        { visible: false }
      );
      const point2 = board.create(
        "point",
        [radius * Math.cos(angle2), radius * Math.sin(angle2)],
        { visible: false }
      );
    
      const sector = board.create("sector", [center, point1, point2], {
        fillColor: "white",
        fillOpacity: 0.8,
        strokeColor: "black",
        highlightStrokeColor: "black",
        strokeWidth: 1,
      });
    
      sector.isColored = false;
    
      // حدث للنقر لتلوين أو إزالة تلوين القطاع
      sector.on("down", () => {
        if (!sector.isColored) {
          sector.setAttribute({ fillColor: "orange", fillOpacity: 0.8 });
          coloredParts++;
        } else {
          sector.setAttribute({ fillColor: "white", fillOpacity: 0.8 });
          coloredParts--;
        }
        sector.isColored = !sector.isColored;
        updateFractionText(); // تحديث النص
        board.update();
      });
    }
    
    // تحديث المقام عند تغيير حقل الإدخال
    document
      .getElementById("totalPartsInput")
      .addEventListener("input", (event) => {
        totalParts = parseInt(event.target.value) || 1; // تجنب القيم غير الصالحة
        console.log("totalParts "+ totalParts)
        new Audio(`/sound/ksr_${totalParts}.mp3`).play()
        updateSectors();
    });
    
    // إنشاء القطاعات الافتراضية
    updateSectors();
    
    const ce = new ComputeEngine();
    
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
    
      renderMathInDocument(); // Render LaTeX in the document
    
    document
      .getElementById("visualizeButton")
      .addEventListener("click", visualizeFraction);
    
    function extractValues() {
      const mf = document.getElementById("fractionInput");
      const expr = mf.expression;
      console.log("expr :", expr);
    
      const numerator = ce
        .box(["Numerator", expr], { canonical: false })
        .evaluate({ canonical: false }).value;
      const denominator = ce
        .box(["Denominator", expr], { canonical: false })
        .evaluate({ canonical: false }).value;
    
      console.log("numerator :", numerator);
      console.log("denominator :", denominator);
    
      return { numerator, denominator };
    }
    
    function drawCircle(ctx, filledParts, totalParts) {
      let startAngle = -0.5 * Math.PI;
      const anglePerPart = (2 * Math.PI) / totalParts;
    
      for (let i = 0; i < totalParts; i++) {
        const endAngle = startAngle + anglePerPart;
    
        ctx.beginPath();
        ctx.moveTo(75, 75);
        ctx.arc(75, 75, 70, startAngle, endAngle);
    
        ctx.fillStyle = i < filledParts ? "lightgreen" : "lightgray";
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
    
        startAngle = endAngle;
      }
    }
    
    function visualizeFraction() {
      const { numerator, denominator } = extractValues();
    
      const visualization = document.getElementById("visualization");
      visualization.innerHTML = "";
    
      const whole = Math.floor(numerator / denominator);
      const fractionNumerator = numerator % denominator;
    
      for (let i = 0; i < whole; i++) {
        const container = document.createElement("div");
        container.className = "circle-container";
    
        const canvas = document.createElement("canvas");
        canvas.width = 150;
        canvas.height = 150;
        const ctx = canvas.getContext("2d");
    
        drawCircle(ctx, 1, 1);
    
        const label = document.createElement("div");
        label.className = "label";
        label.textContent = `1`;
    
        container.appendChild(canvas);
        container.appendChild(label);
        visualization.appendChild(container);
      }
    
      if (fractionNumerator > 0) {
        const container = document.createElement("div");
        container.className = "circle-container";
    
        const canvas = document.createElement("canvas");
        canvas.width = 150;
        canvas.height = 150;
        const ctx = canvas.getContext("2d");
    
        drawCircle(ctx, fractionNumerator, denominator);
    
        const label = document.createElement("div");
        label.className = "label";
        label.innerHTML = `\\(\\frac{${fractionNumerator}}{${denominator}}\\)`;
    
        container.appendChild(canvas);
        container.appendChild(label);
        visualization.appendChild(container);
    
        // Re-render the LaTeX formula inside the label داخل الدوائر
        renderMathInDocument();
      }
    }
    
    createSelect({
        questions_html: ".questions_1",
        check_button: "#check_answers_1",
        reset_button: "#reset_answers_1",
        answer_button: "#answers_1",
        answers: [3]
    });
    createSelect({
        questions_html: ".questions_2",
        check_button: "#check_answers_2",
        reset_button: "#reset_answers_2",
        answer_button: "#answers_2",
        answers: [2]
    });
    createSelect({
        questions_html: ".questions_3",
        check_button: "#check_answers_3",
        reset_button: "#reset_answers_3",
        answer_button: "#answers_3",
        answers: [3]
    });
    
    const buttons = document.querySelectorAll("button"); // تحديد جميع الأزرار
    
    buttons.forEach((btn) => {
        // إنشاء صوت خاص لكل زر بناءً على الـ data-sound الخاص به
        const audio = new Audio(btn.getAttribute("data-sound"));
    
        btn.addEventListener("click", (e) => {
          if (!audio.playing) {
            audio.play();
            btn.disabled = true; // تعطيل الزر أثناء تشغيل الصوت
    
            audio.onended = () => {
              btn.disabled = false;
            };
          }
        });
    
        Object.defineProperty(audio, "playing", {
          get: function () {
            return !this.paused && !this.ended;
          },
        });
    });


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
                new Audio("/sound/rightanswer.mp3").play()
            } else {
                feedbackSection.textContent = "حاول مرة أخرى!";
                feedbackSection.style.color = 'red';  // تغيير لون التغذية الراجعة إلى الأحمر للإشارة إلى الخطأ
            }
        });
    }

    verifyAllPlaceholders(mf, {num:4, den:9})
});
