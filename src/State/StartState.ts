import { CustomState } from "Core/State/CustomState";
import { Coord } from "Core/Coord";
import { Button } from "UI/Button";

export class StartState extends CustomState {

    private text: Phaser.Text;

    private startButton: Button;

    constructor() {
        super();
    }

    init() {
        super.init();

        this.game.stage.backgroundColor = 0xF1BADE;

        this.text = this.game.add.text(10, 10, "小春ちゃんファクトリー", { font: '22px', fill: '#fff' });
        this.text.anchor.setTo(0.5, 1);
        this.text.position.setTo(Coord.worldCenterX, Coord.worldCenterY);

        this.startButton = new Button(this.game, "スタート");
        this.startButton.setOnClickedCallback(() => {
            this.game.state.start("HomeState");
        });
        this.startButton.position.setTo(Coord.worldCenterX - 110, Coord.worldCenterY);
        this.game.add.existing(this.startButton);
    }

    preload() {
    }

    create() {
    }
}