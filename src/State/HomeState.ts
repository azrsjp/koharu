import {CustomState} from "Core/State/CustomState";

export class HomeState extends CustomState {

    init() {
        super.init();

        let hello = this.game.add.text(0, 0, "Hello, world", { font: '14px', fill: '#fff'});
        hello.resolution = window.devicePixelRatio;
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

    // private

}