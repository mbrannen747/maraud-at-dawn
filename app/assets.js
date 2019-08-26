// Our assets object that:
// 1- Loads our assets
// 2- Can give us information about those assets

var assets = {

    // Store results of what is loaded
    queue: null,

    // Is called from app.js and starts the loading process
    preloadAssets: function()
    {
        // A list of assets to load
        // PreloadJS will automatically try to parse what it's loading
        manifest = [

            /////SOUNDS/MUSIC
            {
                src: "media/audio/TheBardsTale.mp3",
                id: "bardsTale",
            },
            {
                src: "media/audio/pirateMusic.mp3",
                id: "music"
            },
            {
                src: "media/audio/Coin.wav",
                id: "coinSound",
            },
            {
                src: "media/audio/roundOver.wav",
                id: "roundOverSound",
            },
            {
                src: "media/audio/error.wav",
                id: "errorSound",
            },
            ////////////////JAVASCRIPT
            {
                src: "gameobjects/actor.js",
            },
            {
                src: "audio.js",
            },
            ///////////////////IMAGES
            {
                src: "media/images/tank_shop.png",
                id: "tankshop",
            },
            {
                src: "media/images/healer_shop.png",
                id: "healershop",
            },
            {
                src: "media/images/adcarry_shop.png",
                id: "adcarryshop",
            },
            {
                src: "media/images/archer_shop.png",
                id: "archershop",
            },
            {
                src: "media/images/instructions.png",
                id: "instructions",
            },
            {
                src: "media/images/victory.png",
                id: "victory",
            },
            {
                src: "media/images/defeat.png",
                id: "defeat",
            },
            {
                src: "media/images/title.png",
                id: "title",
            },
            {
                src: "media/images/Ocean.png",
                id: "ocean",
            },
            {
                src: "media/images/water.png",
                id: "water",
            },
            {
                src: "media/images/lobby.jpg",
                id: "lobby",
            },
            {
                src: "media/images/RedCastle.png",
                id: "redCastle",
            },
            {
                src: "media/images/dock.png",
                id: "dock",
            },
            {
                src: "media/images/anchor1.png",
                id: "anchor",
            },
            {
                src: "media/images/refresh.png",
                id: "refresh",
            },
            {
                src: "media/images/compass.png",
                id: "compass",
            },
            {
                src: "media/images/map.jpg",
                id: "map",
            },
            {
                src: "media/images/sky.png",
                id: "sky"
            },
            {
                src: "media/images/sunset.png",
                id: "sunset"
            },
            {
                src: "media/images/darkSky.png",
                id: "darkSky"
            },
            {
                src: "media/images/skull.png",
                id: "skull"
            },
            {
                src: "media/images/soundOffWhite.png",
                id:"soundOff"
            },
            {
                src: "media/images/soundOnWhite.png",
                id:"soundOn"
            },
            {
                src: "media/images/BlueCastle.png",
                id: "blueCastle",
            },
            {
                src: "media/images/heart.png",
                id: "heart",
            },
            {
                src: "media/images/gold.png",
                id: "gold",
            },
            {
                src: "media/images/gold.png",
                id: "gold",
            },
            {
                src: "media/images/GoldImage.png",
                id: "goldImage",
            },
            {
                src: "media/images/sword.png",
                id: "sword",
            },
            {
                src: "media/images/tankship.png",
                id: "tank",
            },
            {
                src: "media/images/adcarryship.png",
                id: "adCarry",
            },
            {
                src: "media/images/t1adcarryplaceholder.png",
                id: "adCarryT1"
            },
            {
                src: "media/images/healership.png",
                id: "healer",
            },
            {
                src: "media/images/archership.png",
                id: "archer",
            },
            ///////SCREENS
			{
                src: "ui/screen.js",
            },
            {
                src: "ui/gamescreen.js",
            },
            {
                src: "ui/mainmenu.js",
            },
            {
                src: "ui/gameoverscreen.js",
            },
            {
                src: "ui/instructionscreen.js",
            },
            {
                src: "ui/victoryscreen.js",
            },
            {
                src: "ui/battlescreen.js",
            },
            {
                src: "ui/lobby.js",
            },
          

            //ANIMATIONS
            {
                src: "media/images/coin.json",
                id: "coinAnimation",
                type: "spritesheet",
                crossOrigin: true,
            },
            {
                src: "media/images/T1archer.json",
                id: "T1archer",
                type: "spritesheet",
                crossOrigin: true,
            },
            {
                src: "media/images/T2archer.json",
                id: "T2archer",
                type: "spritesheet",
                crossOrigin: true,
            },
            {
                src: "media/images/T3archer.json",
                id: "T3archer",
                type: "spritesheet",
                crossOrigin: true,
            },
            {
                src: "media/images/T1healer.json",
                id: "T1healer",
                type: "spritesheet",
                crossOrigin: true,
            },
            {
                src: "media/images/T2healer.json",
                id: "T2healer",
                type: "spritesheet",
                crossOrigin: true,
            },
            {
                src: "media/images/T3healer.json",
                id: "T3healer",
                type: "spritesheet",
                crossOrigin: true,
            },
            {
                src: "media/images/T1tank.json",
                id: "T1tank",
                type: "spritesheet",
                crossOrigin: true,
            },
            {
                src: "media/images/T2tank.json",
                id: "T2tank",
                type: "spritesheet",
                crossOrigin: true,
            },
            {
                src: "media/images/T3tank.json",
                id: "T3tank",
                type: "spritesheet",
                crossOrigin: true,
            },
            {
                src: "media/images/T1adcarry.json",
                id: "T1adcarry",
                type: "spritesheet",
                crossOrigin: true,
            },
            {
                src: "media/images/T2adcarry.json",
                id: "T2adcarry",
                type: "spritesheet",
                crossOrigin: true,
            },
            {
                src: "media/images/T3adcarry.json",
                id: "T3adcarry",
                type: "spritesheet",
                crossOrigin: true,
            },
            // {
            //     src: "media/images/superunit.json",
            //     id: "superunit",
            //     type: "spritesheet",
            //     crossOrigin: true,
            // },
            
        ];

        // Get our queue working
        this.queue = new createjs.LoadQueue(true);

        // Install createjs audio plugin
        this.queue.installPlugin(createjs.Sound);

        // Set up sounds for alternate extensions
        createjs.Sound.alternateExtensions = ["mp3"];

        // Actually load our manifest
        this.queue.on("progress", this.loadProgress, this);
        this.queue.on("complete", this.loadComplete, this);
        this.queue.loadManifest(manifest);
        //this.queue.on("fileload", this.loadComplete, this);
    },

    // Fire when loading is done
    loadComplete: function(event)
    {
        console.log("Done loading!");
        app.resetGame();
    },

    // Update our progress while loading
    loadProgress: function(event)
    {
        app.loadPercent = (event.loaded / event.total) * 100;
        console.log("Loading progress: " + (event.loaded / event.total)*100 + "%");
    },

    // Get a loaded result
    getResult: function(id)
    {
        var result = this.queue.getResult(id);
        return result;
    },
}