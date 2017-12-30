import { Res } from "Constants/Resources";

export class Koharu extends Phaser.Group {
    private koharu: Phaser.Sprite;
    private megane: Phaser.Sprite;
    // private dummyMegane: Phaser.Sprite;

    constructor(game: Phaser.Game) {
        super(game, null);

        this.koharu = new Phaser.Sprite(game, 0, 0, Res.koharu.key);
        this.koharu.setSize(100, 200);
        this.addChild(this.koharu);
        this.megane = new Phaser.Sprite(game, 0, 0, Res.megane.key);
        this.megane.setSize(60, 30);
        this.megane.position.setTo(5, 10);
        this.addChild(this.megane);
    }
}