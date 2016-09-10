---
layout: post
title: Using Small Caps in UIKit
---

After watching the [WWDC 2016 Session 803][1] video on Typography and Fonts I decided that this would be a good place to start with the whole blog posts thing.

It turns out that fonts are actually very complex things but to keep this short and sweet, I'm just going to talk about one thing that caught my eye.

# Small Caps

Usually you only ever come across uppercase or lowercase letters however, small caps bring an additional member to this group. They're essentially a smaller version of uppercase letters that _almost_[^1] align with the lowercase letters in a font.

![A comparison of each glyph type](/public/images/fonts/abc.png){:class="img-responsive"}
_The text in the centre is rendered using the same font but with the small caps feature enabled._

You might be wondering why you don't just use a smaller point size instead? Well if you like your interfaces to be pixel perfect (don't we all?) then you will notice that after you found the appropriate point size, other features of the font such as the weight and spacing are also adjusted meaning that your two fonts will look different next to each other.

![Why should you use small caps you ask?](/public/images/fonts/abc-bad.png){:class="img-responsive"}
_The text in the centre is the same font but 10 points smaller than the other labels._

To achieve this, small caps glyphs are actually a feature of the font rather than just a scaled down version of a regular uppercase glyph. This means that the font designer must support this feature in order for it to actually work with your own custom fonts.

# Uses

Small caps are designed to be subtle and can come in very handy when you're trying to perfect your designs. The case study from Apple demonstrates how they are used on the Apple TV to distinguish a title in a table without it drawing the users attention away from the actual content.

![An example used within the Apple TV](/public/images/fonts/appletv.jpg){:class="img-responsive"}
_The Director, Cast and Writer headings use small caps to keep the text size and alignment consistent with the rest of the content._

Another use could be to offer a subtle hierarchy of information. For example, if you wanted to display a number but did not want to emphasise the text next to it then small caps could be used to offer a nicer alternative to just using lowercase letters.

![image-title-here](/public/images/fonts/12am.png){:class="img-responsive"}
_An example could be showing the time in a 12 hour format._

# Implementation

Small caps can be enabled on a font by enabling their relative Font Feature. The documentation for this is a bit patchy but for actual information around the available font features you can visit the [fonts section][2] of the developer site.

To actually take advantage of the font features in code you can do this at a fairly high level by modifying a `UIFontDescriptor` (The same also applies for `NSFontDescriptor` on macOS).



Lets take a look at a simple implementation:

    let systemFont = UIFont.systemFont(ofSize: 24.0, weight: UIFontWeightLight)
    let smallCapsDesc = systemFont.fontDescriptor.addingAttributes([
        UIFontDescriptorFeatureSettingsAttribute: [
            [
                UIFontFeatureTypeIdentifierKey: kUpperCaseType,
                UIFontFeatureSelectorIdentifierKey: kUpperCaseSmallCapsSelector
            ]
        ]
    ])
    let font = UIFont(descriptor: smallCapsDesc, size: systemFont.pointSize)

Here is a breakdown of the above code:

1. Get an existing `UIFontDescriptor` from an existing font of our choice.
2. Add the extra attributes to this descriptor via the `addingAttributes(_ attributes: [String:Any])` method.
3. Specify the additional font features we would like via the `UIFontDescriptorFeatureSettingsAttribute` attribute key.
4. Create a new `UIFont` object with the updated `UIFontDescriptor` and the original point size.

The `UIFontDescriptorFeatureSettingsAttribute` attribute is in a bit of a weird structure however it's simple once you understand it.

> An array of dictionaries representing non-default font feature settings. Each dictionary contains `UIFontFeatureTypeIdentifierKey` and `UIFontFeatureSelectorIdentifierKey`.

So we essentially want an array of dictionaries containing both the feature selector and type identifier. These values map back to the values referenced in the TrueType Font Feature documentation I [linked to earlier][2].  

You can also find the provided enums in `<CoreText/SFNTLayoutTypes.h>`. There is no nice link between feature types and their supported values other than looking at the reference or comments within the headers.  

If you're in a rush and just wanted to know a bit about small caps then you can probably finish here however, if you wanted some more tips when using small caps then it might be worth reading on a little more.

# Extra Credit

There are actually a couple of ways to use small caps and there are some things to note because you might actually want to use them in a different way to get your desired outcome.

Looking back into the `SFNTLayoutTypes.h` header, you will see that there is both a `kUpperCaseType` and `kLowerCaseType` feature. These are the two different ways in that you can apply small caps and it essentially means you either make all uppercase letters into small caps or make all lowercase letters into small caps.



You might have noticed that the above code is a little bloated in comparison to the simple one liner you get from using a regular `UIFont`.

[^1]: [Apple say][3] that the small caps glyph should be slightly larger than the lowercase alternative however they are exactly the same in the San Francisco font from what I can see.

[1]: https://developer.apple.com/videos/play/wwdc2016/803/
[2]: https://developer.apple.com/fonts/TrueType-Reference-Manual/RM09/AppendixF.html
[3]: https://developer.apple.com/videos/play/wwdc2016-803/?time=1327
