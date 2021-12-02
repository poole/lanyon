---
layout: page
title: Submitting
---

The process is relatively simple.

## Overall process

1. Download the lastest release of the template: (https://github.com/iclr-blog-track/iclr-blog-track.github.io/releases)[https://github.com/iclr-blog-track/iclr-blog-track.github.io/releases]
2. Write your post by modifying the `_posts/2021-04-25-template.md` file that is in the branch **submission**. **This
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
3. To submit, anonymize your blog. To do so, simply remove any references to yourself from your MarkDown file.
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

### With jekyll (use at your own risk, not officially supported)

You can read commands used by our Docker image [here](https://github.com/iclr-blog-track/github-pages-docker).

You can read about Jekyll [here](https://github.com/udem-ift6758/blogpost-template).
