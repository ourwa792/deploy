window.addEventListener("DOMContentLoaded", (e) => {
  var board3 = JXG.JSXGraph.initBoard("box3", {
    boundingbox: [-4, 5, 6, -3],
    keepaspectratio: true,
    axis: true,
  });

  var center = board3.create("point", [0, 0], { name: "O", fixed: true });
  var radiusPoint = board3.create("point", [3, 0], { visible: false });
  var circle = board3.create("circle", [center, radiusPoint], {
    strokeColor: "black",
  });

  // إنشاء الأوتار المتساوية
  var A = board3.create("glider", [3, 0, circle], {
    name: "A",
    withLabel: true,
  });
  var B = board3.create("glider", [0, 3, circle], {
    name: "B",
    withLabel: true,
  });
  var C = board3.create("glider", [-3, 0, circle], {
    name: "C",
    withLabel: true,
  });
  var D = board3.create("glider", [0, -3, circle], {
    name: "D",
    withLabel: true,
  });

  // إنشاء الأوتار
  var chordAB = board3.create("segment", [A, B], {
    strokeWidth: 2,
    strokeColor: "blue",
  });
  
  var chordCD = board3.create("segment", [C, D], 
  {strokeWidth: 2,
  strokeColor: "blue",});

  // قياس الأقواس بين الأوتار
  var arcAB = board3.create("arc", [center, A, B], {
    strokeColor: "green",
    strokeWidth: 3,
  });
  var arcCD = board3.create("arc", [center, C, D], {
    strokeColor: "green",
    strokeWidth: 3,
  });

  // Function to ensure angle is within [0, 180]
  function ensureMinorAngle(angle) {
    angle = (angle * 180) / Math.PI; // تحويل من راديان إلى درجات
    if (angle > 180) {
      return 360 - angle; // إذا كانت الزاوية أكبر من 180، نحسب الزاوية المكملة
    }
    return angle;
  }

  // إنشاء زاوية مركزية لكل قوس
  var angleAB = board3.create("angle", [A, center, B], {
    radius: 0.6,
    name: "&alpha;<sub>1</sub>",
    withLabel: true,
    label: { offset: [-40, -40], position: "middle" },
  });

  var angleCD = board3.create("angle", [C, center, D], {
    radius: 0.6,
    name: "&alpha;<sub>2</sub>",
    withLabel: true,
    label: { offset: [-40, -40], position: "middle" },
    fillColor: "purple",
  });

  // Create dynamic text to display angle values in degrees, ensuring they're less than 180
  var angleABText = board3.create(
    "text",
    [
      () => (A.X() + B.X()) * 0.5 + 0.6,
      () => (A.Y() + B.Y()) * 0.5 + 0.6,
      () => ensureMinorAngle(angleAB.Value()).toFixed(2) + "&deg;",
    ],
    { fontSize: 16 }
  );

  var angleCDText = board3.create(
    "text",
    [
      () => (D.X() + C.X()) * 0.5 - 0.5,
      () => (D.Y() + C.Y()) * 0.5 - 0.5,
      () => ensureMinorAngle(angleCD.Value()).toFixed(2) + "&deg;",
    ],
    { fontSize: 16 }
  );

  // تعليمات للمستخدم
  var instructions = board3.create("text", [
    -2,
    4.5,
    `<h6 style="color:green; background-color:yellow">
        اسحب النقاط على الأوتار لملاحظة أن الأوتار المتساوية تحصر أقواسًا متساوية.
        </h6>`,
  ]);


board3.create("text", [
    3 , -2 ,
    ()=> "AB = " + chordAB.L().toFixed(2)
    ], {fontSize:16, strokeColor:"green"});

board3.create("text", [
    3 , -1.3 ,
    ()=> "CD = " + chordCD.L().toFixed(2)
    ], {fontSize:16, strokeColor:"green"});


 
});
