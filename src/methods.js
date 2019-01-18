function typeCheck(item, type) {
  /**
   * @param {*} item variable will be check
   * @param {string} type target type. Type value is 'String'|'Number'|'Boolean'|'Undefined'|'Null'|'Object'|'Function'|'Array'|'Date'|'RegExp'
   */

  const itemType = Object.prototype.toString.call(item);
  let targetType = `[object ${type}]`;
  if (itemType === targetType) {
    return true;
  } else {
    return false;
  }
}

function randNum() {
  // get random number
  const oT = new Date().getTime().toString();
  const num = Math.ceil(Math.random() * 10000000000);
  const randStr = num.toString();
  return oT + randStr;
}

export { typeCheck, randNum };
