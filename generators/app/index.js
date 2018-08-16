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
        "Welcome to the primo " +
          chalk.red("generator-react-class-component") +
          " generator!"
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
        type: "list",
        name: "specOrTest",
        message: "use `test` or `spec`?",
        choices: ["test", "spec"],
        filter: function(val) {
          return val.toLowerCase();
        },
        default: "test"
      },
      {
        type: "confirm",
        name: "addStory",
        message: "Include story for storybook?",
        default: false
      },
      {
        type: "input",
        name: "storyExt",
        message: "Extention to use for story:",
        default: "story"
      }
    ];

    return this.prompt(prompts).then(answers => {
      this.answers = answers;
    });
  }

  writing() {
    const folder = path.resolve(this.answers.folder);

    this.fs.copyTpl(
      this.templatePath("ClassComponent.js.ejs"),
      this.destinationPath(path.join(folder, `${this.answers.name}.js`)),
      { name: this.answers.name }
    );

    if (this.answers.addTest) {
      this.fs.copyTpl(
        this.templatePath("ClassComponent.spec.js.ejs"),
        this.destinationPath(
          path.join(folder, `${this.answers.name}.${this.answers.specOrTest}.js`)
        ),
        { name: this.answers.name }
      );
    }

    if (this.answers.addStory) {
      this.fs.copyTpl(
        this.templatePath("ClassComponent.story.js.ejs"),
        this.destinationPath(
          path.join(folder, `${this.answers.name}.${this.answers.storyExt}.js`)
        ),
        { name: this.answers.name }
      );
    }
  }

  install() {}
};
