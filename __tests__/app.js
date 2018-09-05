"use strict";
var path = require("path");
var assert = require("yeoman-assert");
var helpers = require("yeoman-test");

describe("generator-react-class-component:app", () => {
  describe("with default responses", () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, "../generators/app")).withPrompts({
        folder: "/tmp/yoTest",
        name: "MyComponent",
        addTest: true,
        addStory: true,
        addMarkdown: true
      });
    });

    it("creates files", () => {
      assert.file([
        "/tmp/yoTest/MyComponent/index.js",
        "/tmp/yoTest/MyComponent/spec.js",
        "/tmp/yoTest/MyComponent/story.js",
        "/tmp/yoTest/MyComponent/README.md"
      ]);
    });
  });
});
