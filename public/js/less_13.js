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
                ['$', '$'],
                ['\\(', '\\)'],
            ],
            display: [
                ['\\[', '\\]'],
                ['$$', '$$'],
            ],
        },
    },
  });

  /* 
  <@127> yes, for some equations, using `expr.solve()`. For example: `ce.parse('2x + 1 = 5').solve('x')`
  */

  JXG.Options.grid.snapToGrid = true;

  const board = JXG.JSXGraph.initBoard("jxgbox", {
    boundingbox: [-4, 4, 4, -4],
    keepaspectratio: true,
    axis: false,
  });

  const a = board.create("point", [-4, 2], {});
  const b = board.create("point", [4, 2], {});
  const c = board.create("point", [-4, -2], {});
  const d = board.create("point", [4, -2], {});

  board.create("segment", [a, b], { strokeColor: "black" });
  board.create("segment", [d, b], { strokeColor: "black" });
  board.create("segment", [c, d], { strokeColor: "black" });
  board.create("segment", [a, c], { strokeColor: "black" });

  board.create(
    "polygon",
    [
      [-4, 2],
      [-1, 2],
      [-1, -1],
      [-4, -1],
    ],
    {
      name:"ac",withLabel:true,
      vertices: { visible: false },
      withLabel: false,
      hasInnerPoints: true,
      fillColor: "red",
      scalable: false,
    }
  );
  board.create(
    "polygon",
    [
      [-1, -1],
      [-4, -1],
      [-4, -2],
      [-1, -2],
    ],
    {
      name:"ad",withLabel:true,
      vertices: { visible: false },
      withLabel: false,
      hasInnerPoints: true,
      fillColor: "grey",
      scalable: false,
    }
  );
  board.create(
    "polygon",
    [
      [-1, -1],
      [-1, -2],
      [4, -2],
      [4, -1],
    ],
    {
      name:"bd",withLabel:true,
      vertices: { visible: false },
      withLabel: false,
      hasInnerPoints: true,
      fillColor: "yellow",
      scalable: false,
    }
  );
  board.create(
    "polygon",
    [
      [-1, 2],
      [4, 2],
      [4, -1],
      [-1, -1],
    ],
    {
      name: "bc",
      vertices: { visible: false },
      withLabel: false,
      hasInnerPoints: true,
      fillColor: "skyblue",
      scalable: false,
    }
  );

  board.create(
    "text",
    [0, 3.5, "حاول تحريك المستطيلات الملونة لترتيبها داخل المستطيل الكبير!"],
    {
      fontSize: 16,
      anchorX: "middle",
      color: "black",
    }
  );
  board.create(
    "text",
    [-3, 1, "ac"],
    {
      fontSize: 16,
      anchorX: "middle",
      color: "black",
    }
  );
  board.create(
    "text",
    [2, 1, "bc"],
    {
      fontSize: 16,
      anchorX: "middle",
      color: "black",
    }
  );
  board.create(
    "text",
    [-3, -1.5, "ad"],
    {
      fontSize: 16,
      anchorX: "middle",
      color: "black",
    }
  );
  board.create(
    "text",
    [2, -1.5, "bd"],
    {
      fontSize: 16,
      anchorX: "middle",
      color: "black",
    }
  );

  const ce = new ComputeEngine({ numericMode: 'decimal', precision: 10 });

  const expr = ce.parse("(2x-4) \\times (x-2)")
  //console.log(expr)
  const eq = ce.parse('x^2 - 4 = 0').solve('x').map((x) => x.toString())
  console.log(eq) 

  const ex1 = [{
    latex: '\\( 2-3 \\times (x+5) \\)',
    solution: ce.parse("2-3 \\times (x+5) ") ,
    steps: ["للضرب أولوية على الطرح فننشر بدايةً \\( 3(x+5) \\)",
      "\\( A=2-3(x+5) = 2-(3 \\times x + 3 \\times 5) \\)" ,
      "القوس مسبوق بإشارة - فيجب إنجاز عمليتي الضرب داخل القوسين." ,
      " \\( A=2-(3x+15) \\)" , "نحذف الاقواس: \\( 2-3x-15 \\)",
      "ننجز اختزال العبارة: \\( -3x+2-15=-3x-13 \\)"
     ]
    }];
  const ex2 = [{
    latex: '\\( (x-2) \\times (2x+5) \\)',
    solution: ce.parse("(x-2) \\times (2x+5) ") ,
    steps: ["  نبدأ بالنشر وفق \\( (a-b)k=ak-kb \\)",
      "\\( A=(x-2)(2x+5) = x \\times (2x + 5) -2 \\times (2x+5) \\)" ,
      " ننشر كل حد وفق \\( k(a+b)=ka+kb \\) " ,
      " فنحصل على: \\( 2x^2+5x-4x-10 = 2x^2+(5-4) \\times x -10 \\) " ,
      "ننجز اختزال العبارة: \\( 2x^2+x-10 \\)"
     ]
  }];
  const ex3 = [{
    latex: '\\( (x-1) \\times (x-2) \\)',
    solution: ce.parse("(x-1) \\times (x-2) ") ,
    steps: ["  نبدأ بالنشر وفق \\( (a-b)k=ak-kb \\)",
      "\\( A=(x-1)(x-2) = x \\times (x-2) -1 \\times (x-2) \\)" ,
      " ننشر كل حد وفق \\( k(a-b)=ka-kb \\) " ,
      " فنحصل على: \\( x^2-2x-x+2  \\) " ,
      "ننجز اختزال العبارة: \\( x^2-3x+2 \\)"
     ]
  }];


  function renderProblems(containerId, problems) {
    const container = document.getElementById(containerId);

    problems.forEach((problem, index) => {
      // إنشاء عنصر <p> لعرض التمرين
      const problemElement = document.createElement("p");
      const feedback = document.createElement("div");

      // إضافة زر لإظهار الخطوات
      const button = document.createElement("button");
      button.textContent = "إظهار الخطوات";

      // إضافة عنصر MathField لكتابة الحل
      const mathField = new MathfieldElement();
      mathField.id = `answer-${index}`; // تحديد ID لكل MathField لتسهيل الوصول إليه لاحقًا

      // إعداد HTML لعرض التمرين
      problemElement.innerHTML = convertLatexToMarkup(`${problem.latex}`);
      problemElement.appendChild(button); // إضافة زر الخطوات

      // إدراج التمرين والحقل في الحاوية
      container.appendChild(problemElement);
      container.appendChild(mathField);
      container.appendChild(feedback);

      // مستمع زر "إظهار الخطوات"
      button.addEventListener("click", () => {
        // إنشاء قائمة خطوات إذا لم تكن موجودة
        let stepsList = document.getElementById(`steps-${index}`);
        if (!stepsList) {
          stepsList = document.createElement("ul");
          stepsList.id = `steps-${index}`;
          problem.steps.forEach((step) => {
            const stepItem = document.createElement("li");
            stepItem.innerHTML = step;
            stepsList.appendChild(stepItem);

            // استخدام MathLive لعرض LaTeX
            renderMathInElement(stepsList, {
              delimiters: [
                { left: "\\(", right: "\\)", display: false },
                { left: "\\[", right: "\\]", display: true },
              ],
            });
          });
          problemElement.appendChild(stepsList);
          button.textContent = "إخفاء الخطوات"; // تغيير النص عند عرض الخطوات
        } else {
          stepsList.remove();
          button.textContent = "إظهار الخطوات";
        }
      });

      // إضافة مستمع لحدث الإدخال لإعطاء التغذية الراجعة
      mathField.addEventListener("input", () => {
        const userInput = ce.parse(mathField.getValue("latex")).simplify();
        console.log("userInput " + userInput);
        const correctAnswer = problem.solution.simplify();
        console.log("correctAnswer " + correctAnswer);

        if (userInput.isEqual(correctAnswer)) {
          feedback.style.color = "green";
          feedback.textContent = "إجابة صحيحة!";
        } else {
          feedback.style.color = "red";
          feedback.textContent = "حاول مرة أخرى.";
        }
      });
    });
  }


  renderProblems("ex1",ex1)
  renderProblems("ex2", ex2)
  renderProblems("ex3", ex3)

  const tahakak_1 = [
    { latex: " 3x - 2 \\times (3x -5)"}, 
    {latex: " 1-4x -5 (7- 3x)"},
  ]
  const tahakak_2 = [
    { latex: "(x+5)(x-3)"}, 
    {latex: "(3x-7)(2+x)"},
    {latex: "(5x-1)(2x-3)"},
    {latex: "(4x-2)(5x-3)"},
  ]

  function latexRenderProblems(containerId, problems) {
    const container = document.getElementById(containerId);

    problems.forEach((problem, index) => {
        // إنشاء عنصر <p> لعرض التمرين
        const problemElement = document.createElement('p');
        const feedback = document.createElement("div");

        // إضافة عنصر MathField لكتابة الحل
        const mathField = new MathfieldElement();
        mathField.id = `mathAnswer-${index}`;  // تحديد ID لكل MathField لتسهيل الوصول إليه لاحقًا
        mathField.classList.add('math-field-container')    

        // إعداد HTML لعرض التمرين
        problemElement.innerHTML = convertLatexToMarkup(`${problem.latex}`);    
        // إدراج التمرين والحقل في الحاوية
        container.appendChild(problemElement);
        container.appendChild(mathField);
        container.appendChild(feedback);

        // مستمع زر "إظهار الخطوات"
       

        // إضافة مستمع لحدث الإدخال لإعطاء التغذية الراجعة
        mathField.addEventListener('input', () => {
            const userInput = ce.parse(mathField.getValue('latex')).simplify();
            console.log('userInput '+ userInput)
            const correctExpr = ce.parse(problem.latex)
            console.log('correctExpr '+correctExpr)
            //const correctAnswer = problem.solution.simplify();

            if (userInput.isEqual(correctExpr)) {
                feedback.style.color = 'green';
                feedback.textContent = 'إجابة صحيحة!';
            } else {
                feedback.style.color = 'red';
                feedback.textContent = 'حاول مرة أخرى.';
            }
        });
    });
  } 

  latexRenderProblems("q1", tahakak_1)
  latexRenderProblems("q2", tahakak_2)

  
  const mathfields = document.querySelectorAll(".mathfield");

  const latexContainers = document.querySelectorAll(".latex");
  /*
  mathfields.forEach((mathf, index) => {
      mathf.addEventListener("input", ()=> {
          if (mathf.expression.isValid) {
              //let result = mathf.expression.evaluate().latex;
              let input = mathf.expression//getValue('math-json')
              //const res =  ce.parse(input);
              let result = ce.box(["Expand", input]);
              let answer = result.latex; 
              console.log(answer)
              latexContainers[index].innerHTML = convertLatexToMarkup(answer)
          } else console.log("notValid")
      })
  }); */
  

mathfields.forEach((mathf, index) => {
  mathf.addEventListener("change", () => {
      const input = mathf.expression; // الحصول على المدخل بصيغة LaTeX
      if (input.isValid) {
        try {
            latexContainers[index].classList.remove("incorrect")
            const result = ce.box(['Expand', input]).evaluate(); // تبسيط التعبير
            const answer = result.latex; // الحصول على النتيجة بصيغة LaTeX
            console.log(answer)
            latexContainers[index].innerHTML = convertLatexToMarkup(answer); // عرض النتيجة
        } catch (error) {
  
            console.log("Expression is not valid:", error);
        }
        
      } else {
        latexContainers[index].classList.add("incorrect")
        latexContainers[index].textContent = "العبارة غير صالحة"
      }
  });
});

    
  const buttons = document.querySelectorAll("button"); // تحديد جميع الأزرار

  buttons.forEach(btn => {
    // إنشاء صوت خاص لكل زر بناءً على الـ data-sound الخاص به
    const audio = new Audio(btn.getAttribute("data-sound"));

    // إضافة الحدث لكل زر
    btn.addEventListener("click", e => {
      // إذا كان الصوت لا يتم تشغيله بالفعل
      if (!audio.playing) {
        audio.play();
        btn.disabled = true;  // تعطيل الزر أثناء تشغيل الصوت

        // إعادة تفعيل الزر عند انتهاء الصوت
        audio.onended = () => {
          btn.disabled = false;
        };
      }
    });

    // خاصية إضافية للتأكد إذا كان الصوت يتم تشغيله
    Object.defineProperty(audio, 'playing', {
      get: function() {
        return !this.paused && !this.ended;
      }
    });
  });

});
