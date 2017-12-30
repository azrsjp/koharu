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
        this.game.load.image(Res.btn_round.key, Res.btn_round.path);
        this.game.load.image(Res.yumekoha.key, Res.yumekoha.path);
    }

    create() {
        this.game.state.start("StartState");
    }
}