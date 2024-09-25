import { ComputeEngine } from "https://unpkg.com/@cortex-js/compute-engine?module";
import {
  MathfieldElement,
  convertLatexToMarkup,
  renderMathInElement,
  renderMathInDocument,
} from "//unpkg.com/mathlive?module";
/*
import * as MathLive from '/library/mathlive.mjs';
import * as ComputeEngine from '/library/compute-engine.esm.js';
import * as ComputeEngine from '/library/math-json.esm.js';
 */

window.addEventListener("DOMContentLoaded", e => {

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
    renderMathInDocument() 

    const mf = document.getElementById("answer1");

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

    verifyAllPlaceholders(mf, {"num1":2, "den1":4, "num2":2, "den2":4});

    
    const ce = new ComputeEngine()
 /*    const result = ce.box(["Factor",
         ["Add", ["Multiply",  "x"], ["Multiply", 4, "x"]]])
         .evaluate()
    console.log(result)  */  

    /* const expr = ce.parse("-2\\times x + y \\times x")
    console.log(expr.latex)
    const result = ce.box(["Factor", expr]).evaluate()
    console.log("result "+ result) 
    
    const input = ce.parse(
        "\\frac{30 \\times x}{50 \\ times x}",
    {canonical: false}); 
    
    console.log(ce.box(["Factor", ["NumeratorDenominator", input]]
    ).evaluate().value ); 
    */
    const problems = [{
       latex: '\\( -(-2) \\times 3 \\times (-7y) \\quad \\textcolor{red}{.2}\\)',
       solution: ce.box(["Negate", ["Multiply",2,3,7,"y"]],{canonical:false}) ,
       steps: [
        'نضرب المضاريب العددية مع التقيد بقاعدة ضرب الاشارات: \\( -(-2) \\times 3 \\times (-7) = -42 \\)' ,
        `ثم نضع الرمز \\(y\\)
        فنجد \\( -(-2) \\times 3 \\times (-7y) = -42y \\) `]
        },
        {   latex: ' -(5 \\times 4z) \\quad \\textcolor{red}{.3}',
        solution: ce.box(["Negate", ["Multiply",4,5,"z"]], {canonical:false}) ,
        steps: ['نضرب المضاريب العددية مع التقيد بقاعدة ضرب الاشارات: \\( -(5 \\times 4) = -20 \\)' ,
        'ثم نضع الرمز \\(z\\) فنجد \\(-(5 \\times 4z) = -20z\\)' ] 
    }];

    const examples = [{
        latex: '\\( A=-3 \\times (4+5x) \\quad \\textcolor{red}{.1} \\)',
        solution: ce.box(["Multiply", -3, ["Add", ["Multiply",5,"x"],4]], {canonical:false}) ,
       steps: [
        '\\( A=-3 \\times (4 \\textcolor{red}{+} 5x) = (-3) \\times 4 \\textcolor{red}{+} (-3) \\times 5x = -12-15x \\)' ,
       ]
        },
        {   latex: '\\( B=-5 \\times (3-4y) \\quad \\textcolor{red}{.2} \\)',
            solution: ce.box(["Multiply", -5, ["Add", ["Multiply",-4,"y"],3]], {canonical:false}) ,
            steps: [
                '\\( B=-5 \\times (3 \\textcolor{red}{-} 4y) = -5 \\times 3 \\textcolor{red}{-} (-5) \\times (4y) = -15+20y \\)' ,  
            ]
        },
        {   latex: '\\( C=-4 \\times (-5+3z) \\quad \\textcolor{red}{.3} \\)',
            solution: ce.box(["Multiply", -4, ["Add", ["Multiply",3,"z"],-5]], {canonical:false}) ,
            steps: [
                '\\( C=-4 \\times (-5 \\textcolor{red}{+} 3z) = (-4) \\times (-5) \\textcolor{red}{+} (-4) \\times 3z = -20-12z \\)' ,  
            ]
        }
    ]

    const mithal = [{
        latex: '\\( A=2x-5x \\)' ,
        solution: ce.box(["Add",["Multiply",2,"x"],["Multiply",-5,"x"]]) ,
        steps: ['\\(2x-5x: \\quad A= 2 \\times x -5 \\times x = (2-5) \\times x \\) نحلل  <br></br> ثم نبسط الناتج: \\(A=(2-5) \\times x = -3x\\)']
    }]

    const tahakak = [
       { latex: "\\frac{5}{-4} \\times \\frac{-9}{13}"}, 
        {latex: "\\frac{-25}{11} \\times \\frac{9}{4}"},
        {latex: "\\frac{0}{7} \\times \\frac{-3}{4}"}
    ]

    //const mathElement = new MathfieldElement()
    //p2.innerHTML += convertLatexToMarkup(problems[0].latex)
    //p2.appendChild(mathElement);
    //p2.addEventListener("input", )
    //p3.innerHTML += convertLatexToMarkup(problems[1].latex)
    
    function renderProblems(containerId, problems) {
        const container = document.getElementById(containerId);
    
        problems.forEach((problem, index) => {
            // إنشاء عنصر <p> لعرض التمرين
            const problemElement = document.createElement('p');
            const feedback = document.createElement("div");
    
            // إضافة زر لإظهار الخطوات
            const button = document.createElement("button");
            button.textContent = "إظهار الخطوات";
    
            // إضافة عنصر MathField لكتابة الحل
            const mathField = new MathfieldElement();
            mathField.id = `answer-${index}`;  // تحديد ID لكل MathField لتسهيل الوصول إليه لاحقًا
    
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
                    stepsList = document.createElement('ul');
                    stepsList.id = `steps-${index}`;
                    problem.steps.forEach(step => {
                        const stepItem = document.createElement('li');
                        stepItem.innerHTML = step;
                        stepsList.appendChild(stepItem);
                        
                        // استخدام MathLive لعرض LaTeX
                        renderMathInElement(stepsList, {
                            delimiters: [
                                { left: "\\(", right: "\\)", display: false },
                                { left: "\\[", right: "\\]", display: true }
                            ]
                        });
                    });
                    problemElement.appendChild(stepsList);
                    button.textContent = "إخفاء الخطوات";  // تغيير النص عند عرض الخطوات
                } else {
                    // إخفاء الخطوات إذا كانت موجودة
                    stepsList.remove();
                    button.textContent = "إظهار الخطوات";
                }
            });
    
            // إضافة مستمع لحدث الإدخال لإعطاء التغذية الراجعة
            mathField.addEventListener('input', () => {
                const userInput = ce.parse(mathField.getValue('latex')).simplify();
                console.log('userInput '+ userInput)
                const correctAnswer = problem.solution.simplify();
                console.log('correctAnswer '+correctAnswer)
    
                if (userInput.isEqual(correctAnswer)) {
                    feedback.style.color = 'green';
                    feedback.textContent = 'إجابة صحيحة!';
                } else {
                    feedback.style.color = 'red';
                    feedback.textContent = 'حاول مرة أخرى.';
                }
            });
        });
    }

    renderProblems("problemContainer1", problems)
    renderProblems("problemContainer2", examples)
    renderProblems("problemContainer3", mithal)
    //const correctVal = ce.parse("-(-2) \\times 3 \\times (-7y)").evaluate()//.evaluate(); // --> ['Negate', ['Multiply', 42, 'y']]
    /* mathElement.addEventListener("input", function(){

        //console.log(mathElement.expression.json);
        let userInput = mathElement.expression.evaluate();
        console.log("userInput "+userInput)
        console.log("correctValue "+correctVal)
        if (userInput.isEqual(correctVal)) {
            console.log("RIGHT")
        } else {
            console.log("WRONG")
        }

    }) */

  /*  function insertLatex(i, id) {
    let prob1 = problems[i].solution;
    let latx = prob1.latex
    console.log(latx);
    let element = document.getElementById(`${id}`)
    element.innerHTML += convertLatexToMarkup(latx)
   } */

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
    latexRenderProblems("q1", tahakak) // بتشتغل لما كل الاسئلة لاتكس مباشر  

    const mathfields = document.querySelectorAll(".mathfield");

    const latexContainers = document.querySelectorAll(".latex");
    
    mathfields.forEach((mathf, index) => {
        mathf.addEventListener("input", ()=> {
            if (mathf.expression.isValid) {
                let result = mathf.expression.evaluate().latex;

                //console.log(result)
                latexContainers[index].innerHTML = convertLatexToMarkup(result)
            } else console.log("notValid")
        })
    })
 
        
    createMultipleUniqueAnswers ({
        questions_html: '.questions_5_1',
        check_button: '#check_answers_5_1',
        reset_button: '#reset_answers_5_1',
        answer_button: '#answers_5_1',
        answers: [2, 2, 1]
    });

    const elements = document.querySelectorAll("li");

    elements.forEach((el) => {
        //renderMathInElement(el); // render LaTeX داخل العنصر

    });

        
})