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


const getUrlArguments = () => {
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
const args = getUrlArguments()
console.log(args)

let allTutors = {}

fetch(apiurl)
  .then(res => {
    return res.json()
  })
  .then(res_json => {
    allTutors = res_json.tutors

    console.log('json res:', res_json)
    const selectwrap = document.getElementById('select-wrap')
    const wrap = document.getElementById('wytutors')
    let name = ''
    let html = ''
    const nations = []
    for (let ix in res_json.tutors) {
      name = res_json.tutors[ix].user_name
      nationality = res_json.tutors[ix].nationality
      nations[res_json.tutors[ix].nationality.iso2] = res_json.tutors[ix].nationality

      html +=
        '<div class="column is-one-quarter-tablet is-one-quarter-desktop is-one-quarter-widescreen ' +
                    'is-one-quarter-fullhd is-half-mobile profile-wrap">' + 
          '<div class="profile-pane">' +
            '<a href="/tutor/' + name + '.html">' +
              '<figure class="image container is-64x64">' +
                '<img src="/tutor-avatar/' + name + '.jpeg" alt="' + name + '">' +
              '</figure>' +
              '<div class="name">' + name + '</div>' +
              '<span class="nationality">' + nationality.zh + '</span>' +
            '</a>' +
          '</div>' +
        '</div>'
    }

    let options =
        '<div class="select" onchange="select_nation()">' +
          '<select id="select-nation">' +
            '<option value="all">国籍</option>'
    for (let iy in nations) {
      options += '<option value="' + nations[iy].iso2 + '">' + nations[iy].zh + '</option>'
    }
    options +=
          '</select>' +
        '</div>'
    selectwrap.innerHTML = options

    /*
    */
    /*
        */

    console.log('nations:', nations)

    wrap.innerHTML = html
    removeClass(theSpinner, 'active')
  })


const select_nation = () => {
  console.log('selenation')
  const iso2 = document.getElementById("select-nation").value
  console.log('iso2 is:', iso2)

  let tutors = allTutors
  if (iso2 !== 'all') {
    console.log('not all')
    tutors = allTutors.filter( val => {
      return val.nationality.iso2 === iso2
    })
    console.log(tutors)
  }

  let html = ''
  let name = ''
  let nationality = ''
  for (let ix in tutors) {
    name = tutors[ix].user_name
    nationality = tutors[ix].nationality
    html +=
        '<div class="column is-one-quarter-tablet is-one-quarter-desktop is-one-quarter-widescreen ' +
                    'is-one-quarter-fullhd is-half-mobile profile-wrap">' + 
          '<div class="profile-pane">' +
            '<a href="/tutor/' + name + '.html">' +
              '<figure class="image container is-64x64">' +
                '<img src="/tutor-avatar/' + name + '.jpeg" alt="' + name + '">' +
              '</figure>' +
              '<div class="name">' + name + '</div>' +
              '<span class="nationality">' + nationality.zh + '</span>' +
            '</a>' +
          '</div>' +
        '</div>'
  }

  const wrap = document.getElementById('wytutors')
  wrap.innerHTML = html
  /*
  */
}


