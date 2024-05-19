document.addEventListener("DOMContentLoaded", function () {
  let now_playing = document.querySelector(".now-playing");
  let track_art = document.querySelector(".track-art");
  let track_name = document.querySelector(".track-name");
  let track_artist = document.querySelector(".track-artist");
  let playpause_btn = document.querySelector(".playpause-track");
  let next_btn = document.querySelector(".next-track");
  let prev_btn = document.querySelector(".prev-track");
  let stop_btn = document.querySelector(".stop-track"); // Added stop button reference
  let seek_slider = document.querySelector(".seek_slider");
  let volume_slider = document.querySelector(".volume-slider");
  let curr_time = document.querySelector(".current_time");
  let total_duration = document.querySelector(".total-duration");
  let wave = document.getElementById("wave");
  let randomIcon = document.querySelector(".fa-random");
  let curr_track = new Audio();

  let track_index = 0;
  let isPlaying = false;
  let isRandom = false;
  let updateTimer;

  const music_list = [
      {
          img: "arijit.jpg",
          name: "Track 1",
          artist: "Arijit Shing",
          music: "abc.mp3",
      },
      {
          img: "arijit.jpg",
          name: "Track 2",
          artist: "Artist 2",
          music: "xyz.mp3",
      },
      // Add more tracks as needed
  ];

  loadTrack(track_index);

  function loadTrack(track_index) {
      clearInterval(updateTimer);
      reset();

      curr_track.src = music_list[track_index].music;
      curr_track.load();

      track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
      track_name.textContent = music_list[track_index].name;
      track_artist.textContent = music_list[track_index].artist;

      now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;
      updateTimer = setInterval(setUpdate, 1000);
      curr_track.addEventListener("ended", nextTrack);
  }

  function reset() {
      curr_time.textContent = "00:00";
      total_duration.textContent = "00:00";
      seek_slider.value = 0;
  }

  function randomTrack() {
      isRandom ? pauseRandom() : playRandom();
  }

  function playRandom() {
      isRandom = true;
      randomIcon.classList.add("randomActive");
  }

  function pauseRandom() {
      isRandom = false;
      randomIcon.classList.remove("randomActive");
  }

  function repeatTrack() {
      loadTrack(track_index);
      playTrack();
  }

  function playpauseTrack() {
      isPlaying ? pauseTrack() : playTrack();
  }

  function playTrack() {
      curr_track.play();
      isPlaying = true;
      track_art.classList.add("rotate");
      wave.classList.add('loader');
      playpause_btn.innerHTML = '<i class="fa-solid fa-circle-pause fa-2xl"></i>';
  }

  function pauseTrack() {
      curr_track.pause();
      isPlaying = false;
      track_art.classList.remove("rotate");
      wave.classList.remove('loader');
      playpause_btn.innerHTML = '<i class="fa-solid fa-circle-play fa-2xl"></i>';
  }

  function stopTrack() { // Added stop function
      pauseTrack();
      curr_track.currentTime = 0;
  }

  function nextTrack() {
      if (track_index < music_list.length - 1 && !isRandom) {
          track_index += 1;
      } else if (track_index < music_list.length - 1 && isRandom) {
          let random_index = Math.floor(Math.random() * music_list.length);
          track_index = random_index;
      } else {
          track_index = 0;
      }
      loadTrack(track_index);
      playTrack();
  }

  function prevTrack() {
      if (track_index > 0) {
          track_index -= 1;
      } else {
          track_index = music_list.length - 1;
      }
      loadTrack(track_index);
      playTrack();
  }

  function seekTo() {
      let seekTo = curr_track.duration * (seek_slider.value / 100);
      curr_track.currentTime = seekTo;
  }

  function setVolume() {
      curr_track.volume = volume_slider.value / 100;
  }

  function setUpdate() {
      let currentMinutes = Math.floor(curr_track.currentTime / 60);
      let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(curr_track.duration / 60);
      let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

      if (currentSeconds < 10) {
          currentSeconds = "0" + currentSeconds;
      }
      if (durationSeconds < 10) {
          durationSeconds = "0" + durationSeconds;
      }

      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }

  // Event Listeners
  playpause_btn.addEventListener("click", playpauseTrack);
  next_btn.addEventListener("click", nextTrack);
  prev_btn.addEventListener("click", prevTrack);
  stop_btn.addEventListener("click", stopTrack); // Added event listener for stop button
  seek_slider.addEventListener("input", seekTo);
  volume_slider.addEventListener("input", setVolume);
  randomIcon.addEventListener("click", randomTrack);
});
