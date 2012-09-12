Fractal.util = {
	Point: function(x, y) {
		return {
			'x': x,
			'y': y
		}
	},
	getEdgePoint: function(sX, sY, mX, mY, wX, wY) {
		console.log(arguments);
		//check for division by 0
		if (mX - sX == 0 || mY - sY == 0) {
			return [sX, sY];
		}

		var eX1, eY1, eX2, eY2;

		eY1 = mY + (mX < sX ? mX : wX - mX) * Math.abs(mY - sY) / Math.abs(mX - sX) * (sY < mY ? 1 : -1);
		eX1 = sX < mX ? wX : 0;

		eX2 = mX + (mY < sY ? mY : wY - mY) * Math.abs(mX - sX) / Math.abs(mY - sY) * (sX < mX ? 1 : -1);
		eY2 = sY < mY ? wY : 0;
		
		if (eY1 < 0 || eY1 > wY) {
			return [eX2, eY2];
		}
		else {
			return [eX1, eY1];
		}
	},
	getQString: function(name)
	{
	  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	  var regexS = "[\\?&]" + name + "=([^&#]*)";
	  var regex = new RegExp(regexS);
	  var results = regex.exec(window.location.search);
	  if(results == null)
	    return "";
	  else
	    return decodeURIComponent(results[1].replace(/\+/g, " "));
	},
	bezierFromIntersection: function(startPt, int1, int2, endPt) {
		function b0(t) {return Math.pow(1 - t, 3); }
		function b1(t) { return t * (1 - t) * (1 - t) * 3; }
		function b2(t) { return (1 - t) * t * t * 3; }
		function b3(t) { return Math.pow(t, 3); }
		function bezierPoints(x0, y0, x4, y4, x5, y5, x3, y3) {
			var c1 = Math.sqrt((x4 - x0) * (x4 - x0) + (y4 - y0) * (y4 - y0));
			var c2 = Math.sqrt((x5 - x4) * (x5 - x4) + (y5 - y4) * (y5 - y4));
        	var c3 = Math.sqrt((x3 - x5) * (x3 - x5) + (y3 - y5) * (y3 - y5));
        	var t1 = c1 / (c1 + c2 + c3);
        	var t2 = (c1 + c2) / (c1 + c2 + c3);
        	var x = solvexy(b1(t1), b2(t1), x4 - (x0 * b0(t1)) - (x3 * b3(t1)), b1(t2), b2(t2), x5 - (x0 * b0(t2)) - (x3 * b3(t2)));
        	var y = solvexy(b1(t1), b2(t1), y4 - (y0 * b0(t1)) - (y3 * b3(t1)), b1(t2), b2(t2), y5 - (y0 * b0(t2)) - (y3 * b3(t2)));
        	return [x, y];
		}
		function solvexy(a, b, c, d, e, f) {
			var j = (c - a / d * f) / (b - a * e / d);
			var i = (c - (b * j)) / a;
			return [i, j];
		}
		var pts = bezierPoints(startPt.x, startPt.y, int1.x, int1.y, int2.x, int2.y, endPt.x, endPt.y);
		return [startPt, new this.Point(pts[0][0], pts[1][0]), new this.Point(pts[0][1], pts[1][1]), endPt];
	}
};

Fractal.ctrl = {
	globalColor: 'blue',
	numOfClicks: 0,
	points: [new Fractal.util.Point(), new Fractal.util.Point(), new Fractal.util.Point(), new Fractal.util.Point()]
};


$(function() {
	var random = Fractal.util.getQString('random');
	Fractal.init(random);
	$('#random')[0].checked = random == "true" ? true : false;
	$('#random').click(function() {
		window.location = 'http://fractalz.herokuapp.com?random=' + this.checked;
		// window.location = 'file:///C:/Users/Bryan/Documents/GitHub/Fractalz/client/index.html?random=' + this.checked;
	});
	$('.radio').click(function() {
		Fractal.ctrl.globalColor = this.value;
	})
	$('#savepngbtn').click(function() {
		Canvas2Image.saveAsPNG($('#stage')[0]);
	});
});