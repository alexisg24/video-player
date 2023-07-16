import './style.css'
import exampleVideo from './assets/example-video.mp4'
import { MediaPlayer } from './player'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<section id="video-player">
  <video src="${exampleVideo}" ></video>
  <article class="controls">
    <section class="progress">
      <progress id="progress-bar" value="0"></progress>
    </section>
    <section class="buttons">
      <article class="left-btn">
        <button class="play-button">Play</button>
        <button class="pause-button" style="display: none">Pause</button>
        <button class="stop-button">Stop</button>
        <button class="mute-button">Mute</button>
        <input type="range" min="0" max="100" class="slider">
        <p class="time-display">0:00/0:00</p>
      </article>
      <article class="right-btn">
        <button class="loop-button">Loop</button>
        <button class="fullscreen-button">FullScreen</button>
        <button class="exit-fullscreen-button" style="display: none">ExitFullScreen</button>
    </article>
    </section>
  </article>
</section>
`

const video = document.querySelector<HTMLVideoElement>('video')!
new MediaPlayer(video).controls()
