# jsonp-pro

> ajax jsonp methods

[中文文档](https://github.com/peng/jsonp-pro/READMECN.md)

## awsome jsonp methods

## It is only ajax jsonp method and is very easy to use.

## Why I create it.

Hot JavaScript Framework such as Vue and React not offer ajax method. And most popular ajax method such axios and SuperAgent not support jsonp. Other open jsonp method use not very well and jQuery is big. So I create this.

## Installing

If you want use single js file. These files is in _dist_ folder. Include `amd` `cjs` `esm` `iife` `system` `umd` .

Using npm:

```
$ npm install jsonp-pro
```

Using URL:

```
// development
<script src="dist/jsonp.iife.js"></script>
// production
<script src="dist/jsonp.iife.min.js"></script>
```

## Example

Performing a ESM.

```
import jsonp from 'jsonp-pro';

const url = '/example.action';
const options = {
  data: {
    name:'peng'
  },
  success(data) {
    console.log(data);
  },
  loaded() {
    console.log("data is loaded");
  }
}

jsonp(url,options);
```

Performing a script tag

```
<script src="jsonp.iife.js" ></script>

<script>

const url = '/getinfo.action';

const options = {
  data: {
    name:'peng'
  },
  success(data) {
    console.log(data);
  },
  loaded() {
    console.log("data is loaded");
  }
}

jsonp(url,options);

</script>
```

## jsonp-pro API

jsonp(url,options)  
`url`  
Type: `string`  
Description: url path to get data, It support url include data.

Example

```
import jsonp  from 'jsonp-pro';

const url = 'https://github.com/peng?name=peng&age=18';

const options = {
  data:{
    haspet:'yes'
  },
  success(data) {
    console.log(data);
  }
}

jsonp(url,options);
```

<center>Options</center>

|     Name     |        Type         |   Default |      Description |
| :----------: | :-----------------: | :------------: | :-----------: |
|     data     | `{String or Object}` | `` | This data is data to send. Object format example: `{key1: value1 , key2: value2}` . String format example `"key1=value1&key2=value2"`
`{(String|Object)}` |
|   success    |    `{Function}`     | `` | Get data success callback function. |
|    loaded    |    `{Function}`     | `` | when data loaded callback function.   |
|   callback   |     `{String}`      | `callback` | Custom callback key string.  |
| callbackName |     `{String}`      |  `"callback_"+(random number)` | Custom callback value. |
|  noCallback  |     `{Boolean}`     | `false` | Set no callback key and value. If true no these params. Default false have these params. |
|   charset    |     `{String}`      | `` | Charset value set, Default not set any. |
| timeoutTime  |     `{String}`      | `60000` | Timeout time number set. Unit ms. Default 60000. |
|   timeout    |    `{Function}`     | `` | Timeout callback. When timeout, run this function. When you only set `timeoutTime` and not set `timeout`. Timeout methods is invalid. |

<!-- ## Status -->

<!-- [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) -->

## Author

Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by peng.

> [github.com/peng](https://github.com/peng) · GitHub [@peng](https://github.com/peng)

## License

MIT &copy; peng

<!-- ## ajax jsonp method -->

<!-- ## has support -->
