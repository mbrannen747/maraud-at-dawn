

class Game extends ScreenBase
{
    constructor(c,w,h)
    {
    
    
        super(c,w,h);
        let gameScreen = this;

        //Background Sky Image
        this.skyImage = new createjs.Bitmap(assets.getResult("water"));
        this.skyImage.scaleX = .85;
        this.skyImage.scaleY = .85;
        this.addChild(this.skyImage);

       

        //SoundOn Button
        this.soundOnButton = new createjs.Container();
        this.soundOnButton.fill = new createjs.Bitmap(assets.getResult("soundOn"));
        this.soundOnButton.x = 60;
        this.soundOnButton.y = 10;
        this.soundOnButton.addChild(this.soundOnButton.fill);
        this.addChild(this.soundOnButton);

        this.soundOnButton.on("click", function(evt) {
                gameScreen.soundOnButton.fill = new createjs.Bitmap(assets.getResult("SoundOff"));
                gameScreen.addChild(gameScreen.soundOffButton);
                gameScreen.removeChild(gameScreen.soundOnButton);
                audio.pauseMainMusic();
                audio.sfxCanPlay = !audio.sfxCanPlay;
        }); 

      //soundOff Button
      this.soundOffButton = new createjs.Container();
      this.soundOffButton.fill = new createjs.Bitmap(assets.getResult("soundOff"));
      this.soundOffButton.x = 60;
      this.soundOffButton.y = 10;
      this.soundOffButton.addChild(this.soundOffButton.fill);

      this.soundOffButton.on("click", function(evt) {
            gameScreen.soundOffButton.fill = new createjs.Bitmap(assets.getResult("soundOff"));
            gameScreen.addChild(gameScreen.soundOffButton);
            audio.resumeMainMusic();
            gameScreen.addChild(gameScreen.soundOnButton);
            gameScreen.removeChild(gameScreen.soundOffButton);
            audio.sfxCanPlay = !audio.sfxCanPlay;
      }); 

       
        //Blue Heart
        this.blueheartImage = new createjs.Bitmap(assets.getResult("heart"));
        this.blueheartImage.x = 110;
        this.blueheartImage.y = 10;
        this.addChild(this.blueheartImage);

        this.blueHeartText = new createjs.Text("100", "30px Squada One", "rgba(0,0,0,1)");
        this.blueHeartText.x = 150;
        this.blueHeartText.y = 10;
        this.addChild(this.blueHeartText);

      
        


        //////////////////////////////////////////////////////////////////////////////////////STORE
        //Store
        this.store = new createjs.Container();
        this.store.fill = new createjs.Shape();
        this.store.addChild(this.store.fill);
        this.store.text = new createjs.Text("STORE", "25px Squada One", "white");
        this.store.addChild(this.store.text);
        this.addChild(this.store);
        
        //Store Settings
        this.store.x = 0;
        this.store.y = 485;
        this.store.fill.graphics.beginFill("black").drawRect(0, -25, 1000, 200);
        this.store.text.x = 10;
        this.store.text.setBounds(50, 50);
        this.store.text.textAlign = "left";
        
        //Dock
        this.dockImage = new createjs.Bitmap(assets.getResult("dock"));
        this.dockImage.scaleX = .05;
        this.dockImage.scaleY = .0242;
        this.dockImage.x = 0;
        this.dockImage.y = 400;
        this.addChild(this.dockImage);
        
        //Anchor Images
        this.anchorImage = new createjs.Bitmap(assets.getResult("anchor"));
        this.anchorImage.scaleX = app.shipScaling;
        this.anchorImage.scaleY = app.shipScaling;
        this.anchorImage.x = app.benchPositions[0];
        this.anchorImage.y = app.benchYPositioning;
        this.addChild(this.anchorImage);

        this.anchorImage2 = new createjs.Bitmap(assets.getResult("anchor"));
        this.anchorImage2.scaleX = app.shipScaling;
        this.anchorImage2.scaleY = app.shipScaling;
        this.anchorImage2.x = app.benchPositions[1];
        this.anchorImage2.y = app.benchYPositioning;
        this.addChild(this.anchorImage2);

        this.anchorImage3 = new createjs.Bitmap(assets.getResult("anchor"));
        this.anchorImage3.scaleX = app.shipScaling;
        this.anchorImage3.scaleY = app.shipScaling;
        this.anchorImage3.x = app.benchPositions[2];
        this.anchorImage3.y = app.benchYPositioning;
        this.addChild(this.anchorImage3);
        

        this.anchorImage4 = new createjs.Bitmap(assets.getResult("anchor"));
        this.anchorImage4.scaleX = app.shipScaling;
        this.anchorImage4.scaleY = app.shipScaling;
        this.anchorImage4.x = app.benchPositions[3];
        this.anchorImage4.y = app.benchYPositioning;
        this.addChild(this.anchorImage4);
        

        this.anchorImage5 = new createjs.Bitmap(assets.getResult("anchor"));
        this.anchorImage5.scaleX = app.shipScaling;
        this.anchorImage5.scaleY = app.shipScaling;
        this.anchorImage5.x = app.benchPositions[4];
        this.anchorImage5.y = app.benchYPositioning;
        this.addChild(this.anchorImage5);
        
        this.anchorImage6 = new createjs.Bitmap(assets.getResult("anchor"));
        this.anchorImage6.scaleX = app.shipScaling;
        this.anchorImage6.scaleY = app.shipScaling;
        this.anchorImage6.x = app.benchPositions[5];
        this.anchorImage6.y = app.benchYPositioning;
        this.addChild(this.anchorImage6);
        
        this.anchorImage7 = new createjs.Bitmap(assets.getResult("anchor"));
        this.anchorImage7.scaleX = app.shipScaling;
        this.anchorImage7.scaleY = app.shipScaling;
        this.anchorImage7.x = app.benchPositions[6];
        this.anchorImage7.y = app.benchYPositioning;
        this.addChild(this.anchorImage7);
        
        this.anchorImage8 = new createjs.Bitmap(assets.getResult("anchor"));
        this.anchorImage8.scaleX = app.shipScaling;
        this.anchorImage8.scaleY = app.shipScaling;
        this.anchorImage8.x = app.benchPositions[7];
        this.anchorImage8.y = app.benchYPositioning;
        this.addChild(this.anchorImage8);
        
        this.anchorImage9 = new createjs.Bitmap(assets.getResult("anchor"));
        this.anchorImage9.scaleX = app.shipScaling;
        this.anchorImage9.scaleY = app.shipScaling;
        this.anchorImage9.x = app.benchPositions[8];
        this.anchorImage9.y = app.benchYPositioning;
        this.addChild(this.anchorImage9);
        
        this.anchorImage10 = new createjs.Bitmap(assets.getResult("anchor"));
        this.anchorImage10.scaleX = app.shipScaling;
        this.anchorImage10.scaleY = app.shipScaling;
        this.anchorImage10.x = app.benchPositions[9];
        this.anchorImage10.y = app.benchYPositioning;
        this.addChild(this.anchorImage10);
        
        /////////////////////////////////////////////////////////////////////Compass Images

        this.compassImage1 = new createjs.Bitmap(assets.getResult("compass"));
        this.compassImage1.scaleX = app.shipScaling;
        this.compassImage1.scaleY = app.shipScaling;
        this.compassImage1.x = app.rosterPositions[0];
        this.compassImage1.y = app.rosterYPositioning;
        this.addChild(this.compassImage1);
        
        this.compassImage2 = new createjs.Bitmap(assets.getResult("compass"));
        this.compassImage2.scaleX = app.shipScaling;
        this.compassImage2.scaleY = app.shipScaling;
        this.compassImage2.x = app.rosterPositions[1];
        this.compassImage2.y = app.rosterYPositioning;
        this.addChild(this.compassImage2);
        
        this.compassImage3 = new createjs.Bitmap(assets.getResult("compass"));
        this.compassImage3.scaleX = app.shipScaling;
        this.compassImage3.scaleY = app.shipScaling;
        this.compassImage3.x = app.rosterPositions[2];
        this.compassImage3.y = app.rosterYPositioning;
        this.addChild(this.compassImage3);
        
        this.compassImage4 = new createjs.Bitmap(assets.getResult("compass"));
        this.compassImage4.scaleX = app.shipScaling;
        this.compassImage4.scaleY = app.shipScaling;
        this.compassImage4.x = app.rosterPositions[3];
        this.compassImage4.y = app.rosterYPositioning;
        this.addChild(this.compassImage4);

        this.refreshButton = new createjs.Bitmap(assets.getResult("refresh"));
        this.refreshButton.x = 820;
        this.refreshButton.y = 460;
        this.refreshButton.scaleX = .23;
        this.refreshButton.scaleY = .23;
        this.refreshButton.on("click", function(evt){
            if(app.player.gold >= 2){
                app.randomizeShop();
                app.player.gold -=2;
                app.updateText();
            }
        });
        this.addChild(this.refreshButton);


        //Player Gold
        this.playerGoldImage = new createjs.Bitmap(assets.getResult("goldImage"));
        this.playerGoldImage.x = 30;
        this.playerGoldImage.y = 505;
        this.playerGoldImage.scaleX = .4;
        this.playerGoldImage.scaleY = .4;
        this.addChild(this.playerGoldImage);

        this.playerGoldText = new createjs.Text("100", "20px Squada One", "rgba(255,255,255,1)");
        this.playerGoldText.x = 140;
        this.playerGoldText.y = 520;
        this.addChild(this.playerGoldText);

        
        
        //////////////////////////////////////////////////////////////////////////////////////////Score
        // Add text to display the score
        this.scoreTextGame = new createjs.Text("Spend Yer' Gold", "36px Squada One", "rgba(0,0,0,1)");
        this.scoreTextGame.x = 350;
        this.scoreTextGame.y = 10;
        this.addChild(this.scoreTextGame);


        this.timerText = new createjs.Text("0", "20px Squada One", "rgba(0, 0, 0, 1)");
        this.timerText.x = 700;
        this.timerText.y = 10;
        this.addChild(this.timerText);
       
  
    }
    update(event){
        var delta = event.delta / 1000;
        this.timerText.text = "Time: " +  app.timer.toFixed(2);

    }
    
}