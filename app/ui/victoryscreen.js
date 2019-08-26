class Victory extends ScreenBase
{
    constructor(c,w,h)
    {
        super(c,w,h);

        //Background Sunset Image
        this.sunSetImage = new createjs.Bitmap(assets.getResult("sunset"));
        this.sunSetImage.scaleX = .7;
        this.sunSetImage.scaleY = .7;
        this.addChild(this.sunSetImage);

        //Lets you read the text
        this.tile = new createjs.Container();
        this.tile.fill = new createjs.Shape();
        this.tile.addChild(this.tile.fill);
        this.addChild(this.tile);
        this.tile.x = 250;
        this.tile.y = 260;
        this.tile.fill.graphics.beginFill("rgba(0, 0, 0, .5)").drawRect(0, -25, 345, 235);

        this.button = new createjs.Container();
        this.button.fill = new createjs.Shape();
        this.button.addChild(this.button.fill);
        this.button.text = new createjs.Text("MAIN MENU", "14px Squada One", "white");
        this.button.addChild(this.button.text);
        this.addChild(this.button);

        //Button Settings
        this.button.x = 400;
        this.button.y = 400;
        this.button.fill.graphics.beginFill("green").drawRect(-75, -25, 150, 50);
        this.button.text.setBounds(150, 50);
        this.button.text.textAlign = "center";
        this.button.text.textBaseline = "middle";


        // Add text to display the current state
        // this.stateTitleText = new createjs.Text("State", "20px Squada One", "rgba(0, 0, 0, 1)");
        this.stateTitleText = app.stateTitleText;
        this.stateTitleText.x = 10;
        this.stateTitleText.y = 10;
        // this.addChild(this.stateTitleText);

        // this.stateText = new createjs.Text("State", "20px Squada One", "rgba(0, 0, 0, 1)");
        this.stateText = app.stateText;
        this.stateText.x = 10;
        this.stateText.y = 30;
        // this.addChild(this.stateText);

        //Display Game Over Screen
        this.gameOverText = new createjs.Text("VICTORY", "40px Squada One", "rgba(255,255,255,1)");
        this.gameOverText.x = 340;
        this.gameOverText.y = 300;
        this.addChild(this.gameOverText);

         //Add text to display the score
         this.scoreText = new createjs.Text("", "20px Squada One", "rgba(255, 255,255,1");
         this.scoreText.text =  "You Scored: " + app.scoreTextTracker + " points by surviving " + app.scoreTextTracker + " rounds";
         this.scoreText.x = 260;
         this.scoreText.y = 250;
         this.addChild(this.scoreText);

        // Our mouse action callbacks 
        this.button.on("mouseover", function(evt) {
            this.fill.graphics.clear().beginFill("rgba(150, 150, 150, 1)").drawRect(-75, -25, 150, 50);
        });        
        this.button.on("mouseout", function(evt) { 
            this.fill.graphics.clear().beginFill("green").drawRect(-75, -25, 150, 50);
        });        
        this.button.on("mousedown", function(evt) { 
            this.fill.graphics.clear().beginFill("rgba(255, 255, 255, 1)").drawRect(-75, -25, 150, 50);
        }); 
        this.button.on("click", function(evt) {
            this.fill.graphics.clear().beginFill("black").drawRect(-75, -25, 150, 50);
            
            app.setState(app.gameStates.MAIN_MENU);
            
        }); 
        
    }

    

    
}