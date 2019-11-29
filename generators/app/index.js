"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const path = require("path");

// Test Test
module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      "Your humble servant, the " +
        chalk.yellow("generator-react-component") +
        " generator awaits"
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
      this.props = {
        answers,
        name: answers.name,
        isClass: answers.classComp,
        isSubdir: answers.subdir
      };
      if (answers.subdir) {
        this.props.main = path.join(answers.name, "index.js");
        this.props.spec = path.join(answers.name, "spec.js");
        this.props.story = path.join(answers.name, "story.js");
        this.props.style = path.join(answers.name, "style.js");
        this.props.readme = path.join(answers.name, "README.md");
      } else {
        this.props.main = path.join(`${answers.name}.js`);
        this.props.spec = path.join(`${answers.name}.spec.js`);
        this.props.story = path.join(`${answers.name}.story.js`);
        this.props.style = path.join(`${answers.name}.style.js`);
        this.props.readme = path.join(`${answers.name}.md`);
      }
    });
  }

  writing() {
    const props = this.props;
    const {
      answers: { addTest, addStory, addStyle, addMarkdown, classComp }
    } = props;

    this.log(
      `Properties:

${JSON.stringify(props, null, 2)}

`
    );

    // Force to be the current dir
    this.destinationRoot(this.contextRoot);

    this.fs.copyTpl(
      this.templatePath(`${classComp ? "Class" : "Functional"}Component.js.ejs`),
      this.destinationPath(props.main),
      {
        props
      }
    );

    if (addTest) {
      this.fs.copyTpl(
        this.templatePath("Component.spec.js.ejs"),
        this.destinationPath(props.spec),
        { props }
      );
    }

    if (addStory) {
      this.fs.copyTpl(
        this.templatePath("Component.story.js.ejs"),
        this.destinationPath(props.story),
        { props }
      );
    }

    if (addStyle) {
      this.fs.copyTpl(
        this.templatePath("Component.style.js.ejs"),
        this.destinationPath(props.style),
        { props }
      );
    }

    if (addMarkdown) {
      this.fs.copyTpl(
        this.templatePath("Component.md.ejs"),
        this.destinationPath(props.readme),
        { props }
      );
    }
  }

  install() {}

  end() {
    this.log(`Component ${this.props.name} created.`);
  }
};
