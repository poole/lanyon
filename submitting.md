---
layout: page
title: Submitting
---

## Important Information

- The ICLR Venue is currently **not yet open**. We will announce when the venue opens, expected around Dec. 10th.
- The submission deadline for your blog post is **January 7th, 2022 EOA**.
- The review process will conclude on **March ???, 2022**

---

The workflow for creating and submitting a blog post to this track revolves around acquiring a copy
of our [blogpost repo](https://github.com/iclr-blog-track/iclr-blog-track.github.io), creating your
blogpost in a Markdown file in a specific location, and adding any static images as well as 
interactive HTML figures to specific directories. 
You'll then use [Jekyll](https://jekyllrb.com/docs/) to render and serve your site locally
(allowing you to visualize your post before you submit it) as well as to bundle your work when 
you're ready to submit it.
Your final submission will be a zipfile (with a specific naming scheme) of the *rendered* site, 
i.e. the `_site/` directory that is produced when you run `jekyll build`.

Why can't you just make a fork of the repo and have your submission as a pull request? 
Unfortunately, there are a lot of risks with this workflow with regards to violating the 
double-blind requirement for reviewing.
In the future this could be something that can be considered based on community feedback, but for
now we operate under the current paradigm of conference reviews. 
required to create, and where you can store all of your figures and HTML files.

Because not everyone is familiar with how to setup their environemnts to work with Jekyll, we also
provide a Docker container to help with automating several parts of this workflow.
This is detailed in the sections below. 

## Contents

- [Quickstart](#quickstart)
   - [Directory Structure](#directory-structure)
- [Using Jekyll Manually](#using-jekyll-manually)
   - [Installation](#installation)
   - [Manual Serving](#manual-serving)
   - [Manual Export](#manual-export)

## Quickstart 

Don't need to know anymore and you just want to start writing a blogpost?
The simplest way is to use our 

1. Install [Docker](https://docs.docker.com/get-docker/) onto your system.

2. Download the lastest release of the template, which can be found 
[here](https://github.com/iclr-blog-track/iclr-blog-track.github.io/releases).

3. asdf



## Details 

### Directory Structure

Before going any further, it may be useful to highlight exactly what folders and files you are
Even if you use one of our simpler quickstart methods, this will always be what's happening 
behind the scenes.

If you clone our repo or download a release, you will find a directory structure that looks like 
the following (excluding all files and directories that are not relevant to your submission): 

```bash
iclr-blog-track.github.io/
│
├── _includes
│   ├── 2022-05-04-[YOUR SUBMISSION]         # <--- Create this directory and add HTML figures here
│   │   └── [YOUR HTML FIGURES].html
│   └── ...
├── _posts
│   ├── 2022-05-04-[YOUR SUBMISSION].md      # <--- Create this file; this is your blogpost
│   └── ...
├── public
│   ├── images
│   │   ├── 2022-05-04-[YOUR SUBMISSION]     # <--- Create this directory and add static images here
│   │   │   └── [YOUR IMAGES].png
│   │   └── ...
│   └── ...
└── ...
```

Your blogpost markdown file will go in `_posts/2022-05-04-[YOUR SUBMISSION].md`.
Any static images should go in `public/images/2022-05-04-[YOUR SUBMISSION]/`.
Any interactive HTML figures should be saved in `_includes/2022-05-04-[YOUR SUBMISSION]`.
You **should not** touch anything else in the blog post release; everything else will be set by 
the conference committee.

Note that `2022-05-04-[YOUR SUBMISSION]` serves as a tag to your submission, so it should be the
same for all three items.
For example, if you're writing a blog post called "Deep Learning", you'd likely want to make your
tag `2022-05-04-deep-learning`, and the directory structure would look like this:

```bash
iclr-blog-track.github.io/
│
├── _includes
│   ├── 2022-05-04-deep-learning             # <--- Create this directory and add HTML figures here
│   │   └── [YOUR HTML FIGURES].html
│   └── ...
├── _posts
│   ├── 2022-05-04-deep-learning.md          # <--- Create this file; this is your blogpost
│   └── ...
├── public
│   ├── images
│   │   ├── 2022-05-04-deep-learning         # <--- Create this directory and add static images here
│   │   │   └── [YOUR IMAGES].png
│   │   └── ...
│   └── ...
└── ...
```

## Overall process

1. Install [Docker](https://docs.docker.com/get-docker/) onto your system.

1. Download the lastest release of the template: 

- [github.com/iclr-blog-track/iclr-blog-track.github.io/releases](https://github.com/iclr-blog-track/iclr-blog-track.github.io/releases)

2. Write your post by modifying the `_posts/2020-04-02-example-content.md` file that is in the branch **submission**. **This
   edited `MarkDown` file and the associated images/gifs/HTML figures must be your sole change to the entire blog.**
   You can use standard GitHub-flavoured MarkDown. Additionally, you have to edit the file's header:
    ```
   ---
    layout: post
    title: Title goes here
    tags: [tag1, tag2, tag3]
    authors: Doe, John, Mila; Doe, Jane, DeepMind
    ---
   ```
   You must change the `title`, `tags`, and `authors` fields. The `authors` and `title` fields accept standard strings,
   but the `tags` field must be an array (i.e. a string starting with `[`, followed by a comma-separated list of tags, followed by `]`).

   Don't worry about using new tags. Our blog server will automatically adapt to new tag names without issue.
   Read our example posts carefully to make sure that your embedded assets and $ \LaTeX $ work!
   Read about rendering your post locally [bellow](#serving).

3. To submit, anonymize your blog. To do so, remove any references to yourself from your MarkDown file.
   Then, export a static version of your blog post. To do so, you can type `make zip` in a terminal open in your blog's directory.
   This will package your blog into a `site.zip` file.
   It will also export a `vars.yml` containing your submission ID.

   **NOTE**: You will need to install Docker. Read about exporting your blog [bellow](#exporting).

   You will need to upload both the `site.zip` and the `vars.yml` to OpenReview (link to venue TBD).
4. Upon acceptance, you will be contacted. You will then make a public fork of the official repository, and open a Pull
   Request to merge your changes with our repository. After asking you to fix any compatibility issues
   (or fixing them ourselves if they are minor enough), we will then merge your fork into the blog. That way,
   GitHub will keep track of every single change made to the blog (and if someone wants to find a posts' authors'
   GitHub usernames, they'll directly be able to find your Pull Request and your fork!).

<a id="exporting"></a>
## Exporting a static version of your website

### With Docker

```bash
make zip
```

### With jekyll (use at your own risk, not officially supported)

You can read commands used by our Docker image [here](https://github.com/iclr-blog-track/github-pages-docker).

You can read about Jekyll [here](https://github.com/udem-ift6758/blogpost-template).


<a id="serving"></a>
## Serving the Page Locally

### With Docker

```bash
make serve
```

## Using Jekyll Manually

For users wishing to not use a Docker container, you can install Jekyll directly to your computer
and build the site using Jekyll directly.
This is done at your own risk, as there are many potential points of error!
If your submission is not consistent with the ones produced by our Docker container, your submission
may be rejected!

### Installation

#### Ubuntu/Debian

1. Install Ruby
```bash
sudo apt install ruby-full
```
2. Once installed, add the following to your `.bashrc` or whatever terminal startup script you may
use (this is important because otherwise gem may complain about needing sudo permission to install
packages):
```bash
export GEM_HOME="$HOME/.gem"
export PATH="$HOME/.gem/bin:$PATH"
```
3. Install Jekyll:
```bash
gem install jekyll
```
4. When exporting your submission, you will need [yq](https://github.com/mikefarah/yq) 
(a command line YAML processor). Install via snap:
```bash
sudo snap install yq
```

#### MacOS and Windows

Mac and Windows users can find relevant guides for installing Jekyll here:

- [Windows guide](https://jekyllrb.com/docs/installation/windows/)
- [MacOS guide](https://jekyllrb.com/docs/installation/macos/)

Additionally, you will need to do a few steps in Windows before serving you are able to serve your page locally. The steps below are Windows only, and you won't need them if you're on a Linux based machine. 

### Manual Serving

Once you've installed jekyll and all of the dependencies, you can now serve the webpage on your local 
machine for development purposes using the `jekyll serve` command.
In your terminal, from the directory containing the Jekyll project run:

```bash
jekyll serve
```

You should see something along the lines of:

```
> jekyll serve
Configuration file: /home/USER/ift6758-blog-template/_config.yml
            Source: /home/USER/ift6758-blog-template
       Destination: /home/USER/ift6758-blog-template/_site
 Incremental build: disabled. Enable with --incremental
      Generating... 
                    done in 0.661 seconds.
 Auto-regeneration: enabled for '/home/USER/iclr-blog-track.github.io'
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
```

If you see this, you've successfully served your web page locally!
You can access it at server address specified, in this case `http://127.0.0.1:4000/`.


### Manual Export

To prepare your blog post for submission, run the [`export.sh`](./export.sh) script found in the
root of the ICLR repository (requires [yq](https://github.com/mikefarah/yq))
The script creates a UUID for your submission and prepares a URL for your submission such that it
is compatible with our hosting servers.
Note that this process **will modify _config.yml** directly with the new URL; the original config
file will be saved to `_config.yml.bak`. 
If the export script runs successfully, the changes are reverted. 
However if it fails somewhere after the original `_config.yml` file was overwritten, you will have
to **manually revert the changes** via `mv _config.yml.bak _config.yml`.

Run the script via:

```bash
./export.sh
```

This will produce a `site.zip` and `vars.yml` file which you will submit to the ICLR venue.
Below are details on what the script does.


```bash
#!/bin/bash

# export.sh

# create backup of the original _config.yml
cp ${PWD}/_config.yml ${PWD}/_config.yml.bak

# generate a custom unique URL for post compatible with our hosting server, overwrite _config.yml
GHP_UUID="https://iclr.iro.umontreal.ca/$(uuidgen)_$(date +%s)" yq e -i '.url = strenv(GHP_UUID)' ${PWD}/_config.yml
GHP_UUID_URL="$(yq e '.url' ${PWD}/_config.yml)"
GHP_UUID="$(echo ${GHP_UUID_URL##*/})"

echo "SUBMISSION URL":
echo $GHP_UUID_URL

echo "SUBMISSION UUID:"
echo $GHP_UUID

# render site
jekyll clean
jekyll build

# store metadata
printf "%s\n" "url: $GHP_UUID_URL" "uuid: $GHP_UUID" > vars.yml
cp vars.yml $GHP_UUID/

# create zip
rm -rf site.zip
cp -r _site $GHP_UUID
zip -r site.zip $GHP_UUID

# clean up
rm -r ${PWD}/${GHP_UUID}
rm ${PWD}/_config.yml
cp ${PWD}/_config.yml.bak ${PWD}/_config.yml
```