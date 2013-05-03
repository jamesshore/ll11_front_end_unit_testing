// Copyright (c) 2012 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.
/*globals wwp:true, Raphael */

wwp = window.wwp || {};

(function() {
	"use strict";

	var paper;

	wwp.initializeDrawingArea = function(drawingAreaDiv) {
		paper = new Raphael(drawingAreaDiv);
		return paper;
	};

	wwp.drawLine = function(startX, startY, endX, endY) {
		paper.path("M" + startX + "," + startY + "L" + endX + "," + endY);
	};

}());
