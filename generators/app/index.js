'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        'Welcome to the primo ' +
          chalk.red('generator-react-class-component') +
          ' generator!'
      )
    );

    const prompts = [
      {
        type: 'text',
        name: 'folder',
        message: 'Where do you want to create the component?',
        default: path.resolve('.')
      },
      {
        type: 'text',
        name: 'name',
        message: "What is the Class's Name?",
        default: 'MyComponent'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const folder = path.resolve(this.props.folder);

    this.fs.copyTpl(
      this.templatePath('ClassComponent.jsx.ejs'),
      this.destinationPath(path.join(folder, `${this.props.name}.jsx`)),
      { name: this.props.name }
    );

    this.fs.copyTpl(
      this.templatePath('ClassComponent.test.jsx.ejs'),
      this.destinationPath(path.join(folder, `${this.props.name}.test.jsx`)),
      { name: this.props.name }
    );
  }

  install() {}
};
