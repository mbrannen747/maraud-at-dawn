class Lobby extends ScreenBase
{
    constructor(c,w,h)
    {
        super(c,w,h);
        this.skyImage = new createjs.Bitmap(assets.getResult("lobby"));
        this.skyImage.scaleX = .88;
        this.skyImage.scaleY = .75;
        this.addChild(this.skyImage);
    }

 
}