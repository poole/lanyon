var SC = SC || {},
  CoreDocs = CoreDocs || {},
  NO = false,
  YES = true;

// ==========================================================================
// This is copied from CoreDocs to facilitate automatically generating Strings.js files.
// ==========================================================================

CoreDocs.loc = function(input, comment) {
  if (comment === undefined)
  {
    CoreDocs.error("\"" + input + "\" needs a comment to be picked up for loc.");
  }

  // When we call SproutCore's loc(), it will replace all %@ parameters, and there is no way to escape them.
  // In the future, we should get an escaping method into SC, and/or take advantage of their loc's string replacement.
  // For now, we use @@ instead of %@ as a preliminary parameter marker.
  input = input.loc(); 
  input = input.replace(/@@/g, "%@");
  return input;
} 

// ==========================================================================
// This is the necessary subset of sproutcore strings for use in localization.
// ==========================================================================

// ==========================================================================
// SproutCore -- JavaScript Application Framework
// copyright 2006-2008, Sprout Systems, Inc. and contributors.
// ==========================================================================

// These are basic enhancements to the string class used throughout 
// SproutCore.

/**
  @namespace
  
  SproutCore implements a variety of enhancements to the built-in String 
  object that make it easy to perform common substitutions and conversions.
  
  Most of the utility methods defined here mirror those found in Prototype
  1.6.
  
  @since SproutCore 1.0
*/
SC.String = {
  
  // Interpolate string. looks for %@ or %@1; to control the order of params.
  /**
    Apply formatting options to the string.  This will look for occurrences
    of %@ in your string and substitute them with the arguments you pass into
    this method.  If you want to control the specific order of replacement, 
    you can add a number after the key as well to indicate which argument 
    you want to insert.  

    Ordered insertions are most useful when building loc strings where values
    you need to insert may appear in different orders.

    h3. Examples
    
    {{{
      "Hello %@ %@".fmt('John', 'Doe') => "Hello John Doe"
      "Hello %@2, %@1".fmt('John', 'Doe') => "Hello Doe, John"
    }}}
    
    @param args {Object...} optional arguments
    @returns {String} formatted string
  */
  fmt: function() {
    // first, replace any ORDERED replacements.
    var str = this.gsub(/%@([0-9]+)/, function(m) {
      return (arguments[parseInt(m[1],0)-1] || '').toString(); 
    }) ;

    // now, replace any remaining %@ items.  Use this indexOf() method b/c
    // it is faster than split().
    var ret = [] ;
    var idx = -1 ;
    var loc = 0 ;
    var argIdx = 0;
    while((idx = str.indexOf("%@",loc)) >= 0) {
     // slice off initial part of string and push into ret. update loc.
     ret.push(str.slice(loc,idx)) ;
     loc = idx + 2 ; // 2 to skip '%@'.
     
     // add in replacement.
     var value = arguments[argIdx++] ;
     if (value && value.toString) value = value.toString() ;
     ret.push(value) ;
    }
    
    // include any remaining bits of the string.
    if (loc < str.length) {
      ret.push(str.slice(loc,str.length)) ;
    }
    
    // join return value.
    return (ret.length > 1) ? ret.join('') : ret[0] ;
  },

  /**
    Localizes the string.  This will look up the reciever string as a key 
    in the current Strings hash.  If the key matches, the loc'd value will be
    used.  The resulting string will also be passed through fmt() to insert
    any variables.
    
    @param args {Object...} optional arguments to interpolate also
    @returns {String} the localized and formatted string.
  */
  loc: function() {
    // NB: This could be implemented as a wrapper to locWithDefault() but
    // it would add some overhead to deal with the arguments and adds stack
    // frames, so we are keeping the implementation separate.
    
    var kit = String[String.currentLanguage()];
    var str = kit[this] ;
    if (!str) str = String.English[this] || this ;
    return str.fmt.apply(str,arguments) ;
  }
} ;

// Apply SC.String mixin to built-in String object
for (var key in SC.String) {
  String.prototype[key] = SC.String[key];
}

// Add strings for various languages to this collection.  String.loc()
// method will try to localize the string passed using the current language.
// if the language is not available, it will use English.
Object.extend(String,
/** @scope String @static */ {

  /**
    The current browser language as a two letter code.
  */
  browserLanguage: ((navigator.language || navigator.browserLanguage).split('-', 1)[0]),
  
  /**
    If YES, localization will favor the detected language instead of the
    preferred one.
  */
  useAutodetectedLanguage: NO,
  
  /**
    This property is set by the build tools to the current build language.
  */
  preferredLanguage: null,
  
  /**
    Returns the hash key to use for loc strings.  The default implementation
    will autodetect the browser language and look for a loc string to 
    match.  If it can't find one then it will introspect to find loc strings
    that are defined and use those instead.
  */
  currentLanguage: function () {
    var ret = (this.useAutodetectedLanguage) ? (this.browserLanguage || this.preferredLanguage || 'en') : (this.preferredLanguage || this.browserLanguage || 'en') ;

    // then try a couple of normalized forms...
    if (!this[ret]) ret = this.normalizedLanguage(ret);
    return ret ;
  },
  
  /**
    Returns a normalized language string for the two letter country code.
  */
  normalizedLanguage: function(ret) {
    switch(ret) {
      case 'fr':
        ret = 'French'; 
        break ;
      case 'de':
        ret = 'German'; 
        break ;
      case 'ja':
      case 'jp':
        ret = 'Japanese'; 
        break ;
      case 'en':
        ret = 'English' ;
        break ;
      
      case 'es':
        ret = 'Spanish' ;
        break;
        
      default:
        ret = "English";
        break ;
    }
    return ret;
  },
  
  /**
    Adds loc strings for the named language.  This method takes care of 
    creating the localized string hash if it does not already exist.
    The language can be one of the following or any two-letter country code.
    
    English, French, German, Japanese, Spanish
    
    @param language {String} the language code
    @param strings {Hash} hash of loc strings.
    @returns {this}
  */
  addStringsFor: function(language, strings) {    
    // convert language to a normalized name...
    language = String.normalizedLanguage(language) ;
    if (!String[language]) String[language] = {} ;
    Object.extend(String[language], strings || {}); 
    return this;
  }

});

String.English  = String.English  || {};
String.French   = String.French   || {};
String.German   = String.German   || {};
String.Japanese = String.Japanese || {};
String.Spanish  = String.Spanish  || {};

