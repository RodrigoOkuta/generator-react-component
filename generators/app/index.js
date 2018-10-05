"use strict"
const Generator = require("yeoman-generator")
const chalk = require("chalk")
const yosay = require("yosay")
const path = require("path")

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        "Your humble servant, the " +
          chalk.red("generator-react-class-component") +
          " generator awaits"
      )
    )

    const prompts = [
      {
        type: "input",
        name: "folder",
        message: "Where do you want to create the component?",
        default: path.resolve(".")
      },
      {
        type: "confirm",
        name: "classComp",
        message: "Create a class component?",
        default: true
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
    ]

    return this.prompt(prompts).then(answers => {
      this.answers = answers
    })
  }

  writing() {
    const parent = path.resolve(this.answers.folder)

    let dest = {}
    if (this.answers.subdir) {
      dest.main = path.join(parent, this.answers.name, "index.js")
      dest.spec = path.join(parent, this.answers.name, "spec.js")
      dest.story = path.join(parent, this.answers.name, "story.js")
      dest.readme = path.join(parent, this.answers.name, "README.md")
    } else {
      dest.main = path.join(parent, `${this.answers.name}.js`)
      dest.spec = path.join(parent, `${this.answers.name}.spec.js`)
      dest.story = path.join(parent, `${this.answers.name}.story.js`)
      dest.readme = path.join(parent, `${this.answers.name}.md`)
    }

    const compTempatePath = this.answers.classComp
      ? "ClassComponent.js.ejs"
      : "FunctionalComponent.js.ejs"

    this.fs.copyTpl(this.templatePath(compTempatePath), this.destinationPath(dest.main), {
      name: this.answers.name
    })

    if (this.answers.addTest) {
      this.fs.copyTpl(
        this.templatePath("ClassComponent.spec.js.ejs"),
        this.destinationPath(dest.spec),
        { name: this.answers.name }
      )
    }

    if (this.answers.addStory) {
      this.fs.copyTpl(
        this.templatePath("ClassComponent.story.js.ejs"),
        this.destinationPath(dest.story),
        { name: this.answers.name }
      )
    }

    if (this.answers.addMarkdown) {
      this.fs.copyTpl(
        this.templatePath("ClassComponent.md.ejs"),
        this.destinationPath(dest.readme),
        { name: this.answers.name }
      )
    }
  }

  install() {}
}
