# generator-react-class-component

> Generate a React class component (class extends React.Component), with collateral files including spec test, storybook story, and markdown documentation file.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-react-class-component using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

Next, clone this repository (or your own fork of it) and link it locally

```bash
git clone https://github.com/tamouse/generator-react-class-component.git
cd generateor-react-class-component
npm link
```

Then generate your new project:

```bash
yo react-class-component
```

The generator will ask:

- where you want to create the component (default is `.`)
- the Name of the component (PascalCase is BestCase)
- if you want to create a spec test
- if you want to create a story for storybook
- if you want to create a markdown file for documentation (automatically used in the storybook file above)

The generator will create (up to) 4 files:

- `CompName.js` - the component class
- `CompName.spec.js` - the spec test
- `CompName.story.js` - the story file
- `CompName.md` - the markdown file

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT &copy; [Tamara Temple](https://github.com/tamouse)
