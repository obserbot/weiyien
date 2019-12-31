// tutors.js

console.log('FFrom tutors.js')

const apiurl = "https://weiyien.com/api/weiyien/v1/tutors?secret=kjh29dfg"

/*
const xhr = new XMLHttpRequest()
xhr.open("POST", apiurl, true)
xhr.setRequestHeader("Content-Type", "application/json")

xhr.onreadystatechange = (res) => {
  console.log('ready')
  console.log(res)
  console.log(this.readyState)
  console.log('end ready')
}

const data = {}

xhr.send(JSON.stringify(data))
*/


// Handle classes.
const hasClass = (ele, cls) => {
  return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
const addClass = (ele, cls) => {
  if (!hasClass(ele,cls)) ele.className += " "+cls;
}
const removeClass = (ele, cls) => {
  if (hasClass(ele,cls)) {
    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    ele.className=ele.className.replace(reg,' ');
  }
}

const loaderSpinner = document.getElementsByClassName('loader-wrap-0')
const theSpinner = loaderSpinner[0]

addClass(theSpinner, 'active')

fetch(apiurl)
  .then(res => {
    removeClass(theSpinner, 'active')
    return res.json()
  })
  .then(res_json => {
    console.log('json res:', res_json)
  })



