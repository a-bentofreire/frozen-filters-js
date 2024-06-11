# Description
[![npm version](https://badge.fury.io/js/frozen-filters-js.svg)](https://badge.fury.io/js/frozen-filters-js)
[![Build Status](https://travis-ci.org/a-bentofreire/frozen-filters-js.svg?branch=master)](https://travis-ci.org/a-bentofreire/frozen-filters-js)  
  
Filters for [liquidjs](https://github.com/harttle/liquidjs) template engine.  
These filters are also available as a [ruby gem](https://rubygems.org/gems/frozen-filters).

## Installation
`npm i frozen-filter-js`  

## Usage
```js
var liquid = require("liquidjs");
var frozenFilters = require("frozen-filters-js").filters;

var engine = liquid();
frozenFilters.registerFilters(engine);

var vars = {
  url: 'http://www.example.com/first/second/index.html?param1=value1&param2=value2'
};

engine
    .parseAndRender('{{ url | remove_ext }}', vars)
    .then(function(result) {
      // expects http://www.example.com/first/second/index?param1=value1&param2=value2
       console.log(result);
    });
```

## Filters
### Url Filters
  
- `remove_ext` - Removes the extension part of an url.   
e.g. `http://www.example.com/first/second/index?param1=value1&param2=value2`.
  
- `remove_qs` - Removes the query string part of an url. e.g. `http://www.example.com/first/second/index.html`.
- `extract_basename` - Returns the basename of an url. e.g. `index.html`.
- `extract_dirname` - Returns the dirname of an url. e.g. `/first/second`.
- `extract_path` - Returns the path of an url. e.g. `/first/second/index.html`.
- `extract_protocol` - Returns the protocol. e.g. `http`.
- `extract_qs` - Returns the query string. e.g. `param1=value1&param2=value2`.
  
### Array Filters
  
- `array_head` - Returns the first `N` elements of an array.  
 e.g. `{{ ["first","second","third"] | array_head: 2 }}` =~ `["first","second"]`.  
 If the number of parameters is negative it returns an empty array.  
 The the input isn't an array it returns the untouched input.  
  
- `array_tail` - Returns the last `N` elements of an array.  
 e.g. `{{ ["first","second","third"] | array_tail: 2 }}` =~ `["first","second"]`.  
 If the number of parameters is negative it returns an empty array.  
 The the input isn't an array it returns the untouched input.  
- `array_to_taglist` - Transforms an array into an enclosed html tag list separated by newline.  
 e.g. `{{ ["first","second" | array_to_taglist: "li" }}`  returns:  
```html
<li>first</li>
<li>second</li>
```
  
The the input isn't an array it returns the untouched input.
  
## Internationalization
  
The url filters support domains and paths with:
- non-latin characters.  
e.g. `http://吃.高雄/第一/第二/首頁.html?param1=value1&param2=value2`.  
- punycodes:  
e.g. `https://xn--jp-cd2fp15c.xn--fsq.jp/abc/index.html?param1=value1&param2=value2`.  
  
## Copyrights
  
© 2018 [Alexandre Bento Freire](https://www.a-bentofreire.com)  
  
  
## License
  
MIT License  
