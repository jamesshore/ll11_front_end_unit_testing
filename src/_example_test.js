// Copyright (c) 2012 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.
/*global describe, it, expect, example, beforeEach, mocha, wwp, $, afterEach, Raphael */
(function() {
	"use strict";

	mocha.setup({ignoreLeaks: true});

	describe("Drawing area", function() {

		var drawingArea;
		var paper;

		beforeEach(function() {
			drawingArea = $("<div style='height: 300px; width: 600px'></div>");
			$(document.body).append(drawingArea);
			paper = wwp.initializeDrawingArea(drawingArea[0]);
		});

		afterEach(function() {
			drawingArea.remove();
		});

		it("draws a line", function() {
			wwp.drawLine(20, 30, 30, 300);

			expect(lines(paper)).to.eql([
				[20, 30, 30, 300]
			]);
		});

		function lines() {
			var result = [];
			paper.forEach(function(element) {
				result.push(elementToLine(element));
			});
			return result;
		}

		function elementToLine(element) {
			if (Raphael.svg) return svgPathToLine(element.node.attributes.d.value);
			else if (Raphael.vml) return vmlPathToLine(element.node.path.value);
			else throw new Error("Unknown Raphael engine");
		}

		function svgPathToLine(path) {
			var pathRegex;

			if (path.indexOf(",") !== -1) {
				// Firefox, Safari, and Chrome use format "M20,30L90,60"
				pathRegex = /M(\d+),(\d+)L(\d+),(\d+)/;
			}
			else {
				// IE 9 uses format "M 20 30 L 90 60"
				pathRegex = /M (\d+) (\d+) L (\d+) (\d+)/;
			}

			var coords = path.match(pathRegex);
			return [
				coords[1],
				coords[2],
				coords[3],
				coords[4]
			];
		}

		function vmlPathToLine(path) {
			// IE 8 uses format "m432000,648000 l1944000,1296000 e"
			var VML_MAGIC_NUMBER = 21600;

			var coords = path.match(/m(\d+),(\d+) l(\d+),(\d+) e/);
			return [
				coords[1] / VML_MAGIC_NUMBER,
				coords[2] / VML_MAGIC_NUMBER,
				coords[3] / VML_MAGIC_NUMBER,
				coords[4] / VML_MAGIC_NUMBER
			];
		}

	});
}());