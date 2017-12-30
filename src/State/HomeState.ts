import {CustomState} from "Core/State/CustomState";
import { Koharu } from "UI/Koharu";

export class HomeState extends CustomState {
    private debugText: Phaser.Text;
    private isDown: boolean = false;
    private koharu: Koharu;
    private static FlickThrethold: number = 70;

    init() {
        super.init();

        this.debugText = this.game.add.text(0, 0, "Hello, world", { font: '14px', fill: '#fff'});
        this.debugText.resolution = window.devicePixelRatio;

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

    private onMove(pointer: Phaser.Pointer) {
        if (!this.isDown) {
            return;
        }
        const distance = Phaser.Point.distance(this.game.input.activePointer.position, this.game.input.activePointer.positionDown);
        const isOverThretholdDistance = distance > HomeState.FlickThrethold;

        if (isOverThretholdDistance && this.game.input.activePointer.isDown) {
            this.debugText.text = "Swiped";
        }
    }

    private onDown(pointer: Phaser.Pointer) {
        this.isDown = true;
        this.debugText.text = "";
    }

    private onUp(pointer: Phaser.Pointer) {
        if (!this.isDown) {
            return;
        }
        this.isDown = false;

        const distance = Phaser.Point.distance(this.game.input.activePointer.position, this.game.input.activePointer.positionDown);
        const isInThretholdDistance = distance <= HomeState.FlickThrethold;

        if (isInThretholdDistance) {
            this.debugText.text = "onUp";
        }
    }
}