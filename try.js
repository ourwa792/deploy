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

const { Lesson } = require("./model/association"); // استيراد Lesson من ملف association

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
          

  try {
    const less = await Lesson.findByPk(8); // جلب الدرس بناءً على المفتاح الأساسي
    less.exercies = exercies8
    await less.save();
    console.log("data inserted.."); // طباعة المحتوى
  } catch (error) {
    console.log(error + " error");
  }
})() 