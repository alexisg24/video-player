import { VideoPlayer } from "./types"

export class MediaPlayer implements VideoPlayer {
    private controlInstance: boolean;
    private video: HTMLVideoElement;
    private lastVolume: number;
    private videoDurationFormated: string;
    constructor(video: HTMLVideoElement){
        this.video = video
        this.controlInstance = false
        this.lastVolume = 0;
        this.videoDurationFormated = '00:00'
    }
    play() {
        this.video.play()
    }

    pause(){
       this.video.pause() 
    }

    stop() {
        this.video.currentTime = 0
        this.video.pause() 
    }
    mute() {
       this.video.muted = true
    }

    unmute() {
       this.video.muted = false
    }

    setVolume(volume: number) {
        this.video.volume = volume;
    }

    fullScreen() {
        document.body.classList.remove('minimize-body')
    }

    exitFullScreen() {
        document.body.classList.add('minimize-body')
    }

    controls(){
        if (this.controlInstance) return true
        this.controlInstance = true
        const videoPlayer = document.querySelector<HTMLElement>("#video-player")!;
        const progressBar = document.querySelector<HTMLProgressElement>("#progress-bar")!;
        const timeDisplay = document.querySelector<HTMLElement>(".time-display")!;
        const playBtn = videoPlayer.querySelector<HTMLButtonElement>(".play-button")!
        const pauseBtn = videoPlayer.querySelector<HTMLButtonElement>(".pause-button")!
        const stopBtn = videoPlayer.querySelector<HTMLButtonElement>(".stop-button")!
        const muteBtn = videoPlayer.querySelector<HTMLButtonElement>(".mute-button")!
        const volumeBar = videoPlayer.querySelector<HTMLInputElement>(".slider")!
        const fullScreen = videoPlayer.querySelector<HTMLButtonElement>(".fullscreen-button")!
        const exitFullScreen = videoPlayer.querySelector<HTMLButtonElement>(".exit-fullscreen-button")!
        
        volumeBar.value = String(this.video.volume * 100)
        playBtn.addEventListener("click",()=>{
            playBtn.style.display = 'none'
            pauseBtn.style.display = 'inline-block'
            this.play();
        });
        pauseBtn.addEventListener("click", ()=>{
            pauseBtn.style.display = 'none'
            playBtn.style.display = 'inline-block'
            this.pause();
        });

        stopBtn.addEventListener("click", ()=>{
            this.stop();
        });

        muteBtn.addEventListener('click', ()=>{
            if(this.video.muted){
                this.unmute()
                console.log(this.lastVolume)
                volumeBar.value = `${this.lastVolume*100}`
            }else{
                this.mute();
                this.lastVolume = this.video.volume
                volumeBar.value = '0'
            }
        })

        volumeBar.addEventListener('input', (e)=>{
            const newValue = Number((e.target as HTMLInputElement).value)
            this.setVolume(newValue/100)
        })

        fullScreen.addEventListener("click",()=>{
            fullScreen.style.display = 'none'
            exitFullScreen.style.display = 'inline-block'
            this.fullScreen();
        });
        exitFullScreen.addEventListener("click", ()=>{
            exitFullScreen.style.display = 'none'
            fullScreen.style.display = 'inline-block'
            this.exitFullScreen();
        });

        progressBar.addEventListener('mousedown', (event)=>{
            const progressChange = (event.offsetX / progressBar.offsetWidth)*this.video.duration
            this.video.currentTime = progressChange
        })

        this.video.addEventListener("timeupdate", ()=>{
            const getFormatedTime = (time:number) =>{
                const minutes = Math.floor(time / 60);   
                const seconds = Math.floor(time - minutes * 60)
                const x = minutes < 10 ? "0" + minutes : minutes;
                const y = seconds < 10 ? "0" + seconds : seconds;
                return `${x}:${y}`
            }
            const whereYouAt = getFormatedTime(this.video.currentTime);
            if(this.videoDurationFormated === '00:00'){
                this.videoDurationFormated = getFormatedTime(this.video.duration);
            }

            progressBar.value = this.video.currentTime / this.video.duration;
            timeDisplay.textContent = `${whereYouAt} / ${this.videoDurationFormated}`;
        });
    }
}