// initialize search option object and store object
var search_options = {}
var store = {};
var types = [];

// search by tags
$(document).ready(function(){
  // extract distinct tags
  var tags = extract_distinct('{{ site.baseurl }}/search.json', 'tag', false);

  // populate select dropdown for tags
  $.each(tags, function(key, value) {
    $('select[name=tag-facet]')
      .append($("<option></option>")
        .attr("value", value)
        .text(value));
  });

  // render select2 with options
  $("#tag-facet").select2({ width: '100%' });
});

// extract distinct values from json
var extract_distinct = function(json_url, field, hasAll) {
  var distinct_values = [];

  // read from json file
  $.ajax({
    url: json_url,
    dataType: 'json',
    async: false,
    success: function(data) {
      // get all values
      var all_values = data.map(function(datum) {
        return datum[field];
      });

      // get unique types
      distinct_values = $.grep(all_values, function(el, index) {
          return index == $.inArray(el, all_values);
      });

      // add all to the types for select dropdown
      if (hasAll) {
        distinct_values.unshift("all");
      }
    }
  });

  // return distinct field values in an array
  return distinct_values;
}


// attach event listeners and initialize tooltips
$(document).ready(function(){
  // event listener for search options
  $( "#search-component" ).on( "change", 'input[name=scope]:checkbox, \
    input[name=expansion]:radio, \
    select[name="type-facet"], \
    select[name="tag-facet"]',
    function() {
      execute_search();
  });

  // event listener for query change
  $('#search-input').keyup(execute_search);

  // add tooltips
  $(".search-tooltips").tooltip({ placement: 'bottom'});

  // extract distinct values from type field
  var types = extract_distinct('{{ site.baseurl }}/search.json', 'type', true);

  // populate select dropdown for types
  $.each(types, function(key, value) {
    $('select[name=type-facet]')
      .append($("<option></option>")
        .attr("value", value)
        .text(value));
  });
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
    url: "{{ site.baseurl }}/search.json",
    dataType: 'json',
    async: false,
    success: function(data) {
      $.each( data, function( key, val ) {
        if ((search_type === val.type || search_type === "all")
          && (search_tags.length == 0 || $.inArray(val.tag ,search_tags) != -1 )) {
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
    search_tags = $("#tag-facet").select2("data").map(function(datum){
      return datum.text;
    });

    // get search query
    var query = $('#search-input').val();

    // empty result container when search query is empty
    if (query === '') {
        jQuery('.search-results').empty();
    } else {
        // build the index
        var index = build_index(elasticlunr_index, search_type, search_tags);

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
