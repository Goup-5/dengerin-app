**Title**
----
  DengerIn Music App

  Register

* **URL**

  /register

* **Method:**
  

  `POST`
  
* **Data Params**

  ```
        {
            "username" : "userA",
            "password" : "12345",
            "email" : "user@mail.com"
        }
  ```

* **Success Response:**
  

  * **Code:** 201 <br />
    **Content:**
    ```
    {
      "id": 4,
      "username": "rama12345",
      "email": "rama@g2mail.com"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Internal Server Error" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Validation Error" }`

<hr> 

  Login

* **URL**

  /login

* **Method:**
  
  `POST`


* **Data Params**

  ```
        {
            "username" : "userA",
            "password" : "12345",
        }
  ```

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:**
    ```
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJyYW1hMTIzNDUiLCJpYXQiOjE2MDQwMjkyMDZ9.
        p8G8p1cMURN5-U1YpRNbTAxdWTG071tTC_DxZf0ceZQ"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Internal Server Error" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Wrong username/password" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Validation Error" }`

Google Login
* **URL**

  /googleLogin

* **Method:**
  
  `POST`

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:**
    ```
    {
        "access_token": "ya29.A0AfH6SMDbbzW7kzEftTLe4-yZ4FSKKxjST9wY_KMb8mLjSB9WzaO86KUptxEu1xxWPZ_rp869V-rKqWQymXUL1Lh353gcqwrKhqCnOtwchvjXaqsZMUvf4L7X080ZAxHzKAqxmtgtcTnj1jjFZZoe1awFhhLi3nFs6Biv7_1ZYkTc"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Internal Server Error" }`


<hr>

  Show Playlist

* **URL**

  /playlist

* **Method:**
  
  `GET`


* **Headers Params**

  ```
        {
            "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJyYW1hMTIzNDUiLCJpYXQiOjE2MDQwMjkyMDZ9.        
            p8G8p1cMURN5-U1YpRNbTAxdWTG071tTC_DxZf0ceZQ",
        }
  ```

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:**
    ARRAY of OBJECTS
    EXAMPLE :
    ```
    [
      {
          "id": 10,
          "playlist_name": "Lagu Samarinda",
          "createdAt": "2020-10-30T04:24:40.369Z",
          "updatedAt": "2020-10-30T04:24:40.369Z",
          "UserId": 5,
          "Songs": [
              {
                  "id": 12,
                  "title": "Can't C Me",
                  "artist": "2Pac",
                  "duration": 330,
                  "link": "https://cdns-preview-6.dzcdn.net/stream/c-60e58aed8cbdb5ceffdc33528a7c54dd-5.mp3",
                  "artist_link": "https://api.deezer.com/artist/167095/image",
                  "createdAt": "2020-10-30T04:24:57.254Z",
                  "updatedAt": "2020-10-30T04:24:57.254Z",
                  "PlaylistSong": {
                      "PlaylistId": 10,
                      "SongId": 12,
                      "createdAt": "2020-10-30T04:24:57.259Z",
                      "updatedAt": "2020-10-30T04:24:57.259Z"
                  }
              }
          ]
      },
      {
          "id": 9,
          "playlist_name": "Lagu Rasta",
          "createdAt": "2020-10-30T03:58:48.038Z",
          "updatedAt": "2020-10-30T03:58:48.038Z",
          "UserId": 5,
          "Songs": [
              {
                  "id": 10,
                  "title": "Reggae Bom",
                  "artist": "Lagum",
                  "duration": 168,
                  "link": "https://cdns-preview-1.dzcdn.net/stream/c-1b9565c4ecc5594c1d2b48dc0a24abed-5.mp3",
                  "artist_link": "https://api.deezer.com/artist/8222632/image",
                  "createdAt": "2020-10-30T04:06:34.252Z",
                  "updatedAt": "2020-10-30T04:06:34.252Z",
                  "PlaylistSong": {
                      "PlaylistId": 9,
                      "SongId": 10,
                      "createdAt": "2020-10-30T04:06:34.261Z",
                      "updatedAt": "2020-10-30T04:06:34.261Z"
                  }
              },
              {
                  "id": 11,
                  "title": "Pensando En Ti",
                  "artist": "Quique Neira",
                  "duration": 249,
                  "link": "https://cdns-preview-d.dzcdn.net/stream/c-d46c4a70e151814968136bb95b8b7c1f-3.mp3",
                  "artist_link": "https://api.deezer.com/artist/241018/image",
                  "createdAt": "2020-10-30T04:08:41.812Z",
                  "updatedAt": "2020-10-30T04:08:41.812Z",
                  "PlaylistSong": {
                      "PlaylistId": 9,
                      "SongId": 11,
                      "createdAt": "2020-10-30T04:08:41.815Z",
                      "updatedAt": "2020-10-30T04:08:41.815Z"
                  }
              }
          ]
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Invalid Token" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Authentication failed" }`

<hr>

  Create Playlist

* **URL**

  /playlist

* **Method:**
  
  `POST`


* **Headers Params**

  ```
        {
            "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJyYW1hMTIzNDUiLCJpYXQiOjE2MDQwMjkyMDZ9.        
            p8G8p1cMURN5-U1YpRNbTAxdWTG071tTC_DxZf0ceZQ",
        }
  ```

  * **Data Params**

  ```
        {
            "playlist_name" : "<INPUT PLAYLIST NAME HERE>",
        }
  ```

* **Success Response:**
  

  * **Code:** 201 <br />
    **Content:**
    OBJECT
    EXAMPLE :
    ```
    {
      "id": 12,
      "playlist_name": "Senja",
      "UserId": 4,
      "updatedAt": "2020-10-30T05:36:48.953Z",
      "createdAt": "2020-10-30T05:36:48.953Z"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Invalid Token" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Playlist name is required" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Authentication failed" }`

<hr>

  Show Playlist by id

* **URL**

  /playlist/:id

* **Method:**
  
  `GET`


* **Headers Params**

  ```
        {
            "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJyYW1hMTIzNDUiLCJpYXQiOjE2MDQwMjkyMDZ9.        
            p8G8p1cMURN5-U1YpRNbTAxdWTG071tTC_DxZf0ceZQ",
        }
  ```

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:**
    OBJECT
    EXAMPLE :
    ```
    {
      "id": 4,
      "playlist_name": "Lagu Enak",
      "createdAt": "2020-10-29T14:42:47.042Z",
      "updatedAt": "2020-10-30T04:34:11.258Z",
      "UserId": 1
    }
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Invalid Token" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Playlist name is required" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Authentication failed" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Not Authorized" }`

<hr>

  Update playlist by id

* **URL**

  /playlist/:id

* **Method:**
  
  `PUT`


* **Headers Params**

  ```
        {
            "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJyYW1hMTIzNDUiLCJpYXQiOjE2MDQwMjkyMDZ9.        
            p8G8p1cMURN5-U1YpRNbTAxdWTG071tTC_DxZf0ceZQ",
        }
  ```
* **Data Params**
```
    {
      "playlist_name": "Jamet"
    }
```

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:**
    OBJECT
    EXAMPLE :
    ```
    {
      "playlist_name": "Jamet"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Invalid Token" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Playlist name is required" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Authentication failed" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Not Authorized" }`

<hr>

  Delete playlist by id

* **URL**

  /playlist/:id

* **Method:**
  
  `DELETE`


* **Headers Params**

  ```
        {
            "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJyYW1hMTIzNDUiLCJpYXQiOjE2MDQwMjkyMDZ9.        
            p8G8p1cMURN5-U1YpRNbTAxdWTG071tTC_DxZf0ceZQ",
        }
  ```

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:**
    OBJECT
    EXAMPLE :
    ```
    {
      message: `Playlist ${playlistId} deleted`
    }
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Invalid Token" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Playlist name is required" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Authentication failed" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Not Authorized" }`

<hr>

  Get song in playlist

* **URL**

  /playlist/:id/song

* **Method:**
  
  `GET`


* **Headers Params**

  ```
        {
            "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJyYW1hMTIzNDUiLCJpYXQiOjE2MDQwMjkyMDZ9.        
            p8G8p1cMURN5-U1YpRNbTAxdWTG071tTC_DxZf0ceZQ",
        }
  ```

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:**
    OBJECT
    EXAMPLE :
    ```
      {
      "id": 2,
      "playlist_name": "Lagu STM",
      "createdAt": "2020-10-29T14:42:24.979Z",
      "updatedAt": "2020-10-29T14:42:24.979Z",
      "UserId": 1,
      "Songs": [
          {
              "id": 8,
              "title": "Keke Bukan Bonekaa",
              "artist": "Kekeyi",
              "duration": 205,
              "link": "https://cdns-preview-0.dzcdn.net/stream/c-031987fe3205fe94c0d92b625be00a47-2.mp3",
              "artist_link": "https://api.deezer.com/artist/96397302/image",
              "createdAt": "2020-10-30T02:19:12.567Z",
              "updatedAt": "2020-10-30T02:19:12.567Z",
              "PlaylistSong": {
                  "PlaylistId": 2,
                  "SongId": 8,
                  "createdAt": "2020-10-30T02:19:12.580Z",
                  "updatedAt": "2020-10-30T02:19:12.580Z"
              }
          },
          {
              "id": 9,
              "title": "Punk Rock Jalanan",
              "artist": "Jawara Band",
              "duration": 262,
              "link": "https://cdns-preview-0.dzcdn.net/stream/c-0483707428e74a0b2b11027ae4e2c01f-0.mp3",
              "artist_link": "https://api.deezer.com/artist/6057280/image",
              "createdAt": "2020-10-30T02:20:46.882Z",
              "updatedAt": "2020-10-30T02:20:46.882Z",
              "PlaylistSong": {
                  "PlaylistId": 2,
                  "SongId": 9,
                  "createdAt": "2020-10-30T02:20:46.895Z",
                  "updatedAt": "2020-10-30T02:20:46.895Z"
              }
          }
        ]
      }
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Invalid Token" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Authentication failed" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Not Authorized" }`

<hr>

  Search song in deezer API

* **URL**

  /playlist/:id/song

* **Method:**
  
  `POST`


* **Headers Params**

  ```
        {
            "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJyYW1hMTIzNDUiLCJpYXQiOjE2MDQwMjkyMDZ9.        
            p8G8p1cMURN5-U1YpRNbTAxdWTG071tTC_DxZf0ceZQ",
        }
  ```

* **Data Params**
```
  {
    "search": "<INPUT STRING VALUE>"
  }
```

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:**
    ARRAY OF OBJECT
    EXAMPLE :
    ```
      [
        {
            "id": 80694056,
            "title": "Punk Rock Jalanan",
            "duration": "4:22",
            "artist": "Jawara Band",
            "link": "https://cdns-preview-0.dzcdn.net/stream/c-0483707428e74a0b2b11027ae4e2c01f-0.mp3",
            "artist_link": "https://api.deezer.com/artist/6057280/image"
        },
        {
            "id": 80694058,
            "title": "Takut Bercinta",
            "duration": "3:08",
            "artist": "Jawara Band",
            "link": "https://cdns-preview-3.dzcdn.net/stream/c-384800801c9f7c76bdae78047da13655-0.mp3",
            "artist_link": "https://api.deezer.com/artist/6057280/image"
        }
      ]
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Invalid Token" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Authentication failed" }`

<hr>

  Add song to playlist

* **URL**

  /playlist/:id/song/:searchinput/:deezersongid

  ex: /playlist/2/song/kekeyi/1992321

* **Method:**
  
  `POST`


* **Headers Params**

  ```
        {
            "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJyYW1hMTIzNDUiLCJpYXQiOjE2MDQwMjkyMDZ9.        
            p8G8p1cMURN5-U1YpRNbTAxdWTG071tTC_DxZf0ceZQ",
        }
  ```

* **Success Response:**
  

  * **Code:** 201 <br />
    **Content:**
    OBJECT
    EXAMPLE :
    ```
    {
      "PlaylistId": 2,
      "SongId": 9,
      "updatedAt": "2020-10-30T02:20:46.895Z",
      "createdAt": "2020-10-30T02:20:46.895Z"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Invalid Token" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Authentication failed" }`
  
  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Not Authorized" }`

<hr>

  Get User Profile

* **URL**

  /user

* **Method:**
  
  `GET`


* **Headers Params**

  ```
        {
            "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJyYW1hMTIzNDUiLCJpYXQiOjE2MDQwMjkyMDZ9.        
            p8G8p1cMURN5-U1YpRNbTAxdWTG071tTC_DxZf0ceZQ",
        }
  ```

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:**
    OBJECT
    EXAMPLE :
    ```
    {
      "username": "ramaadmin"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Invalid Token" }`

<hr>

  Get Billboard Data

* **URL**

  /billboard

* **Method:**
  
  `GET`


* **Headers Params**

  ```
        {
            "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJyYW1hMTIzNDUiLCJpYXQiOjE2MDQwMjkyMDZ9.        
            p8G8p1cMURN5-U1YpRNbTAxdWTG071tTC_DxZf0ceZQ",
        }
  ```

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:**
    OBJECT
    EXAMPLE :
    ```
    {
      {
      "1": {
          "rank": "1",
          "album": "Hurts 2B Human",
          "artist": "P!nk",
          "detail": "new"
      },
      "2": {
          "rank": "2",
          "album": "People",
          "artist": "Hillsong UNITED",
          "detail": "new"
      },
      "3": {
          "rank": "3",
          "album": "CrasH Talk",
          "artist": "ScHoolboy Q",
          "detail": "new"
      },
      "4": {
          "rank": "4",
          "album": "When We All Fall Asleep, Where Do We Go?",
          "artist": "Billie Eilish",
          "last week": "1",
          "peak position": "1",
          "weeks on chart": "5",
          "detail": "down"
      },
      "5": {
          "rank": "5",
          "album": "Free Spirit",
          "artist": "Khalid",
          "last week": "2",
          "peak position": "1",
          "weeks on chart": "4",
          "detail": "down"
      },
      "6": {
          "rank": "6",
          "album": "Thank U, Next",
          "artist": "Ariana Grande",
          "last week": "5",
          "peak position": "1",
          "weeks on chart": "12",
          "detail": "down"
      },
      "7": {
          "rank": "7",
          "album": "Map Of The Soul: PERSONA",
          "artist": "BTS",
          "last week": "3",
          "peak position": "1",
          "weeks on chart": "3",
          "detail": "down"
      },
      "8": {
          "rank": "8",
          "album": "Neotheater",
          "artist": "AJR",
          "detail": "new"
      },
      "9": {
          "rank": "9",
          "album": "HOMECOMING: THE LIVE ALBUM",
          "artist": "Beyonce",
          "last week": "4",
          "peak position": "4",
          "weeks on chart": "3",
          "detail": "down"
      },
      "10": {
          "rank": "10",
          "album": "Victory Lap",
          "artist": "Nipsey Hussle",
          "last week": "7",
          "peak position": "2",
          "weeks on chart": "15",
          "detail": "down"
        }
      }
    }
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Invalid Token" }`

<hr>

  Get Randomjokes API Data

* **URL**

  /randomjokes

* **Method:**
  
  `GET`


* **Headers Params**

  ```
        {
            "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJyYW1hMTIzNDUiLCJpYXQiOjE2MDQwMjkyMDZ9.        
            p8G8p1cMURN5-U1YpRNbTAxdWTG071tTC_DxZf0ceZQ",
        }
  ```

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:**
    OBJECT
    EXAMPLE :
    ```
    {
      "setup": "Why did the functional programming developer get thrown out of school?",
      "delivery": "Because he refused to take classes."
    }
    
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Invalid Token" }`





