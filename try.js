//cloudinary.api.root_folders().then(res => console.log(res));

// cloudinary.api.sub_folders('sample').then(res => console.log(res));

// cloudinary.api
/* .delete_resources(['educational-resources/mpepfytgb0qukhhnvboi'],{
    type: 'authenticated', resource_type: 'raw'
})
.then (res => console.log(res))
.catch (err => console.log(err)); */

/* cloudinary.v2.uploader.upload_large("my_large_video.mp4", 
    { resource_type: "video" }, 
   function(error, result) {console.log(result, error); }); */

const WolframAlphaAPI = require("@wolfram-alpha/wolfram-alpha-api");
const waApi = WolframAlphaAPI("T6YRT5-7G4QGAUYRL");

/* const formatAnswer = answer => `<strong class="answer">${answer}</strong>`;
waApi.getFull('20! seconds in years').then((data) => {
  //console.log(formatAnswer(data));

  console.log(data)
}).catch(console.error); */

/* 
[{"time": 88, "asked": false, "correct": 3, "options": ["شكل خماسي يحوي زوايا و اضلاع", "شكل رباعي فيه ضلعان قائمان", "شكل رباعي فيه كل ضلعان متقابلان متوازيان و متساويان و زوياه قائمة", "مربع اضلاعه متعامدة"], "question": "ما هو تعريف المستطيل "}, 

{"time": 210, "asked": false, "correct": 2, "options": ["نجمع زواياه", "نجمع اطوال اضلاعه", "نطرح مساحته من مجموع اطوال اضلاعه"], "question": "إحدى طرق حساب محيط مستطيل هي؟"}]

[{"time": 88, "asked": false, "correct": 3, "options": ["شكل خماسي يحوي زوايا و اضلاع", "شكل رباعي فيه ضلعان قائمان", "شكل رباعي فيه كل ضلعان متقابلان متوازيان و متساويان و زوياه قائمة", "مربع اضلاعه متعامدة"], "question": "ما هو تعريف المستطيل "}, {"time": 210, "asked": false, "correct": 2, "options": ["نجمع زواياه", "نجمع اطوال اضلاعه", "نطرح مساحته من مجموع اطوال اضلاعه","نجمع الاضلاع ونقسم على 2"], "question": "إحدى طرق حساب محيط مستطيل هي؟"}] */

/*
exports.getMonthlyCompetitionWinners = async (req, res) => {
    try {
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
  
      const winners = await QuizResult.findAll({
        where: Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('createdAt')), currentMonth),
        where: Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), currentYear),
        attributes: [
          'userId',
          [Sequelize.fn('SUM', Sequelize.col('userScore')), 'totalScore']
        ],
        include: [{ model: User, attributes: ['username'] }],
        group: ['userId', 'User.id'],
        order: [[Sequelize.fn('SUM', Sequelize.col('userScore')), 'DESC']],
        limit: 10
      });
  
      res.render('quiz/monthlyWinners', { winners });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  
const getWolframAlphaAnswer = async (question) => {
    try {
      const response = await axios.get('https://api.wolframalpha.com/v2/query', {
        params: {
          input: question,
          appid: WOLFRAM_ALPHA_APP_ID,
          output: 'json'
        }
      });
  
      if (response.data.queryresult.success) {
        const pods = response.data.queryresult.pods;
        return pods.map(pod => ({
          title: pod.title,
          content: pod.subpods.map(subpod => subpod.plaintext).join('\n')
        }));
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching data from Wolfram Alpha:', error);
      return null;
    }
  };
  
  // مثال على كيفية استخدام الدالة
  (async () => {
    const question = 'how to draw a regular traingle';
    const answer = await getWolframAlphaAnswer(question);
    console.log('Answer:', answer);
  })(); 
  
  
  
  الانتقال الى ترميز جديد في قاعدة البيانات utf8mb4
  
  */

  
const { Lesson, Quiz, VideoLesson } = require("./model/association"); // استيراد Lesson من ملف association

(async () => {
  let newContent = String.raw`
<div class="container col-12 knowledge-section mt-4">
    <h2>تعلم</h2>

    <h5> خاصة 1</h5>
    <p>لجمع (أو طرح) الكسور ذات المقامات المتساوية، نجمع (أو نطرح) البسوط لهذه الكسور ونحتفظ بالمقام المشترك</p>
    <p >\( \frac{a}{b} - \frac{c}{b} = \frac{a-c}{b} \)</p>

        <!-- قسم الأمثلة -->
        <div class="row">

            <div class="col-6 col-md-6 col-sm-11 animate__animated animate__bounceInUp">
                <div class="example-box p-3">
                    <p>
                        مثال: \( \frac{1}{5} - \frac{3}{5} = \frac{1-3}{5} = \frac{-2}{5} = - \frac{2}{5} \)
                    </p>
                </div>
            </div>

            <div class="col-6 col-md-6 col-sm-11 animate__animated animate__bounceInUp">
                <div class="example-box p-3">
                    <p>مثال: \( \frac{-7}{3} + \frac{0.5}{3} = \frac{-6.5}{3} \)</p>
                </div>
            </div>
        </div>
        
        <h5> خاصة 2</h5>
        <div class="d-flex flex-column"> <!-- العناصر فوق بعض الدسبلي فليكس لذلك حطينا عناصر فقرات كثيرة -->
            لجمع ( أو طرح ) كسور عادية ذات مقامات مختلفة، نوحد مقاماتها، ثم نجري العمليات وفقّ الخاصة1. 
            <p class="example-box ">
            
                مثال:$\cdot \frac{5}{6}+\frac{3}{4}=\frac{10}{12}+\frac{9}{12}=\frac{10+9}{12}=\frac{19}{12}$  
            </p>

            <p>
                12هو مضاعف مشترك للعددين 6 و 4 فهو مقام مشترك للكسرين استبدلنا، بكل كسرٍ، كسراً يساويه مقامه يساوي 12 .
            </p>

            <p class="example-box">
                مثال: $-2.5-\frac{1}{3}=-\frac{5}{2}-\frac{1}{3}=-\frac{15}{6}-\frac{2}{6}=\frac{-17}{6}=-\frac{17}{6}$                
            </p>

            <p>
               6 هو مضاعف مشترك للعددين 2 و3 فهو مقام مشترك للكسرين. استبدلنا، بكل كسرٍ، كسراً يِساويه مقامه 6.
            </p>

            <p class="example-box">
                مثال: لإنجاز العملية  $\frac{1}{2}+\frac{3}{4}$  
            </p>
            <p>
                نلاحظ أنُ 4 هو مقام مشترك للكسرين. إذن  \( \frac{1}{2} + \frac{3}{4} = \frac{2}{4} + \frac{3}{4} = \frac{5}{4} \)
            </p>

        </div>
</div>
        <!-- اكتساب معارف -->
        <div class="container col-12 knowledge-section mt-4"> 

             <h2>اكتساب معارف</h2>
              كيف ننجز سلسلة من عمليات الجمع والطرح؟
             <br>
             لإنجاز سلسلة من عمليات الجمع والطرح على كسور عادية، يفضل أن نبدأ بإجراء العمليات على الكسور ذات المقامات المتساوية.
             
             <div class="example-box">
                مثال: أنجز حساب
                 \( A = \frac{5}{3} - \frac{7}{6} + \frac{8}{3} \)
                 بصيغة كسر عادي
             </div>
         
            <h5>الحل</h5>
        
            <ul class = "example-box math-equation">
                     <li>
                         \( \text{العدد 6 مضاعف للعدد 3 فلتوحيد مقامات الكسور الثلاثة، يكفي إيجاد مضاعفٍ للعددين 6 و 8} \)
                     </li>
                     <li>
                         \( \text{مضاعفات العدد 6 هي: 6 12 18 24 30 } \)..
                     </li>
                     <li>
                         \( \text{مضاعفات العدد 8 هي: 8 16 24 } \)..
                     </li>
                     <li>
                         \( \text{أصغر مضاعف للعددين 6 و 8 هو 24} \)
                     </li>
            </ul>

            <p class = "math-equation">
            \( A = \frac{40}{24}-\frac{28}{24}+\frac{9}{24}=\frac{40-28+9}{24}=\frac{21}{24}=\frac{\not 3 \times 7}{\not 3 \times 8}=\frac{7}{8}                             
            \)
            </p>
        </div>

</div>
  
`;

    let exercies = String.raw`
    <div class="container question-section col-12 col-sm-12 mt-4">
                    <h2>تحقق من فهمك</h2>
                    <h5>السؤال الاول</h5>
                        <div class="math-field-container">
                            <math-field read-only id=fraction3 >
                                \frac{5}{9}+\frac{1}{3}=\frac{5}{9}+ \frac{\placeholder[numerator1]{?}}{9} = \frac{\placeholder[numerator2]{?}}{9}
                            </math-field>
                        </div>
                    <h5>السؤال الثاني</h5>
                    
                    <div id="problems-container" class="row"></div>
                </div>        

    `

    const exercies2 = String.raw`
    <ol class="word_list questions_5_1">
                            <li> $ -4 × 4 × 7.4 $
                            <ol data-question="1" class="no_list">
                                <li>
                                <input id="option_1_1" data-option="option_1" value="1" type="radio" name="option_1" autocomplete="off"/>
                                <label for="option_1_1"><i class="far"></i></label> موجب
                                </li>
                                <li>
                                <input id="option_1_2" data-option="option_2" value="2" type="radio" name="option_1" autocomplete="off"/>
                                <label for="option_1_2"><i class="far"></i></label> سالب
                                </li>
                                
                            </ol>
                            </li>
                            <li>  $ -2 × (-21.4) × (-10) $
                            <ol data-question="2" class="no_list">
                                <li>
                                <input id="option_2_1" data-option="option_1" value="1" type="radio" name="option_2" autocomplete="off"/>
                                <label for="option_2_1"><i class="far"></i></label> موجب
                                </li>
                                <li>
                                <input id="option_2_2" data-option="option_2" value="2" type="radio" name="option_2" autocomplete="off"/>
                                <label for="option_2_2"><i class="far"></i></label> سالب
                                </li>
                                
                            </ol>
                            </li>
                        
                            <li> $ -2 × (-1.55) × (2) × 77 × 18 × (-0.14)(-0.12) $
                            <ol data-question="3" class="no_list">
                                <li>
                                <input id="option_3_1" data-option="option_1" value="1" type="radio" name="option_3" autocomplete="off"/>
                                <label for="option_3_1"><i class="far"></i></label> موجب
                                </li>
                                <li>
                                <input id="option_3_2" data-option="option_2" value="2" type="radio" name="option_3" autocomplete="off"/>
                                <label for="option_3_2"><i class="far"></i></label> سالب
                                </li>
                            
                            </ol>
                            </li> 


                    </ol>
                        
                        
                    <div class="btn_activities grid12">
                        <div id="check_answers_5_1">
                            <span>Check</span>
                        </div>
                        <div id="reset_answers_5_1">
                            <span>Reset</span>
                        </div>
                        <div id="answers_5_1">
                            <span>Answers</span>
                        </div>
                    </div>
    ` ;

    const exercies5 = String.raw`
    
    <div class="row">
                        <div class="col-8">

                            <ol class="word_list questions_5_1">
                                <li> ما قياس الزاوية BAC?
                                <ol data-question="1" class="no_list"> 
                                    <li> 
                                    <input id="option_1_1" data-option="option_1" value="1" type="radio" name="option_1" autocomplete="off"/>
                                    <label for="option_1_1"><i class="far"></i></label> 30°
                                    </li> 
                                    <li>
                                    <input id="option_1_2" data-option="option_2" value="2" type="radio" name="option_1" autocomplete="off"/>
                                    <label for="option_1_2"><i class="far"></i></label>  60°
                                    </li>
                                    <li>
                                    <input id="option_1_3" data-option="option_3" value="3" type="radio" name="option_1" autocomplete="off"/>
                                    <label for="option_1_3"><i class="far"></i></label>  45°
                                    </li>
                                </ol>
                                </li>
            
                                <li>  أحسب طول قطر المربع AC
                                    <ol data-question="2" class="no_list">
                                    <li>
                                        <input id="option_2_1" data-option="option_1" value="1" type="radio" name="option_2" autocomplete="off"/>
                                        <label for="option_2_1"><i class="far"></i></label> 
                                        <math><msqrt><mn>2</mn></msqrt></math>
                                    </li>
                                    <li>
                                        <input id="option_2_2" data-option="option_2" value="2" type="radio" name="option_2" autocomplete="off"/>
                                        <label for="option_2_2"><i class="far"></i></label> 
                                        <math><mn>2</mn><mo>×</mo><msqrt><mn>3</mn></msqrt></math>
                                    </li> 
                                    <li>
                                        <input id="option_2_3" data-option="option_3" value="3" type="radio" name="option_2" autocomplete="off"/>
                                        <label for="option_2_3"><i class="far"></i></label> 
                                        <math><msqrt><mn>5</mn></msqrt></math>
                                    </li>
                                    
                                    </ol>
                                </li>
            
                            </ol>

                        </div>
                        <div class="col-4">
                            <img src="https://res.cloudinary.com/dg0d0jmtz/image/upload/v1726436838/educational-resources/%D9%86%D8%B3%D8%A8_%D8%B2%D9%88%D8%A7%D9%8A%D8%A7_%D8%B4%D9%87%D9%8A%D8%B1%D8%A95_rx9ytt.png" class="img-fluid mb-3 " alt="img">
                        </div>
                    </div>

    `

    const content7 = String.raw`             
                    <p>
                      عند ضرب عدة أعداد مغايرة للصفر
                    </p>
                 
                    <ul>
                        <li>
                            إذا كان عدد الأعداد السالبة زوجياً, كان الجداء موجباً
                        </li>
                        <li>
                            ًإذا كان عدد الأعداد السالبة فردياً, كان الجداء سالبا
                        </li>
                    </ul>
            
                
                    <div class="example-box">
                        مثال :
                        إشارة $ (-5) × (20.87) × (-3) × (-20) × (-33.3) × (-24) $ سالبة

                    </div>
                    <div class="example-box">
                        مثال :
                        إشارة $ (-3) × (-4) × (2) × 5 × 3 $موجبة

                    </div>

                    <h2>كيف ننشر عبارة ونبسطها ؟</h2>

                    <div class="row">

                            <div class="example-box p-3">
                                <p>
                                    نشر:
                                    $
                                    a × (x+y) = ax + ay
                                    $
                                </p>
                            </div>
                            <div class="example-box p-3">
                                <p>
                                    نشر:
                                    $
                                        a × (x-y) = ax - ay
                                    $
                                </p>
                            </div>

                            <p>
                                في هذا النشر اعتمدنا على مايسمى <strong style="color: #d32f2f;">الخاصة التوزيعية</strong> (توزيع الضرب على الجمع)
                            </p>

                    </div>
  
    `
    const content5 = `   
                
                        
            
            <div class="row animate__animated animate__fadeInUp">
                <div class="col-5 math-equation math-equation-rtl">

                    <p>
                        نسب الزاوية 45° : <br>

                        <math xmlns="http://www.w3.org/1998/Math/MathML">
                            <mrow>
                                <mi>tan</mi>
                                <mn>45</mn>
                                <mo>&#xB0;</mo>
                                <mo>=</mo>
                                <msqrt>
                                    <mn>3</mn>
                                </msqrt>
                                <mo>و</mo>
                                <mi>cos</mi>
                                <mn>45</mn>
                                <mo>&#xB0;</mo>
                                <mo>=</mo>
                                <mfrac>
                                    <mn>1</mn>
                                    <mn>2</mn>
                                </mfrac>
                                <mo>و</mo>
                                <mi>sin</mi>
                                <mn>45</mn>
                                <mo>&#xB0;</mo>
                                <mo>=</mo>
                                <mfrac>
                                    <msqrt>
                                        <mn>3</mn>
                                    </msqrt>
                                    <mn>2</mn>
                                </mfrac>
                            </mrow>
                        </math>

                    </p>

                    <p class="">
                        نسب الزاوية 30° : <br>
                        <math xmlns="http://www.w3.org/1998/Math/MathML">
                            <mrow>
                                <mi>tan</mi>
                                <mn>30</mn>
                                <mo>و</mo>
                                <mo>=</mo>
                                <mfrac>
                                    <msqrt>
                                        <mn>3</mn>
                                    </msqrt>
                                    <mn>3</mn>
                                </mfrac>
                                <mo>و</mo>
                                <mi>cos</mi>
                                <mn>30</mn>
                                <mo>و</mo>
                                <mo>=</mo>
                                <mfrac>
                                    <msqrt>
                                        <mn>3</mn>
                                    </msqrt>
                                    <mn>2</mn>
                                </mfrac>
                                <mo>و</mo>
                                <mi>sin</mi>
                                <mn>30</mn>
                                <mo>&#xB0;</mo>
                                <mo>=</mo>
                                <mfrac>
                                    <mn>1</mn>
                                    <mn>2</mn>
                                </mfrac>
                            </mrow>
                        </math>

                    </p>

                    <p class="">
                        نسب الزاوية 60° : <br>
                        <math xmlns="http://www.w3.org/1998/Math/MathML">
                            <mrow>
                                <mi>tan</mi>
                                <mn>60</mn>
                                <mo>&#xB0;</mo>
                                <mo>=</mo>
                                <msqrt>
                                    <mn>3</mn>
                                </msqrt>
                                <mo>و</mo>
                                <mi>cos</mi>
                                <mn>60</mn>
                                <mo>&#xB0;</mo>
                                <mo>=</mo>
                                <mfrac>
                                    <mn>1</mn>
                                    <mn>2</mn>
                                </mfrac>
                                <mo>و</mo>
                                <mi>sin</mi>
                                <mn>60</mn>
                                <mo>&#xB0;</mo>
                                <mo>=</mo>
                                <mfrac>
                                    <msqrt>
                                        <mn>3</mn>
                                    </msqrt>
                                    <mn>2</mn>
                                </mfrac>
                            </mrow>
                        </math>

                    </p>

                </div>

                <div class="col-md-4 d-flex justify-content-between" style="max-width: 100%;">
                    <img src="https://res.cloudinary.com/dg0d0jmtz/image/upload/v1726350473/educational-resources/%D9%86%D8%B3%D8%A8_%D8%B2%D9%88%D8%A7%D9%8A%D8%A7_%D8%B4%D9%87%D9%8A%D8%B1%D8%A91_paacct.png" class="img-fluid mb-3 " alt="img">
                    <img src="https://res.cloudinary.com/dg0d0jmtz/image/upload/v1726350454/educational-resources/%D9%86%D8%B3%D8%A8_%D8%B2%D9%88%D8%A7%D9%8A%D8%A7_%D8%B4%D9%87%D9%8A%D8%B1%D8%A9_assgnc.png" class="img-fluid mb-3 animate__animated animate__zoomIn"
                        alt="img">
                </div>
            </div>




            <div class="col-12 knowledge-section mt-4 animate__animated animate__fadeInLeft">
                <h2>تعلم</h2>


                <p>المثلث القائم الذي قياسا زاويتيه الحادّتين 30° و 60° نسميه المثلث الثلاثيني الستيني. في المثلث ABC القائم
                    في A،
                    وفي حالة B = 30°
                    و C = 60° وجدنا أن
                    <math>
                        <mi>AC</mi>
                        <mo>=</mo>
                        <mi>CO</mi>
                        <mo>=</mo>
                        <mfrac>
                            <mn>1</mn>
                            <mn>2</mn>
                        </mfrac>
                    </math>

                    <strong style="color: #ff9f43;">أي إذا كان قياس إحدى زوايا مثلث قائم °30 فإن طول الضلع المقابل لهذه
                        الزاوية يساوي نصف طول الوتر.</strong>

                </p>

                <p class="animate__animated animate__fadeIn">تأمل الشكل المجاور لتطبيق هذه النسب:</p>

                <table class="table table-bordered table-custom animate__animated animate__fadeInUp">
                    <thead>
                        <tr>
                            <th>θ̂</th>
                            <th>30°</th>
                            <th>45°</th>
                            <th>60°</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>sin</td>
                            <td><math class="math">
                                    <mfrac>
                                        <mn>1</mn>
                                        <mn>2</mn>
                                    </mfrac>
                                </math></td>
                            <td><math class="math">
                                    <mfrac>
                                        <msqrt>
                                            <mn>2</mn>
                                        </msqrt>
                                        <mn>2</mn>
                                    </mfrac>
                                </math></td>
                            <td><math class="math">
                                    <mfrac>
                                        <msqrt>
                                            <mn>3</mn>
                                        </msqrt>
                                        <mn>2</mn>
                                    </mfrac>
                                </math></td>

                        </tr>
                        <tr>
                            <td>cos</td>
                            <td><math class="math">
                                    <mfrac>
                                        <msqrt>
                                            <mn>3</mn>
                                        </msqrt>
                                        <mn>2</mn>
                                    </mfrac>
                                </math></td>
                            <td><math class="math">
                                    <mfrac>
                                        <msqrt>
                                            <mn>2</mn>
                                        </msqrt>
                                        <mn>2</mn>
                                    </mfrac>
                                </math></td>
                            <td><math class="math">
                                    <mfrac>
                                        <mn>1</mn>
                                        <mn>2</mn>
                                    </mfrac>
                                </math></td>
                        </tr>
                        <tr>
                            <td>tan</td>
                            <td><math class="math">
                                    <mfrac>
                                        <msqrt>
                                            <mn>3</mn>
                                        </msqrt>
                                        <mn>3</mn>
                                    </mfrac>
                                </math></td>
                            <td>1</td>
                            <td><math>
                                    <msqrt>
                                        <mn>3</mn>
                                    </msqrt>
                                </math></td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="row">
                    <div class="col-sm-6 mb-3 mb-sm-0">
                    <div class="card" style="margin-left: 3px;">
                        <div id="jxgbox" class="card" style="width: 500px; height: 300px;"></div>
                    </div>
                    </div>
                    <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body col-4 col-sm-12">
                            <div class="card-text text-center" id="info"></div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                <div class="container col-12 question-section col-12 col-sm-12 mt-4"> 
                    <h2>اكتساب معارف</h2>
                    <h5>كيف نحسب طول الوتر بمعرفة طول ضلع قائم و قياس زاوية حادة؟</h5>
                    <p style=" border: 2px solid #5c2e03; border-radius: 20%;"> الضلع التي نعرف طولها, تقابل الزاوية, لذلك نستعمل تعريف الجيب.
                    </p>
                

                    <!-- example-1- -->
                    <div class="row">

                        <div class="col-6 col-md-6 col-sm-11 justify-content-between animate__animated animate__bounceInUp">
                                <p cl style="background-color: #ffcc80;">
                                    مثال:  ABC مثلث قائم في B, 
                                    $ BC= 8cm و \\quad \\widehat{BAC} = 60° \\quad $
                                    احسب الطول AC
                                </p>
                                <h5>الحل</h5>
                                <p >في المثلث ABC القائم في B:
                                    <math-field id="mf1" read-only >
                                        \\sin{ \\hat{A}} = \\frac{\\placeholder[num1]{?}}{\\placeholder[den1]{?}}
                                    = \\sin{60°} = \\frac{\\placeholder[num2]{?}}{AC}
                                    </math-field>
                                    إذاً
                                    <math-field id="mf2" read-only class="math-field-container">
                                        \\frac{ \\sqrt { \\placeholder[num2]{?}} } { \\placeholder[den2]{?} } =
                                        \\frac{8}{AC}
                                    </math-field>
                                    ومنه $ AC = \\frac{16}{\\sqrt{3}} $
                                </p>
                        </div>

                        <div class="col-2 col-md-6 col-sm-11 animate__animated animate__bounceInUp">
                            <img src="https://res.cloudinary.com/dg0d0jmtz/image/upload/v1726434407/educational-resources/%D9%86%D8%B3%D8%A8_%D8%B2%D9%88%D8%A7%D9%8A%D8%A7_%D8%B4%D9%87%D9%8A%D8%B1%D8%A9-%D9%85%D8%AB%D8%A7%D9%84_vmfggs.png" alt="img">
                        </div>
                    
                    </div>
                    <!-- example -1- end -->
                    
                    <h5>كيف نحسب طول ضلع قائم بمعرفة طول ضلع الوتر و قياس زاوية حادة؟</h5>
                    <p style=" border: 2px solid #5c2e03; border-radius: 15%;"> الضلع التي نعرف طولها, هي الوتر,ونحن نبحث عن طول الضلع المجاورة للزاوية لذلك نستعمل تعريف التجيب.
                    </p>

                    <!-- example -2- -->
                    <div class="row">

                        <div class="col-6 col-md-6 col-sm-11 animate__animated animate__bounceInUp">
                                <p style="background-color: #ffcc80;">مثال:  EFG مثلث قائم في E, 
                                    $ FG= 7.5 cm و \\quad \\widehat{EFG} = 60° \\quad $
                                    احسب الطول FE
                                </p>
                                <h5>الحل</h5>
                                <p >في المثلث EFG القائم في B:
                                    <math-field id="mf3" read-only class="math-field-container">
                                        \\cos{ \\hat{F}} = \\frac{\\placeholder[num3]{?}}{\\placeholder[den3]{?}}
                                    = \\cos{60°} = \\frac{EF}{\\placeholder[den4]{?}}
                                    </math-field>
                                    إذاً
                                    <math-field id="mf4" read-only class="math-field-container">
                                        \\frac{ \\sqrt { \\placeholder[num4]{?}} } { \\placeholder[den4]{?} } =
                                        \\frac{EF}{75}
                                    </math-field>
                                    ومنه $ AC = \\frac{75}{2} $
                                </p> 
                        </div>

                        <div class="col-3 col-md-6 col-sm-11 animate__animated animate__bounceInUp">
                            <img src="https://res.cloudinary.com/dg0d0jmtz/image/upload/v1726434562/educational-resources/%D9%86%D8%B3%D8%A8_%D8%B2%D9%88%D8%A7%D9%8A%D8%A7_%D8%B4%D9%87%D9%8A%D8%B1%D8%A93_jatshh.png" width="190" height="130" class="mb-3 " alt="img">
                        </div>
                    </div>
                    <!-- example -2- end -->
                
                
                    <h5>كيف نحسب طول ضلع قائم بمعرفة قياس زاوية حادة وطول الضلع القائم الاخرى؟</h5>
                    <p style=" border: 2px solid #5c2e03; border-radius: 15%;"> الضلع التي نعرف طولها, هي الوتر,ونحن نبحث عن طول الضلع المجاورة للزاوية لذلك نستعمل تعريف التجيب.
                    </p>

                    <!-- example -3- -->

                    <div class="row">

                        <div class="col-6 col-md-6 col-sm-11 animate__animated animate__bounceInUp">
                                <p style="background-color: #ffcc80;">مثال:  KLM مثلث قائم في M, 
                                    $ KM= 7 \\sqrt{3} و \\quad \\widehat{MKL} = 30° \\quad $
                                    احسب الطول ML
                                </p>
                                <h5>الحل</h5>
                                <p >في المثلث KLM القائم في K:
                                    <math-field id="mf5" read-only class="math-field-container">
                                        \\tan{ \\hat{K}} = \\frac{\\placeholder[num5]{?}}{\\placeholder[den5]{?}}
                                    = \\tan{30°} = \\frac{ML}{\\placeholder[den6]{?} \\times \\sqrt{ \\placeholder[den7]{?}}}
                                    </math-field>
                                    أي أن:
                                    <math-field id="mf6" read-only class="math-field-container">
                                    \\frac{ \\placeholder[num6]{?} } { \\sqrt { \\placeholder[den6]{?}} } = 
                                        \\frac{ML}{7 \\times \\sqrt{3}}
                                    </math-field>
                                    ومنه $ ML = 7 $
                                </p> 
                        </div>

                        <div class="col-3 col-md-6 col-sm-11 animate__animated animate__bounceInUp">
                            <img src="https://res.cloudinary.com/dg0d0jmtz/image/upload/v1726436618/educational-resources/%D9%86%D8%B3%D8%A8_%D8%B2%D9%88%D8%A7%D9%8A%D8%A7_%D8%B4%D9%87%D9%8A%D8%B1%D8%A94_sht5u2.png" class="img-fluid mb-3 " alt="img">
                        </div>
                        
                        
                    </div>

    `

    const exercies8 = String.raw`
     <div class="question-section questions_2_1">
            <h2>تحقق من فهمك</h2>

            <h5>السؤال الاول</h5>
            <p>
                في العدد 525793 يظهر العدد 5 مرتين ما هي قيمته في كل من المرتين
            </p>       
                <ul class="grid12 no_list ">
                    <li>
                        <span class="bold lesson_color">1.</span>  <input size="8" type="text" autocomplete="off"/>.
                    </li>
                    <li>
                        <span class="bold lesson_color">2.</span>  <input size="8" type="text" autocomplete="off"/>.
                    </li>
            
                </ul>
                
                
                <h2>تدريب</h2>

                <h5>السؤال الاول</h5>
                <p>
                    ماقيمة العدد 2 في العدد 1235698743

                    <ul class="grid12 no_list ">
                        <li>
                            <span class="bold lesson_color"></span>  <input size="8" type="text" autocomplete="off"/>.
                        </li>
                
                    </ul>



                </p>
    
                <p>
                    إن متوسط المسافة بين كوكب نبتون والشمس هو 4مليار  503 مليوناً و 444 ألف كيلومتر, اكتب هذا العدد بالصيغة العددية.
                    <ul class="grid12 no_list ">
                        <li>
                            <span class="bold lesson_color"></span>  <input size="9" type="text" autocomplete="off"/>.
                        </li>
                
                    </ul>



                </p>
    
                <div class="btn_activities">
                    <div id="check_answers_2_1">
                        <span>Check</span>
                    </div>
                    <div id="reset_answers_2_1">
                        <span>Reset</span>
                    </div>
                    <div id="answers_2_1">
                        <span>Answers</span>
                    </div>
                </div>


            </div>
    `

    const content8 = String.raw`
    <h5>قيمة العدد حسب منزلته</h5>
            <p>
                كل عدد له قيمة حسب منزلته تساعدنا في كتابة و قراءة العدد وإجراء العمليات الحسابية عند استعماله.
                <br>
                مثلا في العدد 143288 قيمة العدد 4 هي 40000 لأنه مكتوب في منزلة عشرات الألوف.
                يمكن كتابة العدد بثلاث صيغ مختلفة:
                الصيغة العددية (القياسية): 83000050002
                <br>
                الصيغة اللفظية: ثلاثة و ثمانون مليار و خمسون الفا واثنان
                <br>
            </p>
    `
    
    const exercies10 = String.raw`
     <div class="col-lg-12 col-md-12 col-sm-12 question-section questions_2_1">
            <h2>تدرب</h2>

            <h5>السؤال الاول</h5>
            <p>
                ارتفع مصعد من الطابق الارضي بمقدار 4 طوابق. اكتب العدد الصحيح الدال على مكان وجود المصعد

                <ul class="grid12 no_list ">
                    <li>
                        <span class="bold lesson_color"></span>  <input size="8" type="text" autocomplete="off"/>.
                    </li>
            
                </ul>

            </p>
            <h5>السؤال الثاني</h5>
            <p>
                غطست غواصة 25 متراً عن سطح البحر اكتب العدد الصحيح الدال على ارتفاع الغواصة عن سطح البحر
                <ul class="grid12 no_list ">
                    <li>
                        <span class="bold lesson_color"></span>  <input dir="auto" size="8" type="text" autocomplete="off"/>.
                    </li>
            
                </ul>
                
            </p> 


            <div class="btn_activities">
                <div id="check_answers_2_1">
                    <span>Check</span>
                </div>
                <div id="reset_answers_2_1">
                    <span>Reset</span>
                </div>
                <div id="answers_2_1">
                    <span>Answers</span>
                </div>
            </div>

            <h5>السؤال الثالث</h5>
            <p>أوجد ناتج مايلي</p>

            <div dir="ltr" id="problem-container">
              
            </div>

            <h5>السؤال الرابع</h5>
            <p>صل بين كل عبارة مع صيغتها المختزلة</p>


            <div class="container-fluid" dir="auto">
                <div class="matching-container row justify-content-center">
                    <div class="col-lg-4 col-md-5 col-12 mb-4">
                        <div class="matching-item" id="q1">
                            (+9)-(+3)
                        </div>
                        <div class="matching-item" id="q2">
                            (-4)-(-7)
                        </div>
                        <div class="matching-item" id="q3">
                            (-6)-(+2)
                        </div>
                        <div class="matching-item" id="q4">
                            (+9)-(-3)
                        </div>
                        <div class="matching-item" id="q5">
                            (+6)-(-2)
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-5 col-12 offset-space">
                        <div class="matching-item" id="a1">
                            -6-2
                        </div>
                        <div class="matching-item" id="a2">
                            -4+7
                        </div>
                        <div class="matching-item" id="a3">
                            9-3
                        </div>
                        <div class="matching-item" id="a4">
                            6+2
                        </div>
                        <div class="matching-item" id="a5">
                            9+3
                        </div>
                    </div>
                </div>
            </div>
            <div id="feedback" class="feedback"></div>


        </div>
    `
    const content10 = String.raw`
            <p>
                <ul class="example-box">
                    <li>عندما نجمع عددين  من اشارة واحدة نجمع بعديهما عن الصفر ثم نلافق بالناتج الاشارة المشتركة</li>
                    <li>عندما نجمع عددين من اشارتين مختلفتين نطرح بعد اقربهما عن الصفر من بعد الاخر ثم نرفق بالناتج اشارة الابعد</li>
                </ul>
                
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-12 example-box math-equation-ltr">
                        (+8)+(-11) = -3 
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 example-box math-equation-ltr" >
                        (-13)+(-5) = -18 
                    </div>
                </div>
            </p>   
            
            <div class="container mt-5">
                <h5 >الكتابة المختزلة لعملية الجمع:</h5>
                <ul class="">
                    <li>يمكن الاستغناء عن الأقواس وإشارة عملية الجمع.</li>
                    <li>يمكن الاستغناء عن إشارة (+) عند كتابة الأعداد الموجبة.</li>
                    <li>أو بعد إشارة (=) أو بداية عملية حسابية.</li>
                </ul>
        
                <div class="row">
                    <div class="col-lg-6">
                        <table class="table table-custom mt-4 text-end">
                            <thead>
                                <tr>
                                    <th>الكتابة المختزلة</th>
                                    <th>العملية</th>
                                </tr>
                            </thead>
                            <tbody dir="ltr">
                                <tr>
                                    <td>-5 + 8</td>
                                    <td>(-5) + (+8)</td>
                                </tr>
                                <tr>
                                    <td>-15 - 3</td>
                                    <td>(-15) + (-3)</td>
                                </tr>
                                <tr>
                                    <td>9 - 11</td>
                                    <td>(+9) + (-11)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
        
                    <div class="col-lg-6 example-box math-equation-ltr">
                        <p class="arrow">➔ -5 + 8 = 3</p>
                        <p class="arrow">➔ -15 - 3 = -18</p>
                        <p class="arrow">➔ 9 - 11 = -2</p>
                    </div>
                </div>
        
                <h5 class="mt-4">أمثلة:</h5>
        
                    <p><span class="highlighted-text">الجمع عملية تبديلية</span> إذا كان a, b عددان، فإن a + b = b + a</p>
                    <p><span class="highlighted-text">خاصة 1:</span> إذا كانت a + b + c ثلاثة أعداد، فإن a + b + c = (a + b) + c = a + (b + c)</p>
                    <p><span class="highlighted-text">خاصة 2:</span> الجمع عملية تجميعية أي أننا نستطيع إجراء عملية الجمع وفق أي ترتيب.</p>

            </div>

            <h5>الطرح</h5>

            <p>
             باستخدام مستقيم الاعداد:         
            </p>
            <p>
            حدد العدد الأول ثم انتقل لليمين لطرح عدد سالب وإلى اليسار لطرح عدد موجب.          
            </p>
    `

    const content12 = String.raw`
        <p> في الشكل المرافق:                   
                    <ul>
                        <li>قياسا زاويتين مركزيتين تقابلان قوسين متساويين في دائرة متساويان, وبالعكس </li>
        
                        <li>                           
                            قياسا زاويتين محيطيتين تقابلان قوسين متساويين في دائرة متساويان, وبالعكس
                        </li>
                    </ul>
        </p>
    `

    const exercies12 = String.raw`
     <p> قل إن كانت كل زاوية في كل شكل مركزية ام محيطية ام ليست مركزيةوليست محيطية</p>

            <ul class="number_list select_activity questions_1">
                <p>الشكل -1-</p>
                <li data-question='1'>
                    <div data-option='1'>مركزية</div>
                    <div data-option='2'>محيطية</div>
                    <div data-option='3'>ليست مركزية ولا محيطية</div>
                <p> الشكل -2- </p>

                <li data-question='2'>
                    <div data-option='1'>مركزية</div>
                    <div data-option='2'>محيطية</div>
                    <div data-option='3'>ليست مركزية ولا محيطية</div>
                </li>
                <p>الشكل -3-</p>
                <li data-question='3'>
                    <div data-option='1'>مركزية</div>
                    <div data-option='2'>محيطية</div>
                    <div data-option='3'>ليست مركزية ولا محيطية</div>
                </li>
                <p>الشكل -4-</p>
                <li data-question='4'>
                    <div data-option='1'>مركزية</div>
                    <div data-option='2'>محيطية</div>
                    <div data-option='3'>ليست مركزية ولا محيطية</div>
                </li>
            </ul>
          

            <div class="btn_activities grid13">
                <div id="check_answers_1">
                    <span>Check</span>
                </div>
                <div id="reset_answers_1">
                    <span>Reset</span>
                </div>
                <div id="answers_1">
                    <span>Answers</span>
                </div>
            </div>
    `
    const exercies3 = String.raw`
     <div class="container border-2 border-black rounded-3 my-3">

        <ul class="number_list select_activity questions_1">
          <p>ما المادة التي عدد واجباتها الأسبوعية أقل؟</p>
          <li data-question='1'>
            <div data-option='1'>الموسيقا</div>
            <div data-option='2'>اللغة العربية</div>
            <div data-option='3'>العلوم</div>
          </li>

          <p>ما المادة التي عدد واجباتها الأسبوعية أكثر؟</p>

          <li data-question='2'>
            <div data-option='1'>الرياضيات</div>
            <div data-option='2'>اللغة العربية</div>
            <div data-option='3'>الموسيقا</div>
          </li>

        </ul>

        <div class="btn_activities grid13">
          <div id="check_answers_1">
            <span>Check</span>
          </div>
          <div id="reset_answers_1">
            <span>Reset</span>
          </div>
          <div id="answers_1">
            <span>Answers</span>
          </div>
        </div>

      </div>

    `
    const exercies19 = String.raw`
        <div class=" col-8">
                <ul class="number_list select_activity questions_2">
                    <p>الطول المثالي عند الولادة</p>

                    <li data-question='1'>
                        <div data-option='1'>50</div>
                        <div data-option='2'>55</div>
                        <div data-option='3'>59</div>
                    </li>

                    <p>الطول المثالي في الشهر الأول</p>
                    <li data-question='2'>
                        <div data-option='1'>50</div>
                        <div data-option='2'>55</div>
                        <div data-option='3'>59</div>
                    </li>

                    <p>الطول المثالي في الشهر الثاني</p>
                    <li data-question='3'>
                        <div data-option='1'>55</div>
                        <div data-option='2'>50</div>
                        <div data-option='3'>58<div>
                    </li>

                    <p>الطول المثالي في الشهر الثالث</p>
                    <li data-question='4'>
                        <div data-option='1'>62</div>
                        <div data-option='2'>60</div>
                        <div data-option='3'>66</div>
                    </li>

                    <p>الطول المثالي في الشهر الخامس</p>
                    <li data-question='5'>
                        <div data-option='1'>55</div>
                        <div data-option='2'>65</div>
                        <div data-option='3'>60</div>
                    </li>


                </ul>

                <div class="btn_activities grid13">
                    <div id="check_answers_2">
                        <span>Check</span>
                    </div>
                    <div id="reset_answers_2">
                        <span>Reset</span>
                    </div>
                    <div id="answers_2">
                        <span>Answers</span>
                    </div>
                </div>

            </div>    <div class=" col-8">
                <ul class="number_list select_activity questions_2">
                    <p>الطول المثالي عند الولادة</p>

                    <li data-question='1'>
                        <div data-option='1'>50</div>
                        <div data-option='2'>55</div>
                        <div data-option='3'>59</div>
                    </li>

                    <p>الطول المثالي في الشهر الأول</p>
                    <li data-question='2'>
                        <div data-option='1'>50</div>
                        <div data-option='2'>55</div>
                        <div data-option='3'>59</div>
                    </li>

                    <p>الطول المثالي في الشهر الثاني</p>
                    <li data-question='3'>
                        <div data-option='1'>55</div>
                        <div data-option='2'>50</div>
                        <div data-option='3'>58<div>
                    </li>

                    <p>الطول المثالي في الشهر الثالث</p>
                    <li data-question='4'>
                        <div data-option='1'>62</div>
                        <div data-option='2'>60</div>
                        <div data-option='3'>66</div>
                    </li>

                    <p>الطول المثالي في الشهر الخامس</p>
                    <li data-question='5'>
                        <div data-option='1'>55</div>
                        <div data-option='2'>65</div>
                        <div data-option='3'>60</div>
                    </li>


                </ul>

                <div class="btn_activities grid13">
                    <div id="check_answers_2">
                        <span>Check</span>
                    </div>
                    <div id="reset_answers_2">
                        <span>Reset</span>
                    </div>
                    <div id="answers_2">
                        <span>Answers</span>
                    </div>
                </div>

        </div>
    `
    const exercies20 = String.raw`
       <ul class="number_list select_activity questions_2">
                    <p>  نقطة لها فاصلة a </p>

                    <li data-question='1'>
                        <div data-option='1'>b</div>
                        <div data-option='2'>c</div>
                        <div data-option='3'>d</div>
                    </li>

                    <p> نقطة لها ترتيب b </p>
                    <li data-question='2'>
                        <div data-option='1'>o</div>
                        <div data-option='2'>c</div>
                        <div data-option='3'>d</div>
                    </li>

                    <p> نقطتين فاصلتاهما موجبتين تماماً </p>
                    <li data-question='3'>
                        <div data-option='1'>a,c</div>
                        <div data-option='2'>c,d</div>
                        <div data-option='3'>a,b<div>
                    </li>

                    <p> نقطة ترتيبها سالب تماماً </p>
                    <li data-question='4'>
                        <div data-option='1'>b</div>
                        <div data-option='2'>d</div>
                        <div data-option='3'>c</div>
                    </li>

                    <p> نقطة ترتيبهاو فاصلتها سالب تماماً </p>
                    <li data-question='5'>
                        <div data-option='1'>b</div>
                        <div data-option='2'>c</div>
                        <div data-option='3'>d</div>
                    </li>


                </ul>
    `

    const exercies1 = String.raw`
        
            <p>حدد نوع كل من الزوايا الملونة بالأحمر في كل من الاشكال التالية: </p>

            <ul class="number_list select_activity questions_1">
                <p>الشكل -1-</p>
                  <li data-question='1'>
                    <div data-option='1'>قائمة</div>
                    <div data-option='2'>مستقيمة</div>
                    <div data-option='3'>حادة</div>
                  </li>
                <p> الشكل -2- </p>

                <li data-question='2'>
                    <div data-option='1'>حادة</div>
                    <div data-option='2'>قائمة</div>
                    <div data-option='3'>منفرجة</div>
                </li>
                <p>الشكل -3-</p>
                <li data-question='3'>
                    <div data-option='1'>منفرجة</div>
                    <div data-option='2'>قائمة</div>
                    <div data-option='3'>مستقيمة</div>
                </li>
                <p>الشكل -4-</p>
                <li data-question='4'>
                    <div data-option='1'>قائمة</div>
                    <div data-option='2'>مستقيمة</div>
                    <div data-option='3'>خادة</div>
                </li>
            </ul>
          

            <div class="btn_activities grid13">
                <div id="check_answers_1">
                    <span>Check</span>
                </div>
                <div id="reset_answers_1">
                    <span>Reset</span>
                </div>
                <div id="answers_1">
                    <span>Answers</span>
                </div>
            </div> 

    `

    const content1 = String.raw`
         <ul>
            <li class="animate__animated animate__lightSpeedInRight">زاوية قائمة (ضلعاها متعامدان)</li>
            <li class="animate__animated animate__lightSpeedInRight">نسمي نقطة التقاء ضلعي الزاوية: رأس الزاوية</li>
            <li class="animate__animated animate__lightSpeedInRight">نسمي الزاوية وفق رؤوسها</li>
            <li class="animate__animated animate__lightSpeedInRight">مثال في الزاوية المجاورة</li>
            <li class="animate__animated animate__lightSpeedInRight">الرأس: م</li>
            <li class="animate__animated animate__lightSpeedInRight">اسم الزاوية: س م ع</li>
            <li class="animate__animated animate__lightSpeedInRight">ضلعا الزاوية: م س و م ع</li>
          </ul>
    `

    const content13 = String.raw`
    <div class="row">
            <div class="col-lg-4 col-md-4 col-sm-12">
                <h5><span style="background-color: rgb(246, 229, 218);"><strong>
                    نشر (c+d)(a+b)
                </strong></span></h5> <br>
                <p> $ (a+b)×(c+d) $ <br> $ = a(c+d) + b(c+d) $ <br> 
                    $ = a×c + a×d + b×c + b×d $ <br>
                    $ = ac + ad + bc + bd $
                </p>
                <h5><span style="background-color: rgb(246, 229, 218);"><strong>
                    توضيح هندسي:
                </strong></span></h5> <br>
                <p> في الشكل المرافق مساحة المستطيل ABCD تساوي مجموع مساحات المستطيلات الاربعة الملونة  </p>

            </div>

            <div id="jxgbox" class="jxgbox col-lg-8 col-md-8 col-sm-12 text-center" 
            style="width: 650px; height: 400px; max-width: 95%;margin:10px;" dir="ltr">
            </div>

        </div>
        <p class="example-box">مثال:
            نشر واختصار
            $ (x+5)(2x+1)=x(2x+1)+5(2x+1)=x × 2x + x × 1 +5×2x +5×1 =
                2x^2+(1+10)x +5 = 2x^2+11x+5
            $
        </p>

        <h5>كيف ننشر عبارة من الصيغة $ a-b(c+d) $</h5>
        <p class="example-box"> مثال: يرمز $x$ إلى عدد.
            أنشر ثم أنجز ناتج $ A=2-3(x+5) $
       
            <button class="btn btn-warning col-lg-2 col-md-2 col-sm-2" id="btn3" data-sound="/sound/less-13-1.mp3" >
                أسمع
            </button>
        </p>
        <div id="ex1"></div>

        <h5>كيف ننشر عبارة من الصيغة $ (a-b)(c+d) $</h5>
        <p class="example-box"> مثال: يرمز $x$ إلى عدد.
            أنشر ثم أنجز ناتج $ A=(x-2)(2x+5) $
        
            <button class="btn btn-warning col-lg-2 col-md-2 col-sm-2" id="btn2" data-sound="/sound/less-13-2.mp3" >
                أسمع
            </button>

        </p>
        <div class="math-equation" id="ex2"></div>

        <h5>كيف ننشر عبارة من الصيغة $ (a-b)(c-d) $</h5>
        <p class="example-box"> مثال: يرمز $x$ إلى عدد.
            أنشر ثم أنجز ناتج $ A=(x-1)(x-2) $
        </p>
        <div class="math-equation" id="ex3"></div>

    </div>

    `
    const content14 = String.raw `
        <h5><span style="background-color: rgb(246, 229, 218);"><strong>
                    هل طرأ تغيير على مساحة متوازي الأضلاع؟
                    <strong></span>
                    <br>
                </h5>

                    <p>
                        <button class="btn btn-warning col-lg-2 col-md-2 col-sm-2" id="btn2" data-sound="/sound/less-14-2.mp3" >
                            أسمع
                        </button>
                         الجواب لا.
                    </p>
                <h5><span style="background-color: rgb(246, 229, 218);"><strong>
                    ما العلاقة بين مساحة المستطيل ومساحة متوازي الأضلاع؟
                    <strong></span>
                    <br>
                </h5> 

                <p> 
                    <button class="btn btn-warning col-lg-2 col-md-2 col-sm-2" id="btn3" data-sound="/sound/less-14-3.mp3" >
                        أسمع
                    </button>
                      إن عرض المستطيل هو ارتفاع لمتوازي الأضلاع، وطول المستطيل هو طول ضلع لمتوازي الأضلاع،
                </p>
                <br>
                <p class="bg-danger-subtle">      
                    <button class="btn btn-warning col-lg-2 col-md-2 col-sm-2" id="btn4" data-sound="/sound/less-14-4.mp3" >
                        أسمع
                    </button>             
                    مساحة متوازي الأضلاع = طول الضلع × الارتفاع المتعلق بها
                </p>
            </div>

            <p class="example-box">أحسب مساحة متوازي أضلاع طول ضلعه 10cm, والارتفاع المتعلق بها 7cm.</p>
            <p>
                مساحة متوازي الأضلاع = طول الضلع × الارتفاع المتعلق بها
                = 7 × 10 = 70
            </p>

    `
    const content3 = String.raw`
      <div class="container">

        <ul class="number_list select_activity questions_3_1">
          <p>كم الفرق بين عدد واجبات العلوم و عدد واجبات الموسيقا</p>

          <li data-question='1'>
            <div data-option='1'>1</div>
            <div data-option='2'>2</div>
            <div data-option='3'>3</div>
          </li>
          <p>كم يزيد عدد واجبات اللغة العربية على واجبات الرياضيات</p>

          <li data-question='2'>
            <div data-option='1'>4</div>
            <div data-option='2'>2</div>
            <div data-option='3'>3</div>
          </li>
          <p>ما مجموع عدد الواجبات الاسبوعية للمواد الدراسية السابقة</p>

          <li data-question='3'>
            <div data-option='1'>14</div>
            <div data-option='2'>21</div>
            <div data-option='3'>18</div>
          </li>
        </ul>

        <div class="btn_activities grid13">
          <div id="check_answers_3_1">
            <span>Check</span>
          </div>
          <div id="reset_answers_3_1">
            <span>Reset</span>
          </div>
          <div id="answers_3_1">
            <span>Answers</span>
          </div>
        </div>

      </div>

    `
    const content19 = String.raw `
    
        <div class=" col-8">
                    <ul class="number_list select_activity questions_3_1">
                        <p>ما درجة الحرارة في دمشق يوم الأربعاء</p>

                        <li data-question='1'>
                            <div data-option='1'>16</div>
                            <div data-option='2'>18</div>
                            <div data-option='3'>14</div>
                        </li>

                        <p>ما اليوم التي كانت درجة الحرارة فيه الأكثر انخفاضاً</p>
                        <li data-question='2'>
                            <div data-option='1'>الجمعة</div>
                            <div data-option='2'>الأثنين</div>
                            <div data-option='3'>الأحد</div>
                        </li>

                        <p>ما الأيام التي كانت درجة الحرارة فيها الأكثر ارتفاعاً</p>
                        <li data-question='3'>
                            <div data-option='1'>الجمعة</div>
                            <div data-option='2'>السبت</div>
                            <div data-option='3'>الأربعاء و الخميس</div>
                        </li>

                    </ul>

                    <div class="btn_activities grid13">
                        <div id="check_answers_3_1">
                            <span>Check</span>
                        </div>
                        <div id="reset_answers_3_1">
                            <span>Reset</span>
                        </div>
                        <div id="answers_3_1">
                            <span>Answers</span>
                        </div>
                    </div>

        </div>
    `
    const content20 = String.raw`
    <ul>
            <li>
                        <button class="btn btn-warning " data-sound="/sound/less-20-1.mp3" id="btn1">
                            أسمع
                        </button>
                        المحور الأفقي والمحور الشاقولي هما مستقيما اعداد متعامدان يتقاطعان في مبدأ الأحداثيات</li>
                    <li>
                        نسمي المحور الأفقي محور الفواصل ونرمز Ox</li>
                    <li>
                        نسمي المحور الشاقولي محور الفواصل ونرمز Oy
                        <button class="btn btn-warning " data-sound="/sound/less-20-2.mp3" id="btn4">
                            أسمع
                        </button>
                    
                    </li>
                    <li>
                        محورا الفواصل والتراتيب يشكلان معاً معلم مستوي ويسمى مستوي الإحداثيات
                    </li>
                </ul> 
    `

  try {

    const qz = await Quiz.findByPk(3);
    qz.title = 'السؤال الأول تمارين الوحدة الاولى-ثامن هندسة' ;
    qz.quizSchema = 
    {
        "pages": [
            {
                "name": "startPage",
                "elements": [
                    {
                        "html": "<p style='font-size:larger'>اختبار في السؤال الاول من اسئلة الوحدة الاولى للصف الثامن قسم الهندسة</p></br></br><i>هل سيحالفك الحظ ؟</i></br><img src='https://res.cloudinary.com/dg0d0jmtz/image/upload/v1722119336/quiz/Screenshot_2024-07-28_002751_cdys4n.png' width='100%' height='auto'></img>",
                        "name": "welcomeMsg",
                        "type": "html"
                    }
                ]
            },
            {
                "elements": [
                    {
                        "type": "imagepicker",
                        "name": "question1",
                        "title": "أي الاشكال التالية تعبر عن شكل وصورته وفق انسحاب؟",
                        "correctAnswer": "Image 2",
                        "score": 2,
                        "choices": [
                            {
                                "value": "Image 1",
                                "imageLink": "https://res.cloudinary.com/dg0d0jmtz/image/upload/v1722118991/quiz/Screenshot_2024-07-28_002046_czxtpu.png"
                            },
                            {
                                "value": "Image 2",
                                "imageLink": "https://res.cloudinary.com/dg0d0jmtz/image/upload/v1722118989/quiz/Screenshot_2024-07-28_002105_mrhact.png"
                            },
                            {
                                "value": "Image 3",
                                "imageLink": "https://res.cloudinary.com/dg0d0jmtz/image/upload/v1722118988/quiz/Screenshot_2024-07-28_002124_su9uvz.png"
                            }
                        ],
                        "imageFit": "cover"
                    }
                ]
            },
            {
                "elements": [
                    {
                        "name": "qtow",
                        "type": "radiogroup",
                        "score": 3,
                        "title": "\\(P\\) نقطة غير واقعة على المستقيم \\(RS\\), و \\(Q\\) هي صورة \\(P\\) وفق الانسحاب الذي ينقل \\(R\\) إلى \\(S\\). إذن:",
                        "choices": [
                            {
                                "text": "\\(RSPQ\\) هو متوازي أضلاع",
                                "value": "1"
                            },
                            {
                                "text": "\\(PQRS\\) هو متوازي أضلاع",
                                "value": "2"
                            },
                            {
                                "text": "\\(RSQP\\) هو متوازي أضلاع",
                                "value": "3"
                            }
                        ],
                        "correctAnswer": "3"
                    }
                ]
            },
            {
                "elements": [
                    {
                        "name": "qthree",
                        "type": "radiogroup",
                        "score": 3,
                        "title": "MNPQ متوازي أضلاع فوفق الانسحاب الذي ينقل M الى Q",
                        "choices": [
                            {
                                "text": "P هي صورة Q",
                                "value": "1"
                            },
                            {
                                "text": "صورة P هي N",
                                "value": "2"
                            },
                            {
                                "text": "P هي صورة N",
                                "value": "3"
                            }
                        ],
                        "correctAnswer": "3"
                    }
                ]
            },
            {
                "elements": [
                    {
                        "name": "qfour",
                        "type": "radiogroup",
                        "score": 2,
                        "title": "مساحة شكل F تساوي \\(15 cm^2\\), فمساحة F' صورة هذا الشكل وفق انسحاب:",
                        "choices": [
                            {
                                "text": "غير معلومة",
                                "value": "1"
                            },
                            {
                                "text": "تساوي \\(30cm^2\\)",
                                "value": "2"
                            },
                            {
                                "text": "تساوي \\(15cm^2\\)",
                                "value": "3"
                            }
                        ],
                        "correctAnswer": "3"
                    }
                ]
            },
            {
                "elements": [
                    {
                        "name": "qfife",
                        "type": "radiogroup",
                        "score": 2,
                        "title": "ABC مثلث قائم فصورته وفق أي انسحاب، هي:",
                        "choices": [
                            {
                                "text": "مثلث كيفي",
                                "value": "1"
                            },
                            {
                                "text": "مثلث متساوي الاضلاع",
                                "value": "2"
                            },
                            {
                                "text": "مثلث قائم",
                                "value": "3"
                            }
                        ],
                        "correctAnswer": "3"
                    }
                ]
            },
            {
                "elements": [
                    {
                        "name": "qsix",
                        "type": "radiogroup",
                        "score": 2,
                        "title": "المستقيمان (d), (AB) غير متوازيان ،فصورة (d) وفق الانسحاب الذي ينقل A الى B هو مستقيم",
                        "choices": [
                            {
                                "text": "يوازي (d)",
                                "value": "1"
                            },
                            {
                                "text": "يوازي (AB)",
                                "value": "2"
                            },
                            {
                                "text": "يمر بالنقطة B",
                                "value": "3"
                            }
                        ],
                        "correctAnswer": "1"
                    }
                ]
            },
            {
                "elements": [
                    {
                        "name": "qseven",
                        "type": "radiogroup",
                        "score": 2,
                        "title": "(d), ('d) مستقيمان متقاطعان في A وصورتاهما وفق انسحابٍ r، هما مستقيمان متقاطعان في B إذن r هو :",
                        "choices": [
                            {
                                "text": "الانسحاب الذي ينقل A الى B",
                                "value": "1"
                            },
                            {
                                "text": "أي انسحاب",
                                "value": "2"
                            },
                            {
                                "text": "الانسحاب الذي ينقل B الى A",
                                "value": "3"
                            }
                        ],
                        "correctAnswer": "1"
                    }
                ]
            },
            {
                "elements": [
                    {
                        "name": "qeight",
                        "type": "imagepicker",
                        "score": 2,
                        "title": "وفق الانسحاب الذي ينقل A الى A' ،  تكون القطعة المستقيمة الحمراء صورة القطعة المستقيمة الزرقاء في الشكل:",
                        "correctAnswer": "Image 2",
                        "choices": [
                            {
                                "value": "Image 1",
                                "imageLink": "https://res.cloudinary.com/dg0d0jmtz/image/upload/v1732657788/quiz/%D8%A7%D9%84%D8%A7%D9%86%D8%B3%D8%AD%D8%A7%D8%A8_holdk5.png"
                            },
                            {
                                "value": "Image 2",
                                "imageLink": "https://res.cloudinary.com/dg0d0jmtz/image/upload/v1732657827/quiz/Capture_lz3gaj.png"
                            },
                            {
                                "value": "Image 3",
                                "imageLink": "https://res.cloudinary.com/dg0d0jmtz/image/upload/v1732657849/quiz/%D8%B5%D8%AB%D8%AB_lfymjp.png"
                            }
                        ],
                        "imageFit": "cover"
                    }
                ]
            },
            {
                "elements": [
                    {
                        "name": "Image",
                        "type": "image",
                        "imageLink": "https://res.cloudinary.com/dg0d0jmtz/image/upload/v1732658093/quiz/Capture.PNG%D8%B6_ungbyv.png"
                    },
                    {
                        "name": "qnighn",
                        "type": "radiogroup",
                        "title": "في الشكل المجاور لديك مثلثان طبوقان، عندئذٍ :",
                        "score": 5,
                        "choices": [
                            {
                                "text": "$ \\hat{A} = \\hat{E} $",
                                "value": "1"
                            },
                            {
                                "text": "$ \\hat{A} = \\hat{F} $",
                                "value": "2"
                            },
                            {
                                "text": "$ \\hat{A} = \\hat{D} $",
                                "value": "3"
                            }
                        ],
                        "correctAnswer": "3",
                        "startWithNewLine": false
                    }
                ]
            },
            {
                "elements": [
                    {
                        "name": "qten",
                        "type": "radiogroup",
                        "score": 2,
                        "title": "الدائرة 'C هي صورة الدائرة C وفق انسحاب، فالدائرتان C , 'C",
                        "choices": [
                            {
                                "text": "نصفا قطريهما متساويان",
                                "value": "1"
                            },
                            {
                                "text": "متحدتان بالمركز",
                                "value": "2"
                            },
                            {
                                "text": "غير متقاطعتين",
                                "value": "3"
                            }
                        ],
                        "correctAnswer": "1"
                    }
                ]
            },
        ],
        "logoPosition": "right",
        "completedHtml": "<h4>You got <b>{totalScore}</b> out of <b>{maxScore}</b> correct answers.</h4>",
        "showTimerPanel": "top",
        "showProgressBar": "top",
        "firstPageIsStarted": true,
        "maxTimeToFinishPage": 30,
        "completedHtmlOnCondition": [
            {
                "html": "<h5>You got {totalScore} out of {maxScore} points. </h5> </br></br><h6>ممتاز نتيجتك رائعة !!</h6>",
                "expression": "{totalScore} >= 20"
            },
            {
                "html": "<h5>You got {totalScore} out of {maxScore} points. </h5> </br></br><h6> <i>لا بأس بإمكانك التحسن</i></h6>",
                "expression": "{totalScore} <= 19 && {totalScore} > 10"
            },
            {
                "html": "<h5>You got {totalScore} out of {maxScore} points. </h5></br></br><h6><i>يجب عليك الدراسة بشكل اكبر</i></h6>",
                "expression": "{totalScore} <= 10"
            }
        ]
    }
    
    await qz.save() 

    /* const less = await Lesson.findByPk(20)
    less.content = content20
    await less.save(); */
    console.log("data inserted.."); // طباعة المحتوى
  } catch (error) {
    console.log(error + " error");
  }
})();

