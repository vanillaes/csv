**Notice: This is a ES package, development requires a Node >=v13.2**

## Getting Started

This package is designed to make contributing as easy as possible by specifying all work that needs to be done in the Issues.

If you'd like to contribute **claim an existing issue** -or- **create a new issue**. All unassigned issues are up-for-grabs.

Development follows the [Feature Branch Workflow][feature-workflow]:

1. Fork the repo
2. Clone your fork
3. Create a `feat/[name]` branch
4. Implement the feature and tests if necessary
5. Commit the changes
6. Create a PR to merge the feature branch
7. Reference the issue in the PR

## Developing

### Testing

There are 3 different ways to run tests

#### VSCode Debugger [Best]

1. Open the `.spec` file in VSCode
2. Open the 'Debug' pane
3. Run the 'Test' configuration

#### Test Watcher [Easiest]

The watcher looks for changes in the `.spec` files. When a change is detected, the tests in that file are run.

1. Open a terminal an the project directory
2. Run `npm run test:watch`
3. Modify then save a `.spec` file

#### CLI [Simplest]

All `.spec` files can be run directly from the CLI

1. Open a terminal
2. Run `node [path]`

[feature-workflow]: https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow
