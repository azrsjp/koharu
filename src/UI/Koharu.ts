import { Res } from "Constants/Resources";

export class Koharu extends Phaser.Group {
    private koharu: Phaser.Sprite;
    private megane: Phaser.Sprite;
    private dummyMegane: Phaser.Sprite;
    private isMegane: boolean;

    constructor(game: Phaser.Game) {
        super(game, null);

        this.isMegane = Math.floor(Math.random() * 2) == 0;

        this.koharu = new Phaser.Sprite(game, 0, 0, Res.koharu.key);
        this.koharu.setSize(115, 191);
        this.addChild(this.koharu);
        this.megane = new Phaser.Sprite(game, 0, 0, Res.megane.key);
        this.megane.setSize(43, 14.5);
        this.megane.position.setTo(14, 40);
        this.megane.visible = this.isMegane;
        this.addChild(this.megane);

        this.dummyMegane = new Phaser.Sprite(game, 0, 0, Res.kirakira.key);
        this.dummyMegane.setSize(115, 95);
        this.dummyMegane.position.setTo(-12, 0);
        this.dummyMegane.visible = false;
        this.addChild(this.dummyMegane);

        
    }
    addMegane(): boolean {
        if(this.isMegane) {
            this.game.add.tween(this.megane).to({ y: -320 }, 700, Phaser.Easing.Linear.caller).start();
            return false;
        }

        this.megane.visible = true;
        this.dummyMegane.visible = true;

        return true;

    }

    mede(): boolean {
        if (this.isMegane) {
            this.dummyMegane.visible = true;
            return true;
        }

        return false;
    }

}