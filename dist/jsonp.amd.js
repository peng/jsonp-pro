define(function () { 'use strict';

  function typeCheck(item, type) {
    /**
     * @param {*} item variable will be check
     * @param {string} type target type. Type value is 'String'|'Number'|'Boolean'|'Undefined'|'Null'|'Object'|'Function'|'Array'|'Date'|'RegExp'
     */
    var itemType = Object.prototype.toString.call(item);
    var targetType = "[object ".concat(type, "]");

    if (itemType === targetType) {
      return true;
    } else {
      return false;
    }
  }

  function randNum() {
    // get random number
    var oT = new Date().getTime().toString();
    var num = Math.ceil(Math.random() * 10000000000);
    var randStr = num.toString();
    return oT + randStr;
  }

  function index (url, options) {
    /**
     * Param info
     * @param {string} url url path to get data, It support url include data.
     * @param {Object=} options all options look down
     * @param {(Object | string)=} options.data this data is data to send. If is Object, Object will become a string eg. "?key1=value1&key2=value2" . If is string, String will add to at the end of url string.
     * @param {Function=} options.success get data success callback function.
     * @param {Function=} options.loaded when data loaded callback function.
     * @param {string=} options.callback custom callback key string , default 'callback'.
     * @param {string=} options.callbackName callback value string.
     * @param {boolean} options.noCallback no callback key and value. If true no these params. Default false have these params
     * @param {string=} options.charset charset value set, Default not set any.
     * @param {number=} options.timeoutTime timeout time set. Unit ms. Default 60000
     * @param {Function=} options.timeout timeout callback. When timeout run this function.
     * When you only set timeoutTime and not set timeout. Timeout methods is useless.
     */
    var oHead = document.querySelector('head'),
        script = document.createElement('script');

    var timer,
        dataStr = '',
        _callback = 'callback',
        _callbackName = "callback_".concat(randNum()),
        _noCallback = false,
        _timeoutTime = 60000,
        _loaded,
        _success;

    var endMethods = [];

    if (!url) {
      throw new ReferenceError('No url ! Url is necessary !');
    }

    if (!typeCheck(url, 'String')) {
      throw new TypeError('Url must be string !');
    }

    var methods = {
      data: function data() {
        var data = options.data;

        if (typeCheck(data, 'Object')) {
          // let dataStr = '';
          for (var item in data) {
            dataStr += "".concat(item, "=").concat(data[item], "&");
          } // url.indexOf('?') == -1
          //   ? (url += `?${dataStr}`)
          //   : (url += `&${dataStr}`);

        } else if (typeCheck(data, 'String')) {
          // url.indexOf('?') == -1 ? (url += `?${data}&`) : (url += `&${data}&`);
          dataStr = data + '&';
        } else {
          throw new TypeError('data must be object or string !');
        }
      },
      success: function success() {
        // if (noCallback) return;
        if (!typeCheck(_success, 'Function')) throw new Error('param success must be function !');
        _success = options.success; // function success() {
        //   if (noCallback) return;
        //   window[callbackName] = data => {
        //     options.success(data);
        //     oHead.removeChild(script);
        //     clearTimeout(timer);
        //   };
        // }
        // endMethods.push(success);
      },
      loaded: function loaded() {
        _loaded = options.loaded;

        if (!typeCheck(_loaded, 'Function')) {
          throw new TypeError('param loaded must be function !');
        }
      },
      callback: function callback() {
        _callback = options.callback;

        if (!typeCheck(_callback, 'String')) {
          throw new TypeError('param callback must be string !');
        }
      },
      callbackName: function callbackName() {
        _callbackName = options.callbackName;

        if (!typeCheck(_callbackName, 'String')) {
          throw new TypeError('param callbackName must be string !');
        }
      },
      noCallback: function noCallback() {
        _noCallback = options.noCallback;

        if (!typeCheck(_noCallback, 'Boolean')) {
          throw new TypeError('param noCallback must be boolean !');
        }
      },
      charset: function charset() {
        var charset = options.charset;

        if (typeCheck(charset, 'String')) {
          script.charset = charset;
        } else {
          throw new TypeError('param charset must be string !');
        }
      },
      timeoutTime: function timeoutTime() {
        _timeoutTime = options.timeoutTime;

        if (!typeCheck(_timeoutTime, 'Number')) {
          throw new TypeError('param timeoutTime must be number !');
        }
      },
      timeout: function timeout() {
        if (!typeCheck(timeout, 'Function')) {
          throw new TypeError('param timeout must be function !');
        }

        function timeout() {
          function outTime() {
            if (script.parentNode) script.parentNode.removeChild(script); // window[callbackName] && delete window[callbackName];

            window.hasOwnProperty(_callbackName) && delete window[_callbackName];
            clearTimeout(timer);
            options.timeout();
          }

          timer = setTimeout(outTime, _timeoutTime);
        }

        endMethods.push(timeout);
      }
    };

    for (var item in options) {
      methods[item]();
    }

    endMethods.forEach(function (item) {
      item();
    }); // url += `${dataStr}`

    if (_noCallback) {
      url += dataStr.slice(0, -2);
      console.log(url);
    } else {
      window[_callbackName] = function (data) {
        _success && _success(data);
        oHead.removeChild(script);
      };

      url += "?".concat(dataStr).concat(_callback, "=").concat(_callbackName);
    }

    function loadLis() {
      script.removeEventListener('load', loadLis);
      _loaded && _loaded();
      clearTimeout(timer);
    }

    script.addEventListener('load', loadLis);
    script.src = url;
    oHead.appendChild(script);
  }

  return index;

});
