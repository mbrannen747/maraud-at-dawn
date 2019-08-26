class MainMenu extends ScreenBase
{
    constructor(c,w,h)
    {
        super(c,w,h);

        

        //Background darkSky Image
        this.darkSkyImage = new createjs.Bitmap(assets.getResult("title"));
        this.darkSkyImage.scaleX = 1.05;
        this.darkSkyImage.scaleY = .95;
        this.addChild(this.darkSkyImage);


        // Make a mini button
        this.button = new createjs.Container();
        this.button.fill = new createjs.Shape();
        this.button.addChild(this.button.fill);
        this.button.text = new createjs.Text("PLAY", "14px Squada One", "black");
        this.button.addChild(this.button.text);
        this.addChild(this.button);

        //Button Settings
        this.button.x = 500;
        this.button.y = 400;
        this.button.fill.graphics.beginFill("white").drawRect(-75, -25, 150, 50);
        this.button.text.setBounds(150, 50);
        this.button.text.textAlign = "center";
        this.button.text.textBaseline = "middle";

        // Make a mini button
        this.button2 = new createjs.Container();
        this.button2.fill = new createjs.Shape();
        this.button2.addChild(this.button2.fill);
        this.button2.text = new createjs.Text("INSTRUCTIONS", "14px Squada One", "black");
        this.button2.addChild(this.button2.text);
        this.addChild(this.button2);

        //Button Settings
        this.button2.x = 500;
        this.button2.y = 300;
        this.button2.fill.graphics.beginFill("white").drawRect(-75, -25, 150, 50);
        // this.button2.text.setBounds(150, 50);
        this.button2.text.textAlign = "center";
        this.button2.text.textBaseline = "middle";


        // Add text to display the current state
        // this.stateTitleText = new createjs.Text("State", "20px Squada One", "rgba(0, 0, 0, 1)");
        this.stateTitleText = app.stateTitleText;
        this.stateTitleText.x = 10;
        this.stateTitleText.y = 10;
        // this.addChild(this.stateTitleText);

        // this.stateText = new createjs.Text("NONE", "20px Squada One", "rgba(0, 0, 0, 1)");
        this.stateText = app.stateText;
        this.stateText.x = 10;
        this.stateText.y = 30;
        // this.addChild(this.stateText);

        // Our mouse action callbacks 
        this.button.on("mouseover", function(evt) {
            this.fill.graphics.clear().beginFill("rgba(150, 150, 150, 1)").drawRect(-75, -25, 150, 50);
        });        
        this.button.on("mouseout", function(evt) { 
            this.fill.graphics.clear().beginFill("white").drawRect(-75, -25, 150, 50);
        });        
        this.button.on("mousedown", function(evt) { 
            this.fill.graphics.clear().beginFill("rgba(0, 0, 0, 1)").drawRect(-75, -25, 150, 50);
        }); 
        this.button.on("click", function(evt) {
            console.log(app.gameScreen);
            if(app.gameScreen === null){
                this.fill.graphics.clear().beginFill("white").drawRect(-75, -25, 150, 50);
                app.resetTimer(app.timerLength);
                app.resetGame();
                app.setState(app.gameStates.LOBBY);
            }
        }); 

        //Button 2 mouse events
        this.button2.on("mouseover", function(evt) {
            this.fill.graphics.clear().beginFill("rgba(150, 150, 150, 1)").drawRect(-75, -25, 150, 50);
        });        
        this.button2.on("mouseout", function(evt) { 
            this.fill.graphics.clear().beginFill("white").drawRect(-75, -25, 150, 50);
        });        
        this.button2.on("mousedown", function(evt) { 
            this.fill.graphics.clear().beginFill("rgba(0, 0, 0, 1)").drawRect(-75, -25, 150, 50);
        }); 
        this.button2.on("click", function(evt) {
            if(app.gameScreen === null){
                this.fill.graphics.clear().beginFill("white").drawRect(-75, -25, 150, 50);
                app.setState(app.gameStates.INSTRUCTIONS);
            }
        });
        
        

    }

 
}