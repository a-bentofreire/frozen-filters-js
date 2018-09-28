## Description
  
frozen-filters-js provides a list of helpful filters for [liquidjs](https://github.com/harttle/liquidjs) template engine.

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
  
- `remove_ext` - Removes the extension part of an url.   
e.g. `http://www.example.com/first/second/index?param1=value1&param2=value2`.
  
- `remove_qs` - Removes the query string part of an url. e.g. `http://www.example.com/first/second/index.html`.
- `extract_basename` - Returns the basename of an url. e.g. `index.html`.
- `extract_dirname` - Returns the dirname of an url. e.g. `/first/second`.
- `extract_path` - Returns the path of an url. e.g. `/first/second/index.html`.
- `extract_protocol` - Returns the protocol. e.g. `http`.
  
## Internationalization
  
The url filters support domains and paths with:
- non-latin characters.  
e.g. `http://吃.高雄/第一/第二/首頁.html?param1=value1&param2=value2`.  
- punycodes:  
e.g. `https://xn--jp-cd2fp15c.xn--fsq.jp/abc/index.html?param1=value1&param2=value2`.  
  
## Copyrights
  
© 2018 [Alexandre Bento Freire](https://www.a-bentofreire.com)  
  
  
## License
  
[MIT License+uuid License](https://github.com/a-bentofreire/uuid-licenses/blob/master/MIT-uuid-license.md)  
