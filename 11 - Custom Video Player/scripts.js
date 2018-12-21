const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const toggle = player.querySelector(".toggle");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const range = player.querySelectorAll(".player__slider");
const skipButton = player.querySelectorAll(".player__button");

function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}
function updatedButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}
function skipHandler() {
  video.currentTime += parseFloat(this.dataset.skip);
}
function rangeHandler() {
  video[this.name] = this.value;
}
function progressHandler() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
video.addEventListener("click", togglePlay);
video.addEventListener("play", updatedButton);
video.addEventListener("pause", updatedButton);
video.addEventListener("timeupdate", progressHandler);
toggle.addEventListener("click", togglePlay);
skipButton.forEach(skip => skip.addEventListener("click", skipHandler));
range.forEach(range => range.addEventListener("change", rangeHandler));
range.forEach(range => range.addEventListener("mousemove", rangeHandler));
let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", e => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
