import { typeCheck, randNum } from './methods';

export default function(url, options) {
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
   * @param {number=} options.timeoutTime timeout time set. Unit ms. Default not set any timeout
   * @param {Function=} options.timeout timeout callback. When timeout run this function.
   */

  const {
    data,
    success,
    loaded,
    callback,
    callbackName,
    noCallback,
    charset,
    timeoutTime,
    timeout
  } = options;

  const oHead = document.querySelector('head'),
    script = document.createElement('script');

  let timer;

  if (!url) {
    throw new Error('No url ! Url is necessary !');
  }

  if (!typeCheck(url, 'String')) {
    throw new Error('Url must be string !');
  }

  if (!typeCheck(options, 'Object')) {
    throw new Error('options must be Object');
  }

  if (data) {
    if (typeCheck(data, 'Object')) {
      let dataStr = '';
      for (item in data) {
        dataStr += `${item}=${dataStr[item]}&`;
      }
      url.indexOf('?') == -1 ? (url += `?${dataStr}`) : (url += `&${dataStr}`);
    } else if (typeCheck(data, 'String')) {
      url.indexOf('?') == -1 ? (url += `?${data}&`) : (url += `&${data}&`);
    } else {
      throw new Error('data must be object or string !');
    }
  }

  function loadLis() {
    script.removeEventListener('load', loadLis);
    loaded();
  }

  if (loaded) {
    if (typeCheck(loaded, 'Function')) {
      script.addEventListener('load', loadLis);
    } else {
      throw new Error('param loaded must be function !');
    }
  }

  if (charset) {
    if (typeCheck(charset, 'String')) {
      script.charset = charset;
    } else {
      throw new Error('param charset must be string !');
    }
  }

  if (callback) {
    if (!typeCheck(callback, 'String')) {
      throw new Error('param callback must be string !');
    }
  } else {
    callback = 'callback';
  }

  if (callbackName) {
    if (!typeCheck(callbackName, 'String')) {
      throw new Error('param callbackName must be string !');
    }
  } else {
    callbackName = `callback_${randNum()}`;
  }

  if (!noCallback && success) {
    if (typeCheck(success, 'Function')) {
      window[callbackName] = data => {
        success(data);
        oHead.removeChild(script);
      };
    } else {
      throw new Error('param success must be function !');
    }
  }

  function outTime() {
    if (script.parentNode) script.parentNode.removeChild(script);
    window[callbackName] && delete window[callbackName];
    clearTimeout(timer);
    if (timeout) {
      if (typeCheck(timeout, 'Function')) {
        timeout();
      } else {
        throw new Error('param timeout must be function !');
      }
    }
  }

  if (timeoutTime) {
    if (typeCheck(timeoutTime, 'Number')) {
      timer = setTimeout(outTime, timeoutTime);
    } else {
      throw new Error('param timeoutTime must be number !');
    }
  }

  if (noCallback) {
    if (typeCheck(noCallback, 'Boolean')) {
      url = url.slice(0, -2);
    } else {
      throw new Error('param noCallback must be boolean !');
    }
  } else {
    url += `${callback}=${callbackName}`;
  }
  console.log(url);

  script.url = url;
  oHead.appendChild(script);
}
