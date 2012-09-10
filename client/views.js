Fractal = function() {
	function assignRandomMouseHandlers() {
		var that = this;
		var canvas = this.canvas;
		//create config
		var cfg = {
			ctx: this.canvas.getContext('2d'),
			midX1: Math.random() * this.canvas.width,
			midY1: Math.random() * this.canvas.height,
			midX2: Math.random() * this.canvas.width,
			midY2: Math.random() * this.canvas.height
		};
		//trigger mousedown actions
		canvasWrapper.addEventListener('mousedown', function(mouseEvent) {
			//assign arc origin to mouse location
			cfg.mouseX = mouseEvent.layerX;
			cfg.mouseY = mouseEvent.layerY;
			//assign random ending point for arc
			if (!that.endOnEdge) {
				cfg.endX = (canvas.width  / 2) + Math.random() * canvas.width  * (Math.random() > .5 ? 1 : -1);
				cfg.endY = (canvas.height / 2) + Math.random() * canvas.height * (Math.random() > .5 ? 1 : -1);
			}
			//assign random ending point for arc on edge
			else if (!that.endOnEdges) {
				var side = Math.random() > .5 ? true : false;
				cfg.endX = side ? (Math.random() > .5 ? 0 : canvas.width) : (canvas.width  / 2) + Math.random() * canvas.width  * (Math.random() > .5 ? 1 : -1);
				cfg.endY = side ? (canvas.height / 2) + Math.random() * canvas.height * (Math.random() > .5 ? 1 : -1) : (Math.random() > .5 ? 0 : canvas.height);
			}
			else {
				var side = Math.random() > .5 ? true : false;
				cfg.mouseX = side ? (Math.random() > .5 ? 0 : canvas.width): (canvas.width  / 2) + Math.random() * canvas.width  * (Math.random() > .5 ? 1 : -1);
				cfg.mouseY = side ? (canvas.height / 2) + Math.random() * canvas.height * (Math.random() > .5 ? 1 : -1) : (Math.random() > .5 ? 0 : canvas.height);
				cfg.endX = side ? (Math.random() > .5 ? 0 : canvas.width) : (canvas.width  / 2) + Math.random() * canvas.width  * (Math.random() > .5 ? 1 : -1);
				cfg.endY = side ? (canvas.height / 2) + Math.random() * canvas.height * (Math.random() > .5 ? 1 : -1) : (Math.random() > .5 ? 0 : canvas.height);
			}
		});
		//trigger mouseup actions
		canvasWrapper.addEventListener('mouseup', function(mouseEvent) {
			cfg.startColor = 'white';
			// cfg.endColor   = 'rgb(22, 131, 221)';
			// cfg.endColor = 'rgb(39, 242, 52)';
			cfg.endColor = Fractal.ctrl.globalColor;
			createFractals(cfg);
		});
	}

	function assignControlledMouseHandlers() {
		function mouseHandler1(mouseEvent) {
			var ctx = that.mouseCanvas1.getContext('2d');
			this.ctx = ctx;
			this.startX = startX;
			this.startY = startY;
			this.mouseEvent = mouseEvent;
			this.edgePoint = Fractal.util.getEdgePoint(this.startX, this.startY, this.mouseEvent.layerX, this.mouseEvent.layerY, that.canvas.width, that.canvas.height);
			createLongLine.apply(this);
			Fractal.ctrl.points[0].x = this.edgePoint[0];
			Fractal.ctrl.points[0].y = this.edgePoint[1];
		}
		function mouseHandler2(mouseEvent) {
			var ctx = that.mouseCanvas2.getContext('2d');
			this.ctx = ctx;
			this.startX = startX;
			this.startY = startY;
			this.mouseEvent = mouseEvent;
			var newPoint = Fractal.util.getEdgePoint(Fractal.ctrl.points[0].x, Fractal.ctrl.points[0].y, this.startX, this.startY, that.canvas.width, that.canvas.height);
			createShortLine.apply(this);
			Fractal.ctrl.points[2].x = mouseEvent.layerX;
			Fractal.ctrl.points[2].y = mouseEvent.layerY;
		}
		function mouseHandler3(mouseEvent) {
			var ctx = that.mouseCanvas3.getContext('2d');
			this.ctx = ctx;
			this.startX = startX;
			this.startY = startY;
			this.mouseEvent = mouseEvent;
			this.edgePoint = Fractal.util.getEdgePoint(this.startX, this.startY, this.mouseEvent.layerX, this.mouseEvent.layerY, that.canvas.width, that.canvas.height);
			createLongLine.apply(this);
			Fractal.ctrl.points[3].x = this.edgePoint[0];
			Fractal.ctrl.points[3].y = this.edgePoint[1];
		}
		function createLongLine() {
			var ctx = this.ctx;
			//erase the canvas
			ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);
			//draw the new line
			ctx.lineWidth = 1;
			ctx.strokeStyle = 'white';
			ctx.beginPath();
			ctx.moveTo(this.startX, this.startY);
			ctx.lineTo(this.edgePoint[0], this.edgePoint[1]);
			ctx.stroke();
		}
		function createShortLine() {
			var ctx = this.ctx;
			//erase the canvas
			ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);
			//draw the new line
			ctx.lineWidth = 1;
			ctx.strokeStyle = 'white';
			ctx.beginPath();
			ctx.moveTo(Fractal.ctrl.points[Fractal.ctrl.numOfClicks - 1].x, Fractal.ctrl.points[Fractal.ctrl.numOfClicks - 1].y);
			ctx.lineTo(this.mouseEvent.layerX, this.mouseEvent.layerY);
			ctx.stroke();
		}
		var that = this;
		var startX;
		var startY;
		//trigger mousedown and corresponding movement actions
		canvasWrapper.addEventListener('mousedown', function(mouseEvent) {
			startX = mouseEvent.layerX;
			startY = mouseEvent.layerY;
			Fractal.ctrl.numOfClicks++;
			switch (Fractal.ctrl.numOfClicks) {
				case 1:
					//remove the previous listener
					canvasWrapper.removeEventListener('mousemove', mouseHandler3);

					Fractal.ctrl.points[1].x = startX;
					Fractal.ctrl.points[1].y = startY;
					canvasWrapper.addEventListener('mousemove', mouseHandler1, false);
					break;
				case 2:
					//remove the previous listener
					canvasWrapper.removeEventListener('mousemove', mouseHandler1);

					canvasWrapper.addEventListener('mousemove', mouseHandler2);
					break;
				case 3:
					//remove the previous listener
					canvasWrapper.removeEventListener('mousemove', mouseHandler2);

					canvasWrapper.addEventListener('mousemove', mouseHandler3);
					break;
				case 4:
					//remove the previous listener
					canvasWrapper.removeEventListener('mousemove', mouseHandler3);
					//erase all lines
					that.mouseCanvas1.getContext('2d').clearRect(0, 0, that.canvas.width, that.canvas.height);
					that.mouseCanvas2.getContext('2d').clearRect(0, 0, that.canvas.width, that.canvas.height);
					that.mouseCanvas3.getContext('2d').clearRect(0, 0, that.canvas.width, that.canvas.height);
					that.mouseCanvas4.getContext('2d').clearRect(0, 0, that.canvas.width, that.canvas.height);

					Fractal.ctrl.numOfClicks = 0;
					var edgePoint = Fractal.util.getEdgePoint(Fractal.ctrl.points[2].x, Fractal.ctrl.points[2].y, mouseEvent.layerX, mouseEvent.layerY, that.canvas.width, that.canvas.height);

					//calculate the interpolated control points
					Fractal.ctrl.points = Fractal.util.bezierFromIntersection(Fractal.ctrl.points[0], Fractal.ctrl.points[1], Fractal.ctrl.points[2], Fractal.ctrl.points[3]);

					var cfg = {
						ctx: that.canvas.getContext('2d'),
						mouseX: Fractal.ctrl.points[0].x,
						mouseY: Fractal.ctrl.points[0].y,
						midX1: Fractal.ctrl.points[1].x,
						midX2: Fractal.ctrl.points[2].x,
						midY1: Fractal.ctrl.points[1].y,
						midY2: Fractal.ctrl.points[2].y,
						endX: Fractal.ctrl.points[3].x,
						endY: Fractal.ctrl.points[3].y,
						startColor: 'white',
						endColor: Fractal.ctrl.globalColor
						// endColor: 'rgb(39, 242, 52)'
					}
					createFractals(cfg);
					break;
			}
		});
	}

	function createFractals(cfg) {
		for (var i = 0; i < Math.random() * 25; i++) {
			var ctx = cfg.ctx;

			//Move the coordinates around a little bit
			cfg.mouseX  += Math.random() * 2 * (Math.random() > .5 ? 1 : -1);
			cfg.mouseY  += Math.random() * 2 * (Math.random() > .5 ? 1 : -1);
			cfg.endX    += Math.random() * 2 * (Math.random() > .5 ? 1 : -1);
			cfg.endY    += Math.random() * 2 * (Math.random() > .5 ? 1 : -1);
			cfg.midX1   += Math.random() * 15 * (Math.random() > .5 ? 1 : -1);
			cfg.midY1   += Math.random() * 15 * (Math.random() > .5 ? 1 : -1);
			cfg.midX2   += Math.random() * 15 * (Math.random() > .5 ? 1 : -1);
			cfg.midY2   += Math.random() * 15 * (Math.random() > .5 ? 1 : -1);
			cfg.lineWidth = (Math.random() * 4) + 1;

			//TIME TO CREATE THE FRACTAL
			//set stroke styles
			ctx.strokeStyle = 'rgb(225, 225, 225)';
			ctx.shadowBlur  = 10;
			ctx.shadowColor = cfg.endColor;
			ctx.lineWidth   = 2;
			ctx.lineCap     = 'round';
			//set stroke gradient
			var gradient = ctx.createLinearGradient(cfg.mouseX, cfg.mouseY, cfg.endX, cfg.endY);
			gradient.addColorStop(0, cfg.startColor);
			// gradient.addColorStop(.5, endColor);
			gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
			ctx.strokeStyle = gradient;
			//draw the arc
			ctx.beginPath();
			ctx.moveTo(cfg.mouseX, cfg.mouseY);
			ctx.bezierCurveTo(cfg.midX1, cfg.midY1, cfg.midX2, cfg.midY2, cfg.endX, cfg.endY);
			ctx.stroke();	
		}	
	}

	return {
		assignControlledMouseHandlers: assignControlledMouseHandlers,
		assignRandomMouseHandlers: assignRandomMouseHandlers,
		init: function(random) {
				var that = {
					canvas: $('#stage')[0],
					mouseCanvas1: $('#mouse1')[0],
					mouseCanvas2: $('#mouse2')[0],
					mouseCanvas3: $('#mouse3')[0],
					mouseCanvas4: $('#mouse4')[0],
					canvasWrapper: $('#canvasWrapper')[0],
					endOnEdge: true,
					endOnEdges: true,
					random: random
				};

				that.canvas.width  = $(window).width();
				that.canvas.height = $(window).height();
				that.mouseCanvas1.width  = $(window).width();
				that.mouseCanvas1.height = $(window).height();
				that.mouseCanvas2.width  = $(window).width();
				that.mouseCanvas2.height = $(window).height();
				that.mouseCanvas3.width  = $(window).width();
				that.mouseCanvas3.height = $(window).height();
				that.mouseCanvas4.width  = $(window).width();
				that.mouseCanvas4.height = $(window).height();


				//paint the whole thing black
				var ctx = that.canvas.getContext('2d');
				ctx.fillStyle = "black";
				ctx.fillRect(0, 0, that.canvas.width, that.canvas.height);


				if (that.random == 'true'){
					assignRandomMouseHandlers.apply(that);
				}
				else {
					assignControlledMouseHandlers.apply(that);
				}
		}
	}
}();