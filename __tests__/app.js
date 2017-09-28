'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-react-class-component:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ name: 'MyComponent' });
  });

  it('creates files', () => {
    assert.file(['MyComponent.jsx', 'MyComponent.test.jsx']);
  });
});
