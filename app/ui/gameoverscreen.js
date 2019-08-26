

class GameOver extends ScreenBase
{
    constructor(c,w,h)
    {
        super(c,w,h);

        //Background Skull Image
        if(app.player.health <= 0){
            this.skullImage = new createjs.Bitmap(assets.getResult("defeat"));
            this.skullImage.scaleX = .74;
            this.skullImage.scaleY = .7;
        }else {
            this.skullImage = new createjs.Bitmap(assets.getResult("victory"));
            this.skullImage.scaleX = .94;
            this.skullImage.scaleY = .94;
        }
        this.addChild(this.skullImage);
        
        
        // //Main Menu Button
        // this.button = new createjs.Container();
        // this.button.fill = new createjs.Shape();
        // this.button.addChild(this.button.fill);
        // this.button.text = new createjs.Text("MAIN MENU", "14px Squada One", "black");
        // this.button.addChild(this.button.text);
        // this.addChild(this.button);

        // //Button Settings
        // this.button.x = 500;
        // this.button.y = 400;
        // this.button.fill.graphics.beginFill("white").drawRect(-75, -25, 150, 50);
        // this.button.text.setBounds(150, 50);
        // this.button.text.textAlign = "center";
        // this.button.text.textBaseline = "middle";


        // // Add text to display the current state
        // // this.stateTitleText = new createjs.Text("State", "20px Squada One", "rgba(0, 0, 0, 1)");
        // this.stateTitleText = app.stateTitleText;
        // this.stateTitleText.x = 10;
        // this.stateTitleText.y = 10;
        // this.addChild(this.stateTitleText);

        // // this.stateText = new createjs.Text("State", "20px Squada One", "rgba(0, 0, 0, 1)");
        // this.stateText = app.stateText;
        // this.stateText.x = 10;
        // this.stateText.y = 30;
        // this.addChild(this.stateText);

        //Display Game Over Screen
        // this.gameOverText = new createjs.Text("GAME OVER", "40px Squada One", "rgba(217, 30, 24, 1)");
        // this.gameOverText.x = 320;
        // this.gameOverText.y = 300;
        // this.addChild(this.gameOverText);

         //Add text to display the score
        //  this.scoreText = new createjs.Text("", "20px Squada One", "rgba(217, 30, 24, 1)");
        //  this.scoreText.text =  "You Scored: " + app.scoreTextTracker + " points by surviving " + app.scoreTextTracker + " rounds";
        //  this.scoreText.x = 260;
        //  this.scoreText.y = 250;
        //  this.addChild(this.scoreText);

        // Our mouse action callbacks 
        // this.button.on("mouseover", function(evt) {
        //     this.fill.graphics.clear().beginFill("rgba(150, 150, 150, 1)").drawRect(-75, -25, 150, 50);
        // });        
        // this.button.on("mouseout", function(evt) { 
        //     this.fill.graphics.clear().beginFill("white").drawRect(-75, -25, 150, 50);
        // });        
        // this.button.on("mousedown", function(evt) { 
        //     this.fill.graphics.clear().beginFill("rgba(255, 255, 255, 1)").drawRect(-75, -25, 150, 50);
        // }); 
        // this.button.on("click", function(evt) {
        //     this.fill.graphics.clear().beginFill("white").drawRect(-75, -25, 150, 50);
            
        //     app.setState(app.gameStates.MAIN_MENU);
            
        // }); 
        
    }

    

    
}