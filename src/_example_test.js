// Copyright (c) 2012 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.
/*global describe, it, expect, example, beforeEach, mocha, wwp, $, afterEach, Raphael, jQuery */
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

		it("draws a line in response to mouse movement", function() {
			mouseDown(20, 30);
			mouseMove(30, 300);

			expect(lines(paper)).to.eql([
				[20, 30, 30, 300]
			]);
		});

		it("does not draw lines when the mouse button isn't down", function() {
			mouseMove(20, 30);
			mouseMove(30, 300);

			expect(lines(paper)).to.eql([]);
		});

		it("does not draw lines after mouse button is raised", function() {
			mouseDown(20, 30);
			mouseMove(30, 300);
			mouseUp(30, 300);
			mouseMove(40, 60);

			expect(lines(paper)).to.eql([
				[20, 30, 30, 300]
			]);
		});

		it("draws consecutive line segments as mouse is moved", function() {
			mouseDown(20, 30);
			mouseMove(30, 300);
			mouseMove(40, 60);
			mouseUp(30, 300);

			expect(lines(paper)).to.eql([
				[20, 30, 30, 300],
				[30, 300, 40, 60]
			]);
		});

		// Further details left as an exercise for the viewer :-)

		function mouseDown(relativeX, relativeY, optionalElement) {
			sendMouseEvent("mousedown", relativeX, relativeY, optionalElement);
		}

		function mouseMove(relativeX, relativeY, optionalElement) {
			sendMouseEvent("mousemove", relativeX, relativeY, optionalElement);
		}

		function mouseUp(relativeX, relativeY, optionalElement) {
			sendMouseEvent("mouseup", relativeX, relativeY, optionalElement);
		}

		function sendMouseEvent(event, relativeX, relativeY, optionalJqElement) {
			var jqElement = optionalJqElement || drawingArea;

			var page = pageOffset(drawingArea, relativeX, relativeY);

			var eventData = new jQuery.Event();
			eventData.pageX = page.x;
			eventData.pageY = page.y;
			eventData.type = event;
			jqElement.trigger(eventData);
		}

		function pageOffset(drawingArea, relativeX, relativeY) {
			var topLeftOfDrawingArea = drawingArea.offset();
			return {
				x: relativeX + topLeftOfDrawingArea.left,
				y: relativeY + topLeftOfDrawingArea.top
			};
		}

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