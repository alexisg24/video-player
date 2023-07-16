export interface VideoPlayer{
    play(): void;
    pause(): void;
    stop(): void;
    mute(): void;
    unmute(): void;
    setVolume(volume: number): void;
    fullScreen():void;
    exitFullScreen(): void;
    controls():void;
}