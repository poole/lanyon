// initialize search option object and store object
var search_options = {}
var store = {};

// attach event listeners and initialize tooltips
$(document).ready(function(){
  // event listener for search options
  $( "#search-component" ).on( "click", 'input[name=scope]:checkbox, \
    input[name=expansion]:radio',
    function() {
      execute_search();
  });

  // event listener for query change
  $('#search-input').keyup(execute_search);

  // add tooltips
  $(".search-tooltips").tooltip({ placement: 'bottom'});
})

// create the index
var index = elasticlunr(function(){
    this.setRef('id'); // special unique identifier (id)
    this.addField('type');
    this.addField('title');
    this.addField('url');
    this.addField('page_url');
    this.addField('image');
    this.addField('content');
    this.addField('preview');
});

// read json content from file using jQuery
$.getJSON( "/search.json", function( data ) {
  $.each( data, function( key, val ) {
    index.addDoc(val);
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

// search logic
var execute_search = function() {
    // get search options
    var expansion = $("input[name=expansion]:checked").val() == "expansion" ? true : false;
    var boolean = $("input[name=boolean]:checked").val();
    var fields = {};
    $("input[name=scope]:checked").each(function () {
        fields[this.value] = {};
    });
    search_options["expand"] = expansion;
    search_options["fields"] = fields;
    // search_options["boolean"] = boolean;

    // get search query
    var query = $('#search-input').val();

    // empty result container when search query is empty
    if (query === '') {
        jQuery('.search-results').empty();
    } else {
        // perform search
        var results = index.search(query, search_options);
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
};

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
