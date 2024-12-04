window.addEventListener("DOMContentLoaded", (e)=> {   

    var board = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [-1, 4, 7, -1], axis:true});

    var A = board.create('point', [0,0], {name:'A', fixed:true, });
    var B = board.create('point', [4,0], {name:'B', fixed:true, });
    var D = board.create('point', [2,3], {name:'D', fixed:true, });
    var C = board.create('parallelpoint', [A, B, D], {name:'C', });

    var par = board.create('polygon', [A, B, C, D], {color:'blue', fillOpacity: 0});
    var Q = board.create('point', [
        function(){ return D.X(); },
            function(){ return A.Y();
    }], {name:'Q', visible:true});

    var tra = board.create('polygon', [Q, B,C,D], {color:'blue', withLines:false, fillOpacity: 0.3});

    var M = board.create('point', [0,0], {name:'M', visible:false});
    var N = board.create('point', [function() {return M.X()+2;}, function(){return M.Y();}], {name:'N', visible:false})
    var P = board.create('point', [function() {return M.X()+2;}, function(){return M.Y()+3;}], {name:'P', visible:false})

    var tri = board.create('polygon', [M, N, P], {color:'blue', withLines:false, fillOpacity: 0.3});

    var button1 = board.create('button', [-0.5,3, 'أمام', function(){ M.moveTo([4,0], 1000); }]);

    var button2 = board.create('button', [-0.5,2.5, 'خلف', function(){ M.moveTo([0,0], 1000); }]);



    createMultipleChoice ({
        questions_html: '.questions_2_1',
        check_button: '#check_answers_2_1',
        reset_button: '#reset_answers_2_1',
        answer_button: '#answers_2_1',
        answers: [
        ['30'],
        ]
    });
    createMultipleChoice ({
        questions_html: '.questions_1',
        check_button: '#check_answers_1',
        reset_button: '#reset_answers_1',
        answer_button: '#answers_1',
        answers: [
        ['24'],
        ]
    });
    createMultipleChoice ({
        questions_html: '.questions_2',
        check_button: '#check_answers_2',
        reset_button: '#reset_answers_2',
        answer_button: '#answers_2',
        answers: [
        ['276'],
        ]
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


})

