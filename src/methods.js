/**
 * object check method
 *
 * @param {*} item variable will be check
 * @param {string} type target type. Type value is 'String'|'Number'|'Boolean'|'Undefined'|'Null'|'Object'|'Function'|'Array'|'Date'|'RegExp'
 * @return {boolean} true mean pass, false not pass
 */
export function typeCheck(item, type) {
  const itemType = Object.prototype.toString.call(item);
  let targetType = `[object ${type}]`;
  if (itemType === targetType) {
    return true;
  } else {
    return false;
  }
}

export function randNum() {
  // get random number
  const oT = new Date().getTime().toString();
  const num = Math.ceil(Math.random() * 10000000000);
  const randStr = num.toString();
  return oT + randStr;
}

export function removeChild(parent, child) {
  const { childNodes } = parent;

  for (let i = 0; i < childNodes.length; i++) {
    if (childNodes[i] === child) {
      parent.removeChild(child);
    }
  }
}
