---
layout: post
title: Batch convert images with ImageMagick
---

###Batch convert image files with ImageMagick

I recently had a number of SVG images that needed to be converted to PNG. There are a few applications that are capable of converting (Gimp, Photoshop, etc). However I wanted something simple that could batch convert them. Little did I know I already had it installed. The application is called <a href="http://www.imagemagick.org/script/index.php" target="_blank">ImageMagick.</a>

<pre><code class="bash">mogrify -format png *.svg`</pre>

There are an incredible number of options available. Head on over to the ImageMagick site for more details.

<a href="http://www.imagemagick.org/script/mogrify.php">http://www.imagemagick.org/script/mogrify.php</a>
