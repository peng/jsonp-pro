import { typeCheck, randNum } from './methods';

export default function(url, options) {
  const oHead = document.querySelector('head'),
    script = document.createElement('script');

  let timer;

  if (!url) {
    throw new Error('No url ! Url is necessary !');
  }

  if (!typeCheck(url, 'String')) {
    throw new Error('Url must be string !');
  }

  const methods = {
    data() {
      if (typeCheck(data, 'Object')) {
        let dataStr = '';
        for (item in data) {
          dataStr += `${item}=${dataStr[item]}&`;
        }
        url.indexOf('?') == -1
          ? (url += `?${dataStr}`)
          : (url += `&${dataStr}`);
      } else if (typeCheck(data, 'String')) {
        url.indexOf('?') == -1 ? (url += `?${data}&`) : (url += `&${data}&`);
      } else {
        throw new Error('data must be object or string !');
      }
    },
    success() {
      if (noCallback) return;
      if (!typeCheck(success, 'Function'))
        throw new Error('param success must be function !');
      window[callbackName] = data => {
        success(data);
        oHead.removeChild(script);
      };
    },
    loaded() {},
    callback() {},
    callbackName() {},
    noCallback() {},
    charset() {},
    timeoutTime() {},
    timeout() {}
  };
}
