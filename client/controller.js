Fractal.util = {
	Point: function(x, y) {
		return {
			'x': x,
			'y': y
		}
	},
	getControlPts: function(ctxPt, midPt2, midPt4, endPt) {
		function cross(v1, v2) {
		    return v1.x * v2.y - v2.x * v1.y;
		}
		function getIntersect(pt1, pt2, pt3, pt4) {
			var r = new Point(pt2.x - pt1.x, pt2.y - pt1.y);
			var s = new Point(pt4.x - pt3.x, pt4.y - pt3.y);
			var rCrossS = cross(r, s);
			var t = cross(new Point(pt3.x - pt1.x, pt3.y - pt1.y)) / rCrossS;
			return new Point(pt1.x + (r.x * t), pt1.y + (r.y * t));
		}
		function getSlope(pt1, pt2) {
			return (pt2.y - pt1.y) / (pt2.x - pt1.x);
		}
		function getDistance(pt1, pt2) {
			return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
		}
		function midPtIsAbove(pt1, pt2, pt3) {
			var isAbove;
			if (pt2.x > p1.x) {
				if (pt3.x > pt2.x) {
					isAbove = getSlope(pt1, pt2) > getSlope(pt2, pt3);
				}
				else {
					isAbove = false;
				}
			}
			else {	
				if (pt3.x > pt2.x) {
					isAbove = getSlope(pt1, pt2) < getSlope(pt2, pt3);
				}
				else {
					isAbove = true;
				}
			}
			return isAbove;
		}

		var midPt1 = new Point(),
			midPt3 = new Point(),
			midPt5 = new Point(),
			ctrPt1 = new Point(),
			ctrPt2 = new Point();

		//calculate midpoint 1
		var heightX1 = Math.random() * getDistance(ctxPt, midPt2);
		var heightY1 = Math.random() * getDistance(ctxPt, midPt2);
		var midAbove1 = midPtIsAbove(ctxPt, midPt2, midPt4);
		if (getSlope(ctxPt, midPt2) > 0) {
			heightX1 = heightX1 * midAbove1 ? -1 : 1;
			midPt1.x = ctxPt.x + ((midPt2.x - ctxPt.x) / 2) + heightX1;

			heightY1 = heightY1 * midAbove1 ? 1 : -1;
			midPt1.y = ctxPt.y + ((midPt2.y - ctxPt.y) / 2) + heightY1;
		}
		else {
			heightX1 = heightX1 * midAbove1 ? 1 : -1;
			midPt1.x = ctxPt.x + ((midPt2.x - ctxPt.x) / 2) + heightX1;

			heightY1 = heightY1 * midAbove1 ? 1 : -1;
			midPt1.y = ctxPt.y + ((midPt2.y - ctxPt.y) / 2) + heightY1;
		}
		
		//calculate midpoint 2
		var heightX2 = Math.random() * getDistance(midPt4, endPt);
		var heightY2 = Math.random() * getDistance(midPt4, endPt);
		var midAbove2 = midPtIsAbove(endPt, midPt4, midPt2);
		if (getSlope(endPt, midPt4) > 0) {
			heightX2 = heightX2 * midAbove2 ? -1 : 1;
			midPt5.x = endPt.x + ((midPt4.x - endPt.x) / 2) + heightX2;

			heightY1 = heightY1 * midAbove2 ? -1 : 1;
			midPt5.y = endPt.y + ((midPt4.y - endPt.y) / 2) + heightY2;
		}
		else {
			heightX1 = heightX1 * midAbove2 ? 1 : -1;
			midPt5.x = endPt.x + ((midPt4.x - endPt.x) / 2) + heightX2;

			heightY1 = heightY1 * midAbove2 ? 1 : -1;
			midPt5.y = endPt.y + ((midPt4.y - endPt.y) / 2) + heightY2;
		}

		//calculate midpoint 3
		midPt3 = getIntesect(midpt1, midpt2, midpt4, midpt5);

		//calculate control point 1
		
	}
};

$(function() {
	Fractal.init();
});