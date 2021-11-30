---
layout: page
title: Submitting
---

The process is relatively simple.

## Overall process

1. Download the lastest release of the template: https://github.com/iclr-blog-track/iclr-blog-track.github.io/releases/tag/v1.1.1
2. Write your post by modifying the `_posts/2021-04-25-template.md` file that is in the branch **submission**. **This edited `MarkDown` file and the associated images/gifs must be your sole change to the entire blog.** You can use standard GitHub-flavoured MarkDown. Additionally, you have to edit the file's header:
    ```
   ---
    layout: post
    title: Title goes here
    tags: [tag1, tag2, tag3]
    authors: Doe, John, Mila; Doe, Jane, DeepMind
    ---
   ```
    You must change the `title`, `tags`, and `authors` fields. The `authors` and `title` fields accept standard strings, but the `tags` field must be an array (i.e. a string starting with `[`, followed by a comma-separated list of tags, followed by `]`).

    Don't worry about using "new" tags. Our blog server will automatically adapt to new tag names without issue.

    If you want to include gifs, images, and the like, you can add them to the `public/images` folder.

    Read our example posts carefully to make sure that your embedded assets and $ \LaTeX $ work!
3. Export a static version of your blobpost (see below for details about this step). Note that no javascript 
4. Submit an anonymized version of your post to our OpenReview. To do so, simply remove any references to yourself from your MarkDown file, upload your static blogpost as a ZIP file, and send it to OpenReview. A link will be provided at a later date.

    ![Download instructions image]({{ site.url }}/public/images/download_zip.png)
    Include a README.txt file in the root of that ZIP that mentions which blog post is yours.

5. Upon acceptance, you will be contacted. You will then make a public fork of the official repository, and open a Pull Request to merge your changes with our repository. After asking you to fix any compatibility issues (or fixing them ourselves if they are minor enough), we will then merge your fork into the blog. That way, GitHub will keep track of every single change made to the blog (and if someone wants to find a posts' authors' GitHub usernames, they'll directly be able to find your Pull Request and your fork!).

## Exporting a static version of your website

### With Docker (recommended method)

TBD 

### With jerkyll


#### Installation of Jerkyll (Ubuntu)

1. Install Ruby (I'm using v3.2.5)

```bash
sudo apt install ruby-full
```

2. Once installed, add the following to your `.bashrc` or whatever terminal startup script you may use:

```bash
export GEM_HOME="$HOME/.gem"
export PATH="$HOME/.gem/bin:$PATH"
```

3. Install bundler:

```bash
gem install jekyll bundler
```

4. Install dependencies:

From within this repository's root directory, run:

```bash
bundle init
```
It creates a ```Gemfile``` file. Edit the file in order to have the following ```Gemfile```

```
# frozen_string_literal: true

source "https://rubygems.org"

git_source(:github) { |repo_name| "https://github.com/#{repo_name}" }

# gem "rails"
gem "jekyll-gist"
gem "jekyll-sitemap"
gem "jekyll-seo-tag" 
gem "jekyll-paginate"
gem "webrick"
```
Then run

```bash
bundle install
```

#### Installation of Jerkyll (MacOS and Windows)

Mac and Windows users can find relevant guides for installing Jekyll here:

- [Windows guide](https://jekyllrb.com/docs/installation/windows/)
- [MacOS guide](https://jekyllrb.com/docs/installation/macos/)

Additionally, you will need to do a few steps in Windows before serving you are able to serve your page locally. The steps below are Windows only, and you won't need them if you're on a Linux based machine. 

#### Windows Specific Steps:

Before running these, you'd want to make sure your Ruby and Jekyll installations are functional.

1. From within the repository's root directory, run: 

```
bundle add webrick
```

2. Open the `gemfile` present in the root directory of the repository, and add the following line at the end of the file: 

```
gem 'wdm', '>= 0.1.0'
```

3. Run the following command in the same directory: 

```
gem install wdm
```

You should be able to serve the page locally on Windows after these steps. 

### Serving the Page Locally

Once you've installed jekyll and all of the dependencies, you can now serve the webpage on your local machine for development purposes using the `jekyll serve` command, using bundle to handle any dependencies.
In your terminal, from the directory containing the Jekyll project run:

```bash
bundle exec jekyll serve
```

You should see something along the lines of:

```
> bundle exec jekyll serve
Configuration file: /home/USER/ift6758-blog-template/_config.yml
            Source: /home/USER/ift6758-blog-template
       Destination: /home/USER/ift6758-blog-template/_site
 Incremental build: disabled. Enable with --incremental
      Generating... 
                    done in 0.661 seconds.
 Auto-regeneration: enabled for '/home/USER/ift6758-blog-template'
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
```

If you see this, you've successfully served your web page locally!
You can access it at server address specified, in this case `http://127.0.0.1:4000/`.

### Generating the html file

```bash
JEKYLL_ENV=production bundle exec jekyll build
```

The static html webpage should appear in ```/_site```
