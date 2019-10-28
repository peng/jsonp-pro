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
  jsonp('https://auto.3g.163.com/', options);

  const htmlHead = global.oHead;
  const oScript = htmlHead.children[0];
  expect(oScript.src).toBe(
    'https://auto.3g.163.com/?name=jsonp&test=test&fn=mycallback'
  );
  expect(oScript.charset).toBe('gbk');

  oScript.emit('load');
  window.mycallback('success');

  expect(runLoad).toBeTruthy();
  expect(resData).toBe('success');

  // test url have params

  jsonp('https://auto.3g.163.com/?urlparam=urlparam', options);
  expect(global.oHead.children[0].src).toBe(
    'https://auto.3g.163.com/?urlparam=urlparam&name=jsonp&test=test&fn=mycallback'
  );

  // test data is string

  jsonp('https://auto.3g.163.com/?urlparam=urlparam', {
    data: 'peng=peng',
    callbackName: 'mycallback',
    success(res) {}
  });
  expect(global.oHead.children[0].src).toBe(
    'https://auto.3g.163.com/?urlparam=urlparam&peng=peng&callback=mycallback'
  );

  // test no callback
  const noCallbackOpt = {
    data: {
      name: 'jsonp',
      test: 'test'
    },
    noCallback: true
  };

  jsonp('https://auto.3g.163.com/', noCallbackOpt);

  expect(global.oHead.children[0].src).toBe(
    'https://auto.3g.163.com/?name=jsonp&test=test'
  );

  jsonp('https://auto.3g.163.com/?myarg=myarg', noCallbackOpt);

  expect(global.oHead.children[0].src).toBe(
    'https://auto.3g.163.com/?myarg=myarg&name=jsonp&test=test'
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
    jsonp('https://auto.3g.163.com/', {
      data: []
    });
  } catch (e) {
    expect(e.toString()).toBe('TypeError: data must be object or string !');
  }

  // success type error test
  try {
    jsonp('https://auto.3g.163.com/', {
      success: {}
    });
  } catch (e) {
    expect(e.toString()).toBe('TypeError: param success must be function !');
  }

  // loaded type error test
  try {
    jsonp('https://auto.3g.163.com/', {
      loaded: {}
    });
  } catch (e) {
    expect(e.toString()).toBe('TypeError: param loaded must be function !');
  }

  // callback type error test
  try {
    jsonp('https://auto.3g.163.com/', {
      callback: {}
    });
  } catch (e) {
    expect(e.toString()).toBe('TypeError: param callback must be string !');
  }

  // callbackName type error test
  try {
    jsonp('https://auto.3g.163.com/', {
      callbackName: {}
    });
  } catch (e) {
    expect(e.toString()).toBe('TypeError: param callbackName must be string !');
  }

  // noCallback type error test
  try {
    jsonp('https://auto.3g.163.com/', {
      noCallback: {}
    });
  } catch (e) {
    expect(e.toString()).toBe('TypeError: param noCallback must be boolean !');
  }

  // charset type error test
  try {
    jsonp('https://auto.3g.163.com/', {
      charset: {}
    });
  } catch (e) {
    expect(e.toString()).toBe('TypeError: param charset must be string !');
  }

  // timeoutTime type error test
  try {
    jsonp('https://auto.3g.163.com/', {
      timeoutTime: {}
    });
  } catch (e) {
    expect(e.toString()).toBe('TypeError: param timeoutTime must be number !');
  }

  // timeout type error test
  try {
    jsonp('https://auto.3g.163.com/', {
      timeout: {}
    });
  } catch (e) {
    expect(e.toString()).toBe('TypeError: param timeout must be function !');
  }

  // test timeout
  jsonp('https://auto.3g.163.com/', options);

  setTimeout(() => {
    expect(timeout).toBeTruthy();
    done();
  }, 1100);
});
