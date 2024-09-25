// import zim from "https://zimjs.org/cdn/016/zim.js";
import zim from "https://zimjs.org/cdn/016/zim_game.js";

const scaling = "zim1";
const width = 1440;
const height = 488;



var frame = new Frame({
  scaling,
  width,
  height,
  color: light,
  allowDefault: true,

  progress: new Waiter({ backgroundColor: blue, corner: 10 }),
});

frame.on("ready", function ready() {
  var stage = frame.stage;
  let stageW = frame.width;
  let stageH = frame.height;

  const placeValues = ["مليارات", "مئات الملايين", "عشرات الملايين", "ملايين", "مئات الآلاف", "عشرات الآلاف", "آلاف", "مئات", "عشرات", "الوحدات"];
  const columns = [];
  let randomNumber, digits, circles = [], placedDigits = [];
  const speech = new zim.Speech(); // إنشاء كائن Speech

  const emitter = new Emitter({
        obj: new Poly ([30,50,80],5,.5,[dark,silver,grey,red]),
        gravity: 0,
        force: {min:3, max:6},
        startPaused: true
    })

  // إعداد الأعمدة لعرض المنازل من اليمين إلى اليسار
  placeValues.forEach((place, index) => {
      const column = new zim.Rectangle(90, 100, "yellow")//.center();
      column.pos(1400-155 * index , 300); // تعديل لتكون الأعمدة من اليمين لليسار
      columns.push(column);

      const label = new zim.Label({
          text: place,
          size: 30,
          bold: true,
          color: "red",
            
      }).centerReg(column)
  });


  // إعداد الرقم العشوائي
  let numberLabel;
  function generateRandomNumber() {

      randomNumber = Math.floor(Math.random() * 9000000000) + 1000000000; // رقم من 10 خانات
      digits = String(randomNumber).split(""); // تقسيم الرقم إلى مصفوفة أرقام
      placedDigits = Array(digits.length).fill(false);
      console.log("Generated Number:", randomNumber);

      // عرض الرقم الذي يحتاج المستخدم لترتيبه
      if (numberLabel) {
          //numberLabel.text = "الرقم المطلوب: " + randomNumber; // تحديث التسمية الحالية
          numberLabel = new zim.Label({
            text: "الرقم المطلوب: " + randomNumber,
            size: 50,
            color: "black"
            }).pos(50, 50)
            .animate({
            props:{scaleY:0},
            time:2,
            rewind:true,
            loop:true,
            sequence:.1
            });
        } else {
            numberLabel = new zim.Label({
                text: "الرقم المطلوب: " + randomNumber,
                size: 50,
                color: "black"
            }).pos(50, 50)
            .animate({
            props:{scaleY:0},
            time:2,
            rewind:true,
            loop:true,
            sequence:.1
         });
      }

      // تحويل الرقم إلى كلمات باستخدام مكتبة number-to-words
      const numberInWords = numberToWords.toWords(randomNumber);
      console.log("Number in Words:", numberInWords);

      // نطق الرقم كاملاً بالإنجليزية
      speech.talk(numberInWords, null, 1, "en-US"); // نطق الرقم باستخدام الكلمات الإنجليزية
  }

  // إعداد الدوائر للأرقام
  function setupCircles() {
      circles.forEach(circleObj => circleObj.circle.removeFrom(stage));
      circles = [];

      const shuffledDigits = zim.shuffle(digits.slice());

      shuffledDigits.forEach((digit, index) => {
          const circle = new zim.Circle(40, "blue").addTo(stage);
          circle.pos(100 * index + 50, 100);

          circles.push({ circle, digit });

          const label = new zim.Label({
              text: digit,
              size: 40,
              color: "white"
          }).scaleTo(circle,40) .centerReg(circle)

          // السحب والإفلات
          circle.drag();
          circle.on("pressup", () => {
              const placedCorrectly = checkCorrectPlacement(circle, digit);

              if (placedCorrectly) {
                  circle.animate({ scale: 1.2 }, 0.1);
                  checkCompletion();
                  circle.color = green
              } else {
                  circle.color = "red";
              }
          });
      });
  }

  // التحقق إذا تم وضع الدائرة في الخانة الصحيحة بناءً على الرقم وموقعه
  function checkCorrectPlacement(circle, digit) {
      let correct = false;

      columns.forEach((column, columnIndex) => {
          if (circle.hitTestBounds(column) && digits[columnIndex] == digit && !placedDigits[columnIndex]) {
              correct = true;
              placedDigits[columnIndex] = true;
          }
      });

      return correct;
  }

  // تحقق من إكمال المهمة (جميع الأرقام في الأماكن الصحيحة)
  function checkCompletion() {
      let allCorrect = true;
      placedDigits.forEach((isPlaced) => {
          if (!isPlaced) {
              allCorrect = false;
          }
      });

      if (allCorrect) {
          emitter.spurt(40).center()
          numberLabel.removeFrom()
          generateRandomNumber(); // توليد رقم جديد
          setupCircles(); // إعداد دوائر جديدة
      }
  }

  // بدء اللعبة
  generateRandomNumber();
  setupCircles();
  stage.update();
  
});

window.addEventListener("DOMContentLoaded", (ev) => {
  var board = JXG.JSXGraph.initBoard("jxgbox", {
    boundingbox: [0, 1, 10, -1],
    //axis: true, // إخفاء المحاور الافتراضية
    gride: true,
    showNavigation: true,
    keepaspectratio: true,
    drawZero: true,
  });

  // رسم محور X فقط
  board.create(
    "axis",
    [
      [0, 0],
      [12, 0],
    ],
    {
      strokeColor: "red",
      ticks: {
        drawZero: true,
        drawLabels: true,
        fontSize: 15,
        majorHeight: 20,
        minorHeight: 15,
        strokeColor: "black",
        drawZero: true,
        label: {
          fontSize: 20,
          //toFraction: true,
          //useMathjax: true,
          anchorX: "middle",
          offset: [5, 15],
        },
      },
    }
  );

  const M = board.create("point", [1, 0], {
    fixed: true,
    fontSize: 30,
    label: { fontSize: 24 },
    strokeWidth: 8,
    name: "M",
    size: 2,
  });

  board.create("button", [
    3,
    0.9,
    "حرك النقطة للأمام",
    function () {
      let newX = M.X() + 1; // زيادة X بمقدار 1
      M.moveTo([newX, M.Y()], 1000); // تحريك النقطة إلى الموقع الجديد
    },
    { fontSize: 20 },
  ]);

  board.create("button", [
    6,
    0.9,
    "حرك النقطة للخلف",
    function () {
      let newX = M.X() - 1; // زيادة X بمقدار 1
      M.moveTo([newX, M.Y()], 1000); // تحريك النقطة إلى الموقع الجديد
    },
    { fontSize: 20 },
  ]);


  createMultipleChoice ({
    questions_html: '.questions_2_1',
    check_button: '#check_answers_2_1',
    reset_button: '#reset_answers_2_1',
    answer_button: '#answers_2_1',
    answers: [
    ['آحاد الألوف', 'احاد الالوف', 'آحاد الالوف', 'احاد الألوف'],
    ['عشرات الالوف', 'عشرات الألوف'],
    ['مئات الملايين'],
    ['4503444000']
    ]});


});
