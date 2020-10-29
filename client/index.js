function showLogin(e) {
  e.preventDefault()
  $("#form-register").hide()
  $("#form-login").show()
}

function login(e) {
  e.preventDefault()
  const username = $("#login-username").val()
  const password = $("#login-password").val()
  sweetAlert()
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
  showLogin(e);
}

function sweetAlert() {
  const ipAPI = '//api.ipify.org?format=json'

  Swal.queue([{
    title: 'Your public IP',
    confirmButtonText: 'Show my public IP',
    text:
      'Your public IP will be received ' +
      'via AJAX request',
    showLoaderOnConfirm: true,
    preConfirm: () => {
      return fetch(ipAPI)
        .then(response => response.json())
        .then(data => Swal.insertQueueStep(data.ip))
        .catch(() => {
          Swal.insertQueueStep({
            icon: 'error',
            title: 'Unable to get your public IP'
          })
        })
    }
  }])
  // $.ajax({

  //   url: "simpan-register.php",
  //   type: "POST",
  //   data: {
  //       "nama_lengkap": nama_lengkap,
  //       "username": username,
  //       "password": password
  //   },

  //   success:function(response){

  //     if (response == "success") {

  //       Swal.fire({
  //         type: 'success',
  //         title: 'Register Berhasil!',
  //         text: 'silahkan login!'
  //       });

  //       $("#nama_lengkap").val('');
  //       $("#username").val('');
  //       $("#password").val('');

  //     } else {

  //       Swal.fire({
  //         type: 'error',
  //         title: 'Register Gagal!',
  //         text: 'silahkan coba lagi!'
  //       });

  //     } 
  //     console.log(response);
  //   }
  // })
    
}