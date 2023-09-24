const progress = document.getElementById('seekBar');
const duration = document.getElementById('duration');
const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const cover = document.querySelector('.cover');

// Массив треков
const tracks = [
  {
    artist: 'VIDEOCLUB',
    title: 'Amour Plastique',
    cover: 'Nap.jpg',
    file: 'VideoclubAmour_plastique_67670730.mp3'
  },
  {
    artist: 'ZXCURSED',
    title: 'terrorblade',
    cover: 'terr.jpg',
    file: 'zxcursed_-_terrorblade_74900372.mp3'
  }
];

let currentTrackIndex = 0;

// Функция обновления информации о треке
function updateTrackInfo() {
  const currentTrack = tracks[currentTrackIndex];
  document.querySelector('.track-artist').textContent = currentTrack.artist;
  document.querySelector('.track-title').textContent = currentTrack.title;
  cover.style.backgroundImage = `url(${currentTrack.cover})`;
  audio.src = currentTrack.file;
}
function changeBackground() {
  var body = document.body;

  if (body.classList.contains('custom-background')) {
    body.classList.remove('custom-background');
  } else {
    body.classList.add('custom-background');
  }
}

// Функция обновления прогресса воспроизведения
function updateProgress() {
  const progressPercentage = (audio.currentTime / audio.duration) * 100;
  progress.value = progressPercentage;

  const minutes = Math.floor(audio.currentTime / 60);
  const seconds = Math.floor(audio.currentTime % 60);
  duration.textContent = `${padZero(minutes)}:${padZero(seconds)}`;
}

// Функция добавления нуля перед числами < 10
function padZero(number) {
  return number < 10 ? `0${number}` : number;
}

// Функция включения/паузы воспроизведения
function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.classList.remove('play');
    playBtn.classList.add('pause');
  } else {
    audio.pause();
    playBtn.classList.remove('pause');
    playBtn.classList.add('play');
  }
}

// Функция переключения на предыдущий трек
function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  updateTrackInfo();
  if (!audio.paused) {
    audio.play();
  }
}

// Функция переключения на следующий трек
function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  updateTrackInfo();
  if (!audio.paused) {
    audio.play();
  }
}

// Обработчик события клика по кнопке воспроизведения/паузы
playBtn.addEventListener('click', togglePlay);

// Обработчики событий клика по кнопкам предыдущего и следующего треков
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);

// Обработчик события обновления времени воспроизведения трека
audio.addEventListener('timeupdate', updateProgress);

// Обработчик события окончания воспроизведения трека
audio.addEventListener('ended', nextTrack);

// Обработчик события изменения положения ползунка прогресса
progress.addEventListener('input', function() {
  const seekTime = (audio.duration / 100) * progress.value;
  audio.currentTime = seekTime;
});

// Инициализация первого трека
updateTrackInfo();