import {CustomState} from "Core/State/CustomState";
import { Koharu } from "UI/Koharu";

export class HomeState extends CustomState {
    private scoreText: Phaser.Text;
    private score: number = 0;
    private isDown: boolean = false;
    private koharu: Koharu = null;
    private isCleared: boolean = false;
    private isGameOver: boolean = false;
    private static FlickThrethold: number = 70;

    init() {
        super.init();

        this.game.stage.backgroundColor = 0xF1BADE;

        this.scoreText = this.game.add.text(10, 10, "", { font: '18px', fill: '#fff'});
        this.scoreText.resolution = window.devicePixelRatio;

        this.game.input.maxPointers = 1;
        this.game.input.addMoveCallback(this.onMove, this);
        this.game.input.onDown.add(this.onDown, this);
        this.game.input.onUp.add(this.onUp, this);

        this.initAll();
        this.generateKoharu(true);
    }

    preload() {
    }

    create() {
        this.adjust();
    }

    shutdown() {
    }

    adjust() {
    }

    update() {
    }

    // private

    private initAll() {
        this.scoreText.text = "小春ちゃん: 0";
        this.score = 0;
        this.isDown = false;
        this.isCleared = false;
        this.isGameOver = false;

        if (this.koharu != null) {
            this.game.world.remove(this.koharu);
            this.koharu = null;
        }
    }

    private judgeTap() {
        if (this.isGameOver || this.isCleared) {
            return;
        }
        this.isCleared = true;
        this.incrementScore();
    }

    private judgeFlick() {
        if (this.isGameOver || this.isCleared) {
            return;
        }
        this.isCleared = true;
        this.incrementScore();
    }

    private generateKoharu(isStart: boolean) {
        if (this.koharu != null) {
            this.game.world.remove(this.koharu);
            this.koharu = null;
        }
        if (!isStart && (!this.isCleared || this.isGameOver)) {
            this.isGameOver = true;
            return;
        }

        this.isCleared = false;

        this.koharu = new Koharu(this.game);
        this.game.add.existing(this.koharu);
        this.koharu.position.setTo(320, 200);
        this.game.add
            .tween(this.koharu)
            .to({x: -this.koharu.width}, 1000, Phaser.Easing.Linear.caller)
            .start()
            .onComplete.addOnce(() => this.generateKoharu(false), this);
    }

    private incrementScore() {
        this.score += 1;
        this.scoreText.text = "小春ちゃん: " + this.score.toString();
    }

    private onMove(pointer: Phaser.Pointer) {
        if (!this.isDown || this.isGameOver || this.isCleared) {
            return;
        }
        const distance = Phaser.Point.distance(this.game.input.activePointer.position, this.game.input.activePointer.positionDown);
        const isOverThretholdDistance = distance > HomeState.FlickThrethold;

        if (isOverThretholdDistance) {
            console.log("flicked");
            this.judgeFlick();
        }
    }

    private onDown(pointer: Phaser.Pointer) {
        this.isDown = true;
    }

    private onUp(pointer: Phaser.Pointer) {
        if (!this.isDown || this.isGameOver || this.isCleared) {
            this.isDown = false;
            return;
        }
        this.isDown = false;

        const distance = Phaser.Point.distance(this.game.input.activePointer.position, this.game.input.activePointer.positionDown);
        const isInThretholdDistance = distance <= HomeState.FlickThrethold;

        if (isInThretholdDistance) {
            this.judgeTap();
        }
    }
}