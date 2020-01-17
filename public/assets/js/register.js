// register.js

/**
 * Register successfuly
 */
const success_process = res => {

        console.log('message is ok')
  console.log(res)

}


/**
 * Validate form.
 */
const validate_form = () => {

  const vals = {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
  }

  const email = document.getElementById('field_email').value.trim()
  if (!WY_validateEmail(email)) {
    console.log('Wrong email address')
    return vals
  }

  /*
  const firstname = document.getElementById('val_firstname').value.trim()
  const lastname = document.getElementById('val_lastname').value.trim()
  if (firstname.length < 1 || lastname < 1) {
    console.log('Wrong name')
    return vals
  }
  */

  const password = document.getElementById('field_password').value.trim()
  const confirmed = document.getElementById('field_confirmed').value.trim()
  if (password.length < 1 || confirmed.length < 1 || password !== confirmed) {
    console.log('Wrong password')
    return vals
  }

  return vals
}


/**
 * Register submit
 */
const do_register = () => {

  const button_register = document.getElementById('wy_register')
  const apiurl = "https://weiyien.com/api/weiyien/v1/register?secret=qew"

  WY_addClass(button_register, 'is-loading')
  console.log('click register')

  const info = validate_form()
  if (!info) {
    console.log('Error in validation')
    return
  }

  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return
    if (xhr.status >= 200 && xhr.status < 300) {
      const resjson = JSON.parse(xhr.responseText)
      if (resjson.hasOwnProperty('message') && resjson.message === 'ok') {
        success_process(resjson)
      }
      else {
        console.log('Response error:', resjson)
      }
    }
  }

  xhr.open('POST', apiurl, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(JSON.stringify(info))
}

document.getElementById('wy_register').addEventListener('click', do_register)
