"use strict";
var path = require("path");
var assert = require("yeoman-assert");
var helpers = require("yeoman-test");

describe("generator-react-class-component:app", () => {
  describe("with default responses", () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, "../generators/app")).withPrompts({
        name: "MyComponent"
      });
    });

    it("creates files", () => {
      assert.file(["MyComponent.js", "MyComponent.test.js"]);
    });
  });
  describe("with other responses", () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, "../generators/app")).withPrompts({
        name: "MyComponent",
        addTest: false,
        addStory: true,
        storyExt: "storybook"
      });
    });

    it("creates files", () => {
      assert.file(["MyComponent.js", "MyComponent.storybook.js"]);
    });
  });
});
