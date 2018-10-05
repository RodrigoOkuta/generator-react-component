# generator-react-class-component

> Generate a React class component (`class Foo extends React.Component`) or functional component (`const Foo = props => {}`), with collateral files including spec test, storybook story, and markdown documentation file.

## Prerequistes

- [Node.js](https://nodejs.org)
- [Yeoman](http://yeoman.io)

## Installation

Clone this repository (or your own fork of it) and link it locally

```bash
git clone https://github.com/tamouse/generator-react-class-component.git
cd generateor-react-class-component
npm link
```

## Usage

In your react project,generate your new component:

```bash
yo react-class-component
```

The generator will ask:

- where you want to create the component (default is `.`)
- whether you want to make a class or functional component
- whether you want to make a subdirectory for the component
- the Name of the component (PascalCase is BestCase)
- if you want to create a spec test
- if you want to create a story for storybook
- if you want to create a markdown file for documentation (automatically used in the storybook file above)

The generator will create (up to) 4 files in the directory specified:

- `CompName.js` - the component class
- `CompName.spec.js` - the spec test
- `CompName.story.js` - the story file
- `CompName.md` - the markdown file

If a new subdirectory is chosen, the files will be:

- `CompName/index.js`
- `CompName/spec.js`
- `CompName/story.js`
- `CompName/README.md`

## Templates

The templates are in `<generator-react-class-component>/generators/app/templates/` -- feel free to modify your fork to your own needs.

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT &copy; [Tamara Temple](https://github.com/tamouse)
