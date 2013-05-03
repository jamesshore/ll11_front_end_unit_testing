Lessons Learned: Front-End Unit Testing in a Nutshell
=============

This repository contains the sample code for the titular [Lessons Learned episode](http://www.letscodejavascript.com/v3/episodes/lessons_learned/11) of James Shore's [Let's Code: Test-Driven JavaScript](http://www.letscodejavascript.com) screencast. Let's Code: Test-Driven JavaScript is a screencast series focused on rigorous, professional JavaScript development.

The source code in this repository demonstrates a complete front-end application created using test-driven development. The application itself is a simple drawing tool.

Things to notice in the source code:

1. The "Arrange, Act, Assert, Reset" pattern used by the tests (`src/_example_test.js`).
2. The "event simulation" technique used to test mouse events.
3. The "DOM inspection" technique used to test Raphaël usage.

For more information about this example, watch [the screencast](http://www.letscodejavascript.com/v3/episodes/lessons_learned/9).

Building and Testing
--------------------

Before building for the first time:

1. Install [Node.js](http://nodejs.org/download/).
2. Download and unzip [the source code](https://github.com/jamesshore/ll11_front_end_unit_testing/archive/master.zip) into a convenient directory.
3. All commands must run from the root of the source tree: `cd <directory>`.
4. To cause the build to fail unless certain browsers are tested, edit `REQUIRED_BROWSERS` at the top of `Jakefile.js`.

To build (and test):

1. Run `./jake.sh karma` (Unix/Mac) or `jake karma` (Windows) to start the Testacular server.
2. Start the browsers you want to test against and point each one at `http://localhost:8080`.
3. Run `./jake.sh` (Unix/Mac) or `jake` (Windows) every time you want to build and test.

Manual Testing
--------------

To see the code run, open [src/example.html] in a browser.