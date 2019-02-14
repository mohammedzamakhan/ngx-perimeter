# @ngx-perimeter/core

[![license](https://img.shields.io/github/license/mohammedzamakhan/ngx-perimeter.svg)](https://github.com/mohammedzamakhan/ngx-perimeter/blob/master/LICENSE)

## Table of Contents
- [Problem](#problem)
- [Solution](#solution)
- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Problem

In our applications, we download javascript files or call an API etc after the user acts, like click, tab etc. Due to which we show the loading state after the user interaction.

## Solution

The `ngx-perimeter` solves this by giving you infortion about user interaction before user even interacts with it. By using this project, based on the mouse movements (Desktop Applicaiton), if the mouse is near a element by some distance (input: `padding`), you get a notification using a event (`breach`) to act before the user acts.

You can also use the PerimeterStrategy to load routes if the user is near the route. Check `@ngx-perimeter/strategy`.

## Install

Install and manage the ngx-perimeter using NPM. You may use `yarn` or `npm`.

`npm install @ngx-perimeter/core --save`

or

`yarn add @ngx-perimeter/core`

## Usage

### NgModule
Import the PerimeterModule in the NgModule and declare them in the "imports".

- Step 1:

``` ts
import { PerimeterModule } from '@ngx-perimeter/core';

@NgModule({
  imports: [
    PerimeterModule
  ]
})
```
- Step 2:
Use the `ngxPerimeter` directive
```html
<button
  ngxPerimeter
  padding="50"
  (breach)="onBreach()"
>
  Button
</button>

```

## Contribute

Please contribute by creating issues/PRs

## License

[© 2019 ngx-perimeter. All Rights Reserved.](../LICENSE)
