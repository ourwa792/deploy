
// Example usage:
const quizData = {
  pages: [
    {
      name: "startPage",
      elements: [
        {
          html: "<p style='font-size: larger'>تمارين درس مجموع قياسات زوايا مثلث - الصف السابع</p></br></br><i>هل سيحالفك الحظ ؟</i></br><img src='https://res.cloudinary.com/dg0d0jmtz/image/upload/v1729563825/quiz/%D8%AA%D9%85%D8%A7%D8%B1%D9%8A%D9%86_%D8%AF%D8%B1%D8%B3_%D8%AA%D8%B5%D9%86%D9%8A%D9%81_%D9%85%D8%AB%D9%84%D8%AB_-%D8%B3%D8%A7%D8%A8%D8%B9_hdprwt.png' width='100%' height='auto'></img>",
          name: "welcomeMsg",
          type: "html",
        },
      ],
    },
    {
      elements: [
        {
          name: "Image",
          type: "image",
          imageLink:
            "https://res.cloudinary.com/dg0d0jmtz/image/upload/v1729564187/quiz/q1_rn4hhg.png",
        },
        {
          name: "qone",
          type: "radiogroup",
          score: 5,
          title: "أحسب قياس الزاوية A",
          choices: [
            { text: "A=102°", value: "1" },
            { text: "A=73°", value: "2" },
            { text: "A=93°", value: "3" },
          ],
          correctAnswer: "1",
          startWithNewLine: false,
        },
      ],
    },
    {
      elements: [
        {
          name: "Image",
          type: "image",
          imageLink:
            "https://res.cloudinary.com/dg0d0jmtz/image/upload/v1729564187/quiz/q2PNG_y2pskk.png",
        },
        {
          name: "qtow",
          type: "radiogroup",
          score: 5,
          title: "أحسب قياس الزاوية A",
          choices: [
            { text: "A=102°", value: "1" },
            { text: "A=73°", value: "2" },
            { text: "A=50°", value: "3" },
          ],
          correctAnswer: "3",
          startWithNewLine: false,
        },
      ],
    },
    {
      elements: [
        {
          name: "Image",
          type: "image",
          imageLink:
            "https://res.cloudinary.com/dg0d0jmtz/image/upload/v1729564188/quiz/q3_anbxi9.png",
        },
        {
          name: "qthree",
          type: "radiogroup",
          score: 5,
          title: "أحسب قياس الزاوية A",
          choices: [
            { text: "A=23°", value: "1" },
            { text: "A=73°", value: "2" },
            { text: "A=120°", value: "3" },
          ],
          correctAnswer: "1",
          startWithNewLine: false,
        },
      ],
    },
    {
      elements: [
        {
          name: "Image",
          type: "image",
          imageLink:
            "https://res.cloudinary.com/dg0d0jmtz/image/upload/v1729564189/quiz/q4_rdsmfu.png",
        },
        {
          name: "qfour",
          type: "radiogroup",
          score: 5,
          title: "أحسب قياس الزاوية A",
          choices: [
            { text: "A=23°", value: "1" },
            { text: "A=40°", value: "2" },
            { text: "A=70°", value: "3" },
          ],
          correctAnswer: "2",
          startWithNewLine: false,
        },
      ],
    },
    {
      elements: [
        {
          name: "Image",
          type: "image",
          imageLink:
            "https://res.cloudinary.com/dg0d0jmtz/image/upload/v1729564189/quiz/q5_ikgh7d.png",
        },
        {
          name: "qfife",
          type: "radiogroup",
          score: 5,
          title: "أحسب قياس الزاوية A",
          choices: [
            { text: "A=49°", value: "1" },
            { text: "A=40°", value: "2" },
            { text: "A=170°", value: "3" },
          ],
          correctAnswer: "1",
          startWithNewLine: false,
        },
      ],
    },
    {
      elements: [
        {
          name: "qsix",
          type: "radiogroup",
          score: 5,
          title:
            "مثلث فيه $ \\hat{A}=25° , \\hat{B}=65° $ فإن قياس الزاوية C يكون: ",
          choices: [
            { text: "40°", value: "1" },
            { text: "100°", value: "2" },
            { text: "90°", value: "3" },
          ],
          correctAnswer: "2",
        },
      ],
    },
    {
      elements: [
        {
          name: "qseven",
          type: "radiogroup",
          score: 5,
          title:
            "مثلث فيه $ \\hat{A}=25° , \\hat{B}=65° $فيكون نوعه بالنسبة  لزواياه",
          choices: [
            { text: "منفرج الزاوية", value: "1" },
            { text: "حاد الزوايا", value: "2" },
            { text: "قائم الزاوية", value: "3" },
          ],
          correctAnswer: "3",
        },
      ],
    },
    {
      elements: [
        {
          name: "Image",
          type: "image",
          imageLink:
            "https://res.cloudinary.com/dg0d0jmtz/image/upload/v1729564448/quiz/q8_yhrwxt.png",
        },
        {
          name: "qeight",
          type: "radiogroup",
          score: 5,
          title: "أحسب قياس الزاوية C",
          choices: [
            { text: "C=23°", value: "1" },
            { text: "C=30°", value: "2" },
            { text: "C=120°", value: "3" },
          ],
          correctAnswer: "2",
          startWithNewLine: false,
        },
      ],
    },
    {
      elements: [
        {
          name: "Image",
          type: "image",
          imageLink:
            "https://res.cloudinary.com/dg0d0jmtz/image/upload/v1729564448/quiz/q8_yhrwxt.png",
        },
        {
          name: "q-9",
          type: "radiogroup",
          score: 5,
          title: "أحسب قياس الزاوية G",
          choices: [
            { text: "G=23°", value: "1" },
            { text: "G=30°", value: "2" },
            { text: "G=105°", value: "3" },
          ],
          correctAnswer: "3",
          startWithNewLine: false,
        },
      ],
    },
    {
      elements: [
        {
          name: "Image",
          type: "image",
          imageLink:
            "https://res.cloudinary.com/dg0d0jmtz/image/upload/v1729564663/quiz/q10_mwdhow.jpg",
        },
        {
          name: "q-10",
          type: "radiogroup",
          score: 5,
          title: "أحسب قياس الزاوية c",
          choices: [
            { text: "c=23°", value: "1" },
            { text: "c=57°", value: "2" },
            { text: "c=105°", value: "3" },
          ],
          correctAnswer: "2",
          startWithNewLine: false,
        },
      ],
    },
    {
      elements: [
        {
          name: "Image",
          type: "image",
          imageLink:
            "https://res.cloudinary.com/dg0d0jmtz/image/upload/v1729564663/quiz/q10_mwdhow.jpg",
        },
        {
          name: "q-12",
          type: "radiogroup",
          score: 5,
          title: "أحسب قياس الزاوية h",
          choices: [
            { text: "h=55°", value: "1" },
            { text: "h=57°", value: "2" },
            { text: "h=105°", value: "3" },
          ],
          correctAnswer: "1",
          startWithNewLine: false,
        },
      ],
    },
    {
      elements: [
        {
          name: "Image",
          type: "image",
          imageLink:
            "https://res.cloudinary.com/dg0d0jmtz/image/upload/v1729564663/quiz/q10_mwdhow.jpg",
        },
        {
          name: "q-11",
          type: "radiogroup",
          score: 5,
          title: "أحسب قياس الزاوية k",
          choices: [
            { text: "k=23°", value: "1" },
            { text: "k=68°", value: "2" },
            { text: "k=105°", value: "3" },
          ],
          correctAnswer: "2",
          startWithNewLine: false,
        },
      ],
    },
    {
      elements: [
        {
          name: "Image",
          type: "image",
          imageLink:
            "https://res.cloudinary.com/dg0d0jmtz/image/upload/v1729564663/quiz/q10_mwdhow.jpg",
        },
        {
          name: "qtherteen",
          type: "radiogroup",
          score: 5,
          title: "أحسب قياس الزاوية f",
          choices: [
            { text: "f=45°", value: "1" },
            { text: "f=57°", value: "2" },
            { text: "f=68°", value: "3" },
          ],
          correctAnswer: "3",
          startWithNewLine: false,
        },
      ],
    },
    {
      elements: [
        {
          name: "qfourteen",
          type: "radiogroup",
          score: 5,
          title:
            " :  ABC مثلث  فيه $ \\hat{A}=72° , \\hat{B}=33° , \\hat{C}=? $",
          choices: [
            { text: "72°", value: "1" },
            { text: "70°", value: "2" },
            { text: "75°", value: "3" },
          ],
          correctAnswer: "3",
        },
      ],
    },
    {
      elements: [
        {
          name: "qfifteen",
          type: "radiogroup",
          score: 5,
          title: " : EFG مثلث فيه $ \\hat{E}=47° , \\hat{F}=90° , \\hat{G}=? $",
          choices: [
            { text: "72°", value: "1" },
            { text: "43°", value: "2" },
            { text: "75°", value: "3" },
          ],
          correctAnswer: "2",
        },
      ],
    },
    {
      elements: [
        {
          name: "qsixteen",
          type: "radiogroup",
          score: 5,
          title:
            " مثلث HIJ متساوي الساقين رأسه  J  فيه: $ \\hat{H}=50° , \\hat{I}=?° , \\hat{J}=? $",
          choices: [
            { text: "\\( \\hat{I}=50° , \\hat{J}=80° \\)", value: "1" },
            { text: "\\( \\hat{I}=50° , \\hat{J}=50° \\)", value: "2" },
            { text: "\\( \\hat{I}=100° , \\hat{J}=100° \\)", value: "3" },
          ],
          correctAnswer: "1",
        },
      ],
    },
    {
      elements: [
        {
          name: "qseventeen",
          type: "radiogroup",
          score: 5,
          title:
            " مثلث KLM متساوي الساقين رأسه  K = 56°  فيه: $ \\hat{L}=? , \\hat{M}=? $",
          choices: [
            { text: "\\( \\hat{L}=50° , \\hat{M}=50° \\)", value: "1" },
            { text: "\\( \\hat{L}=62° , \\hat{M}=62° \\)", value: "2" },
            { text: "\\( \\hat{L}=100° , \\hat{M}=100° \\)", value: "3" },
          ],
          correctAnswer: "2",
        },
      ],
    },
    {
      elements: [
        {
          name: "qeighteen",
          type: "radiogroup",
          score: 5,
          title: " مثلث NOP فيه: $ \\hat{O}=33° , \\hat{N}= 40° $",
          choices: [
            { text: "\\( \\hat{P}=50°\\)", value: "1" },
            { text: "\\( \\hat{P}=150°\\)", value: "2" },
            { text: "\\( \\hat{P}=107°\\)", value: "3" },
          ],
          correctAnswer: "3",
        },
      ],
    },
  ],
  logoPosition: "right",
  completedHtml:
    "<h4>You got <b>{totalScore}</b> out of <b>{maxScore}</b> correct answers.</h4>",
  showTimerPanel: "top",
  showProgressBar: "top",
  firstPageIsStarted: true,
  maxTimeToFinishPage: 30,
  completedHtmlOnCondition: [
    {
      html: "You got {totalScore} out of {maxScore} points.</br></br><h5>ممتاز نتيجتك رائعة !!</h5>",
      expression: "{totalScore} >= 80",
    },
    {
      html: "You got {totalScore} out of {maxScore} points.</br></br><i>لا بأس بإمكانك التحسن</i>",
      expression: " {totalScore} >=60 && {totalScore} <= 79",
    },
    {
      html: "You got {totalScore} out of {maxScore} points.</br></br><i>يجب عليك الدراسة بشكل اكبر</i>",
      expression: "{totalScore} <= 59",
    },
  ],
};

/* 
exports.transformQuizData = (data) => {
  // Initialize an array to hold the transformed quiz data
  const transformedData = [];
  let questionId = 1; // Counter for question IDs

  // Loop through each page in the quiz data
  data.pages.forEach((page) => {
      page.elements.forEach((element, index) => {
          // Handle multiple question types
          if (element.type === "radiogroup" || element.type === "boolean") {
              // Create the base question object
              const question = {
                  id: questionId++, // Increment question ID for each question
                  content: element.title || "No title provided", // Default content
                  weight: element.score , // Default weight to 1 if not provided
                  answer_limit: null,
                  answers: [], // Initialize an empty array for answer options
                  image: null // Default image to null
              };

              // Check if an image is associated with this question
              if (index > 0 && page.elements[index - 1].type === "image") {
                  question.image = page.elements[index - 1].imageLink;
              }

              if (element.type === "radiogroup") {
                  // Process multiple-choice (radiogroup) questions
                  element.choices.forEach((choice, choiceIndex) => {
                      const answerContent = typeof choice === "string" ? choice : choice.text;
                      const isCorrectAnswer = choice === element.correctAnswer || 
                                              (choice.value && choice.value === element.correctAnswer);

                      question.answers.push({
                          id: choiceIndex + 1,
                          content: answerContent,
                          is_correct: isCorrectAnswer || false
                      });
                  });
              } else if (element.type === "boolean") {
                  // Process true/false (boolean) questions
                  question.answers.push(
                      {
                          id: 1,
                          content: "صح",
                          is_correct: element.correctAnswer === true || element.correctAnswer === "صح"
                      },
                      {
                          id: 2,
                          content: "خطأ",
                          is_correct: element.correctAnswer === false || element.correctAnswer === "خطأ"
                      }
                  );
              }

              // Add the transformed question to the output array
              transformedData.push(question);
          }
      });
  });

  // Return the transformed data
  return transformedData;
};

 */
/* 
exports.transformQuizData = (data) => {
  const transformedData = []; // Array to hold transformed questions
  let questionId = 1; // Counter for question IDs

  // Loop through each page in the quiz data
  data.pages.forEach((page) => {
      page.elements.forEach((element, index) => {
          if (["radiogroup", "boolean", "imagepicker"].includes(element.type)) {
              const question = {
                  id: questionId++, // Question ID
                  content: element.title || "No title provided", // Question content
                  weight: element.score || 1, // Default weight
                  answer_limit: null, // Fixed as null
                  image: null, // Default image for the question
                  answers: [] // Initialize answers array
              };

              // Check for an associated image
              if (index > 0 && page.elements[index - 1].type === "image") {
                  question.image = page.elements[index - 1].imageLink || null; // Assign the image link
              }

              // Process answers
              if (element.type === "radiogroup" || element.type === "imagepicker") {
                  element.choices.forEach((choice, choiceIndex) => {
                      question.answers.push({
                          id: choiceIndex + 1, // Answer ID
                          content: choice.text || choice.value || "No content", // Use text or value for content
                          image: choice.imageLink || null, // Add image link if available
                          is_correct: choice.value === element.correctAnswer // Mark if correct
                      });
                  });
              } else if (element.type === "boolean") {
                  question.answers.push(
                      {
                          id: 1,
                          content: "صح",
                          image: null, // Boolean answers don't have images
                          is_correct: element.correctAnswer === true
                      },
                      {
                          id: 2,
                          content: "خطأ",
                          image: null, // Boolean answers don't have images
                          is_correct: element.correctAnswer === false
                      }
                  );
              }

              // Add the transformed question to the result
              transformedData.push(question);
          }
      });
  });

  return transformedData;
};
 */





exports.transformQuizData = (data) => {
  const transformedData = []; // Array to hold transformed questions
  let questionId = 1; // Counter for question IDs

  // Loop through each page in the quiz data
  data.pages.forEach((page) => {
      page.elements.forEach((element, index) => {
          if (["radiogroup", "boolean", "imagepicker"].includes(element.type)) {
              const question = {
                  id: questionId++, // Question ID
                  content: element.title || "No title provided", // Question content
                  weight: element.score || 1, // Default weight
                  answer_limit: null, // Fixed as null
                  image: null, // Default image for the question
                  answers: [] // Initialize answers array
              };

              // Check for an associated image
              if (index > 0 && page.elements[index - 1].type === "image") {
                  question.image = page.elements[index - 1].imageLink || null; // Assign the image link
              }

              // Process answers
              if (element.type === "radiogroup" || element.type === "imagepicker") {
                  element.choices.forEach((choice, choiceIndex) => {
                      const isDirectText = typeof choice === "string"; // Check if the choice is a direct text
                      question.answers.push({
                          id: choiceIndex + 1, // Answer ID
                          content: isDirectText ? choice : choice.text || choice.value || "No content", // Use text or value or raw string
                          image: isDirectText ? null : choice.imageLink || null, // Assign image if available
                          is_correct: isDirectText
                              ? choice === element.correctAnswer // Direct comparison for strings
                              : choice.value === element.correctAnswer // Check value for objects
                      });
                  });
              } else if (element.type === "boolean") {
                  question.answers.push(
                      {
                          id: 1,
                          content: "صح",
                          image: null, // Boolean answers don't have images
                          is_correct: element.correctAnswer === true
                      },
                      {
                          id: 2,
                          content: "خطأ",
                          image: null, // Boolean answers don't have images
                          is_correct: element.correctAnswer === false
                      }
                  );
              }

              // Add the transformed question to the result
              transformedData.push(question);
          }
      });
  });

  return transformedData;
};
