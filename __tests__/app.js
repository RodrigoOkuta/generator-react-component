"use strict"
var os = require("os")
var fs = require("fs")
var path = require("path")
var assert = require("yeoman-assert")
var helpers = require("yeoman-test")

describe("generator-react-class-component:app", () => {
  it("creates class component in destination, no subdir", () => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .inTmpDir()
      .withPrompts({
        folder: "",
        classComp: true,
        subdir: false,
        name: "MyComponent",
        addTest: true,
        addStory: true,
        addMarkdown: true
      })
      .then(() => {
        assert.file([
          path.join("MyComponent.js"),
          path.join("MyComponent.spec.js"),
          path.join("MyComponent.story.js"),
          path.join("MyComponent.md")
        ])
      })
  })

  it("creates functional component in destination, no subdir", () => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .inTmpDir()
      .withPrompts({
        folder: "",
        classComp: false,
        subdir: false,
        name: "MyComponent",
        addTest: true,
        addStory: true,
        addMarkdown: true
      })
      .then(() => {
        assert.file([
          path.join("MyComponent.js"),
          path.join("MyComponent.spec.js"),
          path.join("MyComponent.story.js"),
          path.join("MyComponent.md")
        ])
      })
  })

  it("creates class component in destination, with subdir", () => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .inTmpDir()
      .withPrompts({
        folder: "",
        classComp: true,
        subdir: true,
        name: "MyComponent",
        addTest: true,
        addStory: true,
        addMarkdown: true
      })
      .then(() => {
        assert.file([
          path.join("MyComponent", "index.js"),
          path.join("MyComponent", "spec.js"),
          path.join("MyComponent", "story.js"),
          path.join("MyComponent", "README.md")
        ])
      })
  })
})
