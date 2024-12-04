window.addEventListener("DOMContentLoaded", (e) => {
    
    // ---- box4 ------

    var board = JXG.JSXGraph.initBoard("box4", {
      boundingbox: [-4, 5, 6, -3],
      keepaspectratio: true,
      axis: true,
    });
  
    var center = board.create("point", [0, 0], { name: "O", fixed: true });
    var radiusPoint = board.create("point", [3, 0], {
      name: "R",
      visible: false,
    });
    var circle = board.create("circle", [center, radiusPoint]);
    var s = board.create('slider', [[1, 4], [5, 4], [0, Math.PI/4, 6*Math.PI/8]]);

    // Create points on the circle

    var A = board.create("glider", [-2, -2, circle], { name: "A", size:4, fixed:true });

    // انتبه الصيغة لعامة هي  r.math.cos(theta) ولكن نعلم ان نصف القطر هو 3
    var B = board.create("glider", [
        
        function() { return center.X() + 3 * Math.cos(s.Value()); },  // حساب X بناءً على الزاوية من المنزلق
        function() { return center.Y() + 3 * Math.sin(s.Value()); },  // حساب Y بناءً على الزاوية من المنزلق
        circle
    ], { name: "B", size: 4 });

    var tangent1 = board.create("tangent", [B, circle], {strokeColor:"red"});


    // إنشاء نقاط على المماس
    var C = board.create("glider", [-2, 2, circle], { name: "C", size:4, fixed: true });

    // معامل التحكم بالمسافة بين النقطة B والنقطة E (يمكن تغييره للتحكم بالمسافة)
    var distanceFactor = -2; // يمكنك تغيير هذا المعامل لزيادة أو تقليل المسافة
    
    var E = board.create("point", [
        function() {
            // إزاحة ثابتة على المحور X بناءً على موقع B والمماس
            var direction = (tangent1.point1.X() > tangent1.point2.X()) ? 1 : -1; // التحكم في الاتجاه
            return B.X() + direction * distanceFactor / Math.sqrt(1 + Math.pow(tangent1.getSlope(), 2));
        },
        function() {
            // إزاحة ثابتة على المحور Y بناءً على الميل
            var direction = (tangent1.point1.X() > tangent1.point2.X()) ? 1 : -1; // التحكم في الاتجاه
            return B.Y() + direction * tangent1.getSlope() * (distanceFactor / Math.sqrt(1 + Math.pow(tangent1.getSlope(), 2)));
        }
    ], {name: 'E', size: 4, color: 'blue', fontSize:15, fontWidth:3});  
            
    // Create chords
    var oB = board.create("segment", [B, center], { strokeColor: "black", });
    var oC = board.create("segment", [C, center], { strokeColor: "black", });
      
    var chordBA = board.create("segment", [B, A], {
      strokeColor:"green",
      strokeWidth:3,
      dash:2,
    });
    var chordCA = board.create("segment", [C, A], {
      strokeColor:"green",
      strokeWidth:3,
      dash:2
    })
 
    var chordBC = board.create("segment", [B,C], {
        strokeColor: "red",
        strokeWidth: 2
    })

    var centralAngle = board.create("angle", [B, center, C], {
      radius: 0.5,
      fillColor: "yellow",
      fontSize:16
    });

    // Create inscribed angle
    var inscribedAngle = board.create("angle", [B, A, C], {
      radius: 0.5,
    }, {fontSize:14});

    var mmas = board.create("angle", [E, B, C], {
      radius: 0.5,
    }, {fontSize:14});

     
    function ensureMinorAngle(angle) {
     angle = angle * 180 / Math.PI;
     if (angle < 0) angle += 360;
     if (angle > 180) angle = 360 - angle;
     return angle;
    } 
  
    var centralAngleText = board.create("text", [
      () => center.X() + 0.5,
      () => center.Y() + 0.5,
      () => ensureMinorAngle(centralAngle.Value()).toFixed(2) + "&deg;",
    ], {fontSize:16});
  
    
    var inscribedAngleText = board.create("text", [
      () => A.X() + 0.8,
      () => A.Y() + 0.3,
      () => ensureMinorAngle(inscribedAngle.Value()).toFixed(2) + "&deg;",
    ], {fontSize:15});
  
    var mmasText = board.create("text", [
        () => B.X() + 0.5,
        () => B.Y() + 0.5,
        () => ensureMinorAngle(inscribedAngle.Value()).toFixed(2) + "&deg;",
    ], {fontSize:15});

    var instructions = board.create("text", [
      -3, 4.5 ,

      ` اسحب الشريط لترى قياس الزاوية المماسية `
    ], {strokeColor:"orange", fontSize:15})

});