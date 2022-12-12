import { typeCheck, randNum } from './methods';

/**
 * Param info
 * @param {string} url url path to get data, It support url include data.
 * @param {Object=} options all options look down
 * @param {(Object | string)=} options.data this data is data to send. If is Object, Object will become a string eg. "?key1=value1&key2=value2" . If is string, String will add to at the end of url string.
 * @param {Function=} options.success get data success callback function.
 * @param {Function=} options.error get data error callback function.
 * @param {Function=} options.loaded when data loaded callback function.
 * @param {string=} options.callback custom callback key string , default 'callback'.
 * @param {string=} options.callbackName callback value string.
 * @param {boolean} options.noCallback no callback key and value. If true no these params. Default false have these params
 * @param {string=} options.charset charset value set, Default not set any.
 * @param {number=} options.timeoutTime timeout time set. Unit ms. Default 60000
 * @param {Function=} options.timeout timeout callback. When timeout run this function.
 * When you only set timeoutTime and not set timeout. Timeout methods is useless.
 */
export default function(url, options) {
  const oHead = document.querySelector('head'),
    script = document.createElement('script');

  let timer,
    dataStr = '',
    callback = 'callback',
    callbackName = `callback_${randNum()}`,
    noCallback = false,
    timeoutTime = 60000,
    loaded,
    success;

  const endMethods = [];

  if (!url) {
    throw new ReferenceError('No url ! Url is necessary !');
  }

  if (!typeCheck(url, 'String')) {
    throw new TypeError('Url must be string !');
  }

  const methods = {
    data() {
      const data = options.data;
      if (typeCheck(data, 'Object')) {
        for (let item in data) {
          dataStr += `${item}=${data[item]}&`;
        }
      } else if (typeCheck(data, 'String')) {
        dataStr = data + '&';
      } else {
        throw new TypeError('data must be object or string !');
      }
    },
    success() {
      success = options.success;
      if (!typeCheck(success, 'Function'))
        throw new TypeError('param success must be function !');
    },
    error() {
      if (!typeCheck(options.error, 'Function')) {
        throw new TypeError('param error must be function !');
      }
      script.addEventListener('error', options.error);
    },
    loaded() {
      loaded = options.loaded;
      if (!typeCheck(loaded, 'Function')) {
        throw new TypeError('param loaded must be function !');
      }
    },
    callback() {
      callback = options.callback;
      if (!typeCheck(callback, 'String')) {
        throw new TypeError('param callback must be string !');
      }
    },
    callbackName() {
      callbackName = options.callbackName;
      if (!typeCheck(callbackName, 'String')) {
        throw new TypeError('param callbackName must be string !');
      }
    },
    noCallback() {
      noCallback = options.noCallback;
      if (!typeCheck(noCallback, 'Boolean')) {
        throw new TypeError('param noCallback must be boolean !');
      }
    },
    charset() {
      const charset = options.charset;
      if (typeCheck(charset, 'String')) {
        script.charset = charset;
      } else {
        throw new TypeError('param charset must be string !');
      }
    },
    timeoutTime() {
      timeoutTime = options.timeoutTime;
      if (!typeCheck(timeoutTime, 'Number')) {
        throw new TypeError('param timeoutTime must be number !');
      }
    },
    timeout() {
      if (!typeCheck(options.timeout, 'Function')) {
        throw new TypeError('param timeout must be function !');
      }
      function timeout() {
        function outTime() {
          script.parentNode.removeChild(script);
          window.hasOwnProperty(callbackName) && delete window[callbackName];
          clearTimeout(timer);
          options.timeout();
        }

        timer = setTimeout(outTime, timeoutTime);
      }

      endMethods.push(timeout);
    }
  };

  for (let item in options) {
    methods[item]();
  }

  endMethods.forEach(item => {
    item();
  });

  // warn url include data
  if (noCallback && dataStr != '') {
    url.indexOf('?') == -1
      ? (url += `?${dataStr.slice(0, -1)}`)
      : (url += `&${dataStr.slice(0, -1)}`);
  }
  if (!noCallback) {
    window[callbackName] = data => {
      success && success(data);
      oHead.removeChild(script);
      delete window[callbackName];
    };
    url.indexOf('?') == -1
      ? (url += `?${dataStr}${callback}=${callbackName}`)
      : (url += `&${dataStr}${callback}=${callbackName}`);
  }
  url = encodeURI(url);

  function loadLis() {
    script.removeEventListener('load', loadLis);
    loaded && loaded();
    clearTimeout(timer);
    // 应该添加移除标签方法
  }

  script.addEventListener('load', loadLis);

  script.src = url;
  oHead.appendChild(script);
}
