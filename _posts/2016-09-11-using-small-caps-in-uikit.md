---
layout: post
title: Using Small Caps in UIKit
---

After watching the [WWDC 2016 Session 803][1]{:target="\_blank"} video on Typography and Fonts I decided that this would be a good place to start with the whole blog posts thing.

It turns out that fonts are actually very complex things but to keep this short and sweet, I'm just going to talk about one thing that caught my eye.

# Small Caps

Usually you only ever come across uppercase or lowercase letters however, small caps bring an additional member to this group. They're essentially a smaller version of uppercase letters that _almost_[^1] align with the lowercase letters in a font.

![A comparison of each glyph type](/public/images/fonts/abc.png){: .center-image }
_Good: The text in the centre is rendered using the same font but with the small caps feature enabled._

You might be wondering why you don't just use a smaller point size instead? Well if you like your interfaces to be pixel perfect (don't we all?) then you will notice that after you found the appropriate point size, other features of the font such as the weight and spacing are also adjusted meaning that your two fonts will look different next to each other.

![Why should you use small caps you ask?](/public/images/fonts/abc-bad.png){: .center-image }
_Bad: The text in the centre is the same font but 10 points smaller than the other labels._

Small caps allow the font designer to actually add an additional glyph specifically designed to be used in this case. This means that the font is correctly optimised resulting in something that looks a little like the first picture rather than the second. A minor difference but a good one.

This does however mean that in order to use small caps, the font designer must have explicitly supported this feature.

# Use Cases

Small caps are designed to be subtle and can come in very handy when you're trying to perfect your designs. The case study from Apple demonstrates how they are used on the Apple TV to distinguish a title in a table without it drawing the users attention away from the actual content.

![An example used within the Apple TV](/public/images/fonts/appletv.jpg){: .center-image }
_The Director, Cast and Writer headings use small caps to keep the text size and alignment consistent with the rest of the content._

Another use could be to offer a subtle hierarchy of information. For example, if you wanted to display a number but did not want to emphasise the text next to it then small caps could be used to offer a nicer alternative to just using lowercase letters.

![Example if a 12 hour clock](/public/images/fonts/12am.png){: .center-image }
_An example could be showing the time in a 12 hour format._

# Implementation

Small caps can be enabled on a font by enabling their relative Font Feature. The documentation for this is a bit patchy but for actual information around the available font features you can visit the [fonts section][2]{:target="\_blank"} of the developer site.

To actually take advantage of the font features in code you can do this at a fairly high level by modifying a `UIFontDescriptor` (The same also applies for `NSFontDescriptor` on macOS).



Lets take a look at a simple implementation:

{% highlight swift %}
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
{% endhighlight %}

Here is a breakdown of the above code:

1. Get an existing font descriptor from a font of our choice.
2. Create a new font descriptor adding additional attributes via the `addingAttributes(_ attributes: [String:Any])` method.
3. Specify the additional font features we would like via the `UIFontDescriptorFeatureSettingsAttribute` attribute key.
4. Create a new font object with the new font descriptor and the original point size.

The `UIFontDescriptorFeatureSettingsAttribute` attribute is in a bit of a weird structure however it's simple once you understand it.

> An array of dictionaries representing non-default font feature settings. Each dictionary contains `UIFontFeatureTypeIdentifierKey` and `UIFontFeatureSelectorIdentifierKey`.

So we essentially want an array of dictionaries containing both the feature selector and type identifier. These values map back to the values referenced in the TrueType Font Feature documentation I [linked to earlier][2]{:target="\_blank"}.  

You can also find the provided constants in `<CoreText/SFNTLayoutTypes.h>`. Note that there is no nice link between feature types and their supported selectors so you just have to read the comments within the header.  

# Tips & Tricks

## Different Combinations

There are actually a couple of ways to use small caps and there are some things to note because you might actually want to use them in a different way to get your desired outcome.

Looking back into the `SFNTLayoutTypes.h` header, you will see that there is both a `kUpperCaseType` and `kLowerCaseType` feature. This gives you two different ways in that you can apply small caps and it essentially means you either make all uppercase letters into small caps or make all lowercase letters into small caps.

By mixing the input text and the feature type that you use, you will get a different output. I've put together the table to show the differences.

![A comparison between the different options](/public/images/fonts/comparison.png){: .center-image }

As you can see from the above example, you will need to choose the correct combination of input text along with the feature type that you decide to use. For example, you will probably never want to use a capitalised string in conjunction with `kUpperCaseType`.

## Numbers and Punctuation

Numbers and punctuation will also be treated as uppercase letters when a small caps feature is applied meaning they are also shrunk down. This can be useful in some cases but if you don't want to apply small caps to these then you need to make sure you use an `NSAttributedString` where you only apply the small caps font to the parts you wish to modify.

## Extension

You might have noticed that code example above to achieve small caps is kind of bloated when you compare it to a one line `UIFont` initialiser. Below you can find a sample extension I've put together to make this a little bit simpler.

<!-- <script src="https://gist.github.com/liamnichols/56736b4988c57a33ad70086a0dc6018b.js"></script> -->
{% highlight swift %}
public extension UIFont {

    /// Helper method to create a UIFont with updated attributes applied to the UIFontDescriptor
    ///
    /// - parameter attributes: The new attributes to apply to the fontDescriptor
    ///
    /// - returns: A UIFont object with the new attributes appended to the receivers fontDescriptor
    func addingAttributes(_ attributes: [String : Any] = [:]) -> UIFont {

        return UIFont(descriptor: fontDescriptor.addingAttributes(attributes), size: pointSize)
    }


    /// Returns a UIFont object based on the receiver with small caps applied to upper case letters
    var addingUpperCaseSmallCaps: UIFont {

        return addingAttributes([

            UIFontDescriptorFeatureSettingsAttribute: [
                [
                    UIFontFeatureTypeIdentifierKey: kUpperCaseType,
                    UIFontFeatureSelectorIdentifierKey: kUpperCaseSmallCapsSelector
                ]
            ]
        ])
    }

    /// Returns a UIFont object based on the receiver with small caps applied to lower case letters
    var addingLowerCaseSmallCaps: UIFont {

        return addingAttributes([

            UIFontDescriptorFeatureSettingsAttribute: [
                [
                    UIFontFeatureTypeIdentifierKey: kLowerCaseType,
                    UIFontFeatureSelectorIdentifierKey: kLowerCaseSmallCapsSelector
                ]
            ]
        ])
    }
}
{% endhighlight %}

If you have any suggestions to improve the extension then please leave a comment on [the gist][4]{:target="\_blank"}.

--------

[^1]: [Apple say][3]{:target="\_blank"} that the small caps glyph should be slightly larger than the lowercase alternative however they are exactly the same in the San Francisco font from what I can see.

[1]: https://developer.apple.com/videos/play/wwdc2016/803/
[2]: https://developer.apple.com/fonts/TrueType-Reference-Manual/RM09/AppendixF.html
[3]: https://developer.apple.com/videos/play/wwdc2016-803/?time=1327
[4]: https://gist.github.com/liamnichols/56736b4988c57a33ad70086a0dc6018b#file-smallcaps-swift
