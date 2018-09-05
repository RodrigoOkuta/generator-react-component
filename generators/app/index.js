"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const path = require("path");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        "Your humble servant, the " +
          chalk.red("generator-react-class-component") +
          " generator awaits"
      )
    );

    const prompts = [
      {
        type: "input",
        name: "folder",
        message: "Where do you want to create the component?",
        default: path.resolve(".")
      },
      {
        type: "input",
        name: "name",
        message: "What is the Class's Name?",
        default: "MyComponent"
      },
      {
        type: "confirm",
        name: "addTest",
        message: "Include the spec test?",
        default: true
      },
      {
        type: "confirm",
        name: "addStory",
        message: "Include story for storybook?",
        default: true
      },
      {
        type: "confirm",
        name: "addMarkdown",
        message: "Add markdown file?",
        default: true
      }
    ];

    return this.prompt(prompts).then(answers => {
      this.answers = answers;
    });
  }

  writing() {
    const parent = path.resolve(this.answers.folder);
    const dest = path.join(parent, this.answers.name);

    this.fs.copyTpl(
      this.templatePath("ClassComponent.js.ejs"),
      this.destinationPath(path.join(dest, "index.js")),
      { name: this.answers.name }
    );

    if (this.answers.addTest) {
      this.fs.copyTpl(
        this.templatePath("ClassComponent.spec.js.ejs"),
        this.destinationPath(path.join(dest, "spec.js")),
        { name: this.answers.name }
      );
    }

    if (this.answers.addStory) {
      this.fs.copyTpl(
        this.templatePath("ClassComponent.story.js.ejs"),
        this.destinationPath(path.join(dest, "story.js")),
        { name: this.answers.name }
      );
    }

    if (this.answers.addMarkdown) {
      this.fs.copyTpl(
        this.templatePath("ClassComponent.md.ejs"),
        this.destinationPath(path.join(dest, `README.md`)),
        { name: this.answers.name }
      );
    }
  }

  install() {}
};
