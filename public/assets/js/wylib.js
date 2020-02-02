// wylib.js
//
// Weiyi Library
//
// 学习 lodash.js, 直接引用其代码。


// Handle classes.

const WY_hasClass = (ele, cls) => {
  return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

const WY_addClass = (ele, cls) => {
  if (!WY_hasClass(ele,cls)) ele.className += " "+cls;
}

const WY_removeClass = (ele, cls) => {
  if (WY_hasClass(ele,cls)) {
    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    ele.className=ele.className.replace(reg,' ');
  }
}


// Parse url arguments

const WY_getUrlArguments = () => {
  // url: &nationality=us&tag=23
  const url = location.search
  // query: nationality=us&tag=23
  const query = url.substr(1)
  const result = {}
  query.split("&").forEach(part => {
    const item = part.split("=")
    result[item[0]] = decodeURIComponent(item[1])
  })

  return result
}


// Validate Email address

function WY_validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}





