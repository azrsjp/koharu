import {Res} from "Constants/Resources";
import {CustomState} from "Core/State/CustomState";

export class PreloadState extends CustomState {

    constructor() {
        super();
    }

    init() {
        super.init();
    }

    preload() {
        // アプリ全体で使う画像を画像をロード
        this.game.load.image(Res.koharu.key, Res.koharu.path);
        this.game.load.image(Res.megane.key, Res.megane.path);
    }

    create() {
        this.game.state.start("HomeState");
    }
}