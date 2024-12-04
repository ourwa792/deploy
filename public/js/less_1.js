window.addEventListener("DOMContentLoaded", e => {
    var board = JXG.JSXGraph.initBoard("jxgbox", {
        boundingbox: [-6, 6, 6, -6],
        keepaspectratio: true,
        axis: false,
    });


    var img = board.create('image', [
        '/image/كوس.svg', // رابط الصورة
        [0,0], // إحداثيات الزاوية السفلى اليسرى
        [4.3, 5.3]  //حجم الصورة (عرض وارتفاع)
    ], {cssClass: "opacity: 1"});

    board.create("button",[4,5.4, " تدوير لليمين",
        function(){
            let rotate = 0
            rotate +=5
            img.setAttribute({
                draggable:true,
                rotate: rotate
            })
        }
    ], {cssClass:'btn btn-warning bg-warning'});

    board.create("button",[-4,5.4, " تدوير لليسار",
        function(){
            let rotate = 0
            rotate -=5
            img.setAttribute({
                draggable:true,
                rotate: rotate
            })
        }
    ], {cssClass:'btn btn-warning bg-warning'});

    var p1 = board.create('point', [0,2], {name:"<h5> س </h5>" , fillColor: "black", size:6});
    var p2 = board.create('point', [0,0], {name:"<h5> م </h5>", fillColor: "red", size:6});
    var p3 = board.create('point', [3,0], {name:"<h5> ع </h5>" , fillColor: "black", size:6});
    
    var a = board.create('angle', [p3, p2, p1], {
         radius: 1,
      name: function() {
          return `<h6> ${JXG.Math.Geometry.trueAngle(p3, p2, p1).toFixed(1) + '°'} </h6>`;
    }});
     
    board.create("segment", [p1,p2], {strokeWidth:3})
    board.create("segment", [p3,p2], {strokeWidth:3})

    var A = board.create('point', [-2,2], {name:"<h5> س </h5>" , fillColor: "black", size:6});
    var B = board.create('point', [-5,0], {name:"<h5> م </h5>", fillColor: "red", size:6});
    var C = board.create('point', [-1,0], {name:"<h5> ع </h5>" , fillColor: "black", size:6});

    var a = board.create('angle', [C,B,A], {
         radius: 1,
      name: function() {
          return `<h6> ${JXG.Math.Geometry.trueAngle(C,B,A).toFixed(1) + '°'} </h6>`;
    }});
     
    board.create("segment", [A,B], {strokeWidth:3})
    board.create("segment", [B,C], {strokeWidth:3});


    var Aa = board.create('point', [-2,-2], {name:"<h5> س </h5>" , fillColor: "black", size:6});
    var Bb = board.create('point', [0,-4], {name:"<h5> م </h5>", fillColor: "red", size:6});
    var Cc = board.create('point', [3,-4], {name:"<h5> ع </h5>" , fillColor: "black", size:6});

    var aa = board.create('angle', [Cc,Bb,Aa], {
         radius: 1,
      name: function() {
          return `<h6> ${JXG.Math.Geometry.trueAngle(Cc,Bb,Aa).toFixed(1) + '°'} </h6>`;
    }});
     
    board.create("segment", [Aa,Bb], {strokeWidth:3})
    board.create("segment", [Bb,Cc], {strokeWidth:3})

    // ---box2---
    /*
        مضلع و قطع مستقيمة
    
        <!--  <button id="polygonModeBtn">Polygon Mode</button>
          <button id="lineModeBtn">Line Mode</button>
          <button id="resetBoardBtn">Reset Board</button> 
        -->

    var brd = JXG.JSXGraph.initBoard("jxgbox1", {
        boundingbox: [-6, 6, 6, -6],
        keepaspectratio: true,
        axis: true,
    });    


    var points = [];
    var lines = [];
    var polygons = [];
    var polygonComponents = [];
    var drawingMode = 'polygon'; // Default mode is polygon

    // Function to reset the current polygon points
    function resetPolygon() {
        points = [];
        lines = [];
    }

    // Function to create a polygon or a line segment
    function createPolygon() {
        if (points.length === 2 && drawingMode === 'line') { // Create line segment if 2 points
            var lineSegment = brd.create('segment', [points[0], points[1]], {
                strokeWidth: 3
            });
            polygonComponents.push(lineSegment);
            resetPolygon();
        } else if (points.length > 2 && drawingMode === 'polygon') { // Create polygon if more than 2 points
            var currentPolygon = brd.create('polygon', points, {
                borders: { strokeWidth: 3 },
                hasInnerPoints: true
            });

            polygons.push(currentPolygon);
            polygonComponents.push(currentPolygon);

            // Calculate the centroid manually
            var centroid = calculateCentroid(points);
            var areaText = brd.create('text', [
                centroid[0],
                centroid[1],
                function() { return 'Area: ' + currentPolygon.Area().toFixed(2); }
            ]);

            polygonComponents.push(areaText);

            // Reset points for drawing a new polygon
            resetPolygon();
        }
    }

    // Function to calculate the centroid of a polygon
    function calculateCentroid(points) {
        var xSum = 0;
        var ySum = 0;
        var n = points.length;

        for (var i = 0; i < n; i++) {
            xSum += points[i].X();
            ySum += points[i].Y();
        }

        return [xSum / n, ySum / n];
    }

    // Function to check if the first point is clicked again to close the polygon
    function checkFirstPoint(coords) {
        if (points.length > 2 && drawingMode === 'polygon') {
            var firstPoint = points[0];
            var distance = JXG.Math.Geometry.distance(coords.usrCoords.slice(1), firstPoint.coords.usrCoords.slice(1));
            if (distance < 0.2) { // If the point is close enough to the first point
                createPolygon();
                return true;
            }
        }
        return false;
    }

    // Function to handle mouse click events on the board
    function down(e) {
        var coords = getMouseCoords(e);

        if (!checkFirstPoint(coords)) {
            var newPoint = brd.create('point', [coords.usrCoords[1], coords.usrCoords[2]]);
            points.push(newPoint);
            polygonComponents.push(newPoint); // Store the point in the components array

            // Create a line between the last two points
            if (points.length > 1) {
                var newLine = brd.create('line', [points[points.length - 2], points[points.length - 1]], {
                    straightFirst: false,
                    straightLast: false,
                    strokeWidth: 2
                });
                lines.push(newLine);
                polygonComponents.push(newLine); // Store the line in the components array
            }

            if (drawingMode === 'line' && points.length === 2) {
                createPolygon(); // Draw the line segment immediately if it's a line
            }
        }
    }

    // Function to get mouse coordinates relative to the board
    function getMouseCoords(e) {
        var cPos = brd.getCoordsTopLeftCorner(e),
            absPos = JXG.getPosition(e);

        var dx = absPos[0] - cPos[0];
        var dy = absPos[1] - cPos[1];

        return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], brd);
    }

    // Register the mouse down event on the board
    brd.on('down', down);
    brd.update();

    // Function to reset the board
    function resetBoard() {
        // Remove all components of polygons
        while (polygonComponents.length > 0) {
            brd.removeObject(polygonComponents.pop());
        }

        // Clear the arrays
        points = [];
        lines = [];
        polygons = [];
        polygonComponents = [];

        // Re-render the board
        brd.update();
    }

    // Attach the resetBoard function to the reset button
    document.getElementById('resetBoardBtn').addEventListener('click', resetBoard);

    // Function to switch between drawing modes
    function switchDrawingMode(mode) {
        drawingMode = mode;
    }

    // Attach mode switching to buttons (e.g., for polygons or lines)
    document.getElementById('polygonModeBtn').addEventListener('click', function() {
        switchDrawingMode('polygon');
    });
    document.getElementById('lineModeBtn').addEventListener('click', function() {
        switchDrawingMode('line');
    });
*/


    // دالة لإنشاء اللوحة وإعداد النقاط والتفاعل مع المستخدم
    function createBoard(boardContainerId, resetButtonId, pointsCoords) {
        var predefinedPoints = []; // لتخزين النقاط المحددة مسبقًا
        var selectedPoints = []; // لتخزين النقاط التي يحددها المستخدم لرسم الخطوط
        var polygonComponents = []; // لتخزين العناصر المرسومة على اللوحة
    
        // إنشاء اللوحة باستخدام معرف الحاوية المحدد
        var board = JXG.JSXGraph.initBoard(boardContainerId, {
            boundingbox: [-8, 8, 8, -8],
            axis: false
        });
    
        // دالة لإنشاء النقاط المحددة مسبقًا
        function createPredefinedPoints() {
            for (var i = 0; i < pointsCoords.length; i++) {
                var point = board.create('point', pointsCoords[i], { name: '<h5>م</h5>' + (i+1), size: 4, fixed: true });
                predefinedPoints.push(point);
            }
        }
    
        // دالة للتعامل مع النقر على النقاط المحددة مسبقًا
        function handlePointClick(e) {
            var coords = getMouseCoords(e);
            var clickedPoint = getClickedPredefinedPoint(coords);
    
            if (clickedPoint) {
                selectedPoints.push(clickedPoint);
    
                // إذا تم اختيار ثلاث نقاط، نرسم القطعتين المستقيمتين ونحسب الزاوية
                if (selectedPoints.length === 3) {
                    createAngle(selectedPoints[0], selectedPoints[1], selectedPoints[2]);
                    selectedPoints = []; // إعادة التعيين بعد الرسم
                }
            }
        }
    
        // دالة لرسم قطعة مستقيمة بين نقطتين
        function createLineSegment(point1, point2) {
            var lineSegment = board.create('segment', [point1, point2], { strokeWidth: 3 });
            polygonComponents.push(lineSegment);
            return lineSegment;
        }
    
        // دالة لإنشاء الزاوية وعرض قياسها
        function createAngle(point1, vertexPoint, point2) {
            // إنشاء القطعتين المستقيمتين
            var line1 = createLineSegment(vertexPoint, point1);
            var line2 = createLineSegment(vertexPoint, point2);
    
            // إنشاء الزاوية بين القطعتين
            var angle = board.create('angle', [point1, vertexPoint, point2], {
                name: function() {
                    if (angle && typeof angle.Value === 'function') {  // التحقق من أن الزاوية تم إنشاؤها
                        var angleMeasure = angle.Value("degree"); // الحصول على قيمة الزاوية
                        return ` <h5> ${angleMeasure.toFixed(2) + '°'} </h5>` 
                    }
                    return ''; // إذا لم يتم إنشاؤها بعد
                },
                strokeColor: 'blue',
                radius: 1
            });
    
            polygonComponents.push(angle);
        }
    
        // دالة للتحقق مما إذا تم النقر على نقطة محددة مسبقًا
        function getClickedPredefinedPoint(coords) {
            for (var i = 0; i < predefinedPoints.length; i++) {
                var distance = JXG.Math.Geometry.distance(coords.usrCoords.slice(1), predefinedPoints[i].coords.usrCoords.slice(1));
                if (distance < 0.5) { // إذا كان النقر قريبًا بما يكفي من النقطة
                    return predefinedPoints[i];
                }
            }
            return null;
        }
    
        // دالة للحصول على إحداثيات الماوس
        function getMouseCoords(e) {
            var cPos = board.getCoordsTopLeftCorner(e),
                absPos = JXG.getPosition(e);
    
            var dx = absPos[0] - cPos[0];
            var dy = absPos[1] - cPos[1];
    
            return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], board);
        }
    
        // تسجيل حدث النقر على اللوحة
        board.on('down', handlePointClick);
    
        // إنشاء النقاط المحددة مسبقًا عند تهيئة اللوحة
        createPredefinedPoints();
    
        // دالة لإعادة تعيين اللوحة
        function resetBoard() {
            while (polygonComponents.length > 0) {
                board.removeObject(polygonComponents.pop());
            }
            selectedPoints = [];
            board.update();
        }
    
        // إرفاق دالة إعادة تعيين اللوحة بزر إعادة التعيين
        document.getElementById(resetButtonId).addEventListener('click', resetBoard);
    }

    // إحداثيات النقاط لكل لوح
    var pointsForBoard1 = [[0,0], [6,0], [4, 4]];
    var pointsForBoard2 = [[-2, 0], [5,0], [-2, 6]];
    var pointsForBoard3 = [[-2,-2], [5,-2], [-4,4]]; // m1 m2 m3
    var pointsForBoard4 = [[0,0], [4,0], [-5, 0]];

    // إنشاء لوحتين مع نقاط مختلفة
    createBoard('jxgbox1', 'resetBoardBtn1', pointsForBoard1);
    createBoard('jxgbox2', 'resetBoardBtn2', pointsForBoard2);
    createBoard('jxgbox3', 'resetBoardBtn3', pointsForBoard3);
    createBoard('jxgbox4', 'resetBoardBtn4', pointsForBoard4);




    //----

    createSelect ({
        questions_html: '.questions_1',
        check_button: '#check_answers_1',
        reset_button: '#reset_answers_1',
        answer_button: '#answers_1',
        answers: [2,1,1,1]
    });

    createMultipleChoice ({
        questions_html: '.questions_2_1',
        check_button: '#check_answers_2_1',
        reset_button: '#reset_answers_2_1',
        answer_button: '#answers_2_1',
        answers: [
        ['حادة', 'قائمة', 'منفرجة' , 'مستقيمة'],
        ['حادة', 'قائمة', 'منفرجة' , 'مستقيمة'],
        ['حادة', 'قائمة', 'منفرجة' , 'مستقيمة'],
        ['حادة', 'قائمة', 'منفرجة' , 'مستقيمة'],
        ]
    });    

})