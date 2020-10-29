function showLogin(e) {
  e.preventDefault()
  $("#form-register").hide()
  $("#form-login").show()
}

function login(e) {
  e.preventDefault()
  const username = $("#login-username").val()
  const password = $("#login-password").val()
  alert(`Login ${username} & ${password}`)
  // alert(`Login`)
}

function showRegister(e) {
  e.preventDefault()
  $("#form-register").show()
  $("#form-login").hide()
}

function register(e) {
  e.preventDefault()
  const username = $("#register-username").val()
  const eamil = $("#register-email").val()
  const password = $("#register-password").val()
  const retypePassword = $("#register-retype-password").val()
  alert(`Login ${username} & ${password} & ${eamil} & ${retypePassword}`)
}