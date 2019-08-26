class BattleScreen extends ScreenBase
{
    constructor(c,w,h)
    {
        super(c,w,h);
        let battleScreen = this; 

        this.skyImage = new createjs.Bitmap(assets.getResult("water"));
        this.skyImage.scaleX = 1;
        this.skyImage.scaleY = 1;
        this.addChild(this.skyImage);


        this.scoreTextGame = new createjs.Text("Send Them To Davey Jones!", "36px Squada One", "rgba(0,0,0,1)");
        this.scoreTextGame.x = 300;
        this.scoreTextGame.y = 10;
        this.addChild(this.scoreTextGame);

        ///////////////////////////////////////////////////////////////////////////////HEARTS
        this.playerHeart = new createjs.Bitmap(assets.getResult("heart"));
        this.playerHeart.x = 110;
        this.playerHeart.y = 10;
        this.addChild(this.playerHeart);

        this.playerHeartText = new createjs.Text("100", "30px Squada One", "rgba(0,0,0,1)");
        this.playerHeartText.x = 150;
        this.playerHeartText.y = 10;
        this.addChild(this.playerHeartText);

        this.opponentHeart = new createjs.Bitmap(assets.getResult("heart"));
        this.opponentHeart.x = 800;
        this.opponentHeart.y = 10;
        this.addChild(this.opponentHeart);

        this.opponentHeartText = new createjs.Text("100", "30px Squada One", "rgba(0,0,0,1)");
        this.opponentHeartText.x = 840;
        this.opponentHeartText.y = 10;
        this.addChild(this.opponentHeartText);

        this.timerText = new createjs.Text("0", "20px Squada One", "rgba(0, 0, 0, 1)");
        this.timerText.x = 700;
        this.timerText.y = 10;
        this.addChild(this.timerText);


    }
    update(event){
        this.timerText.text = "Time: " +  app.timer.toFixed(2);
    }
}