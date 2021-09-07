---
layout: page
title: Submitting
---

The process is relatively simple.

1. Fork this blog. You can use this link to find the github repo: [https://github.com/iclr-blog-track/iclr-blog-track.github.io](https://github.com/iclr-blog-track/iclr-blog-track.github.io)
2. **Make your fork private**. To maintain anonymity in our double-blind submission process, **we must not see your changes to the blog**. After your submission to our OpenReview, we **will** investigate the accepted posts, and we **will** reject the forks that are still public.
3. Add a post to the `_posts` folder. **This new `MarkDown` file must be your sole change to the entire blog.** You can use standard GitHub-flavoured MarkDown. Additionally, you have to edit the file's header:
    ```
   ---
    layout: post
    title: Ceci n'est pas un blogpost
    tags: [tutorial, latex]
    authors: John Doe
    ---
   ```
    You must change the `title`, `tags`, and `authors` fields. The `authors` and `title` fields accept standard strings, but the `tags` field must be an array (i.e. a string starting with `[`, followed by a comma-separated list of tags, followed by `]`).

    Don't worry about using "new" tags. Our blog server will automatically adapt to new tag names without issue.
4. Submit an anonymized version of your post to our OpenReview. To do so, simply remove any references to yourself from your MarkDown file, and send it to OpenReview! A link will be provided at a later date.
5. Upon acceptance, you will be contacted. You will then make your fork public again, and open a Pull Request to merge your changes with our repository. After asking you to fix any compatibility issues (or fixing them ourselves if they are minor enough), we will then merge your fork into the blog. That way, GitHub will keep track of every single change made to the blog (and if someone wants to find a posts' authors' GitHub usernames, they'll directly be able to find your Pull Request and your fork!).

