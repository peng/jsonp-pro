# jsonp-pro

> jsonp 方法

## 为什么开发？

热门的前端框架 Vue，React 等大部分没有现成的 ajax 库。比较火的 ajax 库有 axios 和 SuperAgent 等，但是不支持 jsonp 方法。 支持 jsonp 方法比较好的 jQuery 比较大，单独 jsonp 方法的库没有用起来很好的。所以我自己写了一个，功能很多，欢迎各位开发者使用。如果你在使用过程中发现有什么问题或者没有满足你的功能，欢迎提[issues](https://github.com/peng/jsonp-pro/issues)。

## 安装

如果你想使用单独的 js 文件。 这些 js 文件在 dist 文件里。里面的文件包括各种类型的。 包括 `amd` `cjs` `esm` `iife` `system` `umd` 。

使用 npm 安装

```
$ npm install jsonp-pro
```

在 html 中使用 script 标签加载

```
// development
<script src="dist/jsonp.iife.js"></script>
// production
<script src="dist/jsonp.iife.min.js"></script>
```

## 例子

ESM 例子

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

html 标签使用 script 标签例子

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
类型：字符窜  
描述：请求数据的地址，url 中可以包含要请求的数据。

例子

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

|     名称     |     类型     |                                                  默认                                                  |                                                          描述                                                           |
| :----------: | :----------: | :----------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------: |
|     data     | 字符窜或对象 |                                                空字符窜                                                | data 选项为传输的数据。对象键值对格式例子：`{key1: value1 , key2: value2}`。字符窜格式例子：`"key1=value1&key2=value2"` |
|   success    |     函数     |                                      `` | 成功获取数据的回调函数                                       |
|    loaded    |     函数     |                                     `` | 当数据加载完成的回调函数                                      |
|   callback   |    字符窜    |                              `` | `callback` | 自定义 callback 的 key 值                               |
| callbackName |    字符窜    |                                     `"callback_"+(random number)`                                      |                                               自定义 callback 的 value 值                                               |
|   charset    |    字符窜    |                              `` | 编码设置。默认什么都不设置使用默认编码                               |
| timeoutTime  |    字符窜    |                                                `60000`                                                 |                                       超时时间数设置，单位为毫秒。默认 60000 毫秒                                       |
|   timeout    |     函数     | `` | 超时回调函数。当超时的时候运行回调函数。当你设置 timeoutTime 没有设置 timeout。超时方法是无效的。 |
