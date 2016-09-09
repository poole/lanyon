---
layout: post
title: Advanced Font Features in iOS
---

After watching the [WWDC 2016 Session 803][1] video on Typography and Fonts I decided that this would be a good place to start with the blog posts.

It turns out that fonts are actually very complex things but to keep this short and sweet, I'm just going to talk about a couple of things that took my interest in the video.

Those things you ask?

* Small Caps
* Hi Legibility
* Arrows

Other than the session video and a couple of Stack Overflow answers, there isn't that much detail about them so it seems like a good starting point for me.

## Small Caps

Usually you only ever come across uppercase or lowercase letters however, small caps bring an additional member to this group. They're essentially a smaller version of uppercase letters that align with lowercase letters.

You could try and get this kind of behaviour by simply using a smaller font next to a larger font however there are a few differences here as small caps are actually a TrueType Font Feature. This is something that isn't very well documented however after looking through the class headers I found a link to [this][2] page where you can find some more information.

Use of small caps requires that the font designer has opted to support this feature. Rather than just scaling down an uppercase letter glyph, the font designer has to have provided an additional glyph to achieve this. This is something that is available in the San Francisco fonts along with many other fonts.

### So why would you want to use small caps?

Small caps are designed to be subtle and can come in very handy when you're trying to perfect your designs. The case study from Apple demonstrates how they are used on the Apple TV to distinguish a title in a table without it sticking out too much. If the a smaller font size was used on it's own then it would also make the text lighter and the characters would be closer together.

![An example used within the Apple TV](/public/images/fonts/appletv.jpg){:class="img-responsive"}

Another use could be to offer a subtle hierarchy of information. For example, if you wanted to display a number but did not want to emphasise the number next to it then small caps could be used to offer a nicer finish to just a lowercase alternative.

![image-title-here](/public/images/fonts/12am.png){:class="img-responsive"}

### Using small caps

As I mentioned earlier, small caps are a "Feature" within the font. In order to use font features you need to add additional attributes to a `UIFontDescriptor`.

Lets take a look at the code example provided in the session video:

    let pointSize: CGFloat = 24.0
    let systemFontDesc = UIFont.systemFont(ofSize: pointSize, weight: UIFontWeightLight).fontDescriptor
    let smallCapsDesc = systemFontDesc.addingAttributes([
        UIFontDescriptorFeatureSettingsAttribute: [
            [
                UIFontFeatureTypeIdentifierKey: kUpperCaseType,
                UIFontFeatureSelectorIdentifierKey: kUpperCaseSmallCapsSelector
            ]
        ]
    ])
    let font = UIFont(descriptor: smallCapsDesc, size: pointSize)

This is what we are doing in the above code:

1. Getting an existing `UIFontDescriptor` from an existing font of our choice.
2. Adding the extra attributes to this descriptor via the `addingAttributes(_ attributes: [String:Any])` method.
3. Specifying the additional font features we'd like via the `UIFontDescriptorFeatureSettingsAttribute` attribute key.
4. Creating a new `UIFont` object with the updated `UIFontDescriptor` and the original point size.

The `UIFontDescriptorFeatureSettingsAttribute` attribute is in a bit of a weird structure however it's simple once you understand it.

> An array of dictionaries representing non-default font feature settings. Each dictionary contains `UIFontFeatureTypeIdentifierKey` and `UIFontFeatureSelectorIdentifierKey`.

So we essentially want an array of dictionaries containing both the feature selector and type identifier. These values map back to the values referenced in the TrueType Font Feature documentation I [linked to earlier][2].  

You can also find the provided enums in `<CoreText/SFNTLayoutTypes.h>`. There is no nice link between feature types and their supported values other than looking at the reference or comments within the headers.

[1]: https://developer.apple.com/videos/play/wwdc2016/803/
[2]: https://developer.apple.com/fonts/TrueType-Reference-Manual/RM09/AppendixF.html
