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
          chalk.yellow("generator-react-component") +
          " generator awaits"
      )
    );

    const prompts = [
      {
        type: "confirm",
        name: "classComp",
        message: "Create a class component? (prefer Functional Components)",
        default: false
      },
      {
        type: "confirm",
        name: "subdir",
        message: "Shall I create a subdirectory for this component?",
        default: true
      },
      {
        type: "input",
        name: "name",
        message: "What is the Component's Name?",
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
        name: "addStyle",
        message: "Add style file?",
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
    let props = {
      name: this.answers.name,
      isClass: this.answers.classComp,
      isSubdir: this.answers.subdir,
      parent: path.resolve(".")
    };
    if (this.answers.subdir) {
      props.main = path.join(this.answers.name, "index.js");
      props.spec = path.join(this.answers.name, "spec.js");
      props.story = path.join(this.answers.name, "story.js");
      props.style = path.join(this.answers.name, "style.js");
      props.readme = path.join(this.answers.name, "README.md");
    } else {
      props.main = path.join(`${this.answers.name}.js`);
      props.spec = path.join(`${this.answers.name}.spec.js`);
      props.story = path.join(`${this.answers.name}.story.js`);
      props.style = path.join(`${this.answers.name}.style.js`);
      props.readme = path.join(`${this.answers.name}.md`);
    }

    const compTempatePath = this.answers.classComp
      ? "ClassComponent.js.ejs"
      : "FunctionalComponent.js.ejs";

    this.fs.copyTpl(
      this.templatePath(compTempatePath),
      this.destinationPath(path.join(props.parent, props.main)),
      {
        props
      }
    );

    if (this.answers.addTest) {
      this.fs.copyTpl(
        this.templatePath("Component.spec.js.ejs"),
        this.destinationPath(path.join(props.parent, props.spec), { props })
      );
    }

    if (this.answers.addStory) {
      this.fs.copyTpl(
        this.templatePath("Component.story.js.ejs"),
        this.destinationPath(path.join(props.parent, props.story), { props })
      );
    }

    if (this.answers.addStyle) {
      this.fs.copyTpl(
        this.templatePath("Component.style.js.ejs"),
        this.destinationPath(path.join(props.parent, props.style), { props })
      );
    }

    if (this.answers.addMarkdown) {
      this.fs.copyTpl(
        this.templatePath("Component.md.ejs"),
        this.destinationPath(path.join(props.parent, props.readme), { props })
      );
    }
  }

  install() {}
};
