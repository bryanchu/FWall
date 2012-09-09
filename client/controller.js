Fractal.util = {
	Point: function(x, y) {
		return {
			'x': x,
			'y': y
		}
	},
	getEdgePoint: function(sX, sY, mX, mY, wX, wY) {
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
			return [eX1, eY2];
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