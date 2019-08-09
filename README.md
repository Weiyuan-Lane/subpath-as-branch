## Intro

This package helps to push a directory in your project to a separate branch altogether

###### Why is this required?

If you're building a node library to push some `dist` or `build` folder to another `git` branch (like `github-pages`), this may be what you need


## Installation and Usage

To install:
```
npm install --save-dev subpath-as-branch
```


```
subpath-as-branch -p dist -b github-pages
```
- `p` flag represents the path for the target contents to be distributed
- `b` flag represents the branch name to be published to

## Help

Invoke the following after the module has been installed
```
subpath-as-branch --help
```
Instructions such as the following should appear
```
Usage: subpath-as-branch [options]

Options:
  -V, --version         output the version number
  -p, --path <value>    Target path to submit
  -b, --branch <value>  Branch name
  -h, --help            output usage information
```