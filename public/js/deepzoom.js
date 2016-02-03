
// set up seadragon configuration, but don't load unless triggered by user
var viewer = null;
var seadragon_opts = {};

function set_seadragon_opts(opts) {
    seadragon_opts = opts;
}

function startzoom() {
    // init seadragon viewer if this is first zoom
    if (viewer === null) {
      viewer = OpenSeadragon(seadragon_opts);
    }
    $('#covers').removeClass('active');
    // set enable-zoom button active
    $('#enable-zoom').addClass('active');
    // move deepzoom div in front of page image
    $('#zoom-page').addClass('active').show().css('z-index', 3);
    // show the deepzoom controls
    $("#deepzoom-controls").removeClass('hidden').addClass('visible');
    // use not-visible class to set image opacity, but leave it visible
    // to the browser because we need it for the page size/layout
    $('.page .content').addClass('not-visible');

    // NOT hiding annotations as readux does, since the space is not used
}

function endzoom() {
    // reset deepzoom viewer to home
    viewer.viewport.goHome(true);  // true = immediately  (not working?)
    // move deepzoom div behind page image
    $('#zoom-page').removeClass('active').css('z-index', -1).hide();
    // hide the deepzoom controls
    $("#deepzoom-controls").addClass('hidden').removeClass('visible');
    // restore non-zoomable page image
    $('.page .content').removeClass('not-visible');
    // restore annotations and marginalia
    $('#toggle-annotations').removeClass('not-visible');
    $('.margin-container').removeClass('not-visible');

    $('#covers').addClass('active');
    $('#enable-zoom').removeClass('active');
}

function disable_zoom_if_image_err() {
    var img = this;
    $.ajax({
        type: 'GET',
        url: img.src,
        cache: true,
        complete: function (jqXHR, status) {
            if (jqXHR.status != 200 && jqXHR != 304) {
                $('#enable-zoom').addClass('disabled');
            }
        }
    });
}

$(document).ready(function () {
    /* enable-zoom button toggles deep-zoom page view mode */
    $("#enable-zoom").click(startzoom);
    $('#covers').click(endzoom);

    /** NOTE: page image returns a 'missing page' image on Fedora/Djatoka error,
       so the browser doesn't detect this as an error and javascript doesn't have
       access to the status code for the image.  Request again via ajax so we can
       get direct access to the status code and determine if the image is valid
       and should be zoomable.
    */

    $('#page-image img').on('load', disable_zoom_if_image_err);
});
