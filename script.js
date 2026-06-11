/* ===================================================
SPOTIFY CLONE - FINAL SCRIPT
=================================================== */

/* ===================================================
ELEMENTS
=================================================== */

const songsBox = document.getElementById("songsBox");

const masterPlay = document.getElementById("masterPlay");

const nextBtn = document.getElementById("nextBtn");

const prevBtn = document.getElementById("prevBtn");

const progressBar = document.getElementById("myProgressBar");

const volumeControl = document.getElementById("volumeControl");

const volumeText = document.getElementById("volumeText");

const masterSongName = document.getElementById("masterSongName");

const musicGif = document.getElementById("musicGif");

const songTime = document.getElementById("songTime");

const searchInput = document.getElementById("searchInput");

const loginBox = document.getElementById("loginBox");

const appBox = document.getElementById("appBox");

const loadingScreen = document.getElementById("loadingScreen");

/* =====================================================
SECTION CONTROLS
===================================================== */

const homeSection = document.getElementById("homeSection");

const aboutSection = document.getElementById("aboutSection");

/* ===================================================
SONGS DATA
=================================================== */

const songs = [
  {
    name: "Muskurane",
    file: "./songs/1.mp3",
    cover: "./covers/1.jpg",
    favorite: false,
  },

  {
    name: "Raanjhana",
    file: "./songs/2.mp3",
    cover: "./covers/2.jpg",
    favorite: false,
  },

  {
    name: "Hawayein",
    file: "./songs/3.mp3",
    cover: "./covers/3.jpg",
    favorite: false,
  },

  {
    name: "Heeriye",
    file: "./songs/4.mp3",
    cover: "./covers/4.jpg",
    favorite: false,
  },

  {
    name: "Mareez E Ishq",
    file: "./songs/5.mp3",
    cover: "./covers/5.jpg",
    favorite: false,
  },

  {
    name: "Daru Badnaam",
    file: "./songs/6.mp3",
    cover: "./covers/6.jpg",
    favorite: false,
  },

  {
    name: "Blue Eyes",
    file: "./songs/7.mp3",
    cover: "./covers/7.jpg",
    favorite: false,
  },

  {
    name: "Bapu Zimidar",
    file: "./songs/8.mp3",
    cover: "./covers/8.jpg",
    favorite: false,
  },

  {
    name: "Chaar Din",
    file: "./songs/9.mp3",
    cover: "./covers/9.jpg",
    favorite: false,
  },

  {
    name: "Aari Aari",
    file: "./songs/10.mp3",
    cover: "./covers/10.jpg",
    favorite: false,
  },

  {
    name: "Millionaire",
    file: "./songs/11.mp3",
    cover: "./covers/11.jpg",
    favorite: false,
  },

  {
    name: "Gal Ban Gayi",
    file: "./songs/12.mp3",
    cover: "./covers/12.jpg",
    favorite: false,
  },
  {
    name: "love dose",
    file: "./songs/13.mp3",
    cover: "./covers/13.jpg",
    favorite: false,
  },
  {
    name: "mere mahoob qayamat hogyi",
    file: "./songs/14.mp3",
    cover: "./covers/14.jpg",
    favorite: false,
  },
  {
    name: "call aundi ",
    file: "./songs/15.mp3",
    cover: "./covers/15.jpg",
    favorite: false,
  },
];

/* ===================================================
PLAYER
=================================================== */
let currentSong = 0;

let recentlyPlayed = JSON.parse(localStorage.getItem("recentSongs")) || [];

const audioElement = new Audio();

musicGif.style.opacity = "0";

/* ===================================================
LOAD SONGS
=================================================== */

function loadSongs(list = songs) {
  songsBox.innerHTML = "";

  list.forEach((song, index) => {
    const realIndex = songs.indexOf(song);

    const card = document.createElement("div");

    card.className = "song-card";

    card.innerHTML = `

      <span class="heartIcon">

        ${song.favorite ? "❤️" : "🤍"}

      </span>

      <img src="${song.cover}" />

      <h3>${song.name}</h3>

      <button class="playBtn">

        ▶ Play

      </button>
    `;

    const playBtn = card.querySelector(".playBtn");

    playBtn.onclick = () => {
      playSong(realIndex);
    };

    const heart = card.querySelector(".heartIcon");

    heart.onclick = () => {
      toggleFavorite(realIndex);
    };

    songsBox.appendChild(card);
  });
}

/* ===================================================
PLAY SONG
=================================================== */

function playSong(index) {
  currentSong = index;

  audioElement.src = songs[currentSong].file;

  audioElement.currentTime = 0;

  audioElement
    .play()

    .then(() => {
      masterSongName.innerText = songs[currentSong].name;

      masterPlay.innerText = "⏸";

      musicGif.style.opacity = "1";

      recentlyPlayed = recentlyPlayed.filter(
        (song) => song.name !== songs[currentSong].name,
      );

      recentlyPlayed.unshift(songs[currentSong]);

      if (recentlyPlayed.length > 10) {
        recentlyPlayed.pop();
      }

      localStorage.setItem("recentSongs", JSON.stringify(recentlyPlayed));
    })

    .catch((err) => {
      console.log(err);

      alert("Song not playing");
    });
}

/* ===================================================
MASTER PLAY
=================================================== */

masterPlay.onclick = () => {
  if (!audioElement.src) {
    playSong(currentSong);

    return;
  }

  if (audioElement.paused) {
    audioElement.play();

    masterPlay.innerText = "⏸";

    musicGif.style.opacity = "1";
  } else {
    audioElement.pause();

    masterPlay.innerText = "▶";

    musicGif.style.opacity = "0";
  }
};

/* ===================================================
NEXT SONG
=================================================== */

nextBtn.onclick = () => {
  currentSong++;

  if (currentSong >= songs.length) {
    currentSong = 0;
  }

  playSong(currentSong);
};

/* ===================================================
PREVIOUS SONG
=================================================== */

prevBtn.onclick = () => {
  currentSong--;

  if (currentSong < 0) {
    currentSong = songs.length - 1;
  }

  playSong(currentSong);
};

/* ===================================================
PROGRESS BAR
=================================================== */

audioElement.addEventListener(
  "timeupdate",

  () => {
    if (audioElement.duration) {
      progressBar.value =
        (audioElement.currentTime / audioElement.duration) * 100;

      let minutes = Math.floor(audioElement.currentTime / 60);

      let seconds = Math.floor(audioElement.currentTime % 60);

      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      songTime.innerText = `${minutes}:${seconds}`;
    }
  },
);

/* ===================================================
SEEK
=================================================== */

progressBar.oninput = () => {
  if (audioElement.duration) {
    audioElement.currentTime =
      (progressBar.value * audioElement.duration) / 100;
  }
};

/* ===================================================
AUTO NEXT
=================================================== */

audioElement.addEventListener(
  "ended",

  () => {
    currentSong++;

    if (currentSong >= songs.length) {
      currentSong = 0;
    }

    playSong(currentSong);
  },
);

/* ===================================================
VOLUME
=================================================== */

volumeControl.oninput = () => {
  audioElement.volume = volumeControl.value;

  volumeText.innerText = Math.round(volumeControl.value * 100) + "%";
};

/* ===================================================
SEARCH
=================================================== */

searchInput.oninput = () => {
  const value = searchInput.value.toLowerCase();

  const filteredSongs = songs.filter((song) =>
    song.name.toLowerCase().includes(value),
  );

  loadSongs(filteredSongs);
};

/* ===================================================
FAVORITES
=================================================== */

function toggleFavorite(index) {
  songs[index].favorite = !songs[index].favorite;

  loadSongs(songs);
}

/* ===================================================
PLAYLIST FILTERS
=================================================== */

function showPlaylist(type) {
  homeSection.style.display = "block";

  aboutSection.style.display = "none";

  const clearBtn = document.getElementById("clearRecentBtn");

  clearBtn.style.display = "none";

  if (type === "all") {
    loadSongs(songs);
  } else if (type === "favorites") {
    const favoriteSongs = songs.filter((song) => song.favorite);

    loadSongs(favoriteSongs);
  } else if (type === "recent") {
    if (recentlyPlayed.length === 0) {
      alert("No recently played songs yet 🎵");

      return;
    }

    loadSongs(recentlyPlayed);

    clearBtn.style.display = "inline-flex";
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

/* ===================================================
HOME SECTION
=================================================== */

function showHome() {
  homeSection.style.display = "block";

  aboutSection.style.display = "none";

  document.getElementById("clearRecentBtn").style.display = "none";

  loadSongs(songs);
}

/* ===================================================
ABOUT SECTION
=================================================== */

function showAbout() {
  homeSection.style.display = "none";

  aboutSection.style.display = "block";

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
/* ===================================================
CLEAR RECENT
=================================================== */

window.clearRecent = function () {
  recentlyPlayed = [];

  localStorage.removeItem("recentSongs");

  document.getElementById("clearRecentBtn").style.display = "none";

  loadSongs(songs);

  alert("Recent songs cleared ✅");
};

/* ===================================================
LOGOUT
=================================================== */

window.logout = function () {
  audioElement.pause();

  location.reload();
};

/* ===================================================
SIGNUP
=================================================== */

window.signup = function () {
  const email = document.getElementById("email").value.trim();

  const password = document.getElementById("password").value.trim();

  if (email === "" || password === "") {
    alert("Please fill all fields");

    return;
  }

  localStorage.setItem("spotifyEmail", email);

  localStorage.setItem("spotifyPassword", password);

  alert("Account Created Successfully ✅");
};

/* ===================================================
LOGIN
=================================================== */

window.loginUser = function () {
  const email = document.getElementById("email").value.trim();

  const password = document.getElementById("password").value.trim();

  const savedEmail = localStorage.getItem("spotifyEmail");

  const savedPassword = localStorage.getItem("spotifyPassword");

  if (email === "" || password === "") {
    alert("Please fill all fields");

    return;
  }

  if (email === savedEmail && password === savedPassword) {
    loginBox.style.display = "none";

    appBox.style.display = "block";

    alert("Login Successful ✅");
  } else {
    alert("Invalid Email or Password ❌");
  }
};

/* ===================================================
LOADING SCREEN
=================================================== */

window.onload = () => {
  setTimeout(() => {
    loadingScreen.style.display = "none";

    loginBox.style.display = "flex";
  }, 1500);
};

/* ===================================================
INITIAL LOAD
=================================================== */

loadSongs();
