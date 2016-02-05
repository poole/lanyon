/**
jQuery plugin to adjust the width of a portion of text.  Expects a
block element, with the desired width set, and an inner span element
with the text that should be adjusted.  Uses CSS word-spacing and
letter-spacing to adjust the actual width to the desired width.
*/
(function($) {
    $.fn.textwidth = function() {
        // minimum allowed letterspacing
        var min_letterspace = -0.5;
        // actual vs desired size discrepancy small enough to ignore
        var allowable_discrepancy = 2;

        return this.each(function(){
            var ltrspc;
            var txt = $(this).find('span');
            var aw = txt.width(); // actual text width
            var orig = aw;  // store original actual
            var dw = $(this).width(); // desired text width

            // if the difference is small enough, don't bother adjusting anything
            if (Math.abs(dw - aw) <= allowable_discrepancy) {
                return;
            }

            if (aw < dw) { // if actual width is less than desired
                // add 1px word-spacing first, if there is room
                if ((dw - aw) >= (txt.text().wordcount() - 1)) {
                    txt.css('word-spacing', '1px');
                    aw = txt.width(); // get new actual width
                }
                // if actual is still less than desired, adjust letter-spacing
                if (aw < dw) {
                    // difference in width divided by number of spaces between letters
                    ltrspc = (dw - aw) / (txt.text().length - 1);
                    txt.css('letter-spacing', ltrspc + 'px');
                    aw = txt.width(); // get new actual
                    // scale back if we overshot on the size
                    while (aw > dw) {
                        ltrspc -= 0.25;
                        txt.css('letter-spacing', ltrspc + 'px');
                        aw = txt.width(); // get new actual
                    }
                }

            } else {
                // decrease letter spacing
                // FIXME: this calculation seems way off, especially for short blocks
                ltrspc = - ((aw - dw) / (txt.text().length - 1));
                // don't go lower than the minimum letter-spacing threshold
                if (ltrspc < min_letterspace) { ltrspc = min_letterspace; }
                txt.css('letter-spacing', ltrspc + 'px');
                aw = txt.width(); // new actual
            }
            // console.log('text width: original=' + orig + ' desired= ' + dw + ' final=' + aw + ' (' + (dw-aw) + '), letter-spacing=' + ltrspc);
        });
    };
})(jQuery);

/**
jQuery plugin to allow for container relative font size, by scaling according
to the difference in the container and the viewport.

Main element is the container that font sizes should be relative to, and will
be used to adjust to viewport height.  Elements to be adjusted should be specified
in the plugin options (or use vhfont-resize class), and should have a
data-vhfontsize with the desired font size relative to the specified element.

Example use:

 $(".page img").relativeFontHeight({elements: $('.ocr-line')});

Set debug option to true to see output about what is being done.

*/
(function($) {
    // should it take the elements and then
    $.fn.relativeFontHeight = function(options) {
        var container = $(this);
        var settings = $.extend({
            // defaults
            elements: $(".vhfont-resize"),
            debug: false
        }, options);

        var scale = container.height() / $(window).height();
        // if window has resized but scale is unaffected, nothing to do
        if (scale == container.data('vhscale')) {
            if (settings.debug) {
                console.log('relative font size scale (' + scale +') is unchanged.');
            }
            return;
        }
        // store current scale to check against on next resize
        container.data('vhscale', scale);

        // update relative font size for configured elements
        settings.elements.each(function() {
            var el = $(this);
            // get % of container from data and scale based on parent / window
            if (settings.debug) {
                console.log('setting font size to ' + el.data('vhfontsize') * scale + 'vh');
            }
            el.css('font-size', el.data('vhFontSize') * scale + 'vh');
        });

    };
})(jQuery);


/* extend String with a few utility methods */
String.prototype.wordcount = function() {
    // count the number of words in a string by splitting on plain whitespace
    return this.split(' ').length;
};
// thanks to http://stackoverflow.com/questions/280634/endswith-in-javascript
String.prototype.endswith = function(str) {
    return this.length >= str.length && this.lastIndexOf(str) + str.length == this.length;
};
String.prototype.startswith = function(str) {
    return this.length >= str.length && this.lastIndexOf(str) === 0;
};


/* highlight/marginalia code adapted from annotator-marginalia code */


// Easing Function for scroll
// from jQuery Easing Plugin (version 1.3)
// http://gsgd.co.uk/sandbox/jquery/easing/
  jQuery.extend( jQuery.easing,{
    easeInOutExpo: function (x, t, b, c, d) {
      if (t==0) return b;
      if (t==d) return b+c;
      if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
      return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
  });


// NOTE: marginalia funtionality is based on code from annotator-marginalia
// (https://github.com/emory-lits-labs/annotator-marginalia),
// but that js can't be used directly because it currently requires
// the inclusion of annotator.js
var marginalia = {

    sortAnnotations: function() {
        // sort marginalia items based on position of their corresponding
        // highlights on the page
        var $container = $('.annotation-list');
        var $items = $('.marginalia-item');
        $items.sort(function(a, b){
            var a_id = $(a).attr('data-annotation-id'),
                b_id = $(b).attr('data-annotation-id');
            var $a_annotation = $('.annotator-hl[data-annotation-id='+a_id+']'),
                $b_annotation = $('.annotator-hl[data-annotation-id='+b_id+']');

            var a_top = marginalia.annotationTop($a_annotation),
                b_top = marginalia.annotationTop($b_annotation);
            if (a_top > b_top) { return 1; }
            else if (a_top < b_top) { return -1; }
            else return 0;
        });

        // detach and re-append to the container in the new order
        $items.detach().appendTo($container);
    },

    // Custom event for when an annotation is selected
    // Highlight the marginalia item associated with the annotation
    annotationSelected: function(event) {
        event.stopPropagation();

        var $annotation_highlight = $(event.target),
            annotation_id = $annotation_highlight.data('annotation-id');

        marginalia.onSelected(annotation_id);
    },

    // On Marginalia item select event
    // Highlight the annotation highlight associated with the item
    itemSelected: function(event){
        event.stopPropagation();

        var $marginalia_item = $(event.target).parents('.marginalia-item'),
            annotation_id = $marginalia_item.data('annotation-id');
        marginalia.onSelected(annotation_id);
    },

    onSelected: function(annotation_id){
        var id = annotation_id,
            $annotation = $('.annotator-hl'+'[data-annotation-id='+id+']'),
            $item = $('.marginalia-item[data-annotation-id=' + id + ']' );

        // Return false if the id is undefined
        if(id === undefined){
          return false;
        }

        // Return false if the item is already selected to prevent
        // jumping to the top when highlighting text.
        if ($item.hasClass("marginalia-item-selected")){
            return false;
        }

        // Highlight selected parts
        marginalia.applyHighlights($annotation, $item);

        // Scroll to the position of the item
        // (position relative to first annotation highlight, if there
        // are multiple lines included.)
        marginalia.showItem($annotation.first(), $item);
    },

    annotationTop: function(annotation) {
        // calculate the top position of an annotation highlight
        // used for annotation sorting and showing marginalia items
        if (!annotation.first().position()) {
            return 0;
        }
        var top = annotation.first().position().top,
           wrapped_top = annotation.first().parents('.inner>div');

        // If the annotation is wrapped in a child div,
        // we want to get the postion of that parent element.
        if (wrapped_top.length > 0) {
            top = wrapped_top.first().position().top;
        }
        return top;
    },

    showItem: function(annotation, item) {
        // Scroll to the position of the item
        $margin_container = $('.margin-container');
          var cTop = $margin_container.offset().top,
              cScrollTop = $margin_container.scrollTop(),
              top = item.position().top,
              top2 = marginalia.annotationTop(annotation);

        $margin_container.stop().animate({'scrollTop':top-top2+30},500,'easeInOutExpo');
    },

    clearHighlights: function(){
        $('.marginalia-item-selected').removeClass('marginalia-item-selected');
        $('.marginalia-annotation-selected').removeClass('marginalia-annotation-selected');
      },

    applyHighlights: function($annotation, $item){
        marginalia.clearHighlights();

        $annotation.addClass('marginalia-annotation-selected');
        $item.addClass('marginalia-item-selected');
    },

};

$(document).ready(function () {
      var resizeTimer; // Set resizeTimer to empty so it resets on page load
      function resizeFunction() {
        var page_img = $(".page img");
          // adjust font sizes based on container to use viewport height
          page_img.relativeFontHeight({elements: $('.ocr-line')});
          // adjust ocr text on window load or resize
          $(".ocrtext").textwidth();

          // adjust deep-zoom container to match page image size and placement
          var zoompage = $('#zoom-page'),
              img_container =  $(".page .content");
          // size relative to the image, but position relative to the container
          zoompage.height(page_img.height());
          zoompage.width(page_img.width());
          // resize triggers on fullscreen deep zoom, but page image has no offset
          var pg_pos = img_container.position();
          if (pg_pos != undefined) {
              zoompage.css({'left': pg_pos.left});
          }
      };

      // On resize, run the function and reset the timeout with a 250ms delay
      $(window).resize(function() {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(resizeFunction, 250);
      });

     $(window).load(function() {  // wait until load completes, so widths will be calculated
         resizeFunction();

         // If the page has annotations, make sure they are sorted & visible.
        // Put the first annotation at the top of the page
        if ($('.marginalia-item').length) {
            // note: has to be done after window.load so positions
            // are set and can be used for sorting
            marginalia.sortAnnotations();
            marginalia.showItem($('.page'), $('.marginalia-item').first());
            // NOTE: could also set it to match corresponding first annotation...
            // (but this isn't quite right)
            // var $annotation_highlight =  $('.annotator-hl').first();
            // annotation_id = $annotation_highlight.data('annotation-id');
            // $marginalia_item = $('.marginalia-item[data-annotation-id=' + annotation_id + ']' );
            // marginalia.showItem($annotation_highlight, $marginalia_item);
        }

         // Initalize on click.marginalia event for annotation highlights
        $('.annotator-hl').on('click.marginalia', function(event){
          marginalia.annotationSelected(event);
        });


        // Initalize on click.marginalia event for Marginalia items
        $('.marginalia-item .text').on('click.marginalia', function(event){
          marginalia.itemSelected(event);
        });

        // For smaller screens, marginalia items are below page image
        // and anchor links are used between annotations and highlights.
        // Propagate the link click to the appropriate marginalia function.
        $('.annotator-hl a').on('click.marginalia', function(event){
            $(event.target).parent().click();
        });
        $('.marginalia-item a.to-hl').on('click.marginalia', function(event) {
            $(event.target).parents('.marginalia-item').find('.text').click();
        });
    });

    // map swipe directions to navigation rel link attributes
    // currently using so-called "natural" directions to map
    // left/right to next/prev, e.g. as if turning a page or swiping
    // through a gallery
    var swipe_nav_rel = {
        'swiperight': 'prev',
        'swipeleft': 'next',
    };

    function swipeNav(direction) {
       if (direction in swipe_nav_rel) {
            var link = $('a[rel="' + swipe_nav_rel[direction] + '"]');
            if (link.length) {
                window.location = link.first().attr('href');
            }
       }
    }
    // make sure text is still selectable with swipe area
    delete Hammer.defaults.cssProps.userSelect;
    // make image not draggable
    $('.page .content img').on('dragstart', function(event) { event.preventDefault(); });

    // Could bind to image only, but that seems to make swipe much
    // harder to use on text-heavy pages...
    var touch = new Hammer($('.page .content')[0]);
    // navigate to next/previous page on swipe left/right
    touch.on("swiperight swipeleft", function(ev) {
        swipeNav(ev.type);
    });
    // Could use pinch gesture to trigger zoom mode, but it makes it
    // impossible to scroll the page on smaller screens.
});
