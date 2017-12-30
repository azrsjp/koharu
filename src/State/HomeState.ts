import {CustomState} from "Core/State/CustomState";
import { Koharu } from "UI/Koharu";

export class HomeState extends CustomState {
    private scoreText: Phaser.Text;
    private score: number = 0;
    private isDown: boolean = false;
    private koharu: Koharu;
    private static FlickThrethold: number = 70;

    init() {
        super.init();

        this.scoreText = this.game.add.text(10, 10, "小春ちゃん: 0", { font: '18px', fill: '#fff'});
        this.scoreText.resolution = window.devicePixelRatio;

        this.game.input.maxPointers = 1;
        this.game.input.addMoveCallback(this.onMove, this);
        this.game.input.onDown.add(this.onDown, this);
        this.game.input.onUp.add(this.onUp, this);

        this.koharu = new Koharu(this.game);
        this.game.add.existing(this.koharu);
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

    private incrementScore() {
        this.score += 1;
        this.scoreText.text = "小春ちゃん: " + this.score.toString();
    }

    private onMove(pointer: Phaser.Pointer) {
        if (!this.isDown) {
            return;
        }
        const distance = Phaser.Point.distance(this.game.input.activePointer.position, this.game.input.activePointer.positionDown);
        const isOverThretholdDistance = distance > HomeState.FlickThrethold;
    }

    private onDown(pointer: Phaser.Pointer) {
        this.isDown = true;
    }

    private onUp(pointer: Phaser.Pointer) {
        if (!this.isDown) {
            return;
        }
        this.isDown = false;

        const distance = Phaser.Point.distance(this.game.input.activePointer.position, this.game.input.activePointer.positionDown);
        const isInThretholdDistance = distance <= HomeState.FlickThrethold;
    }
}