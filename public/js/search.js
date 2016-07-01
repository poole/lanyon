---
title: search.js
description: "logic for the search functionality on the exported site"
related_files:
  - search.html
  - search.json
---

// initialize store object, type collection, and query string params
// these query params are used in the URL to keep track of what have
// been searched for and what filter options are applied
// with these query params we can also use URL to represent a particular
// search
var store = {};
var search_type, search_query, search_tag;

// remove all query strings from the URL
var remove_query_strings = function() {
  var clean_url = location.protocol + "//" + location.host + location.pathname;
  var hash_pos = location.href.indexOf("#");
  if (hash_pos > 0) {
      var hash = location.href.substring(hash_pos, location.href.length);
      clean_url += hash;
  }
  return clean_url;
}

// remove a specified url param
var remove_url_param = function removeParam(key, url) {
    var rtn = url.split("?")[0],
        param,
        params_arr = [],
        queryString = (url.indexOf("?") !== -1) ? url.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}

// extract parameters from url
var extract_url_params = function(target_param) {
  var url = window.location.search.substring(1);
  var params = url.split('&');
  for (var i = 0; i < params.length; i++) {
    var param_names = params[i].split('=');
    if (param_names[0] == target_param) {
      return param_names[1];
    }
  }
}

// delay function for user input delay
var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

// extract distinct values from json
var extract_distinct = function(json_url, field) {
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
    }
  });

  // return distinct field values in an array
  return distinct_values;
}

// attach event listeners and initialize tooltips
$(document).ready(function(){
  // apply search query strings on page load
  search_type = extract_url_params("type");
  search_query = extract_url_params("query");
  search_tag = extract_url_params("tag");
  if (search_query !== undefined) {
    $('#search-input').val(decodeURIComponent(search_query));
  }

  // event listener for search options
  $( "#search-component" ).on( "change", 'select[name="type-facet"], \
    select[name="tag-facet"]', function() {
      execute_search();
  });

  // event listener for query change
  $('#search-input').keyup(function() {
    delay(execute_search, 500);
  });

  // execute search on init
  execute_search();
})

// setup index model
var elasticlunr_index = elasticlunr(function(){
    this.setRef('id'); // special unique identifier (id)
    this.addField('type');
    this.addField('tags');
    this.addField('title');
    this.addField('url');
    this.addField('page_url');
    this.addField('image');
    this.addField('content');
    this.addField('preview');
});

// read json content from file using jQuery
var build_index = function(elasticlunr_index, search_type, search_tag) {
  // fill index with data
  $.ajax({
    url: "{{ site.baseurl }}/search.json",
    dataType: 'json',
    async: false,
    success: function(data) {
      $.each( data, function( key, val ) {
        if (search_type === val.type // filter results by search_type
            || search_type === null
            || search_type === undefined) {

          if (search_tag === undefined || ( // filter results by search_tag
              (typeof search_tag === 'string' || search_tag instanceof String)
              && (val.tags !== undefined && val.tags.indexOf(search_tag) !== -1))){

            // add item that passes all filter requirements to the index
            elasticlunr_index.addDoc(val);

            // add the entry to the store
            store[val.id] = {
              type: val.type,
              tags: val.tags,
              title: val.title,
              url: val.url,
              page_url: val.page_url,
              image: val.image,
              content: val.content,
              preview: val.preview
            };
          }
        }
      });
    }
  });

  return elasticlunr_index;
}

// search logic
var execute_search = function() {
    // initialize count variables
    var type_counts = {}, tag_counts = {};

    // set search options
    var search_options = { "fields": { "content": { "expand": true } } };

    // get search query
    var query = $('#search-input').val();

    // empty result container when search query is empty
    if (query === '') {
      $('#search-tip').css('display', 'none');
      $('#type-filter').css('display', 'none');
      $('#tag-filter').css('display', 'none');
      $('#search-results').empty();
    } else {
        // initialize type collection variable
        var types = [];

        // build the index
        var index = build_index(elasticlunr_index, search_type, search_tag);

        // perform search
        var results = index.search(query, search_options);

        // collect type and tag counts from the results
        results.map(function(result) {
          // collect type counts
          if (type_counts[store[result.ref].type] === undefined) {
            type_counts[store[result.ref].type] = 1;
          } else {
            type_counts[store[result.ref].type] += 1;
          }

          // collect tag counts
          if (store[result.ref].tags !== undefined && store[result.ref].tags.length != 0) {
            for (var i = 0; i < store[result.ref].tags.length; i++) {
              if (tag_counts[store[result.ref].tags[i]] === undefined) {
                tag_counts[store[result.ref].tags[i]] = 1;
              } else {
                tag_counts[store[result.ref].tags[i]] += 1;
              }
            }
          }

          // collect types
          types = Object.keys(type_counts);
        });

        // apply search filters and display in the UI
        // search_type
        if (search_type === undefined) {
          $("#facet-type").empty();
          for (var i = 0; i < types.length; i++) {
            var type = types[i];
            if (type_counts[type] !== undefined) {
              var readable_type = type.split('_').join(' ');
              var param_string = "?query=" + query + "&type=" + type;
              var text_string = readable_type + " (" + type_counts[type] + ")"
              $("#facet-type").append(
                $('<a class="tag-btn">')
                  .attr("href", param_string)
                  .text(text_string)
              );
            }
          }
        } else { // type exists in the url; append removal btn
          var url = window.location.href;
          var altered_url = remove_url_param("type", url);
          // var altered_url = remove_query_strings();
          var readable_type = search_type.split('_').join(' ');
          var text_string = readable_type + " ";
          $(".applied-filters").empty().append(
            $('<a class="tag-btn">')
              .attr('href', altered_url)
              .text(text_string).append(
                $('<i class="fa fa-times" aria-hidden="true"></i>')
              )
          );
        }

        // search_tag
        $("#facet-tag").empty();
        if (tag_counts !== undefined
            && !(typeof search_tag === 'string' || search_tag instanceof String)) {
          for (var tag in tag_counts) {
            var param_string = "?query=" + query + "&tag=" + tag;
            var text_string = tag + " (" + tag_counts[tag] + ")"
            $("#facet-tag").append(
              $('<a class="tag-btn">')
                .attr("href", param_string)
                .text(text_string)
            );
          }
        } else { // tag exists in the url; append removal btn
          var url = window.location.href;
          var altered_url = remove_url_param("tag", url);
          var text_string = search_tag + " ";
          $(".applied-filters").empty().append(
            $('<a class="tag-btn">')
              .attr('href', altered_url)
              .text(text_string).append(
                $('<i class="fa fa-times" aria-hidden="true"></i>')
              )
          );
        }

        // toggle visibility of search filters
        if (search_type !== undefined || search_tag !== undefined) {
          $('#applied-filters').css('display', 'block');
          $('#search-tip').css('display', 'none');
          $('#type-filter').css('display', 'none');
          $('#tag-filter').css('display', 'none');
        } else {

          // display search tip or not
          $('#applied-filters').css('display', 'none');
          if (Object.keys(type_counts).length > 1
            || Object.keys(tag_counts).length > 1) {
            $('#search-tip').css('display', 'block');
          } else {
            $('#search-tip').css('display', 'none');
          }

          // display type filter or not
          if (Object.keys(type_counts).length > 1) {
            $('#type-filter').css('display', 'block');
          } else {
            $('#type-filter').css('display', 'none');
          }

          // display tag filter or not
          if (Object.keys(tag_counts).length > 1) {
            $('#tag-filter').css('display', 'block');
          } else {
            $('#tag-filter').css('display', 'none');
          }

        }

        // clear search-results container
        $('#search-results').empty();

        // limit search results
        var limited_results = "";
        var RESULT_LIMIT = 50;
        if (results.length > RESULT_LIMIT) {
          limited_results = "displaying top " + RESULT_LIMIT + " out of " + results.length + " results:"
          results = results.slice(0, RESULT_LIMIT);
        }

        // append search result limit message (if applicable)
        $('#search-results').append(
          $('<section class="search-result">').append(
            $("<div class='result-summary'>").text(limited_results)
          )
        );

        // append search results
        $('#search-results').append(
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

                return el;
            }) : $('<section class="search-result"><p>No results found</p></section>')
        );
    }
};
