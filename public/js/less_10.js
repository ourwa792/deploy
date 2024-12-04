import { ComputeEngine } from "https://unpkg.com/@cortex-js/compute-engine?module";
import {
  MathfieldElement,
  convertLatexToMarkup,
  renderMathInElement,
  renderMathInDocument,
} from "//unpkg.com/mathlive?module"; 

window.addEventListener("DOMContentLoaded", (e) => {

  var board = JXG.JSXGraph.initBoard("jxgbox", {
    boundingbox: [-10, 2, 10, -2],  axis: false, 
    });

  board.create(
    "axis",
    [
      [-10, 0],
      [10, 0],
    ],
    {     position: 'fixed',

      strokeColor: "black",
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
          //offset: [5, 15],
        },
      },
    }
  ); 

  const point = board.create("point", [0, 0], {
    fixed: true,
    fontSize: 14,
    label: { fontSize: 14 },
    strokeWidth: 4,
    name: "A",
    size: 4,
    color:'blue',
    face:"o"
  });




 /*  
  // إضافة النقطة التي سيتم التحكم فيها
  var point = board.create("point", [0, 0], {
    name: "Result",
    size: 5,
    face: "o",
    color: "blue",
  }); */
  var operationLine;
  var operationText;
  
  // دالة لتحريك النقطة ورسم خط ونص يوضح العملية
  document.getElementById('operationClick').addEventListener("click", function applyOperation() {
    var inputValue = parseFloat(document.getElementById("inputValue").value); // قراءة القيمة من حقل الإدخال
    var operation = document.getElementById("operation").value; // قراءة العملية المختارة
    var newX;
    var operationSymbol; // رمز العملية
  
    if (!isNaN(inputValue)) {
      var startX = point.X(); // حفظ موقع النقطة قبل العملية
  
      switch (operation) {
        case "جمع":
          newX = startX + inputValue;
          operationSymbol = "+";
          break;
        case "طرح":
          newX = startX - inputValue;
          operationSymbol = "-";
        /*
          break;
         case "multiply":
          newX = startX * inputValue;
          operationSymbol = "×";
          break;
        case "divide":
          if (inputValue !== 0) {
            newX = startX / inputValue;
            operationSymbol = "÷"; 
          } else {
            alert("Cannot divide by zero!");
            return;
          }
            */
          break;
      }
  
      point.setPosition(JXG.COORDS_BY_USER, [newX, 0]); // تحديث موضع النقطة
  
      // إزالة الخط القديم والنص القديم إذا كان موجودًا
      if (operationLine) {
        board.removeObject(operationLine);
      }
      if (operationText) {
        board.removeObject(operationText);
      }
  
      // رسم خط يوضح العملية
      operationLine = board.create(
        "arrow",
        [
          [startX, 0],
          [newX, 0],
        ],
        {
          strokeColor: "red",
          strokeWidth: 2,
          name: operationSymbol,
        }
      );
  
      // إضافة نص توضيحي للعملية مع رمز العملية
      operationText = board.create(
        "text",
        [
          (startX + newX) / 2, // موقع النص بين النقطة القديمة والجديدة
          0.5, // ارتفاع النص فوق السهم
          `${operationSymbol} ${inputValue}`,
        ],
        {
          anchorX: "middle", // تمركز النص أفقياً
          fontSize: 16,
          strokeColor: "black",
        }
      );
  
      board.update(); // تحديث اللوحة
    } else {
      alert("Please enter a valid number");
    }
  })

  window.addEventListener('resize', function() {
    board.resizeContainer();
    board.fullUpdate();
});

  
  //----------------------

  const tahakak = [
    { latex: "(+2) + (-6)" },
    { latex: "(-3) - (+5)" },
    { latex: "(-4) + (-2)" },
    
    { latex: "(+9) - (-1)" },
    { latex: "(-8) + (+5) - (11)" },
    { latex: "(-7) - ((-9) - (-22))" },
    
    { latex: "-3 + 5 - 2 - 1" },
    { latex: "2 - 6 + 1 - 5 + 8" },
    { latex: "-22 + 10 - 32" }
];

  // إعداد MathLive و Compute Engine
  const ce = new ComputeEngine();

  // دالة لإظهار التمارين
  function latexRenderProblems(containerId, problems) {
      const container = document.getElementById(containerId);

      const row = document.createElement('div'); // إنشاء صف
      row.classList.add('row');

      problems.forEach((problem, index) => {
          const col = document.createElement('div'); // إنشاء عمود
          col.classList.add('col-md-4');
          
          const problemElement = document.createElement('div');
          //problemElement.classList.add('question-section');

          const feedback = document.createElement("div");
          feedback.style.marginTop = '10px';

          const mathField = new MathfieldElement();
          mathField.id = `mathAnswer-${index}`;  // تحديد ID لكل MathField لتسهيل الوصول إليه لاحقًا
          mathField.classList.add('math-field-container');

          problemElement.innerHTML = convertLatexToMarkup(problem.latex);
          
          // إدراج التمرين والحقل في العمود
          col.appendChild(problemElement);
          col.appendChild(mathField);
          col.appendChild(feedback);
          row.appendChild(col);

          // إضافة مستمع لحدث الإدخال لإعطاء التغذية الراجعة
          mathField.addEventListener('input', () => {
              const userInput = ce.parse(mathField.getValue('latex')).simplify();
              console.log('userInput ' + userInput);

              const correctExpr = ce.parse(problem.latex);
              console.log('correctExpr ' + correctExpr);

              if (userInput.isEqual(correctExpr)) {
                  feedback.style.color = 'green';
                  feedback.textContent = 'إجابة صحيحة!';
              } else {
                  feedback.style.color = 'red';
                  feedback.textContent = 'حاول مرة أخرى.';
              }
          });
      });
      container.appendChild(row);
  }
  // استدعاء الدالة لعرض التمارين في الصفحة
  latexRenderProblems('problem-container', tahakak);
  

  
  createMultipleChoice ({
    questions_html: '.questions_2_1',
    check_button: '#check_answers_2_1',
    reset_button: '#reset_answers_2_1',
    answer_button: '#answers_2_1',
    answers: [
    ["4","+4"],
    ['-25']
  ]});

  //----------

  jsPlumb.ready(function() {
    const questions = document.querySelectorAll(".matching-container .matching-item[id^='q']");
    const answers = document.querySelectorAll(".matching-container .matching-item[id^='a']");
    const feedback = document.getElementById("feedback");

    jsPlumb.setContainer(document.body);

    // تحديد المطابقة الصحيحة بناءً على المعرفات (ID)
    const correctMatches = {
        q1: 'a3', // السؤال q1 مطابق للإجابة a3
        q2: 'a2', // السؤال q2 مطابق للإجابة a2
        q3: 'a1', // السؤال q3 مطابق للإجابة a1
        q4: 'a5', // السؤال q4 مطابق للإجابة a5
        q5: 'a4'  // السؤال q5 مطابق للإجابة a4
    };

    function showFeedback(message, correct) {
        feedback.textContent = message;
        feedback.style.backgroundColor = correct ? '#4CAF50' : '#F44336';
        feedback.style.display = 'block';
        setTimeout(() => feedback.style.display = 'none', 2000);
    }

    function markConnection(connection, correct) {
        const color = correct ? 'green' : 'red';
        connection.setPaintStyle({ stroke: color, strokeWidth: 4 });
        showFeedback(correct ? 'إجابة صحيحة!' : 'إجابة خاطئة!', correct);
    }

    function resetClass(element) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
    }

    questions.forEach(question => {
        jsPlumb.addEndpoint(question, {
            anchors: "Right",
            endpoint: "Dot",
            paintStyle: { fill: "#7AB02C", radius: 7 },
            isSource: true,
            isTarget: false,
            connectorStyle: { stroke: "#7AB02C", strokeWidth: 2 },
            connectorOverlays: [
                ["Arrow", { width: 10, length: 10, location: 1 }]
            ]
        });
    });

    answers.forEach(answer => {
        jsPlumb.addEndpoint(answer, {
            anchors: "Left",
            endpoint: "Dot",
            paintStyle: { fill: "#7AB02C", radius: 7 },
            isSource: false,
            isTarget: true
        });
    });

    jsPlumb.bind("connection", function(info) {
        const questionId = info.sourceId;
        const answerId = info.targetId;

        resetClass(document.getElementById(questionId));
        resetClass(document.getElementById(answerId));

        // تحقق من أن الإجابة مطابقة للسؤال بناءً على المعرفات (ID)
        const correct = correctMatches[questionId] === answerId;

        markConnection(info.connection, correct);

        if (correct) {
            document.getElementById(questionId).classList.add('correct');
            document.getElementById(answerId).classList.add('correct');
        } else {
            document.getElementById(questionId).classList.add('wrong');
            document.getElementById(answerId).classList.add('wrong');
        }
    });
});

})



  
    /*
      منحط الاطوال لعكس فيثاغورث
    const board = JXG.JSXGraph.initBoard("jxgbox", { axis: true, });
  
          let p1 = board.create('point', [0, 0])
          let p2 = board.create('point', [4, 0])
          let p3 = board.create('point', [4, 3])
  
          board.create('polygon', [p1, p2, p3])
  
          let msg1 = 'Yes'   
          let msg2 = 'No'
  
          let isRightAngle = () => {
              let a = p1.Dist(p2)
              let b = p1.Dist(p3)
              let c = p2.Dist(p3)
              return (Math.abs(a * a + b * b - c * c) < 1 || Math.abs(a * a + c * c - b * b) < 1 || Math.abs(b * b + c * c - a * a) < 1)
          }
  
          let text = board.create('text', [4, 4, () => isRightAngle() ? msg1 : msg2])
  
          p1.on('drag', isRightAngle)
          p2.on('drag', isRightAngle)
          p3.on('drag', isRightAngle)
  */
