// initialize search option object and store object
var search_options = {}
var store = {};

// attach event listeners and initialize tooltips
$(document).ready(function(){
  // event listener for search options
  $( "#search-component" ).on( "change", 'input[name=scope]:checkbox, \
    input[name=expansion]:radio, \
    select[name="type-facet"]',
    function() {
      execute_search();
  });

  // event listener for query change
  $('#search-input').keyup(execute_search);

  // add tooltips
  $(".search-tooltips").tooltip({ placement: 'bottom'});
})

// setup index model
var elasticlunr_index = elasticlunr(function(){
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
var build_index = function(elasticlunr_index, search_type) {
  // remove existing index if any
  for (doc in elasticlunr_index.documentStore.docs) {
    elasticlunr_index.removeDoc(elasticlunr_index.documentStore.docs[doc]);
  }

  // fill index with data
  $.ajax({
    url: "/search.json",
    dataType: 'json',
    async: false,
    success: function(data) {
      $.each( data, function( key, val ) {
        if (search_type === val.type || search_type === "all") {
          elasticlunr_index.addDoc(val);
          store[val.id] = {
            type: val.type,
            title: val.title,
            url: val.url,
            page_url: val.page_url,
            image: val.image,
            content: val.content,
            preview: val.preview
          };
        }
      });
    }
  });

  return elasticlunr_index;
}

// search logic
var execute_search = function() {
    // get search options
    var expansion = $("input[name=expansion]:checked").val() == "expansion" ? true : false;
    var boolean = $("input[name=boolean]:checked").val();
    var search_type = $("select[name=type-facet]").val();
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
        // build the index
        var index = build_index(elasticlunr_index, search_type);

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

                // show content
                if (store[result.ref].content) {
                    el.append($('<p class="search-result-content">').text(store[result.ref].content));
                }

                // show page image
                if (store[result.ref].image) {
                    var img_container_el = $('<div class="media-left">');
                    var img_link_el = $('<a>').attr('href', store[result.ref].page_url);
                    var img_el = $('<img class="media-object img-thumbnail">')
                      .attr('src', store[result.ref].image)
                      .attr('alt', store[result.ref].title)
                      .attr('title', store[result.ref].title)
                    el.append(img_container_el.append(img_link_el.append(img_el)));
                }

                // show preview
                // if (store[result.ref].preview) {
                //   var preview_el = $('<div class="media-body">')
                //     .css("width", "100%")
                //     .text(store[result.ref].preview);
                //   el.append(preview_el);
                // }

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
