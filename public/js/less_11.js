import JXG from 'https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraphcore.mjs'; 
window.addEventListener("DOMContentLoaded", e => {	
	
	var color1 = "crimson";
	
	var brd16 = JXG.JSXGraph.initBoard('box16', {boundingbox: [-10.4625,7.6,10.4625,-5], axis:false});
		brd16.options.point.visible = false;
		brd16.options.point.fixed = false;
		brd16.options.polygon.borders.visible = true;
		var kot16 = brd16.create('slider', [[-9.5,-4.5],[-0.5,-4.5],[90,90,-60]], {withlabel:false});	
		var B116 = brd16.create('point', [-1,-4], {name:'B116'});
		var Vues16 = brd16.create('point', [function(){return kot16.Value() > 0 ? -0.9217 : (kot16.Value() < -30 ? -Math.PI/2 : -0.9217+(-Math.PI/2+0.9217)/30*(-kot16.Value()))}, function(){return kot16.Value() > -30 ? -0.55088 : (kot16.Value() < -29 ? -0.55088+(-1+0.55088)/30*(-30-kot16.Value()) : -1)}], {name:'Vues16', color:color1});
		var zoom16 = 1.6;
		var x16 = function(){return -zoom16 * Math.cos(Vues16.X()) * Math.sin(Vues16.Y())};
	
		var X16 = brd16.create('point', [function(){return B116.X() + zoom16 * Math.sin(Vues16.X())}, function(){return B116.Y()+x16}], {name:'X', visible:true});
		// تتحرك بشكل منحني قليلا
		var u16 = brd16.create('point', [function(){return zoom16*Math.sin(Vues16.X());},x16], {name:'u16'});
		var k16 = -1;
		var Z16 = brd16.create('point', [function(){return B116.X()}, function(){return B116.Y()+zoom16*Math.cos(Vues16.Y())}], {name:'Z16'});
		var w16 = brd16.create('point', [0,function(){return zoom16*Math.cos(Vues16.Y());}], {name:'w16'});
		var Y_16 = brd16.create('point', [function(){return B116.X()+zoom16*Math.cos(Vues16.X())}, function(){return B116.Y()+zoom16*Math.sin(Vues16.X())*Math.sin(Vues16.Y())}], {name:'Y'});
		var v16 = brd16.create('point', [function(){return zoom16*Math.cos(Vues16.X())},function(){return zoom16*Math.sin(Vues16.X())*Math.sin(Vues16.Y());}], {name:'v16'});
		var O16 = brd16.create('point', [1,2], {name:'O16'});
		var a16 = 1;
		var b16 = 1;
		var d16 = 2; 
		var vzorec16 = brd16.create('slider', [[18,5.5],[18,-2],[1,1,11]], {withlabel:false});
		var K16 = brd16.create('point', [function(){return O16.X() + a16 * u16.X() + b16 * v16.X()},function(){return O16.Y() + a16 * u16.Y() + b16 * v16.Y()}], {name:'K16'});
		var L16 = brd16.create('point', [function(){return O16.X() - a16 * u16.X() + b16 * v16.X()},function(){return O16.Y() - a16 * u16.Y() + b16 * v16.Y()}], {name:'L16'});
		var M16 = brd16.create('point', [function(){return O16.X() - a16 * u16.X() - b16 * v16.X()},function(){return O16.Y() - a16 * u16.Y() - b16 * v16.Y()}], {name:'M16'});
		var N16 = brd16.create('point', [function(){return O16.X() + a16 * u16.X() - b16 * v16.X()},function(){return O16.Y() + a16 * u16.Y() - b16 * v16.Y()}], {name:'N16'});
		brd16.create('polygon', [L16,K16,N16,M16], {fillopacity:0.05});
		brd16.create('segment', [L16,K16], {});
		brd16.create('segment', [K16,N16], {});
		brd16.create('segment', [N16,M16], {});
		brd16.create('segment', [M16,L16], {});
		var P16 = brd16.create('point', [function(){return O16.X() + a16 * u16.X() + b16 * v16.X() + d16 * Math.cos((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * u16.X() + d16 * Math.sin((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * w16.X()},function(){return O16.Y() + a16 * u16.Y() + b16 * v16.Y() + d16 * Math.cos((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * u16.Y() + d16 * Math.sin((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * w16.Y()}], {name:'P16'});
		var Q16 = brd16.create('point', [function(){return O16.X() + a16 * u16.X() - b16 * v16.X() + d16 * Math.cos((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * u16.X() + d16 * Math.sin((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * w16.X()},function(){return O16.Y() + a16 * u16.Y() - b16 * v16.Y() + d16 * Math.cos((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * u16.Y() + d16 * Math.sin((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * w16.Y()}], {name:'Q16'});
		var R16 = brd16.create('point', [function(){return O16.X() - a16 * u16.X() + b16 * v16.X() - d16 * Math.cos((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * u16.X() + d16 * Math.sin((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * w16.X()},function(){return O16.Y() - a16 * u16.Y() + b16 * v16.Y() - d16 * Math.cos((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * u16.Y() + d16 * Math.sin((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * w16.Y()}], {name:'R16'});
		var S16 = brd16.create('point', [function(){return O16.X() - a16 * u16.X() - b16 * v16.X() - d16 * Math.cos((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * u16.X() + d16 * Math.sin((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * w16.X()},function(){return O16.Y() - a16 * u16.Y() - b16 * v16.Y() - d16 * Math.cos((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * u16.Y() + d16 * Math.sin((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * w16.Y()}], {name:'S16'});
		brd16.create('polygon', [K16,P16,Q16,N16]);
		//brd16.create('segment', [K16,P16], {});
		//brd16.create('segment', [P16,Q16], {});
		//brd16.create('segment', [Q16,N16], {});
		//brd16.create('segment', [N16,K16], {});
		brd16.create('polygon', [L16,M16,S16,R16], {opacity:function(){return vzorec16.Value()==1||vzorec16.Value()==2||vzorec16.Value()==3||vzorec16.Value()==4||vzorec16.Value()==7||vzorec16.Value()==7||vzorec16.Value()==8||vzorec16.Value()==9||vzorec16.Value()==10?0.25:0;}});
		//brd16.create('segment', [L16,M16], {});
		//brd16.create('segment', [M16,S16], {opacity:function(){return vzorec16.Value()!=5&&vzorec16.Value()!=6&&vzorec16.Value()!=11?1:0}});
		//brd16.create('segment', [S16,R16], {opacity:function(){return vzorec16.Value()!=5&&vzorec16.Value()!=6&&vzorec16.Value()!=11?1:0}});
		//brd16.create('segment', [R16,L16], {opacity:function(){return vzorec16.Value()!=5&&vzorec16.Value()!=6&&vzorec16.Value()!=11?1:0}});
		var T16 = brd16.create('point', [function(){return O16.X() + a16 * u16.X() + b16 * v16.X() + d16 * Math.cos((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * v16.X() + d16 * Math.sin((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * w16.X()},function(){return O16.Y() + a16 * u16.Y() + b16 * v16.Y() + d16 * Math.cos((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * v16.Y() + d16 * Math.sin((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * w16.Y()}], {name:'T16'});
		var U16 = brd16.create('point', [function(){return O16.X() - a16 * u16.X() + b16 * v16.X() + d16 * Math.cos((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * v16.X() + d16 * Math.sin((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * w16.X()},function(){return O16.Y() - a16 * u16.Y() + b16 * v16.Y() + d16 * Math.cos((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * v16.Y() + d16 * Math.sin((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * w16.Y()}], {name:'U16'});
		var V16 = brd16.create('point', [function(){return O16.X() + a16 * u16.X() - b16 * v16.X() - d16 * Math.cos((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * v16.X() + d16 * Math.sin((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * w16.X()},function(){return O16.Y() + a16 * u16.Y() - b16 * v16.Y() - d16 * Math.cos((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * v16.Y() + d16 * Math.sin((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * w16.Y()}], {name:'V16'});
		var W16 = brd16.create('point', [function(){return O16.X() - a16 * u16.X() - b16 * v16.X() - d16 * Math.cos((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * v16.X() + d16 * Math.sin((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * w16.X()},function(){return O16.Y() - a16 * u16.Y() - b16 * v16.Y() - d16 * Math.cos((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * v16.Y() + d16 * Math.sin((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * w16.Y()}], {name:'W16'});
		brd16.create('polygon', [N16,V16,W16,M16], {opacity:function(){return vzorec16.Value()==1||vzorec16.Value()==5||vzorec16.Value()==6||vzorec16.Value()==10||vzorec16.Value()==11?0.25:0;}});
		//brd16.create('segment', [N16,V16], {opacity:function(){return vzorec16.Value()==1||vzorec16.Value()==5||vzorec16.Value()==6||vzorec16.Value()==10||vzorec16.Value()==11?1:0}});
		//brd16.create('segment', [V16,W16], {opacity:function(){return vzorec16.Value()==1||vzorec16.Value()==5||vzorec16.Value()==6||vzorec16.Value()==10||vzorec16.Value()==11?1:0}});
		//brd16.create('segment', [W16,M16], {opacity:function(){return vzorec16.Value()==1||vzorec16.Value()==5||vzorec16.Value()==6||vzorec16.Value()==10||vzorec16.Value()==11?1:0}});
		//brd16.create('segment', [M16,N16], {});
		brd16.create('polygon', [K16,T16,U16,L16], {opacity:function(){return vzorec16.Value()<7?0.25:0;}});
		//brd16.create('segment', [K16,T16], {opacity:function(){return vzorec16.Value()<7?1:0}});
		//brd16.create('segment', [T16,U16], {opacity:function(){return vzorec16.Value()<7?1:0}});
		//brd16.create('segment', [U16,L16], {opacity:function(){return vzorec16.Value()!=7&&vzorec16.Value()!=8&&vzorec16.Value()!=9&&vzorec16.Value()!=10&&vzorec16.Value()!=11?1:0}});
		//brd16.create('segment', [L16,K16], {opacity:function(){return vzorec16.Value()==5?1:0}});
		var A16 = brd16.create('point', [function(){return O16.X() + a16 * u16.X() + b16 * v16.X() + d16 * Math.cos((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * u16.X() + d16 * Math.sin((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * w16.X() + 2 * a16 * Math.cos(2 * (kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * u16.X() + b16 * Math.sin(2 * (kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * w16.X()},function(){return O16.Y() + a16 * u16.Y() + b16 * v16.Y() + d16 * Math.cos((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * u16.Y() + d16 * Math.sin((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * w16.Y() + 2 * a16 * Math.cos(2 * (kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * u16.Y() + b16 * Math.sin(2 * (kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * w16.Y()}], {name:'A16'});
		var B16 = brd16.create('point', [function(){return O16.X() + a16 * u16.X() - b16 * v16.X() + d16 * Math.cos((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * u16.X() + d16 * Math.sin((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * w16.X() + 2 * a16 * Math.cos(2 * (kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * u16.X() + b16 * Math.sin(2 * (kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * w16.X()},function(){return O16.Y() + a16 * u16.Y() - b16 * v16.Y() + d16 * Math.cos((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * u16.Y() + d16 * Math.sin((kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * w16.Y() + 2 * a16 * Math.cos(2 * (kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * u16.Y() + b16 * Math.sin(2 * (kot16.Value() < 0 ? 0 : kot16.Value())*Math.PI/180) * w16.Y()}], {name:'B16'});
		brd16.create('polygon', [B16,Q16,P16,A16], {opacity:function(){return vzorec16.Value()<9&&vzorec16.Value()!=7?0.25:0;}});
		//brd16.create('segment', [B16,Q16], {opacity:function(){return vzorec16.Value()!=7&&vzorec16.Value()!=9&&vzorec16.Value()!=10&&vzorec16.Value()!=11?1:0}});
		//brd16.create('segment', [Q16,P16], {});
		//brd16.create('segment', [P16,A16], {opacity:function(){return vzorec16.Value()!=7&&vzorec16.Value()!=9&&vzorec16.Value()!=10&&vzorec16.Value()!=11?1:0}});
		//brd16.create('segment', [A16,B16], {opacity:function(){return vzorec16.Value()!=7&&vzorec16.Value()!=9&&vzorec16.Value()!=10&&vzorec16.Value()!=11?1:0}});
		//brd16.options.text.anchory = 'top';
		//brd16.options.text.fontsize = 16;
	
	/* 	var ploscina16 = brd16.create('slider', [[0.5,-4],[9.5,-4],[0,0,8]], {withlabel:false});
			ploscina16.setDisplayRendNode(false);
			ploscina16.highline.setDisplayRendNode(false);
			ploscina16.baseline.setDisplayRendNode(false); */
	
		//brd16.create('text', [function(){return V16.X() + 1.3},function(){return V16.Y()-0.3}, function(){return 'a'}], {opacity:function(){return ploscina16.Value() > 0 ? 1 : 0}});
		//brd16.create('text', [function(){return W16.X() + 0.3},function(){return W16.Y()+1.375}, function(){return 'a'}], {opacity:function(){return ploscina16.Value() > 0 ? 1 : 0}});
		//brd16.create('text', [function(){return V16.X() + 1.2},function(){return V16.Y() + 1.75}, function(){return 'a^2'}], {opacity:function(){return ploscina16.Value() > 1 ? 1 : 0}});
		//brd16.create('text', [function(){return N16.X() + 1.2},function(){return N16.Y() + 1.75}, function(){return 'a^2'}], {opacity:function(){return ploscina16.Value() > 2 ? 1 : 0}});
		//brd16.create('text', [function(){return M16.X() + 1.2},function(){return M16.Y() + 1.75}, function(){return 'a^2'}], {opacity:function(){return ploscina16.Value() > 3 ? 1 : 0}});
		//brd16.create('text', [function(){return Q16.X() + 1.2},function(){return Q16.Y() + 1.75}, function(){return 'a^2'}], {opacity:function(){return ploscina16.Value() > 4 ? 1 : 0}});
		//brd16.create('text', [function(){return B16.X() + 1.2},function(){return B16.Y() + 1.75}, function(){return 'a^2'}], {opacity:function(){return ploscina16.Value() > 5 ? 1 : 0}});
		//brd16.create('text', [function(){return K16.X() + 1.2},function(){return K16.Y() + 1.75}, function(){return 'a^2'}], {opacity:function(){return ploscina16.Value() > 6 ? 1 : 0}});
		//brd16.create('text', [function(){return L16.X() + 1.2},function(){return L16.Y() + 1.75}, function(){return 'P=?'}], {opacity:function(){return ploscina16.Value() > 7 ? 1 : 0}});
		
	/* 	kot16.on('drag', function(){
			if(kot16.Value() > -60){
				ploscina16.setDisplayRendNode(false);
				ploscina16.highline.setDisplayRendNode(false);
				ploscina16.baseline.setDisplayRendNode(false);
				ploscina16.moveTo([-9.5,-4]);
			} else {
				ploscina16.showElement();
				ploscina16.highline.showElement();
				ploscina16.baseline.showElement();
				ploscina16.moveTo([-9.75,-4]);
			}
		}); 
	*/

	createMultipleChoice ({
		questions_html: '.questions_2_1',
		check_button: '#check_answers_2_1',
		reset_button: '#reset_answers_2_1',
		answer_button: '#answers_2_1',
		answers: [
		['مكعب'],
		['اسطوانة'],
		['متوازي مستطيلات'],
		['هرم', "هرم"],
		['مخروط'],
		]
	});

	createSelect ({
		questions_html: '.questions_3_1',
		check_button: '#check_answers_3_1',
		reset_button: '#reset_answers_3_1',
		answer_button: '#answers_3_1',
		answers: [ 3,4]
	});
		

	createSelect ({
		questions_html: '.questions_1',
		check_button: '#check_answers_1',
		reset_button: '#reset_answers_1',
		answer_button: '#answers_1',
		answers: [4,2]
	});


	createSelect ({
		questions_html: '.questions_2',
		check_button: '#check_answers_2',
		reset_button: '#reset_answers_2',
		answer_button: '#answers_2',
		answers: [4,1]
	});

	createSelect ({
		questions_html: '.questions_3',
		check_button: '#check_answers_3',
		reset_button: '#reset_answers_3',
		answer_button: '#answers_3',
		answers: [1,2,3,4]
	});
		
	(function () {		
		var board = JXG.JSXGraph.initBoard('cube', {
			boundingbox: [-10, 10, 10, -10],
			keepaspectratio: true,
			axis: false
		});
		board.options.point.fixed = true;

		var bound = [-3, 4];
		var view = board.create('view3d',
			[[-7,-5], [15,15],
			[bound, bound, bound]],
			{
				xPlaneRear: {visible: false},
				yPlaneRear: {visible: false},
				zPlaneRear: {fillColor: 'blue'}
			});
		var p1 = view.create('point3d', [0,0,0], { name:'A', size: 5 });
		var p2 = view.create('point3d', [3,0,0], { name:'B', size: 5 });
		var p3 = view.create('point3d', [0,3,0], { name:'C', size: 5 });
		var p4 = view.create('point3d', [0,0,3], { name:'D', size: 5 });
		var p5 = view.create('point3d', [3,3,0], { name:'E', size: 5 });
		var p6 = view.create('point3d', [0,3,3], { name:'F', size: 5 });
		var p7 = view.create('point3d', [3,0,3], { name:'G', size: 5 });
		var p8 = view.create('point3d', [3,3,3], { name:'H', size: 5 });

		view.create("polygon3d", [p1,p2,p5,p3,p1], {fillColor:"blue",  fillOpacity: 0.1 })
		view.create("polygon3d", [p1,p2,p7,p4,p1], {fillColor:"blue",  fillOpacity: 0.1 })
		view.create("polygon3d", [p1,p3,p6,p4,p1], {fillColor:"blue",  fillOpacity: 0.1 })
		view.create("polygon3d", [p5,p2,p7,p8,p5], {fillColor:"blue",  fillOpacity: 0.1 })
		view.create("polygon3d", [p7,p4,p6,p8,p7], {fillColor:"blue",  fillOpacity: 0.1 })
		
	})();

	(function () {

		var board1 = JXG.JSXGraph.initBoard('rect', {
			boundingbox: [-10, 10, 10, -10],
			keepaspectratio: true,
			axis: false
		});
		var bound1 = [-3, 5];		

		var view1 = board1.create('view3d',
			[[-7,-5], [15,15],	
			[bound1, bound1, bound1]],
		{				
			xPlaneRear: {visible: false},
			yPlaneRear: {visible: false},
			zPlaneRear: {fillColor: 'green'}
		});
		var p1 = view1.create('point3d', [0,0,0], { name:'A', size: 5 });
		var p2 = view1.create('point3d', [5,0,0], { name:'B', size: 5 });
		var p3 = view1.create('point3d', [0,3,0], { name:'C', size: 5 });
		var p4 = view1.create('point3d', [0,0,3], { name:'D', size: 5 });
		var p5 = view1.create('point3d', [5,3,0], { name:'E', size: 5 });
		var p6 = view1.create('point3d', [0,3,3], { name:'F', size: 5 });
		var p7 = view1.create('point3d', [5,0,3], { name:'G', size: 5 });
		var p8 = view1.create('point3d', [5,3,3], { name:'H', size: 5 });

		view1.create("polygon3d", [p1,p2,p5,p3,p1], {fillColor:"green",  fillOpacity: 0.1 })
		view1.create("polygon3d", [p1,p2,p7,p4,p1], {fillColor:"green",  fillOpacity: 0.1 })
		view1.create("polygon3d", [p1,p3,p6,p4,p1], {fillColor:"green",  fillOpacity: 0.1 })
		view1.create("polygon3d", [p5,p2,p7,p8,p5], {fillColor:"green",  fillOpacity: 0.1 })
		view1.create("polygon3d", [p7,p4,p6,p8,p7], {fillColor:"green",  fillOpacity: 0.1 })

		
	})();


	(function () {

		var board2 = JXG.JSXGraph.initBoard('cilynder', {
			boundingbox: [-10, 10, 10, -10],
			keepaspectratio: true,
			axis: false
		});
		var bound2 = [-3, 5];		

		var view2 = board2.create('view3d',
			[[-7,-5], [15,15],	
			[bound2, bound2, bound2]],
		{				
			xPlaneRear: {visible: false},
			yPlaneRear: {visible: false},
			zPlaneRear: {fillColor: 'red'}
		});
		
		var r = 2; // نصف القطر
		var h = 4; // الارتفاع

		// معادلات بارامترية للأسطوانة
		var cylinder = view2.create('parametricsurface3d', [
			function (u, v) { return r * Math.cos(u); },  // x(u, v)
			function (u, v) { return r * Math.sin(u); },  // y(u, v)
			function (u, v) { return v; },                // z(u, v)
			[0, 2 * Math.PI],  // نطاق u: الزاوية حول الأسطوانة
			[0, h]             // نطاق v: الارتفاع
		], {
			strokeColor: '#0000ff',
			fillColor: '#87CEEB',
			fillOpacity: 0.3,
			stepsU: 50,
			stepsV: 50
		});

		// إنشاء القاعدة السفلى: دائرة مملوءة عند z = 0
		var centerBaseBottom = view2.create('point3d', [0, 0, 0], {visible: true}); // مركز القاعدة السفلى
		var normalVector = [0, 0, 1];  // المتجه العمودي على المستوى XY
		var baseBottom = view2.create('circle3d', [centerBaseBottom, normalVector, r], {
			strokeColor: '#FF0000',
			fillColor: '#FF0000',
			fillOpacity: 0.8
		});

		// إنشاء القاعدة العليا: دائرة مملوءة عند z = h
		var centerBaseTop = view2.create('point3d', [0, 0, h], {visible: true});  // مركز القاعدة العليا
		var baseTop = view2.create('circle3d', [centerBaseTop, normalVector, r], {
			strokeColor: '#FF0000',
			fillColor: '#FF0000',
			fillOpacity: 0.8
		});
		
	})();

	(function () {

		var board3 = JXG.JSXGraph.initBoard('cone', {
			boundingbox: [-10, 10, 10, -10],
			keepaspectratio: true,
			axis: false
		});
		var bound3 = [-3, 5];		

		var view3 = board3.create('view3d',
			[[-7,-5], [15,15],	
			[bound3, bound3, bound3]],
		{				
			xPlaneRear: {visible: false},
			yPlaneRear: {visible: false},
			zPlaneRear: {fillColor: 'yellow'}
		});
		
		const center = view3.create('point3d', [0, 0, 0], {visible: true});

        // إعداد شعاع المخروط باستخدام متجه يشير إلى الأعلى
        const normal = [0, 0, 1]; // متجه عمودي في الاتجاه Z

        // إعداد القاعدة السفلى للمخروط (الدائرة) بنصف قطر ثابت
        const radius = 2;

        // إنشاء دائرة ثلاثية الأبعاد (قاعدة المخروط)
        const base = view3.create('circle3d', [center, normal, radius], {
            strokeColor: 'blue',          // لون محيط الدائرة
            strokeWidth: 2,               // عرض خط محيط الدائرة
            fillColor: 'lightblue',        // لون ملء الدائرة
            fillOpacity: 0.6              // شفافية ملء الدائرة
        });

        // إنشاء نقطة الرأس (قمة المخروط) في الاتجاه العلوي
        const apex = view3.create('point3d', [0, 0, 3], {visible: true});

        const resolution = 45; // عدد النقاط على الدائرة لرسم المخروط
        for (let i = 1; i <= resolution; i++) {
            // حساب النقاط على محيط الدائرة
            const angle = (i * 2 * Math.PI) / resolution;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            const pointOnBase = view3.create('point3d', [x, y, 0], {visible: false});

            // رسم خطوط من القمة إلى النقاط على القاعدة (جوانب المخروط)
            view3.create('line3d', [apex, pointOnBase], {
                strokeColor: 'yellow',        // لون جوانب المخروط
                strokeWidth: 2,            // عرض خطوط الجوانب
            });
        }

		
		
	})();


})
	
/* 
a=1,
0<t<2

Surface((t-1)(-a)+(2-t) a cos(-u),(t-1)(ua-pi a) + (2-t) a sin(-u), sin((v/4*2a-a)/2pi),u, 0, 2pi, v, 0, 4 )

Curve( (-a,t*2pi *a - pi*a, a), t, 0, 1 )

	
let t = board.create(
	'slider',
	[
		[-6, 7], [2, 7],
		[0, 0.3, 1]
	], {
		name: 'twist'
	}
);

let a =1

let surface = view.create('parametricsurface3d', [
	(u, v) => t.Value()-1 * -1 + 2-t.Value() * a* Math.cos(-u) ,
	(u, v) => (t.Value()-1)*(u*a-Math.PI*a) + (2-t.Value()*a*Math.sin(-u)) ,
	(u, v) => Math.sin((v/4*2*a-a)/2*Math.PI) ,
	[0, 2 * Math.PI],
	[0, 4]
], {
	strokeColor: '#b080f0',
	stepsU: 60,
	stepsV: 60
});

*/
