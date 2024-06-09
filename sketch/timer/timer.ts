
class Timer {
    private prevTime: number;
    private duration: number;
    private onFire: () => void;
    private started: boolean;
    private repeat: boolean;

    public constructor(duration: number, onFigure: () => void) {
        this.prevTime = 0;
        this.duration = duration;
        this.onFire = onFigure;
        this.repeat = false;
    }

    start() {
        this.prevTime = millis();
        this.started = true;
    }

    update() {
        if (this.duration === 0) {
            throw new Error("timer has not been started");
        }

        if (millis() - this.prevTime > this.duration) {
            this.prevTime = this.repeat ? millis() : 0;
            this?.onFire();
        }
    }

    isStarted(): boolean {
        return this.started;
    }

    public setRepeat() {
        this.repeat = true;
    }
}