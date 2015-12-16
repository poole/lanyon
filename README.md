# Digital Edition Jekyll Theme


digitaledition-jekylltheme is a [Jekyll](http://jekyllrb.com) theme
based on [Lanyon](https://github.com/poole/lanyon).  It is intended to be used
with [Readux](http://readux.library.emory.edu) and
[teifacsimile-to-jekyll](https://github.com/emory-libraries-ecds/teifacsimile-to-jekyll) to display an annotated digital edition.

## Contents

- [Usage](#usage)
- [Content](#content)
- [Options](#options)
  - [Lanyon](#lanyon)
  - [Sidebar menu](#sidebar-menu)
  - [Custom Page URLs](#custom-page-urls)
  - [Search](#search)

## Usage

Create your annotations on [Readux](http://readux.library.emory.edu),
export your volume as a Jekyll site, and start Jekyll to see your annotated
digital edition.

See [the Poole usage guidelines](https://github.com/poole/poole#usage)
or the [Jekyll documentation](http://jekyllrb.com/) for instructions on
installing and using Jekyll.

## Content

This digital edition Jekyll site makes use of [Jekyll Collections](http://jekyllrb.com/docs/collections/) to display non-blog content.  When you create a site via Readux
or import annotated TEI facsimile using teifacsmile-to-jekyll, your site
will include the following:

- a *volume_pages* collection, with content in the `_volume_pages` directory
  - one html file per page in the volume, with files numbered sequentially
- an *annotation* collection, with content in the `_annotations` directory
  - one markdown file per annotation; files are numbered by annotation id
- a tag [data file](http://jekyllrb.com/docs/datafiles/) in `_data/tags.yml`
  with the tags from your annotations
- one markdown page per tag in the `tags` directory, for simple acess to
  annotations by tag

The base Jekyll theme also includes placeholder introduction and credits
pages, which you can edit to content to your annotated digital
edition.  Additional pages can be added in a similar fashion.

## Options

This Jekyll project includes several options for customization.

### Lanyon

All display customizations available in Lanyon are available, including
configurable theme and various sidebar display options.  See the
[Lanyon](https://github.com/poole/lanyon) documentation for specifics.

### Sidebar Menu

This Jekyll project revises the default Lanyon sidebar logic, which
automatically displays all top-level pages alphabetically.  To include
a page in the sidebar navigation, and to control the order, set a *nav_order*
number in the front matter of the page you want included.

### Custom Page URLs

The Readux web export and the teifacsimile-to-jekyll script allow you to
optionally specify which page in the Readux volume is numbered 1 in the
original edition, as a convenience to generate a site with nicer urls.
All of the pages before your designated page 1 will be numbered and
displayed with the label "Front", but these can be customized.  To override
page urls, edit the front matter for each page that you want
customized and modify the following fields as desired:

- *title*: used as the label displayed on the individual page,
  in the HTML header, and as previews for next and previous page links
- *short_label*: customize the short label prefix used on thumbnail display
  (default for normal pages is p.)
- *number*: number to be displayed with the short label on thumbnail views
- *permalink*: custom url for this page; note that these should always
   start with `/pages/`.

### Custom Page URLs

Currently, search is implemented using
[Simple-Jekyll-Search](https://github.com/christian-fei/Simple-Jekyll-Search), a javascript-based search that does not require any extra Jekyll plugins.  This provides a
simple keyword and exact phrase search on volume pages and annotation
content.