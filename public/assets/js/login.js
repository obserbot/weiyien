// login.js
//
// 已经废弃，直接表单验证，Passport.js

(() => {

  /**
   * Validate form values.
   */
  function validate_form ()
  {
    const email = document.getElementById('field_email').value.trim()
    if (!WY_validateEmail(email)) {
      console.log('Wrong email address')
      return false
    }

    const password = document.getElementById('field_password').value.trim()
    if (password.length < 1) {
      console.log('Wrong password')
      return false
    }

    return {email, password}
  }


  /**
   * Login successfully.
   * Save token.
   */
  function success_process (resjson)
  {

    console.log ('in prc')
    localStorage.setItem('wyetoken', resjson.token)

    document.location = '/'
  }


  /**
   * Login with credentials.
   * Return token if success.
   */
  function do_login ()
  {
    const info = validate_form()
    if (!info) {
      console.log('Error in validation')
      alert ('邮箱地址或密码错误')
      return
    }

    const apiurl = "https://weiyien.com/api/weiyien/v1/login?secret=qew"
    //console.log('in lg:', apiurl)

    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return
      if (xhr.status >= 200 && xhr.status < 300) {
        const resjson = JSON.parse(xhr.responseText)
        if (resjson.hasOwnProperty('message') && resjson.message === 'ok' && resjson.token.length > 10) {
          success_process(resjson)
        }
        else {
          //console.log('Response error:', resjson)
          alert ('邮箱地址或密码错误')
        }
      }
    }

    xhr.open('POST', apiurl, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(info))
  }


  // Check localStorage
  //const wyetoken = localStorage.getItem('wyetoken')
  //console.log('wye token:', wyetoken)

  // Clear token
  localStorage.setItem('wyetoken', '')

  document.getElementById('wy_login').addEventListener('click', do_login)

})()
