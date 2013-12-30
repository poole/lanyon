# Lanyon

Lanyon is a [Jekyll](http://jekyllrb.com) theme built with a featuring a toggleable sidebar drawer for out of sight navigation. It's based on [Poole](https://github.com/poole/poole), the Jekyll butler.

![Lanyon](https://f.cloud.github.com/assets/98681/1819955/697ac4c8-70c0-11e3-8d34-403dac775329.png)
![Lanyon with open sidebar](https://f.cloud.github.com/assets/98681/1819956/697b6e5a-70c0-11e3-8fe9-b8098f9c61e5.png)


## Installation

### Requires Poole

To get started, download [Poole](https://github.com/poole/poole). See [the usage guidelines](https://github.com/poole/poole#usage) for how to install and get up and running with Jekyll and Poole.

### Enabling Lanyon

Copy over the included files to turn any vanilla Poole site into a Lanyon site.

- Replace `_includes/head.html` with the included file of the same name
- Replace `_layouts/default.html` with the included file of the same name
- Move `public/css/lanyon.css` to `public/css/`

Then, start up your Jekyll server and go!


## Options

Lanyon includes some customizable options, typically applied via classes on the `<body>` element.


### Sidebar menu

Create a list of nav links in the sidebar by assigning each Jekyll page the correct layout in the page's [front-matter](http://jekyllrb.com/docs/frontmatter/).

```
---
layout: page
title: About
---
```

**Why require a specific layout?** Jekyll will return *all* pages, including the `atom.xml`, and with an alphabetical sort order. To ensure the first link is *Home*, we exclude the `index.html` page from this list by specifying the `page` layout.


### Themes

Lanyon ships with eight optional themes based on the [base16 color scheme](https://github.com/chriskempson/base16). Apply a theme to change the color scheme (mostly applies to sidebar and links).

![Lanyon with red theme](https://f.cloud.github.com/assets/98681/1819959/6999645a-70c0-11e3-9086-c451f597ee70.png)
![Lanyon with red theme and open sidebar](https://f.cloud.github.com/assets/98681/1819960/699a181e-70c0-11e3-8696-a6a8f258824e.png)

There are eight themes available at this time.

![Available theme classes](https://f.cloud.github.com/assets/98681/1817044/e5b0ec06-6f68-11e3-83d7-acd1942797a1.png)

To use a theme, add anyone of the available theme classes to the `<body>` element in the `default.html` layout, like so:

```html
<body class="theme-base-08">
  ...
</body>
```

To create your own theme, look to the Themes section of [included CSS file](https://github.com/poole/lanyon/blob/master/public/css/lanyon.css). Copy any existing theme (they're only a few lines of CSS), rename it, and change the provided colors.


### Reverse layout

![Lanyon with reverse layout](https://f.cloud.github.com/assets/98681/1819958/698cbe1c-70c0-11e3-861d-a7a2fdc34823.png)
![Lanyon with reverse layout and open sidebar](https://f.cloud.github.com/assets/98681/1819957/698c2d08-70c0-11e3-88c7-6b8e1618b363.png)

Reverse the page orientation with a single class.

```html
<body class="layout-reverse">
  ...
</body>
```


## Author

**Mark Otto**
<https://github.com/mdo>
<https://twitter.com/mdo>


## License

Open sourced under the [MIT license](LICENSE.md).

<3
