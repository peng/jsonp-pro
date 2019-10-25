/* 
测试功能
1. url  
  1)类型检查，不传值和类型错误,不能为空字符窜  OK
  2)不带参数  OK
  3)带参数
2. options.timeoutTime
  1)类型检查    OK
  2)功能        OK
3. options.timeout
  1)类型检查    OK
  2)功能        OK
4. options.charset
  1)类型检查    OK
  2)功能        OK
5. options.data
  1)类型检查    OK
  2)功能       OK
6. options.success  
  1)类型检查    OK
  2)功能        OK
7. options.callback
  1)类型检查    OK
  2)功能       OK
8. options.callbackName  
  1)类型检查    OK
  2)功能        OK
9. options.noCallback
  1)类型检查    OK
  2)功能        OK
*/

/* const arr = [
  {
    url: 'http://product.auto.163.com/dealer/gfcitys.js',
    options: {
      charset: 'gbk',
      timeoutTime: 5000,
      timeout: function() {
        console.log('超时了');
      },
      noCallback: true,
      loaded() {
        console.log('data_city');
      }
    }
  },
  {
    url: 'http://ipservice.163.com/ipquery',
    options: {
      loaded() {
        console.log(localAddress);
      },
      noCallback: true
    }
  },
  {
    url: 'http://dealers.auto.163.com/user/public/getCityIdByPosition.json',
    options: {
      data: 'city=海淀区&province=北京市',
      success(data) {
        console.log(data);
      },
      callback: 'callback',
      callbackName: 'myposIs'
    }
  }
];

arr.forEach(item => {
  jsonp(item.url, item.options);
}); */

/* 

关于 function 相等的判断 ？？？

*/

import jsonp from '../src/index';

test('json-pro all params test', done => {
  Object.defineProperty(window, 'mycallback', {
    configurable: true,
    writable: true,
    value: {}
  });

  Object.defineProperty(document, 'querySelector', {
    value: function(el) {
      const seleDom = {
        selArg: el,
        children: [],
        removeChild(dom) {
          for (let i = 0; i < seleDom.children.length; i++) {
            if (seleDom.children[i] == dom) {
              seleDom.children.splice(i, 1);
              break;
            }
          }
        },
        appendChild(dom) {
          seleDom.children.push(dom);
          dom.parentNode = seleDom;
        }
      };
      global.oHead = seleDom;
      return seleDom;
    }
  });

  Object.defineProperty(document, 'createElement', {
    value: function(tag) {
      const dom = {
        tag,
        parentNode: {},
        events: {},
        addEventListener(event, fn) {
          if (dom.events.hasOwnProperty(event)) {
            dom.events[event].push(fn);
          } else {
            dom.events[event] = [fn];
          }
        },
        removeEventListener(event, fn) {
          if (!dom.events.hasOwnProperty(event)) return;

          dom.events[event].forEach((item, ind) => {
            if (fn === item) {
              dom.events[event].splice(ind, 1);
            }
          });
        },
        emit(event) {
          if (!dom.events.hasOwnProperty(event)) return;

          dom.events[event].forEach(item => {
            item();
          });
        }
      };
      return dom;
    }
  });

  let runLoad, resData, timeout;
  const options = {
    data: {
      name: 'jsonp',
      test: 'test'
    },
    success: res => {
      resData = res;
    },
    loaded: () => {
      runLoad = true;
    },
    callback: 'fn',
    callbackName: 'mycallback',
    charset: 'gbk',
    timeoutTime: 1000,
    timeout: () => {
      timeout = true;
    }
  };
  jsonp('http://product.auto.163.com/dealer/gfcitys.js', options);

  const htmlHead = global.oHead;
  const oScript = htmlHead.children[0];
  expect(oScript.src).toBe(
    'http://product.auto.163.com/dealer/gfcitys.js?name=jsonp&test=test&fn=mycallback'
  );
  expect(oScript.charset).toBe('gbk');

  oScript.emit('load');
  window.mycallback('success');

  expect(runLoad).toBeTruthy();
  expect(resData).toBe('success');

  // test url have params

  jsonp(
    'http://product.auto.163.com/dealer/gfcitys.js?urlparam=urlparam',
    options
  );
  expect(global.oHead.children[0].src).toBe(
    'http://product.auto.163.com/dealer/gfcitys.js?urlparam=urlparam&name=jsonp&test=test&fn=mycallback'
  );

  // test data is string

  jsonp('http://product.auto.163.com/dealer/gfcitys.js?urlparam=urlparam', {
    data: 'peng=peng',
    callbackName: 'mycallback',
    success(res) {}
  });
  expect(global.oHead.children[0].src).toBe(
    'http://product.auto.163.com/dealer/gfcitys.js?urlparam=urlparam&peng=peng&callback=mycallback'
  );

  // test no callback
  const noCallbackOpt = {
    data: {
      name: 'jsonp',
      test: 'test'
    },
    noCallback: true
  };

  jsonp('http://product.auto.163.com/dealer/gfcitys.js', noCallbackOpt);

  expect(global.oHead.children[0].src).toBe(
    'http://product.auto.163.com/dealer/gfcitys.js?name=jsonp&test=test'
  );

  jsonp(
    'http://product.auto.163.com/dealer/gfcitys.js?myarg=myarg',
    noCallbackOpt
  );

  expect(global.oHead.children[0].src).toBe(
    'http://product.auto.163.com/dealer/gfcitys.js?myarg=myarg&name=jsonp&test=test'
  );

  // no url test
  try {
    jsonp();
  } catch (e) {
    expect(e.toString()).toBe('ReferenceError: No url ! Url is necessary !');
  }

  // url string test
  try {
    jsonp({});
  } catch (e) {
    expect(e.toString()).toBe('TypeError: Url must be string !');
  }

  // data type error test
  try {
    jsonp('http://product.auto.163.com/dealer/gfcitys.js', {
      data: []
    });
  } catch (e) {
    expect(e.toString()).toBe('TypeError: data must be object or string !');
  }

  // success type error test
  try {
    jsonp('http://product.auto.163.com/dealer/gfcitys.js', {
      success: {}
    });
  } catch (e) {
    expect(e.toString()).toBe('TypeError: param success must be function !');
  }

  // loaded type error test
  try {
    jsonp('http://product.auto.163.com/dealer/gfcitys.js', {
      loaded: {}
    });
  } catch (e) {
    expect(e.toString()).toBe('TypeError: param loaded must be function !');
  }

  // callback type error test
  try {
    jsonp('http://product.auto.163.com/dealer/gfcitys.js', {
      callback: {}
    });
  } catch (e) {
    expect(e.toString()).toBe('TypeError: param callback must be string !');
  }

  // callbackName type error test
  try {
    jsonp('http://product.auto.163.com/dealer/gfcitys.js', {
      callbackName: {}
    });
  } catch (e) {
    expect(e.toString()).toBe('TypeError: param callbackName must be string !');
  }

  // noCallback type error test
  try {
    jsonp('http://product.auto.163.com/dealer/gfcitys.js', {
      noCallback: {}
    });
  } catch (e) {
    expect(e.toString()).toBe('TypeError: param noCallback must be boolean !');
  }

  // charset type error test
  try {
    jsonp('http://product.auto.163.com/dealer/gfcitys.js', {
      charset: {}
    });
  } catch (e) {
    expect(e.toString()).toBe('TypeError: param charset must be string !');
  }

  // timeoutTime type error test
  try {
    jsonp('http://product.auto.163.com/dealer/gfcitys.js', {
      timeoutTime: {}
    });
  } catch (e) {
    expect(e.toString()).toBe('TypeError: param timeoutTime must be number !');
  }

  // timeout type error test
  try {
    jsonp('http://product.auto.163.com/dealer/gfcitys.js', {
      timeout: {}
    });
  } catch (e) {
    expect(e.toString()).toBe('TypeError: param timeout must be function !');
  }

  // test timeout
  jsonp('http://product.auto.163.com/dealer/gfcitys.js', options);

  setTimeout(() => {
    expect(timeout).toBeTruthy();
    done();
  }, 1100);
});
