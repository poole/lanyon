
// var page_template = '<div class="media {type}"> ' +
//     '<h4><a href="{url}">{title}</a></h4>' +
//     '<div class="media-left">' +
//     '    <a href="{page_url}">' +
//     '    <img class="media-object img-thumbnail"' +
//     '            src="{image}" alt="{title}" title="{title}"/>' +
//     '         </a>' +
//     '</div>' +
//     '<div class="media-body" class="width:100%">{preview}</div>' +
// '</div>';
//
// SimpleJekyllSearch({
//   searchInput: document.getElementById('search-input'),
//   resultsContainer: document.getElementById('search-results'),
//   json: '{{ site.baseurl }}/search.json',
//   searchResultTemplate: page_template,
//   limit: 100,
// });

// create the index
var index = elasticlunr(function(){
    this.setRef('id'); // special unique identifier (id)
    this.addField('type');
    this.addField('title', {boost: 10});
    this.addField('url');
    this.addField('page_url');
    this.addField('image');
    this.addField('content', {boost: 10});
    this.addField('preview');
});

// store information that will be retrieved later
var store = {};

// read json content from file using jQuery
$.getJSON( "/search.json", function( data ) {
  $.each( data, function( key, val ) {
    index.addDoc(val);
    // index.add({
    //     id: val.id,
    //     type: val.type,
    //     title: val.title,
    //     url: val.url,
    //     page_url: val.page_url,
    //     image: val.image,
    //     content: val.content,
    //     preview: val.preview,
    // });

    store[val.id] = {
      type: val.type,
      title: val.title,
      url: val.url,
      page_url: val.page_url,
      image: val.image,
      content: val.content
    };
  });

});

jQuery(function($) {
    // on each keyup perform search
    // can be later replaced with an event listener
    $('#search-input').keyup(function() {
        var query = $(this).val();

        // empty result container when search query is empty
        if (query === '') {
            jQuery('.search-results').empty();
        } else {
            // perform search
            var results = index.search(query, {
              fields: {
                title: {boost: 0}
              },
              expand: true
            });

            $('#search-results').empty().append(
                results.length ?
                results.map( function (result) {
                    var href_url = store[result.ref].page_url || store[result.ref].url;
                    var el = $('<section class="search-result">')
                        .append($('<a class="search-result-title">')
                            .attr('href', href_url)
                            .text(store[result.ref].title)
                        );
                    if (store[result.ref].content) {
                        el.after($('<p class="search-result-content">').text(store[result.ref].content));
                    }
                    return el;
                }) : $('<section class="search-result"><p>No results found</p></section>')
            );
        }
    });
});
