window.onload = function(){
	V.sprite = new Image();
	V.sprite.src = 'assets/sprite.gif';
	V.sprite.onload = game.init();
};

var game = (function () {
	this.V = {
		fps:50,
		W:0,
		H:0,
		sc:2, //scale
		score:500,
		lifes:10,
		rad:Math.PI/180,
		lastTime:0,
		timer:0,
		spawn:[],
		sprite: {},
		ctx: {},
		ctx_bg: {},
		ctx_menu: {},
		//ctx_hit: {},
		Water:20,
		Fire:30,
		Earth:60,
		Air:50,
		rand:function(min,max){
			return Math.floor(Math.random()*(max-min+1))+min;
		},
	};
	//this.Board = {};
	this.init = function(){

		var canvas_bg = document.createElement('canvas');
		V.ctx_bg = canvas_bg.getContext('2d');

		var canvas = document.createElement('canvas');				
		V.ctx = canvas.getContext('2d');

		var canvas_menu = document.createElement('canvas');				
		V.ctx_menu = canvas_menu.getContext('2d');

		//var canvas_hit = document.createElement('canvas');				
		//V.ctx_hit = canvas_hit.getContext('2d');

		layout(canvas, canvas_bg, canvas_menu);	

		
		document.getElementById("game").appendChild(canvas_bg);
		document.getElementById("game").appendChild(canvas);
		document.getElementById("main-menu").appendChild(canvas_menu);

		MenuMap1 = new B(V, 0.2, V.ctx_menu, 1, 100,100);
		MenuMap2 = new B(V, 0.2, V.ctx_menu, 1, 250,100);
		MenuMap3 = new B(V, 0.2, V.ctx_menu, 1, 400,100);
		MenuMap4 = new B(V, 0.2, V.ctx_menu, 1, 100,250);
		MenuMap5 = new B(V, 0.2, V.ctx_menu, 1, 250,250);
		MenuMap6 = new B(V, 0.2, V.ctx_menu, 1, 400,250);

		
		//document.body.appendChild(canvas_hit);
		//		

		setTimeout(create, 100);
	};
	this.layout = function(canvas, canvas_bg, canvas_menu){
		V.W = 320*V.sc;
		V.H = 240*V.sc;
		//canvas_hit.width = V.W;
		//canvas_hit.height = V.H;
		canvas_bg.width = V.W;
		canvas_bg.height = V.H;
		canvas.width = V.W;
		canvas.height = V.H;
		canvas_menu.width = V.W;
		canvas_menu.height = V.H;

		V.ctx.imageSmoothingEnabled = false;
		V.ctx.mozImageSmoothingEnabled = false;
		V.ctx.oImageSmoothingEnabled = false;
		V.ctx.webkitImageSmoothingEnabled = false;
		V.ctx_bg.imageSmoothingEnabled = false;
		V.ctx_bg.mozImageSmoothingEnabled = false;
		V.ctx_bg.oImageSmoothingEnabled = false;
		V.ctx_bg.webkitImageSmoothingEnabled = false;
	};
	this.create = function(){
		Menu = new M(V);
		Board = new B(V, 1, V.ctx_bg, 0, 0,0);

		document.getElementsByClassName("box")[0].addEventListener("mousedown", this.mouse, false);

		animationLoop();
	}
	this.waves = function(n){
		//Editor for creating waves
		//case n == number of waves
		//V.spawn.push('type', lvl, count_of_mobs, time_between_spawn);
		
			switch(n){
				case 1:
					V.spawn.push('orc', 1, 8, 25);
				break;
				case 2:
					V.spawn.push('orc', 1, 8, 25);
					V.spawn.push('man', 1, 4, 40);
				break;
				case 3:
					V.spawn.push('orc', 2, 10, 25);
				break;
				case 4:
					V.spawn.push('man', 2, 10, 40);
					V.spawn.push('knight', 3, 1, 40);
				break;
				case 5:
					V.spawn.push('dragon', 2, 5, 50);
				break;
				case 6:
					V.spawn.push('orc', 4, 20, 25);
					V.spawn.push('man', 5, 10, 35);
				break;
				case 7:
					V.spawn.push('knight', 3, 8, 40);
				break;
				case 8:
					V.spawn.push('knight', 4, 6, 40);
				break;
				case 9:
					V.spawn.push('orc', 6, 20, 25);
					V.spawn.push('dragon', 3, 8, 70);
				break;
				case 10:
					V.spawn.push('zombie', 10, 3, 180);
				break;

		}


	};
	this.animationLoop = function(time){
		requestAnimationFrame( animationLoop );
		if(time-V.lastTime>=1000/V.fps){
			V.lastTime = time;

				V.ctx.clearRect(0,0,V.W, V.H);
				Board.draw();
				Menu.fill();
				
		};
	};
	this.drop = function(what, xx, yy, check) {
		var x = Math.floor(xx / (20 * V.sc));
		var y = Math.floor(yy / (20 * V.sc));

		//Board.addTower(x, y, what, check, 1);
		return Board.addTower(x, y, what, check, 1);
	};
	this.mouse = function(e){
		var mx = Math.floor(e.offsetX/(20*V.sc));
		var my = Math.floor(e.offsetY/(20*V.sc));

		Menu.upgradeInfo.style.visibility = "hidden";
		if(Board.Towers[mx][my] && V.fps!=0){
			Menu.upgrade(mx, my, Board.Towers[mx][my].type, Board.Towers[mx][my].TLvl);
		}
	};

	return {
		init: init,
		drop: drop,
	}
})();
