
const base_url = "http://localhost:3000";

function showLogin(e) {
  e.preventDefault()
  $("#form-register").hide()
  $("#form-login").show()
}

function login(e) {
  e.preventDefault()
  const username = $("#login-username").val()
  const password = $("#login-password").val()
  // sweetAlert()
  // alert(`Login ${username} & ${password}`)
  // alert(`Login`)
  afterLogin(e)
}

function afterLogin(e) {
  $("#login-username").val('')
  $("#login-password").val('')
  home(e)
}

function home(e) {
  e.preventDefault()
  $("#navbar-right").show();
  $("#page-auth").hide();
  $("form-login").hide();
  $("form-register").hide();
  $("#page-home").show();
  $("#page-home").show();
  $("#page-playlist").show();
  $("#page-detail-playlist").hide();
  $("#page-search-song").hide();

  let access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJyYW1hYWRtaW4iLCJpYXQiOjE2MDM5ODAwMDh9.iz11R7fSvyiv96BmBv3tEWi0LeobdHAWjwrbrx7fUcc"
  $.ajax({
    method: "GET",
    url: `${base_url}/playlist`,
    headers: {access_token}
  })
  .done(response => {
    console.log(response)
    response.forEach((el, i) => {
      $("#tabel-playlist").append(`
                          <tr>
                            <td>${i}</td>
                            <td>${el.playlist_name} <span class="badge badge-primary ml-3">99 songs</span></td>
                            <td class="float-right">
                              <button class="btn btn-default btn-sm" onclick="editPlaylist(event)"><i
                                  class="zmdi zmdi-edit"></i></button>
                              <button class="btn btn-default btn-sm" onclick="deletePlaylist(event)"><i
                                  class="zmdi zmdi-delete"></i></button>
                              <button class="btn btn-default btn-sm" onclick="showPlaylistDetail(event)"><i
                                  class="zmdi zmdi-open-in-new"></i></button>
                            </td>
                          </tr>
      `)
    })
      
  })
  .fail(err => console.log(err))
  pauseAudio()
}

function showRegister(e) {
  e.preventDefault()
  $("#form-register").show()
  $("#form-login").hide()
}

function register(e) {
  e.preventDefault();
  const username = $("#register-username").val()
  const email = $("#register-email").val()
  const password = $("#register-password").val()
  const retypePassword = $("#register-retype-password").val()
  const input = { username, email, password };
  processRegister(input, e)
}

function processRegister(input, e) {
  const { username, email, password } = input;
  $.ajax({
    method: "POST",
    url: base_url + "/register",
    data: {
      username,
      email,
      password
    }
  })
    .done(response => {
      Swal.fire({
        title: 'Register Succesfully!',
        text: 'Please Login first!',
        icon: 'success',
        onClose: () => {
          afterRegister(e)
        }
      })
    })
    .fail(err => {
      let message = '';
      if (Array.isArray(err.responseJSON)) {
        message = err.responseJSON[0].message;
      } else {
        message = err.responseJSON.message;
      }
      Swal.fire('Register Failed!', message, 'error')
      console.log(err.responseJSON[0].message)
    })
}

function afterRegister(e) {
  e.preventDefault();
  $("#register-username").val('')
  $("#register-email").val('')
  $("#register-password").val('')
  $("#register-retype-password").val('')
  showLogin(e)
}

function beforeSignOut(e) {
  e.preventDefault()
  Swal.fire({
    title: 'Are you sure Want Logout?',
    text: "You will redirect to login page!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Logout!'
  }).then((result) => {
    if (result.isConfirmed) {
      afterSignOut(e);
    }
  })
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  let google_access_token = googleUser.getAuthResponse().id_token;

  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/googleLogin',
    data: {
      google_access_token
    }
  })
    .done(response => {
      console.log(response)
    })
    .fail(err => {
      console.log(err)
    })
}

function signOut(e) {
  // var auth2 = gapi.auth2.getAuthInstance();
  // auth2.signOut().then(function () {
  //   console.log('User signed out.');
  // });
  beforeSignOut(e)
}

function afterSignOut(e) {
  e.preventDefault()
  $("#page-auth").show();
  $("form-login").show();
  $("#navbar-right").hide();
  $("form-register").hide();
  $("#page-home").hide();
  $("#page-home").hide();
  $("#page-playlist").hide();
  $("#page-detail-playlist").hide();
  $("#page-search-song").hide();
  pauseAudio();
  showLogin(e);
}

function editPlaylist(e) {

}

function deletePlaylist(e) {
  e.preventDefault()
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your playlist has been deleted.',
        'success'
      )
    }
  })
}

function deleteSong(e) {
  e.preventDefault()
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your song has been deleted from playlist.',
        'success'
      )
    }
  })
}

function showPlaylist(e) {
  e.preventDefault();
  $("#page-playlist").show();
  $("#page-detail-playlist").hide();
}

function showPlaylistDetail(e) {
  $("#page-playlist").hide();
  $("#page-detail-playlist").show();
}

function addSong(e) {
  e.preventDefault()
  $("#page-playlist").hide();
  $("#page-detail-playlist").hide();
  $("#page-search-song").show();
}

//ceeeek dulu
// function logout() {
//   localStorage.removeItem('access_token')
//   $('#home').hide()
//   $('#login').show()
// }


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

function pauseAudio() {
  $("audio").not(this).each(function (index, audio) {
    audio.pause();
  });
}

$('.play-audio').click(function () {
  var d = $(this).data('datac');
  var audio = document.getElementById('audio');
  var source = document.getElementById('audioSource');
  source.src = d;

  audio.load(); //call this to just preload the audio without playing
  audio.play(); //call this to play the song right away

});


$(function () {
  $("audio").on("play", function () {
    $("audio").not(this).each(function (index, audio) {
      audio.pause();
    });
  });
});


// $(function () {
//   $("audio").on("play", function () {
//     $("audio").not(this).each(function (index, audio) {
//       audio.pause();
//     });
//   });
// });
// Playlist
