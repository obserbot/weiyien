// tutors.js

//console.log('FFrom tutors.js')

const apiurl = "https://weiyien.com/api/weiyien/v1/tutors?secret=kjh29dfg"

const create_tag_filter = () => {

  const args = getUrlArguments()
  const arg_tag = args.hasOwnProperty('tag') ? parseInt(args.tag, 10): 0

  const Categories = {
    1: {
      zh: '少儿英语',
      en: 'Children English'
    },
    2: {
      zh: '成人英语',
      en: 'Adult English'
    },
    3: {
      zh: '雅思辅导',
      en: 'IELTS'
    },
  }

  let options =
        '<div class="select" onchange="filtering(2)">' +
          '<select id="select-tag">' +
            '<option value="0">类别</option>'
  for (let iy in Categories) {
    if (iy == arg_tag) {
      options += '<option value="' + iy + '" selected>' + Categories[iy].zh + '</option>'
    }
    else {
      options += '<option value="' + iy + '">' + Categories[iy].zh + '</option>'
    }
  }
  options +=
          '</select>' +
        '</div>'

  return options
}


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
//const args = getUrlArguments()
//console.log(args)

let allTutors = {}

fetch(apiurl)
  .then(res => {
    return res.json()
  })
  .then(res_json => {
    allTutors = res_json.tutors

    const args = getUrlArguments()
    const arg_nationality = args.hasOwnProperty('nationality') ? args.nationality.toUpperCase() : 'all'
    const arg_tag         = args.hasOwnProperty('tag') ? args.tag: '0'

    console.log('json res:', res_json)
    const filter_nationality  = document.getElementById('filter_nationality')
    const filter_tag          = document.getElementById('filter_tag')
    const wrap = document.getElementById('wytutors')
    let name = ''
    let html = ''
    const nations = []

    const shown_tutors = filter_tutors(res_json.tutors)

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
        '<div class="select" onchange="filtering(1)">' +
          '<select id="select-nation">' +
            '<option value="all">国籍</option>'
    for (let iy in nations) {
      if (arg_nationality === nations[iy].iso2) {
        options += '<option value="' + nations[iy].iso2 + '" selected>' + nations[iy].zh + '</option>'
      }
      else {
        options += '<option value="' + nations[iy].iso2 + '">' + nations[iy].zh + '</option>'
      }
    }
    options +=
          '</select>' +
        '</div>'

    if (filter_nationality) {
      filter_nationality.innerHTML = options
    }

    if (filter_tag) {
      filter_tag.innerHTML = create_tag_filter()
    }

    /*
    */

    console.log('nations:', nations)

    //wrap.innerHTML = html
    removeClass(theSpinner, 'active')
  })


const filtering = filter => {

  // Clear
  const tutor_wrap = document.getElementById('wytutors')
  tutor_wrap.innerHTML = ''

  const args = getUrlArguments()
  let arg_nationality = args.hasOwnProperty('nationality') ? args.nationality.toUpperCase() : 'ALL'
  let arg_tag         = args.hasOwnProperty('tag') ? args.tag: '0'

  if (filter == '1') {
    arg_nationality = document.getElementById("select-nation").value
  }

  if (filter == '2') {
    arg_tag = document.getElementById("select-tag").value
  }

  window.location.href = "/tutors.html?nationality=" + arg_nationality + "&tag=" + arg_tag

  /* Abandoned temporary
  const iso2 = document.getElementById("select-nation").value

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
  */
}


// Retrieve all tutors from server, then filter with arguments in url

const filter_tutors = tutors => {

  const args = getUrlArguments()
  const arg_nationality = args.hasOwnProperty('nationality') ? args.nationality.toUpperCase() : 'ALL'
  const arg_tag         = args.hasOwnProperty('tag') ? args.tag: '0'

  let ts = tutors
  if (arg_nationality !== 'ALL') {
    ts = tutors.filter( val => {
      return val.nationality.iso2 === arg_nationality
    })
  }

  console.log('----', arg_tag)
  if (arg_tag != '0') {
    ts = ts.filter( val => {
      return val.tags.includes(parseInt(arg_tag, 10))
    })
  }

  let html = ''
  let name = ''
  let nationality = ''
  for (let ix in ts) {
    name = ts[ix].user_name
    nationality = ts[ix].nationality
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
}

