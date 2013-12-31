# Lanyon

Lanyon is a [Jekyll](http://jekyllrb.com) theme with a toggleable sidebar drawer for out of sight navigation. It's based on [Poole](https://github.com/poole/poole), the Jekyll butler.

![Lanyon](https://f.cloud.github.com/assets/98681/1825266/be03f014-71b0-11e3-9539-876e61530e24.png)
![Lanyon with open sidebar](https://f.cloud.github.com/assets/98681/1825267/be04a914-71b0-11e3-966f-8afe9894c729.png)


## Installation

### Requires Poole

To get started, download [Poole](https://github.com/poole/poole). See [the usage guidelines](https://github.com/poole/poole#usage) for how to install and get up and running with Jekyll and Poole.

### Enabling Lanyon

Copy over the included files to turn any vanilla Poole site into a Lanyon site.

- Replace `_includes/` with the included folder of the same name (will replace `_includes/head.html` and add `_includes/sidebar.html`)
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

![Lanyon with red theme](https://f.cloud.github.com/assets/98681/1825270/be065110-71b0-11e3-9ed8-9b8de753a4af.png)
![Lanyon with red theme and open sidebar](https://f.cloud.github.com/assets/98681/1825269/be05ec20-71b0-11e3-91ea-a9138ef07186.png)

There are eight themes available at this time.

![Available theme classes](https://f.cloud.github.com/assets/98681/1817044/e5b0ec06-6f68-11e3-83d7-acd1942797a1.png)

To use a theme, add any one of the available theme classes to the `<body>` element in the `default.html` layout, like so:

```html
<body class="theme-base-08">
  ...
</body>
```

To create your own theme, look to the Themes section of [included CSS file](https://github.com/poole/lanyon/blob/master/public/css/lanyon.css). Copy any existing theme (they're only a few lines of CSS), rename it, and change the provided colors.


### Reverse layout

![Lanyon with reverse layout](https://f.cloud.github.com/assets/98681/1825265/be03f2e4-71b0-11e3-89f1-360705524495.png)
![Lanyon with reverse layout and open sidebar](https://f.cloud.github.com/assets/98681/1825268/be056174-71b0-11e3-88c8-5055bca4307f.png)

Reverse the page orientation with a single class.

```html
<body class="layout-reverse">
  ...
</body>
```


## Development

Lanyon's main branch is `gh-pages`, which includes a full Jekyll setup to ensure a smooth workflow. **All pull requests should be to submitted against `gh-pages`.**

Lanyon also contains a `master` branch for generating distribution builds. `master` contains only the files you need to convert an existing Jekyll site, like that provided by [Poole](https://github.com/poole/poole), which Lanyon is built on top of. **No pull requests will be accepted to `master`.**


## Author

**Mark Otto**
<https://github.com/mdo>
<https://twitter.com/mdo>


## License

Open sourced under the [MIT license](LICENSE.md).

<3
