Fractal = function() {

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
			// ctx.shadowColor = endColor;
			ctx.shadowColor = 'rgb(81, 167, 150)';
			ctx.lineWidth   = 2;
			ctx.lineCap     = 'round';
			//set stroke gradient
			var gradient = ctx.createLinearGradient(cfg.mouseX, cfg.mouseY, cfg.endX, cfg.endY);
			gradient.addColorStop(0, cfg.startColor);
			// gradient.addColorStop(.5, endColor);
			gradient.addColorStop(.9, 'rgba(0, 0, 0, 0)');
			ctx.strokeStyle = gradient;
			//draw the arc
			ctx.beginPath();
			ctx.moveTo(cfg.mouseX, cfg.mouseY);
			ctx.bezierCurveTo(cfg.midX1, cfg.midY1, cfg.midX2, cfg.midY2, cfg.endX, cfg.endY);
			ctx.stroke();	
		}	
	}

	return {
		init: function() {
				var canvas        = $('#stage')[0],
					canvasWrapper = $('#canvasWrapper')[0],
					endOnEdge     = true,
					endOnEdges    = true;

				canvas.width  = $(window).width();
				canvas.height = $(window).height();
				//create config
				var cfg = {
					ctx: canvas.getContext('2d'),
					midX1: Math.random() * canvas.width,
					midY1: Math.random() * canvas.height,
					midX2: Math.random() * canvas.width,
					midY2: Math.random() * canvas.height
				};
				//trigger mousedown actions
				canvasWrapper.addEventListener('mousedown', function(mouseEvent) {
					//assign arc origin to mouse location
					cfg.mouseX = mouseEvent.layerX;
					cfg.mouseY = mouseEvent.layerY;
					//assign random ending point for arc
					if (!endOnEdge) {
						cfg.endX = (canvas.width  / 2) + Math.random() * canvas.width  * (Math.random() > .5 ? 1 : -1);
						cfg.endY = (canvas.height / 2) + Math.random() * canvas.height * (Math.random() > .5 ? 1 : -1);
					}
					//assign random ending point for arc on edge
					else if (!endOnEdges) {
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
					cfg.endColor   = 'rgb(54, 130, 245)';
					createFractals(cfg);
				});
		}
	}
}();