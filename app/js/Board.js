
function B(V){
	this.V = V;
	this.templates = [
		[
			'            W   ',
			'            W   ',
			'   DDDDDDDDDW   ',
			'   W            ',
			'   W            ',
			'   W            ',
			'   W   SAAAAA   ',
			'   W   S    W   ',
			'   W   S    W   ',
			'   WAAAA    W   ',
			'            W   ',
			'            W   '
		],
	];
	this.elements = {
		'grass':{FXmod:0, type:'G'},
		'W':{FXmod:1, 	  type:'W'},
		'A':{FXmod:1, 	  type:'A'},
		'S':{FXmod:1,	  type:'S'},
		'D':{FXmod:1,  	  type:'D'},
	};
	//main arr included grass and path
	this.b = []; 
	//this.Towers = this.b;
	this.Towers = new Array(16);
	  for (var i = 0; i < 16; i++) {
	    this.Towers[i] = new Array(12);
	    for(var j=0; j<12; j++){
	    	//this.Towers[i][j] = {};
	    }
	  }
	this.parse(this.templates[0]);
	
	this.drawBg();	
};

B.prototype.addTower = function(x, y, type){
	this.Towers[x][y] = new T(this.V, x, y, type);
	this.Towers[x][y].draw(x, y);
};

B.prototype.draw = function(){
	for (var i = 0; i < 16; i++) {	   	
	    for(var j=0; j<12; j++){
	    	if(this.Towers[i][j]){
	    		this.Towers[i][j].draw();
	    	}
	    }
	 }
};

B.prototype.drawBg = function(){
	for(var i=0; i<this.b.length; i++){
		for(var j=0; j<this.b[i].length; j++){

			if(this.b[i][j].type == 'G'){
				V.ctx_bg.fillStyle = "#5fc148";
			}else{
				V.ctx_bg.fillStyle = "#e8c17a";
			}

			V.ctx_bg.fillRect((j*20+2)*V.sc, (i*20+1)*V.sc, (20-3.5)*V.sc, (20-4)*V.sc);
			V.ctx_bg.drawImage(
				V.sprite,
				0,
				53,
				40,
				50,
				j*40*V.sc/2,
				i*40*V.sc/2-5*V.sc,
				40*V.sc/2,
				50*V.sc/2
			);
		}
	}
};

B.prototype.parse = function(arr){
	for(var i=0; i<arr.length; i++){
		this.b.push([]);
		for(var j=0; j<arr[i].length; j++){
			this.b[i].push(this.elements[arr[i].charAt(j)==' ' ? 'grass' : arr[i].charAt(j)]);
		}
	}
}
// B.mouse = function(e){
// 	B.mx = Math.floor(e.offsetX/(20*VAR.sc));
// 	B.my = Math.floor(e.offsetY/(20*VAR.sc));
// 	console.log('click: ' + B.mx + '/' + B.my + ' type:' + Map.b[B.my][B.mx].type);
// 	G.ctx_bg.fillRect(B.mx*20*VAR.sc, B.my*20*VAR.sc, 20*VAR.sc, 20*VAR.sc);
// }
