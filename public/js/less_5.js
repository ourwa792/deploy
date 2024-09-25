import { ComputeEngine } from "https://unpkg.com/@cortex-js/compute-engine?module";
import {
  MathfieldElement,
  convertLatexToMarkup,
  renderMathInElement,
  renderMathInDocument,
} from "//unpkg.com/mathlive?module";  

window.addEventListener("DOMContentLoaded", () => {

    const hoverSound = document.getElementById("hoverSound");
    document.querySelectorAll(".table-custom tbody tr").forEach((row) => {
        row.addEventListener("mouseenter", () => {
        hoverSound.play();
        });
    });


    const board = JXG.JSXGraph.initBoard('jxgbox', {
        boundingbox: [-5, 5, 5, -5],
        axis: false,
        keepAspectRatio:true
    });
    var A = board.create('point', [0, 3], { name: 'A',  });
    var B = board.create('point', [2, 0], { name: 'B',  });
    var C = board.create('point', [0,0], { name: 'C', fixed: true });
    
    var circle = board.create('circle',[B,C,A]) 
    
    var ABC = board.create('polygon', [A, B, C]);

    function updateTrigInfo() {
        var AB = A.Dist(B); // Length of side AB
        var AC = A.Dist(C); // Length of side AC
        var BC = B.Dist(C); // Length of side BC

        var angleA = Math.acos((AB * AB + AC * AC - BC * BC) / (2 * AB * AC));
        var angleB = Math.acos((AB * AB + BC * BC - AC * AC) / (2 * AB * BC));

        // تحويل الزوايا من الراديان إلى الدرجات
        var angleADeg = (angleA * 180 / Math.PI).toFixed(2);
        var angleBDeg = (angleB * 180 / Math.PI).toFixed(2);

     /* console.log('angleAdeg==>'+ angleADeg)
        console.log('angleBdeg==>'+ angleBDeg) */

        // النسب المثلثية للزاوية A
        var sinA = Math.sin(angleA).toFixed(2);
        var cosA = Math.cos(angleA).toFixed(2);
        var tanA = Math.tan(angleA).toFixed(2);


        // Trigonometric ratios for angle A
        var sinA = Math.sin(angleA).toFixed(2);
        var cosA = Math.cos(angleA).toFixed(2);
        var tanA = Math.tan(angleA).toFixed(2);

        // Trigonometric ratios for angle B
        var sinB = Math.sin(angleB).toFixed(2);
        var cosB = Math.cos(angleB).toFixed(2);
        var tanB = Math.tan(angleB).toFixed(2);

        // Display trigonometric ratios on the board
        document.getElementById('info').innerHTML = `
            <strong>النسب المثلثية للزاوية A:</strong><br>
            sin(A) = \\(\\dfrac{${BC.toFixed(2)}}{${AB.toFixed(2)}}\\) = sin(${angleADeg+'°'}) = ${sinA}  <br>
            cos(A) = \\(\\dfrac{${AC.toFixed(2)}}{${AB.toFixed(2)}}\\) = cos(${angleADeg+'°'}) = ${cosA} <br>
            tan(A) = \\(\\dfrac{${BC.toFixed(2)}}{${AC.toFixed(2)}}\\) = tan(${angleADeg+'°'})= ${tanA}<br><hr/>
            <strong>النسب المثلثية للزاوية B:</strong><br>
            sin(B) = \\(\\dfrac{${AC.toFixed(2)}}{${AB.toFixed(2)}}\\) = sin${angleBDeg+'°'} = ${sinB}  <br>
            cos(B) = \\(\\dfrac{${BC.toFixed(2)}}{${AB.toFixed(2)}}\\) = cos${angleBDeg+'°'} = ${cosB}  <br>
         tan(B) = \\(\\dfrac{${AC.toFixed(2)}}{${BC.toFixed(2)}}\\) =  tan${angleBDeg+'°'} = ${tanB} <br>
        `;
        //MathJax.typeset()
        const info = document.getElementById("info")
        renderMathInElement(info)
    }

    // Constrain the movement of points A and B
    A.on('drag', function() {
        A.moveTo([0, A.Y()]);
        updateTrigInfo();
    });

    B.on('drag', function() {
        B.moveTo([B.X(), 0]);
        //board.update()
        updateTrigInfo();
    }); 

    updateTrigInfo();


    const mf1 = document.getElementById("mf1")
    const mf2 = document.getElementById("mf2")
    const mf3 = document.getElementById("mf3")
    const mf4 = document.getElementById("mf4")
    const mf5 = document.getElementById("mf5")
    const mf6 = document.getElementById("mf6")

    // Initial update
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

    verifyAllPlaceholders(mf1, {num1:"BC", den1:"AC", num2:8})
    verifyAllPlaceholders(mf2, {num2:3 , den2:2})
    verifyAllPlaceholders(mf3, {num3:"EF" , den3:"FG", den4:75})
    verifyAllPlaceholders(mf4, {num4:1 , den4:2})
    verifyAllPlaceholders(mf5, {num5:"ML" , den5:"MK", den6:'7', den7:'3'})
    verifyAllPlaceholders(mf6, {num6:'1' , den6:'3'})
   
    createMultipleUniqueAnswers ({
        questions_html: '.questions_5_1',
        check_button: '#check_answers_5_1',
        reset_button: '#reset_answers_5_1',
        answer_button: '#answers_5_1',
        answers: [3, 1]
    });


    if (window.MathJax) {
        MathJax.typesetPromise().then(() => console.log("math rendered")).catch(function (err) {
            console.error('MathJax typeset failed: ' + err.message);
        });
    }

    /* 
    let equations = document.querySelectorAll('p');
    equations.forEach(equation => {
        let content = equation.innerHTML;
        content = content.replace(/\\\\/g, "\\").replace(/<\/?span[^>]*>/g, "");
        equation.innerHTML = content;
    });
 */
   
    // إعادة تشغيل MathJax على الصفحة بالكامل
    MathJax.typesetPromise();

});
