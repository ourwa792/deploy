import zim from "https://zimjs.org/cdn/017/zim_physics.js";
import { ComputeEngine } from "https://unpkg.com/@cortex-js/compute-engine?module";
import {
  MathfieldElement,
  renderMathInDocument,
  renderMathInElement,
} from "//unpkg.com/mathlive?module";

window.addEventListener("DOMContentLoaded", () => {
  const scaling = "zim1";
  const width = 1024;
  const height = 768;

  const assets = [
    "cynthia.png",
    "school.jpg",
    "pragma_wink.png",
    "less-22-2.PNG",
  ];

  const path = "/assets/";

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

    const page2 = new Page(stageW, stageH, yellow, white);

    const page1 = new Page(stageW, stageH, "aqua", green);

    const pages = new Pages([page1, page2]).addTo();

    asset("school.jpg").sca(0.2).center(page1);
    asset("less-22-2.PNG").pos(250, 20).addTo(page1).drag().cur();

    const miss = new Sprite({ image: "cynthia.png", cols: 1, rows: 5 })
      .pos(140, 230)
      .addTo(page1)
      .sca(0.2)
      .run({ loop: true, rewind: true, time: 3, startFrame: 4, endFrame: 8 });

    new Sprite({ image: "pragma_wink.png", cols: 6, rows: 5 })
      .pos(710, 330)
      .addTo(page1)
      .sca()
      .run({ loop: true, time: 3, rewind: true, startFrame: 1, endFrame: 24 });

    const words = [
      "كيف نوازن بين كسرين لهما المقام نفسه يا براغما؟",
      "حسناً، كيف نرتب الكسور تصاعدياً أو تنازلياً إذن؟",
      "رائع شكراً لك",
    ];

    const dia1 = new Dialog({
      words: words,
      width: 200,
      height: 140,
      dialogType: "oval",
      borderWidth: 3,
      size: 30,
      font: "Comic Sans MS",
      color: dark,
      corner: 50,
      tailH: RIGHT,
      tailV: BOTTOM,
    })
      .pos(10, 140)
      .addTo(page1);

    dia1.on("click", () =>
      new Aud({
        file: "/sound/keefnwazen.mp3",
        volume: 0.8,
        loop: false,
        maxNum: 1,
        interrupt: "any",
      }).play()
    );

    const words2 = [
      "نوازن البسوط, البسط الأكبر هو للكسر الأكبر",
      "نوازن البسوط مثلاً: 1<3",
      "7>3",
      "ثم نرتب تصاعدياً أو تنازلياً",
    ];
    const arrow = new Dialog({
      words: words2,
      width: 200,
      height: 140,
      dialogType: "oval",
      borderWidth: 3,
      size: 30,
      font: "Comic Sans MS",
      color: dark,
      corner: 50,
      tailH: RIGHT,
      tailV: BOTTOM,
    })
      .pos(650, 240)
      .addTo(page1);

    //arrow.on("change", ()=> console.log("arrow"))
    arrow.arrowNext.on("click", () =>
      new Aud({
        file: "/sound/nwaznalbswt.mp3",
        volume: 0.8,
        loop: false,
        maxNum: 1,
        interrupt: "any",
      }).play()
    );

    new Sprite({ image: "pragma_wink.png", cols: 6, rows: 5 })
.pos(110, 130)
.addTo(page2)
.run({ loop: true, time: 3, rewind: true, startFrame: 1, endFrame: 24 });

new Dialog({
    words: "استخدم الميزان لتوازن الكسور",
    width: 200,
    height: 140,
    dialogType: "oval",
    borderWidth: 3,
    size: 30,
    font: "Comic Sans MS",
    color: dark,
    corner: 50,
    tailH: LEFT,
    tailV: BOTTOM,
  }).pos(300, 40).addTo(page2);

const physics = new Physics({
    gravity: 9.8
});

const beam = new Rectangle(600, 20, "brown").centerReg().pos(400,650)
.addTo(page2)
.addPhysics({
    dynamic: true,
    shape: "rectangle",
    friction: 0.5,
    linear: 0.5,
    angular: 0.8,
    density: 1
});

const pivot = new Circle(15, "black").centerReg().loc(beam.x,beam.y)
.addPhysics(false).addTo(page2);
physics.join({ obj1: beam, obj2: pivot, type: "revolute" });


var options = {
displayMode: true,
debugBounds: false,
strict: false
};


    /* 
var equation = new CanvasLatex.default(`
ax^2+bx+c+a^{(a^{3a}+3\\times4)}a^{a^a_a}_{a^a_a}\\\\
1+\\sqrt[3]{2}+\\sqrt[1923^234]{2^{2}}

var half = new CanvasLatex.default(`\\frac{1}{2}`, options)
var quart1 = new CanvasLatex.default(`\\frac{2}{8}`, options)
var quart2 = new CanvasLatex.default(`\\frac{1}{4}`, options)
var thmn = new CanvasLatex.default(`\\frac{1}{8}`, options)
//zimify(equation);

`, options);  */

    //equation.sca(1.5).center().expand(0).drag({all:true});

    
const weights = [
    { equation: "1/8", density: 0.125, color: "red" },
    { equation: "2/8", density: 0.25, color: "black" },
    { equation: "5/8", density: 0.625, color: "brown" },
    { equation: "7/8", density: 0.875, color: "green" },
    { equation: "1/4", density: 0.25, color: "orange" },
    { equation: "1/2", density: 0.5, color: "gold" },
    { equation: "1", density: 1.0, color: "purple" },
    { equation: "2", density: 2.0, color: "blue" }
];

// دالة لإنشاء الكتل وإضافتها للمسرح
weights.forEach((weight, index) => {
    const square = new Rectangle(80, 80, weight.color)
        .centerReg()
        .pos(100 + index * 100, 100) // وضع الكتل بشكل أفقي على المسرح
        .addPhysics({
            dynamic: true,
            shape: "rectangle",
            density: weight.density
        })
        .addTo(page2);

    new Label({
        text: weight.equation,
        size: 20,
        color: "white"
    }).centerReg(square)//.scaleTo(90,square); 

    // تفعيل خاصية السحب للكتل
    square.drag();
});

physics.drag(); 

    STYLE = {
      Arrow: {
        type: "angle",
        pages: pages,
        trans: "fan",
        rotation: series(0, 180),
      },
    };
    new Arrow(green, green, pages, RIGHT).pos(50, 50, RIGHT, BOTTOM);
    new Arrow(green, green, pages, LEFT).pos(50, 50, LEFT, BOTTOM);
  });

  const ce = new ComputeEngine();

  const fractions = [
    ["\\frac{4}{5}", "\\frac{1}{5}"],
    ["\\frac{2}{7}", "\\frac{6}{7}"],
    ["\\frac{8}{9}", "\\frac{4}{9}"],
    ["\\frac{11}{11}", "\\frac{10}{11}"],
    ["\\frac{5}{8}", "\\frac{5}{8}"],
    ["\\frac{10}{12}", "\\frac{11}{12}"],
  ];

  fractions.forEach((pair, index) => {
    document.getElementById(`fraction${index + 1}-1`).value = pair[0];
    document.getElementById(`fraction${index + 1}-2`).value = pair[1];
  });

  document.getElementById("checkAnswers").addEventListener("click", () => {
    let correct = true;
    fractions.forEach((pair, index) => {
      const selectedOperator = document.getElementById(
        `operator${index + 1}`
      ).value;

      //const expr1 = ce.box(latex1).N().valueOf()// parseFloat();
      //const expr2 = ce.box(latex2).N().valueOf()// parseFloat();

      /*  
        console.log(`expr1 (${pair[0]}) = `, expr1);
        console.log(`expr2 (${pair[1]}) = `, expr2);
      */

      const expr1 = ce.parse(pair[0]); //تعابير مغلفة
      const expr2 = ce.parse(pair[1]);

      /*   const frac1 = ce.parse("\\frac{1}{2}", { canonical: true });
        const frac2 = ce.parse("\\frac{1}{3}", { canonical: true });
        console.log(frac1.isGreater(frac2)); */

      let comparisonResult = false;
      if (selectedOperator === "<") {
        //comparisonResult = expr1 < expr2;
        comparisonResult = expr2.isGreater(expr1);
        console.log("comparisonResult " + comparisonResult);
      } else if (selectedOperator === "=") {
        //comparisonResult = Math.abs(expr1 - expr2) < 1e-10; // استخدام مقارنة قريبة جدًا بسبب القيم العشرية
        comparisonResult = expr1.isEqual(expr2);
        console.log("comparisonResult " + comparisonResult);
      } else if (selectedOperator === ">") {
        comparisonResult = expr1 > expr2;
        comparisonResult = expr1.isGreater(expr2);
        console.log("comparisonResult " + comparisonResult);
      }
      if (!comparisonResult) {
        correct = false;
      }
    });
    if (correct) {
      document.getElementById("result").textContent = "كل الإجابات صحيحة!";
      document.getElementById("result").style.color = "green";
    } else {
      document.getElementById("result").textContent =
        "هناك إجابات خاطئة، حاول مرة أخرى.";
      document.getElementById("result").style.color = "red";
    }
  });
  /* 
// تعريف كائن التمارين مع ترتيب الوحدات كقيم تصاعدية وتنازلية
const exercises = [
  {
      id: 1,
      units: [
          { display: "$\\frac{3}{11}$", value: 3 },
          { display: "$\\frac{6}{11}$", value: 6 },
          { display: "$\\frac{7}{11}$", value: 7 }
      ],
      ascendingOrder: [],
      descendingOrder: []
  },
  {
      id: 2,
      units: [
          { display: "$\\frac{1}{8}$", value: 1 },
          { display: "$\\frac{4}{8}$", value: 4 },
          { display: "$\\frac{7}{8}$", value: 7 },
          { display: "$\\frac{8}{8}$", value: 8 }
      ],
      ascendingOrder: [],
      descendingOrder: []
  }
];

// دالة لإعداد التمارين الثابتة
function initializeAllExercises() {
  exercises.forEach(exercise => {
      // إنشاء ترتيب تصاعدي وتنازلي وتخزينهما داخل الكائن
      exercise.ascendingOrder = exercise.units.map(unit => unit.value);
      exercise.descendingOrder = [...exercise.ascendingOrder].reverse();
      
      // إضافة التمرين للواجهة
      addExercise(exercise);
  });
}

// دالة لإضافة تمرين باستخدام إعدادات محددة
function addExercise({ id, units }) {
  const exerciseId = `exercise-${id}`;
  const exerciseTemplate = `
      <div class="exercise" id="${exerciseId}">
          <h3>تمرين ${id}</h3>
          <div class="options">
              <label>
                  <input type="radio" name="order-${exerciseId}" value="ascending" checked> ترتيب تصاعدي
              </label>
              <label style="margin-left: 20px;">
                  <input type="radio" name="order-${exerciseId}" value="descending"> ترتيب تنازلي
              </label>
          </div>

          <div id="sortable-container-${exerciseId}">
              <ul class="sortable-list" id="sortable-${exerciseId}">
                  <!-- سيتم تعبئة الوحدات ديناميكيا هنا -->
              </ul>
          </div>

          <button id="checkOrder-${exerciseId}">تحقق من الترتيب</button>
          <div id="feedback-${exerciseId}" class="feedback"></div>
      </div>
  `;

  document.getElementById('exercises-container').insertAdjacentHTML('beforeend', exerciseTemplate);

  // تهيئة قائمة sortable للتمرين
  initializeSortableList(exerciseId, units);

  document.getElementById(`checkOrder-${exerciseId}`).addEventListener("click", function () {
      checkOrder(id);
  });

  // تفعيل تغيير الترتيب عند تغيير نوعه
  document.querySelectorAll(`input[name="order-${exerciseId}"]`).forEach(radio => {
      radio.addEventListener("change", () => updateOrderDisplay(id, units));
  });
}

// دالة لعرض الوحدات بترتيب عشوائي
function shuffleArray(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}

// دالة إعداد قائمة sortable
function initializeSortableList(exerciseId, units) {
  const sortableList = $(`#sortable-${exerciseId}`);
  sortableList.empty();

  const shuffledUnits = shuffleArray(units);

  shuffledUnits.forEach(unit => {
      const listItem = `<li class="ui-state-default" data-value="${unit.value}">${unit.display}</li>`;
      sortableList.append(listItem);
  });

  sortableList.sortable({
      placeholder: "ui-sortable-placeholder",
      axis: "x",
      scroll: true,
      helper: 'clone',
      forcePlaceholderSize: true,
      tolerance: 'pointer',
      start: function (event, ui) {
          ui.helper.css({
              "opacity": "0.9",
              "width": "auto",
              "background": "#e0f7fa",
          });
      },
      stop: function (event, ui) {
          ui.item.css("opacity", "1");
      }
  });
  sortableList.disableSelection();
}

// تحديث عرض الترتيب في حالة اختيار تصاعدي أو تنازلي
function updateOrderDisplay(exerciseId, units) {
  const orderType = document.querySelector(`input[name="order-${exerciseId}"]:checked`).value;

  // تحديث الوحدات بناءً على الترتيب المختار
  const exercise = exercises.find(ex => ex.id === exerciseId);
  const sortedUnits = orderType === "ascending" ? exercise.units : [...exercise.units].reverse();

  const sortableList = $(`#sortable-${exerciseId}`);
  sortableList.empty();

  sortedUnits.forEach(unit => {
      const listItem = `<li class="ui-state-default" data-value="${unit.value}">${unit.display}</li>`;
      sortableList.append(listItem);
  });
}

// دالة للتحقق من الترتيب لكل تمرين
function checkOrder(exerciseId) {
  const selectedOrder = document.querySelector(`input[name="order-exercise-${exerciseId}"]:checked`).value;

  // البحث عن التمرين الصحيح بناءً على معرفه
  const exercise = exercises.find(ex => ex.id === exerciseId);
  const correctOrder = selectedOrder === "ascending"
      ? exercise.ascendingOrder
      : exercise.descendingOrder;

  // الحصول على القيم من العناصر الحالية في القائمة
  const units = $(`#sortable-exercise-${exerciseId}`)
      .children("li")
      .map(function () {
          return parseInt($(this).data("value"));
      })
      .get();

  const feedback = document.getElementById(`feedback-exercise-${exerciseId}`);
  console.log("Current order:", JSON.stringify(units));
  console.log("Correct order:", JSON.stringify(correctOrder));

  // مقارنة القيم مباشرةً
  if (JSON.stringify(units) === JSON.stringify(correctOrder)) {
      feedback.textContent = "ترتيب صحيح! أحسنت!";
      feedback.style.color = "green";
  } else {
      feedback.textContent = "ترتيب خاطئ. حاول مرة أخرى.";
      feedback.style.color = "red";
  }
}

// تهيئة جميع التمارين عند تحميل الصفحة
initializeAllExercises();

 */

  const btn = document.getElementById("btn1"); // تحديد جميع الأزرار

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

  var brd = JXG.JSXGraph.initBoard("jxgbox", {
    boundingbox: [-5, 5, 5, -5],
    keepaspectratio: true,
    axis: false,
  });

  let totalParts = 8;
  let coloredParts = 0;
  const radius = 2;

  const fractionText = brd.create(
    "text",
    [4, -4, () => `الكسر: <br> $ \\frac{${coloredParts}}{${totalParts}} $ `],
    {
      fontSize: 18,
      color: "blue",
    }
  );

  function updateFractionText() {
    fractionText.setText(`الكسر: \\(\\frac{${coloredParts}}{${totalParts}}\\)`);
    renderMathInElement(fractionText.rendNode);
  }

  function updateSectors() {
    brd.removeObject(brd.objectsList.filter((obj) => obj.elType === "sector"));

    for (let i = 0; i < totalParts; i++) {
      createSector(i);
    }

    updateFractionText();
    brd.update();
  }

  function createSector(index) {
    const angle1 = (index * 2 * Math.PI) / totalParts;
    const angle2 = ((index + 1) * 2 * Math.PI) / totalParts;

    //console.log("angle1"+angle1)
    //console.log("angle2"+angle2)

    const center = brd.create("point", [0, 0], { visible: false });
    const point1 = brd.create(
      "point",
      [radius * Math.cos(angle1), radius * Math.sin(angle1)],
      { visible: false }
    );
    const point2 = brd.create(
      "point",
      [radius * Math.cos(angle2), radius * Math.sin(angle2)],
      { visible: false }
    );

    const sector = brd.create("sector", [center, point1, point2], {
      fillColor: "white",
      fillOpacity: 0.8,
      strokeColor: "blue",
      strokeWidth: 1,
    });

    sector.isColored = false;

    sector.on("down", () => {
      if (!sector.isColored) {
        sector.setAttribute({ fillColor: "green", fillOpacity: 0.8 });
        coloredParts++;
      } else {
        sector.setAttribute({ fillColor: "white", fillOpacity: 0.8 });
        coloredParts--;
      }
      sector.isColored = !sector.isColored;

      if (coloredParts > 4) {
        brd.create("text", [4, 1, () => "<h2> صحيح ! </h2> "], {
          fontSize: 16,
          color: "green",
        });

        new Audio("/sound/rightanswer.mp3").play();
      }
      updateFractionText();
      brd.update();
    });
  }

  updateSectors();

  //
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

  function verifyAllPlaceholders(mf, correctValues) {

    const placeholders = mf.getPrompts();

    let feedbackSection = mf.nextElementSibling;
    if (!feedbackSection || !feedbackSection.classList.contains("feedback")) {
      feedbackSection = document.createElement("div");
      feedbackSection.classList.add("feedback");
      feedbackSection.style.marginTop = "5px"; // إضافة هامش أعلى قليلاً لتنسيق جيد
      feedbackSection.style.color = "blue"; // تغيير لون النص
      feedbackSection.style.fontWeight = "bold"; // جعل النص عريضاً
      mf.insertAdjacentElement("afterend", feedbackSection); // إدراج بعد الحقل
    }

    mf.addEventListener("input", function () {
      let allCorrect = true;

      placeholders.forEach((placeholderId) => {
        const userInput = mf.getPromptValue(placeholderId);
        const correctValue = correctValues[placeholderId];

        mf.setPromptState(
          placeholderId,
          userInput == correctValue ? "correct" : "incorrect"
        );

        // إذا كان أحد placeholders غير صحيح، نعين allCorrect إلى false
        if (userInput != correctValue) {
          allCorrect = false;
        }
      });

      // تحديث التغذية الراجعة بناءً على النتيجة النهائية
      if (allCorrect) {
        feedbackSection.textContent = "جميع القيم صحيحة!";
        feedbackSection.style.color = "green"; // تغيير لون التغذية الراجعة إلى الأخضر للإشارة إلى النجاح
      } else {
        feedbackSection.textContent = "حاول مرة أخرى!";
        feedbackSection.style.color = "red"; // تغيير لون التغذية الراجعة إلى الأحمر للإشارة إلى الخطأ
      }
    });
  }

  const mf1 = document.getElementById("mf1")
  const mf2 = document.getElementById("mf2")
  const mf3 = document.getElementById("mf3")
  const mf4 = document.getElementById("mf4")

  verifyAllPlaceholders(mf1, {"n1": 5, "d1": 6})
  verifyAllPlaceholders(mf2, {"n2": 4, "d2": 6})
  verifyAllPlaceholders(mf3, {"n3": 2, "d3": 6})
  verifyAllPlaceholders(mf4, {"n4": 3, "d4": 6})

});
