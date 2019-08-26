class Instructions extends ScreenBase
{
    constructor(c,w,h)
    {
        super(c,w,h);

        //Background map Image
        this.mapImage = new createjs.Bitmap(assets.getResult("instructions"));
        this.mapImage.scaleX = .8;
        this.mapImage.scaleY = .76;
        this.addChild(this.mapImage);

        this.button = new createjs.Container();
        this.button.fill = new createjs.Shape();
        this.button.addChild(this.button.fill);
        this.button.text = new createjs.Text("MAIN MENU", "14px Squada One", "white");
        this.button.addChild(this.button.text);
        this.addChild(this.button);

        //Button Settings
        this.button.x = 80;
        this.button.y = 80;
        this.button.fill.graphics.beginFill("black").drawRect(-75, -25, 150, 50);
        this.button.text.setBounds(150, 50);
        this.button.text.textAlign = "center";
        this.button.text.textBaseline = "middle";

        // // Add text to display the current state
        // this.stateTitleText = app.stateTitleText;
        // this.stateTitleText.x = 10;
        // this.stateTitleText.y = 10;
        // // this.addChild(this.stateTitleText

        // this.stateText = app.stateText;
        // this.stateText.x = 10;
        // this.stateText.y = 30;
        // // this.addChild(this.stateText);

        //Button events

        this.button.on("mouseover", function(evt) {
            this.fill.graphics.clear().beginFill("rgba(150, 150, 150, 1)").drawRect(-75, -25, 150, 50);
        });        
        this.button.on("mouseout", function(evt) { 
            this.fill.graphics.clear().beginFill("black").drawRect(-75, -25, 150, 50);
        });        
        this.button.on("mousedown", function(evt) { 
            this.fill.graphics.clear().beginFill("rgba(255, 255, 255, 1)").drawRect(-75, -25, 150, 50);
        }); 
        this.button.on("click", function(evt) {
            this.fill.graphics.clear().beginFill("black").drawRect(-75, -25, 150, 50);
            app.setState(app.gameStates.MAIN_MENU);
      
        }); 

        // //Title
        // this.instructionsText = new createjs.Text("BUILD EM UP INSTRUCTIONS", "40px Squada One", "rgba(0,0,0,1)");
        // this.instructionsText.x = 200;
        // this.instructionsText.y = 30;
        // this.addChild(this.instructionsText);

        // //Goal
        // this.instructionsText = new createjs.Text("The goal of Build Em Up is to make your opponents health reach 0.", "20px Squada One", "rgba(0,0,0,1)");
        // this.instructionsText.x = 200;
        // this.instructionsText.y = 70;
        // this.addChild(this.instructionsText);

        // //Stats
        // this.instructionsText = new createjs.Text("Stats", "30px Squada One", "rgba(0,0,0,1)");
        // this.instructionsText.x = 200;
        // this.instructionsText.y = 90;
        // this.addChild(this.instructionsText);
        
        // //Heart Icon
        // this.heart = new createjs.Bitmap(assets.getResult("heart"));
        // this.heart.x = 200;
        // this.heart.y = 120;
        // this.addChild(this.heart);

        // //Stats
        // this.instructionsText = new createjs.Text("Health is what keeps you alive, don't let it reach 0 or you lose!", "20px Squada One", "rgba(0,0,0,1)");
        // this.instructionsText.x = 240;
        // this.instructionsText.y = 125;
        // this.addChild(this.instructionsText);

        // //Sword Icon
        // this.sword = new createjs.Bitmap(assets.getResult("sword"));
        // this.sword.x = 190;
        // this.sword.y = 160;
        // this.addChild(this.sword);

        // //Stats
        // this.swordText = new createjs.Text("Attack determines the amount of damage you do after every round.", "20px Squada One", "rgba(0,0,0,1)");
        // this.swordText.x = 240;
        // this.swordText.y = 170;
        // this.addChild(this.swordText);

        // //Sword Icon
        // this.shield = new createjs.Bitmap(assets.getResult("shield"));
        // this.shield.x = 190;
        // this.shield.y = 210;
        // this.shield.scaleY = .5;
        // this.shield.scaleX = .5;
        // this.addChild(this.shield);

        // //Stats
        // this.shieldText = new createjs.Text("Defense determines how much damage you block (Atk - Def = Damage).", "20px Squada One", "rgba(0,0,0,1)");
        // this.shieldText.x = 240;
        // this.shieldText.y = 220;
        // this.addChild(this.shieldText);

        // //Gold Icon
        // this.gold = new createjs.Bitmap(assets.getResult("gold"));
        // this.gold.x = 190;
        // this.gold.y = 260;
        // this.gold.scaleY = .05;
        // this.gold.scaleX = .05;
        // this.addChild(this.gold);

        // //Stats
        // this.goldText = new createjs.Text("Gold allows you to buy upgrades. You get 1 coin every round + interest", "20px Squada One", "rgba(0,0,0,1)");
        // this.goldText.x = 240;
        // this.goldText.y = 270;
        // this.addChild(this.goldText);

        // this.goldText = new createjs.Text("You get 1 coin of interest for every 10 gold you save.", "20px Squada One", "rgba(0,0,0,1)");
        // this.goldText.x = 240;
        // this.goldText.y = 290;
        // this.addChild(this.goldText);

        // this.gameMechanicTitle = new createjs.Text("GAME MECHANICS", "30px Squada One", "rgba(0,0,0,1)");
        // this.gameMechanicTitle.x = 200;
        // this.gameMechanicTitle.y = 330;
        // this.addChild(this.gameMechanicTitle);

        // this.gameMechanicTitle = new createjs.Text("ROUNDS: Rounds only last five seconds, after that damage is dealt,", "20px Squada One", "rgba(0,0,0,1)");
        // this.gameMechanicTitle.x = 200;
        // this.gameMechanicTitle.y = 360;
        // this.addChild(this.gameMechanicTitle);

        // this.gameMechanicTitle2 = new createjs.Text("gold is dispensed, and the new shop items are placed", "20px Squada One", "rgba(0,0,0,1)");
        // this.gameMechanicTitle2.x = 200;
        // this.gameMechanicTitle2.y = 380;
        // this.addChild(this.gameMechanicTitle2);

        // this.storeTitle = new createjs.Text("Store: The store will be filled with 5 random choices every round. ", "20px Squada One", "rgba(0,0,0,1)");
        // this.storeTitle.x = 200;
        // this.storeTitle.y = 410;
        // this.addChild(this.storeTitle);

        // this.storeTitle2 = new createjs.Text("Buying upgrades will help you defeat your opponent. ", "20px Squada One", "rgba(0,0,0,1)");
        // this.storeTitle2.x = 200;
        // this.storeTitle2.y = 430;
        // this.addChild(this.storeTitle2);
        
        // this.storeTitle3 = new createjs.Text("USE INTEREST, saving money will make beating the computer easier.", "20px Squada One", "rgba(0,0,0,1)");
        // this.storeTitle3.x = 200;
        // this.storeTitle3.y = 450;
        // this.addChild(this.storeTitle3);

    }

    update(event){
        var delta = event.delta / 1000;
        this.mouseXText.text = app.mouseXText;
        this.mouseYText.text =  app.mouseYText;

    }
    
}