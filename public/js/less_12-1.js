var brd = JXG.JSXGraph.initBoard('brd', {
    boundingbox: [-5, 5, 5, -5],
    keepaspectratio: true,
    axis: true
});

var s = brd.create('slider',[[-5,-4],[-2,-4],[0,.7, 9]],{snapWidth:.1});

// إنشاء الدائرة
var center = brd.create('point', [0, 0], { name: 'O', fixed: true });
var radiusPoint = brd.create('point', [3, 0], { visible: false });
var circle = brd.create('circle', [center, radiusPoint], {strokeColor:"black", strokeWidth:2});

var A = brd.create('glider', [2, 0, circle], { name: 'A', withLabel: true, fixed:true });
var B = brd.create('glider', [2, ()=> s.Value(), circle], { name: 'B' });
var C = brd.create('glider', [-3, ()=> s.Value(), circle], { name: 'C', withLabel: true });
var D = brd.create('glider', [-3,0, circle], { name: 'D', withLabel: true, fixed:true });
var M = brd.create('glider', [-1,-3, circle], { name: 'M', fixed:true });
var N = brd.create('glider', [1,-3, circle], { name: 'N', fixed:true });


var chordAB = brd.create('segment', [A, N], {dash:3, strokeWidth: 2, strokeColor: 'blue' });
var chordCD = brd.create('segment', [B, N], {dash:3, strokeWidth: 2, strokeColor: 'blue' });
var chordCD = brd.create('segment', [C, M], {dash:3, strokeWidth: 2, strokeColor: 'blue' });
var chordCD = brd.create('segment', [D, M], {dash:3, strokeWidth: 2, strokeColor: 'blue' });

var arcAB = brd.create('arc', [center, A,B], { 
    strokeWidth: 3,  selection: 'minor'  
});
var arcCD = brd.create('arc', [center,C,D], {
    strokeWidth: 3, selection: 'minor'  
});
// دالة لحساب الزاوية لتكون أقل من 180 درجة
function ensureMinorAngle(angle) {
    angle = angle * 180 / Math.PI;
    if (angle > 180) {
        return 360 - angle;
    }
    return angle;
}

brd.create("angle", [A,center,B], {
    radius: 1,
 name: function() {
     return JXG.Math.Geometry.trueAngle(A, center, B).toFixed(1) + '°';
 }});

brd.create("angle", [C,center,D], {
    radius: 1,
 name: function() {
     return JXG.Math.Geometry.trueAngle(A, center, B).toFixed(1) + '°';
}});

brd.create("angle", [A,N,B], {
    fillColor:"blue",
    radius: 1,
 name: function() {
     return JXG.Math.Geometry.trueAngle(A, center, B).toFixed(1)*.5 + '°';
}});
brd.create("angle", [C,M,D], {
    fillColor:"blue",
    radius: 1,
 name: function() {
     return JXG.Math.Geometry.trueAngle(A, center, B).toFixed(1)*.5 + '°';
}});

brd.create("text", [2.5 , 2.5, ()=> arcAB.Value("degrees").toFixed(1)+ '°'], {fontSize:16});

brd.create("text", [-2.5 , 2.5, ()=> arcAB.Value("degrees").toFixed(1)+ '°'], {fontSize:16});


// إضافة تعليمات للمستخدم
brd.create('text', [-5, 4, `<h6 style="background-color: aquamarine;">
اسحب الشريط لاستكشاف العلاقة بين الأقواس الزوايا المركزية والمحيطية.</h6>`]);






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