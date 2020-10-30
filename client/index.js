
const base_url = "http://localhost:3000";


let currentPlaylistId
$(document).ready(function () { //http://localhost:3000/user
  $.ajax({
    method: "GET",
    url: `${base_url}/playlist`,
    headers: { access_token: localStorage.getItem('access_token') }
  })
    .done(response => {
      afterLogin();
    })
    .fail(err => {
      localStorage.clear();
      afterSignOut()
    });

  $.ajax({
    method: "GET",
    url: `${base_url}/user`,
    headers: { access_token: localStorage.getItem('access_token') }
  })
    .done(response => {
      $('#username-profile').html(`<small>${response.username}</small>`)
    })
});

function showLogin(e) {
  if (e !== null) {
    e.preventDefault()
  }
  $("#form-register").hide()
  $("#form-login").show()
  $("#page-playlist").hide();
}

function login(e) {
  e.preventDefault()
  const username = $("#login-username").val()
  const password = $("#login-password").val()
  // sweetAlert()
  // alert(`Login ${username} & ${password}`)
  // alert(`Login`)
  const input = { username, password }
  prosesLogin(input, e)
}

function googleLogin(e) {
  e.preventDefault()
  afterLogin()
}

function prosesLogin(input, e) {
  const { username, password } = input;
  $.ajax({
    method: "POST",
    url: base_url + "/login",
    data: {
      username,
      password
    }
  })
    .done(response => {
      const token = response.access_token;
      saveToken(token);
      Swal.fire({
        title: 'Access Granted!',
        text: 'Welcome, enjoy dengerin musik!',
        icon: 'success',
        onClose: () => {
          afterLogin()
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
      Swal.fire('Access Denied!', message, 'error')
    })
}

function saveToken(access_token) {
  localStorage.setItem('access_token', access_token);
}

function afterLogin() {
  $("#login-username").val('')
  $("#login-password").val('')
  home()
}

function home() {
  $("#navbar-right").show();
  $("#page-auth").hide();
  $("form-login").hide();
  $("form-register").hide();
  $("#page-home").show();
  $("#page-playlist").show();
  $("#page-detail-playlist").hide();
  $("#page-search-song").hide();
  $('#song-list').empty();
  $("#page-chart").hide();
  showPlaylist()
  pauseAudio()
  showJokes()
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
  // const retypePassword = $("#register-retype-password").val()
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

function onSignIn(googleUser) {
  // var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  let google_access_token = googleUser.getAuthResponse().id_token;

  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/googleLogin',
    data: {
      google_access_token
    }
  })
    .done(response => {
      afterLogin()
      saveToken(response.access_token)
    })
    .fail(err => {
      console.log(err)
    })
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
      logout();
      afterSignOut(e);
    }
  })
}

function signOut(e) {
  beforeSignOut(e)
}

//ceeeek dulu
function logout() {
  localStorage.clear()
  //sign out google
  let auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut()
    .then(function () {
      console.log('User signed out.');
    });
}

function afterSignOut(e) {
  if (e) {
    e.preventDefault()
  }
  $("#page-auth").show();
  $("form-login").show();
  $("#navbar-right").hide();
  $("form-register").hide();
  $("#page-home").hide();
  $("#page-playlist").hide();
  $("#page-detail-playlist").hide();
  $("#page-search-song").hide();
  $("#tabel-playlist").empty();
  $("#searchlist").empty()
  $("playlist-song-list").empty();
  $("#page-chart").hide();
  pauseAudio();
  showLogin(e);
}

function addPlaylist(e) {
  e.preventDefault()
  const playlist_name = $("#playlistname").val()
  $("#playlistname").val('')

  $.ajax({
    method: "POST",
    url: base_url + "/playlist",
    data: {
      playlist_name: playlist_name
    },
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(response => {

      Swal.fire({
        title: 'Add playlist succesfully!',
        text: '',
        icon: 'success',
        onClose: () => {

        }
      })
      showPlaylist();
    })
    .fail(err => {
      let message = '';
      if (Array.isArray(err.responseJSON)) {
        message = err.responseJSON[0].message;
      } else {
        message = err.responseJSON.message;
      }
      Swal.fire('Failed add playlist!', message, 'error')
      // console.log(err);
    })
}

function editPlaylist(e, playlistid) {

  let message = '';
  Swal.fire({
    title: 'Type new playlist name',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Update',
    showLoaderOnConfirm: true,
    preConfirm: (playlist_name) => {
      console.log(playlist_name, playlistid)
      $.ajax({
        method: "PUT",
        url: `${base_url}/playlist/${playlistid}`,
        headers: { access_token: localStorage.getItem('access_token') },
        data: {
          playlist_name: playlist_name
        },
      })
        .done(response => {
          message = `Playlist updated to ` + response.playlist_name
          showPlaylist();
          Swal.fire({
            title: message,
            icon: 'success'
          })
        })
        .fail(err => {
          if (Array.isArray(err.responseJSON)) {
            message = err.responseJSON[0].message;
          } else {
            message = err.responseJSON.message;
          }
          Swal.showValidationMessage(
            `Request failed: ${message}`
          )
        });
    },
    allowOutsideClick: () => !Swal.isLoading()
  })
  // .then((result) => {
  //   console.log(result)
  //   if (result.isConfirmed) {
  //     console.log(result)
  //     Swal.fire({
  //       title: `Update succesfully`, 
  //     })
  //   }
  // })
}

function deletePlaylist(e, playlistid) {
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
      console.log('confirmed')
      $.ajax({
        method: "DELETE",
        url: `${base_url}/playlist/${playlistid}`,
        headers: { access_token: localStorage.getItem('access_token') },
      })
        .done(response => {
          Swal.fire(
            'Deleted!',
            response.message,
            'success'
          )
          showPlaylist();
        })
        .fail(err => {
          let message = '';
          if (Array.isArray(err.responseJSON)) {
            message = err.responseJSON[0].message;
          } else {
            message = err.responseJSON.message;
          }
          Swal.fire('Failed delete playlist!', message, 'error')
        });
    }
  })
}

function searchSong(e) {
  e.preventDefault()
  const search_name = $("#searchname").val()
  Swal.fire({
    title: 'Please wait!',
    text: '',
    imageUrl: 'public/images/ajax-progres.gif',
    imageWidth: 50,
    imageHeight: 50,
    imageAlt: 'Custom image',
    showConfirmButton: false,
    allowOutsideClick: false
  })
  $.ajax({
    method: "POST",
    url: base_url + `/playlist/${currentPlaylistId}/song`,
    data: {
      q: search_name
    },
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(response => {
      $("#searchlist").empty()
      response.forEach(element => {
        $("#searchlist").append(`
    <div class="col-lg-4 col-md-12">
      <div class="card small_mcard_1">
        <div class="user">
          <img
            src="${element.artist_link}"
            alt="profile-image">
          <div class="details">
            <h6 class="mb-0 mt-2">${element.artist}</h6>
            <p class="mb-0"><small>${element.title}</small></p>
            <button class="btn btn-primary" onclick="addToPlaylist(event, ${element.id})" >Add to Playlist</button>
          </div>
        </div>
        <div class="footer audio-playback">
          <audio controls style="width: 100%;">
            <source
              src="${element.link}"
              type="audio/mpeg">
          </audio>
        </div>
      </div>
    `)
      });
      let timerInterval
      Swal.fire({
        title: 'Complete!',
        timer: 100,
        timerProgressBar: true,
        willOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
            const content = Swal.getContent()
            if (content) {
              const b = content.querySelector('b')
              if (b) {
                b.textContent = Swal.getTimerLeft()
              }
            }
          }, 100)
        },
        onClose: () => {
          clearInterval(timerInterval)
        }
      })
    })
}

function addToPlaylist(e, id) {
  e.preventDefault()
  $("#page-playlist").hide();
  $("#page-detail-playlist").hide();
  $("#page-search-song").show();
  const search_name = $("#searchname").val()
  Swal.fire({
    title: 'Please wait!',
    text: '',
    imageUrl: 'public/images/ajax-progres.gif',
    imageWidth: 50,
    imageHeight: 50,
    imageAlt: 'Custom image',
    showConfirmButton: false,
    allowOutsideClick: false
  })

  $.ajax({
    method: "POST",
    url: base_url + `/playlist/${currentPlaylistId}/song/${search_name}/${id}`,
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(response => {
      showPlaylistDetail(currentPlaylistId);
      $("#page-search-song").hide();
      let timerInterval
      Swal.fire({
        title: 'Complete!',
        timer: 100,
        timerProgressBar: true,
        willOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
            const content = Swal.getContent()
            if (content) {
              const b = content.querySelector('b')
              if (b) {
                b.textContent = Swal.getTimerLeft()
              }
            }
          }, 100)
        },
        onClose: () => {
          clearInterval(timerInterval)
        }
      })

    })
    .fail(err => { console.log(err) })
}

function deleteSong(e, playlistid, songid) {
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
      let access_token = localStorage.getItem("access_token");
      $.ajax({
        method: "DELETE",
        url: `${base_url}/playlist/${playlistid}/song/${songid}`,
        headers: { access_token },
      })
        .done(response => {
          console.log(response);
          showPlaylistDetail(playlistid)
        })
        .fail(err => console.log(err));
      Swal.fire(
        'Deleted!',
        'Your song has been deleted from playlist.',
        'success'
      )
    }
  })
}

function showPlaylist() {
  $("#page-playlist").show();
  $("#page-detail-playlist").hide();
  let access_token = localStorage.getItem("access_token");
  $.ajax({
    method: "GET",
    url: `${base_url}/playlist`,
    headers: { access_token }
  })
    .done(response => {
      console.log(response)
      $("#tabel-playlist").empty();
      response.forEach((el, i) => {
        $("#tabel-playlist").append(`
                          <tr>
                            <td>${++i}</td>
                            <td>${el.playlist_name} <span class="badge badge-primary ml-3">${el.Songs.length} songs</span></td>
                            <td class="float-right">
                              <button class="btn btn-default btn-sm" onclick="editPlaylist(event, ${el.id})"><i
                                  class="zmdi zmdi-edit"></i></button>
                              <button class="btn btn-default btn-sm" onclick="deletePlaylist(event, ${el.id})"><i
                                  class="zmdi zmdi-delete"></i></button>
                              <button class="btn btn-default btn-sm" onclick="showPlaylistDetail(${el.id}, '${el.playlist_name}')"><i
                                  class="zmdi zmdi-open-in-new"></i></button>
                            </td>
                          </tr>
      `)
      })

    })
    .fail(err => console.log(err))
}

function timeFormat(duration) {
  // Hours, minutes and seconds
  var hrs = ~~(duration / 3600);
  var mins = ~~((duration % 3600) / 60);
  var secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}

function showPlaylistDetail(id, playlistName = '') {
  $("#page-playlist").hide();
  $("#page-detail-playlist").show();
  if (playlistName) {
    $("#playlist-name").text(playlistName)
  }
  pauseAudio();
  let access_token = localStorage.getItem("access_token");
  // let playlistId = localStorage.setItem("playlistId", id)
  currentPlaylistId = id
  $.ajax({
    method: "GET",
    url: `${base_url}/playlist/${id}/song`,
    headers: { access_token },
  })
    .done(response => {
      console.log(response)
      $("#playlist-song-list").empty();
      response.Songs.forEach((el, i) => {
        const list =
/* html */ `<tr>
          <td>${i + 1}</td>
            <td><img src="${el.artist_link}" alt="profile-image"></td>
            <td>
              <a id="${el.id}" onclick="playAudio(event, ${el.id})" class="play-audio" href="#"
                data-datac="${el.link}"><button
                  class="btn btn-default btn-sm"><i class="zmdi zmdi-play"></i></button></a>
            </td>
            <td>${el.title}<span class="badge badge-primary ml-3">${timeFormat(el.duration)}</span></td>
            <td>${el.artist}</td>
            <td>
              <button onclick="deleteSong(event, ${response.id}, ${el.id})" class="btn btn-default btn-sm"><i
                  class="zmdi zmdi-delete"></i></button>
            </td>
          </tr>`

        $("#playlist-song-list").append(list)
        // var a = $('#mydiv').data('myval'); //getter 
        // $(`#${el.id}`).data('datac', el.link);
      })

    })
    .fail(err => console.log(err))
}

function addSong(e) {
  e.preventDefault()
  $("#page-playlist").hide();
  $("#page-detail-playlist").hide();
  $("#page-search-song").show();
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
}

function pauseAudio() {
  $("audio").not(this).each(function (index, audio) {
    audio.pause();
  });
} Y

function playAudio(e, id) {
  e.preventDefault();
  var d = $(`#${id}`).data('datac');
  console.log('datac', d)
  console.log('id', id)
  var audio = document.getElementById('audio');
  var source = document.getElementById('audioSource');
  source.src = d;
  audio.load(); //call this to just preload the audio without playing
  audio.play(); //call this to play the song right away 
}

function showChart(e) {
  e.preventDefault()
  $("#page-playlist").hide();
  $("#page-chart").show();
}


$(function () {
  $("audio").on("play", function () {
    $("audio").not(this).each(function (index, audio) {
      audio.pause();
    });
  });
});

function showJokes() {
  let access_token = localStorage.getItem("access_token");
  $.ajax({
    method: "GET",
    url: `${base_url}/randomJokes`,
    headers: { access_token }
  })
  .done(response=>{
    console.log(response)
    $("#jokes").append(`<p>${response.setup}, - ${response.delivery}</p>`)
  })
  .fail(err=>{
    console.log(err)
  })
}


// $(function () {
//   $("audio").on("play", function () {
//     $("audio").not(this).each(function (index, audio) {
//       audio.pause();
//     });
//   });
// });
// Playlist
