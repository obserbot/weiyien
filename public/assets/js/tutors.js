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
    return res.json()
  })
  .then(res_json => {
    console.log('json res:', res_json)
    const wrap = document.getElementById('wytutors')
    let name = ''
    let html = ''
    for (let ix in res_json.tutors) {
      name = res_json.tutors[ix].user_name
      nationality = res_json.tutors[ix].nationality
      html +=
        '<div class="column is-one-quarter-tablet is-one-quarter-desktop is-one-quarter-widescreen ' +
                    'is-one-quarter-fullhd is-half-mobile profile-wrap">' + 
          '<div class="profile-pane">' +
          '<a href="/tutor/' + name + '.html">' +
            '<figure class="image container is-64x64">' +
              '<img src="/tutor-avatar/' + name + '.jpeg" alt="' + name + '">' +
            '</figure>' +
            '<div class="name">' + name + '</div>' +
            '<span class="nationality">' + nationality.en + '</span>' +
          '</a>' +
          '</div>' +
        '</div>'
    }

    wrap.innerHTML = html
    removeClass(theSpinner, 'active')
  })



