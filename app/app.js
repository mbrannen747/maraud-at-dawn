

// This object holds our main methods and variables for managing the game

var app = {
    timerLength: 30,
    dummyEnemyUnits: null,
    dummyPlayerUnits: null,
    battleInterval : null,
    stage: null,
    socket:null,
    player: null,
    opponent: null,
    playerOrder:false,
    // Stage size
    SCREEN_WIDTH: 1000,
    SCREEN_HEIGHT: 600,

    isGameInShopState: true,

    // Game Objects Visual
    shopItems:[],
    shopPositions: [220,345,470,595,720],
    playerBattlePositionsX: [220,345,470,595],
    opponentBattlePositionsX: [220,345,470,595],
    playerBattleY: 475,
    opponentBattleY: 200,
    shopYPositioning: 475,
    shipScaling: 1.0,
    rosterPositions:[220,395,570,745,920],
    rosterYPositioning: 125,
    benchPositions:[120,200,280,360,440,520,600,680,760,840],
    benchYPositioning: 340,
    redCastle: null,
    blueCastle: null,


    // Timers
    timer: 30,
    stateTimer: 0,
    stateTimerMax: 5,
    //Keeps track of who won the game
    gameWinner: null,
    //Keeps track of the score
    scoreTextTracker: 0,

    //Makes sure music doesn't start multiple times
    mainMusicStarted: false,

    //Parameter to stop gamescreens from loading a million times
    gameScreen: null,
    mainMenu: null,
    lobby: null,
    battleScreen: null,

    //Keeps track of the load bar
    loadPercent: null,
    percentBar: null,
    // UI
    timerText: null,

    // States
    gameStates: {
        LOBBY: 0,
        BATTLE: 1,
        VICTORY: 2,
        MAIN_MENU: 3,
        STORE:4,
        GAME_OVER:5,
        INSTRUCTIONS:6,
    },

    currentScreen: null,

    // Current state of the game
    state: -1,

    // Mouse position tracker
    mousePos: {
        x: 0,
        y: 0,
    },

    //Keyboard input info
    KEYCODE_J: {code: 74, isPressed: false},
    KEYCODE_S: {code: 83, isPressed: false},


    //It is helpful to hook up cheats to the keyboard, especially for development
    //If you need to test something you can put a cheat to skip levels, give you resources, spawn enemies etc
    init: function()
    {
       

        //Set up music
        // Set up my canvas and built a stage
        var canvas = document.getElementById('game');
        canvas.width = this.SCREEN_WIDTH;
        canvas.height = this.SCREEN_HEIGHT;
        this.stage = new createjs.Stage(canvas);
        
        //Preload our assets
        assets.preloadAssets();
        
    
        // Add text to display the current state
        this.loadingText = new createjs.Text("LOADING", "40px Squada One", "rgba(0,0,0,1)");
        this.loadingText.x = 350;
        this.loadingText.y = 300;
        this.stage.addChild(this.loadingText);


        // Add text to display the elapsed time
        this.timerText = new createjs.Text("0", "20px Squada One", "rgba(0, 0, 0, 1)");
        this.timerText.x = 700;
        this.timerText.y = 10;

        // Add text to display the current state
        this.stateTitleText = new createjs.Text("State", "20px Squada One", "rgba(0,0,0,1)");
        this.stateTitleText.x = 10;
        this.stateTitleText.y = 10;
        // this.stage.addChild(this.stateTitleText);

        this.stateText = new createjs.Text("NONE", "20px Squada One", "rgba(0, 0, 0, 1)");
        this.stateText.x = 10;
        this.stateText.y = 30;
    

        // Add our update function to a CreateJS event listener
        createjs.Ticker.addEventListener('tick', this.update);
        createjs.Ticker.framerate = 60;

        // Turn mouse input on
        this.stage.enableMouseOver();

        //React to mouse input
        this.stage.on("stagemousemove", function(evt){
        });
        this.stage.on("stagemousedown", function(evt){
        });
        
        // Set up our keyboard listeners
        document.onkeydown = this.handleKeyDown;
        document.onkeyup = this.handleKeyUp;
    },

    createUnit(unitname, xposition, yposition, placement, screen){
        switch (unitname) {
            case "TankT1":
                return new TankT1(screen, xposition, yposition, placement);
            case "TankT2":
                return new TankT2(screen, xposition, yposition, placement);
            case "TankT3":
                return new TankT3(screen, xposition, yposition, placement);
            case "HealerT1":
                return new HealerT1(screen, xposition, yposition, placement);
            case "HealerT2":
                return new HealerT2(screen, xposition, yposition, placement);
            case "HealerT3":
                return new HealerT3(screen, xposition, yposition, placement);
            case "ADCarryT1":
                return new ADCarryT1(screen, xposition, yposition, placement);
            case "ADCarryT2":
                return new ADCarryT2(screen, xposition, yposition, placement);
            case "ADCarryT3":
                return new ADCarryT3(screen, xposition, yposition, placement);
            case "ArcherT1":
                return new ArcherT1(screen, xposition, yposition, placement);
            case "ArcherT2":
                return new ArcherT2(screen, xposition, yposition, placement);
            case "ArcherT3":
                return new ArcherT3(screen, xposition, yposition, placement);
            default:
                break;
        }
        
    },
    // Reset our game back to it's starting state
    resetGame: function()
    {
        app.player = new Player(1);
        app.opponent = new Player(2);
        app.scoreTextTracker = 0;
        app.setState(app.gameStates.MAIN_MENU);
        if(app.mainMusicStarted === false){
            audio.playSoundOnLoop("music");
            app.mainMusicStarted = true;
        }
    },

  
    resetTimer: function(time){
        app.timer = time;
    },

    roundOver: async function(){
        audio.playSound("roundOverSound");
        app.scoreTextTracker += 1;
        var playerInterest = (1 + (Math.floor(app.player.gold/10)));
        if(playerInterest > 5){
            playerInterest = 5;
        }
        app.player.gold += playerInterest;
        app.updateText();
        app.isGameInShopState = !app.isGameInShopState;
        if(app.isGameInShopState){
            app.setState(app.gameStates.STORE);
            for (let i = 0; i < app.player.roster.length; i++) {
                if(app.player.roster[i] !== "null"){
                    app.player.roster[i].kill();
                    app.player.roster[i] = app.createUnit(app.player.roster[i].name, app.rosterPositions[i], app.rosterYPositioning, "roster", app.gameScreen);
                }
            }
            app.randomizeShop();
            if(app.battleInterval)
                window.clearInterval(app.battleInterval);
            app.resetTimer(app.timerLength);
            if(app.battleScreen){
                app.opponent.roster.forEach(ship => {
                    try{
                        ship.parentObj.removeChild(ship);
                    } catch(e){}
                })
            }
        }
        else{
            app.setState(app.gameStates.BATTLE);
            let j = 0;
            app.opponent.roster = app.opponent.roster.map(ship =>{
                if(ship === "null"){
                    return ship;
                } else {
                    if(ship.kill){
                        let newShip = app.createUnit(ship.name, app.rosterPositions[j++], app.benchYPositioning, "roster", app.battleScreen);
                        return newShip;
                    } else {
                        let newShip = app.createUnit(ship, app.rosterPositions[j++], app.benchYPositioning, "roster", app.battleScreen);
                        return newShip;

                    }
                }
            });
            for (let i = 0; i < app.player.roster.length; i++) {
                if(app.player.roster[i] !== "null"){
                    app.player.roster[i].kill();
                    app.player.roster[i] = app.createUnit(app.player.roster[i].name, app.rosterPositions[i], app.opponentBattleY, "roster", app.battleScreen);
                }
            }
            app.battleInterval = window.setInterval(app.battle, 800);
            app.resetTimer(app.timerLength);

        }
        
    },
    battle: function(){
        if(app.firstPlayer){
            app.opponent.roster.forEach(enemyUnit => {
                app.unitTriesToAttack(enemyUnit, false);
            });
            app.player.roster.forEach(playerUnit => {
                app.unitTriesToAttack(playerUnit, true);
            });
        } else {
            app.player.roster.forEach(playerUnit => {
                app.unitTriesToAttack(playerUnit, true);
            });
            app.opponent.roster.forEach(enemyUnit => {
                app.unitTriesToAttack(enemyUnit, false);
            });
        }
        app.firstPlayer = !app.firstPlayer;
        setTimeout(()=>{
            app.opponent.roster.forEach(unit => {
                if(unit !== "null"){
                    if(unit.health > 0){
                        unit.image.gotoAndPlay(unit.damage);
                    } else {
                        unit.image.gotoAndPlay("dead");
                    }
                }
            });
            app.player.roster.forEach(unit => {
                if(unit !== "null"){
                    if(unit.health > 0){
                        unit.image.gotoAndPlay(unit.damage);
                    } else {
                        unit.image.gotoAndPlay("dead");
                    }
                }
            });
        }, 100);
        let allDeadOpponents = true;
        app.opponent.roster.forEach(ship => {
            if(ship !== "null"){
                if(ship.health > 0){
                    allDeadOpponents = false;
                }
            }
        });
        let allDeadPlayers = true;
        app.player.roster.forEach(ship => {
            if(ship !== "null"){
                if(ship.health > 0){
                    allDeadPlayers = false;
                }
            }
        });
        if(allDeadOpponents){
            let remainingShips = 0;
            app.player.roster.forEach(ship =>{
                if(ship !== "null" && ship.health > 0){
                    console.log(remainingShips);
                    remainingShips++;
                }
                else{
                    console.log("not alive")
                }
            });
            app.opponent.health -= (remainingShips * 5);
            if(app.battleInterval)
                window.clearInterval(app.battleInterval);
            console.log("OPPONENT HEALTH: ", app.opponent.health )
            app.updateText();
        }
        else if(allDeadPlayers){
            let remainingShips = 0;
            app.opponent.roster.forEach(ship =>{
                if(ship !== "null" && ship.health > 0){
                    console.log(remainingShips);
                    remainingShips++;
                }
                else{
                    console.log("not alive")
                }
            });
            app.player.health -= (remainingShips * 5);
            if(app.battleInterval)
                window.clearInterval(app.battleInterval);
            console.log("PLAYER HEALTH: ", app.player.health )
            app.updateText();
        }
    },
    unitTriesToAttack:function(unit, isPlayer){
        if(unit !== "null"){
            if(unit.health > 0){
                if(isPlayer){
                    app.attackAsPlayer(unit);
                }
                else{
                    app.attackAsEnemy(unit);
                }
            }
        }
    },
    setHealth(unit, attack){
        unit.health -= attack;
        if(unit.health <= 0){
            unit.image.gotoAndPlay("dead");
            unit.isDead = true;
            unit.damage = "dead";
        } else if(unit.health <= (unit.maxHealth / 3)){
            unit.damage = "wrecked";
            unit.image.gotoAndPlay("wreckedHit");
        } else if(unit.health <= (unit.maxHealth / 3) * 2){
            unit.damage = "damaged";
            unit.image.gotoAndPlay("damagedHit");
        } else {
            unit.damage = "pristine";
            unit.image.gotoAndPlay("pristineHit");
        }
    },
    attackAsPlayer(unit){
        if(app.opponent.roster[unit.attackPriority] !== "null" && app.opponent.roster[unit.attackPriority].health > 0){
            this.setHealth(app.opponent.roster[unit.attackPriority], unit.attack);
        }
        else{
            var hasAttacked = false;
            app.opponent.roster.forEach(enemyUnit => {
                if(enemyUnit !== "null" && hasAttacked === false && enemyUnit.health > 0){
                    this.setHealth(enemyUnit, unit.attack);
                    hasAttacked = true;
                }
            });
        }
    },
    attackAsEnemy(unit){
        if(app.player.roster[unit.attackPriority] !== "null" && app.player.roster[unit.attackPriority].health > 0){
            this.setHealth(app.player.roster[unit.attackPriority], unit.attack)
        }
        else{
            var hasAttacked = false;
            app.player.roster.forEach(playerUnit => {
                if(playerUnit !== "null" && hasAttacked === false && playerUnit.health > 0){
                    this.setHealth(playerUnit, unit.attack)
                    hasAttacked = true;
                }
            });
        }
    },
    randomizeShop: function(){
        for (let index = 0; index < app.shopItems.length; index++) {
            app.shopItems[index].kill();
        }
        app.shopItems = [];
        for(var i = 0; i<5; i++){
            var randomNum = Math.random() * 100;
            if(randomNum <= 25){
                app.shopItems.push(new TankT1(app.gameScreen, app.shopPositions[i], app.shopYPositioning, "shop"));
            }
            else if(randomNum > 25 && randomNum <= 50){
                app.shopItems.push(new ArcherT1(app.gameScreen, app.shopPositions[i], app.shopYPositioning, "shop"));
            }
            else if(randomNum > 50 && randomNum <= 75 ){
                app.shopItems.push(new ADCarryT1(app.gameScreen, app.shopPositions[i], app.shopYPositioning, "shop"));
            }
            else{
                app.shopItems.push(new HealerT1(app.gameScreen, app.shopPositions[i], app.shopYPositioning, "shop"));
            }
        }
    },
    updateText(){
        app.gameScreen.playerGoldText.text = app.player.gold;
        app.battleScreen.playerHeartText.text = app.player.health;
        app.battleScreen.opponentHeartText.text = app.opponent.health;
        app.gameScreen.blueHeartText.text = app.player.health;
    },
    // This is our main update loop, called by createJS
    update: function(event)
    {
        if(app.player && app.opponent && (app.player.health <= 0 || app.opponent.health <= 0)){
            app.setState(app.gameStates.GAME_OVER);
            app.socket.emit("gameover");
        }
        try {
            app.updateText();
        } catch (e) {}
        try{
            if(app.player && app.opponent && app.player.roster && app.opponent.roster){
                if(app.player.roster[0] !== "null" && app.player.roster[0].kill)
                    app.player.roster[0].update(event);
                if(app.player.roster[1] !== "null" && app.player.roster[0].kill)
                    app.player.roster[1].update(event);
                if(app.player.roster[2] !== "null" && app.player.roster[0].kill)
                    app.player.roster[2].update(event);
                if(app.player.roster[3] !== "null" && app.player.roster[0].kill)
                    app.player.roster[3].update(event);
                if(app.opponent.roster[0] !== "null" && app.player.roster[0].kill)
                    app.opponent.roster[0].update(event);
                if(app.opponent.roster[1] !== "null" && app.player.roster[0].kill)
                    app.opponent.roster[1].update(event);
                if(app.opponent.roster[2] !== "null" && app.player.roster[0].kill)
                    app.opponent.roster[2].update(event);
                if(app.opponent.roster[3] !== "null" && app.player.roster[0].kill)
                    app.opponent.roster[3].update(event);
            }
        } catch(e) {}
        if(app.player && app.gameScreen){
            app.gameScreen.blueHeartText.text = app.player.health;
        }
        if(app.battleScreen){
            app.battleScreen.update(event);
        }
        // Update our app's stage
        app.stage.update(event);
        // if(app.player && app.player.bench){
        //     for(let i = 0; i < app.player.bench.length; i++){
        //         if(app.player.bench[i] !== "null"){
        //             app.player.bench[i].health -= 2;
        //             app.player.bench[i].update(event);
        //         }
        //     }

        // }
        
        //If game screen exists update it as often as the above update function
        if(app.gameScreen){
            app.gameScreen.update(event);
        }
        if(app.battleScreen){
            app.battleScreen.update(event);
        }
        // Make a delta time variable for use in updating
        var delta = event.delta / 1000;

        // Keep track of time elapsed
    
        app.timerText.text = "Time: " + app.timer.toFixed(2);

        if(app.player && app.opponent && app.state === app.gameStates.BATTLE){
            app.player.roster.forEach(ship => {
                if(ship !== "null"){
                    try{
                        ship.update(dt);
                    } catch(e){}
                }
            });
    
            app.opponent.roster.forEach(ship => {
                if(ship !== "null"){
                    try{
                        ship.update(dt);
                    } catch(e){}
                }
            });
        }
        
        if(app.state === app.gameStates.STORE || app.state === app.gameStates.BATTLE){
            app.timer -= delta;
            // if(app.timer <= 0){
            //     app.roundOver();
            // }
        }

        // Update our states
        app.stateTimer += delta;

        switch(app.state)
        {
            case app.gameStates.LOBBY:
                app.setState(app.gameStates.LOBBY);
                break;
            case app.gameStates.MAIN_MENU:
                app.setState(app.gameStates.MAIN_MENU);
                break;
            case app.gameStates.VICTORY:
                app.setState(app.gameStates.VICTORY);
                break;
            case app.gameStates.STORE:
                app.setState(app.gameStates.STORE);
                          
                break;
            case app.gameStates.BATTLE:
                app.setState(app.gameStates.BATTLE);
                break;
            case app.gameStates.GAME_OVER:
                app.setState(app.gameStates.GAME_OVER);
                break;
            case app.gameStates.INSTRUCTIONS:
                app.setState(app.gameStates.INSTRUCTIONS);
                break;
            case -1: break;
            default:
                console.log("ERROR: Game state is not valid");
                break;
        }
    },

    // At the moment a state changes, react
    setState: function(newState)
    {
        app.state = newState;
        
        switch(app.state)
        {
            case app.gameStates.LOBBY:
                app.stateText.text = "LOBBY";
                if(app.currentScreen != app.gameStates.LOBBY){
                    // Set up sockets
                    app.initSockets();
                    app.stage.clear();
                    app.lobby = new Lobby("#0022DB", app.SCREEN_WIDTH, app.SCREEN_HEIGHT);
                    app.stage.addChild(app.lobby);
                    app.currentScreen = app.gameStates.LOBBY;
                }
                break;
            case app.gameStates.MAIN_MENU:
                app.stateText.text = "MAIN MENU";
                if(app.currentScreen != app.gameStates.MAIN_MENU){
                    app.stage.clear();
                    app.mainMenu = new MainMenu("#3498DB", app.SCREEN_WIDTH, app.SCREEN_HEIGHT);
                    app.stage.addChild(app.mainMenu);
                    app.currentScreen = app.gameStates.MAIN_MENU;
                }
                break;
            case app.gameStates.STORE:
                app.stateText.text = "GAME";
                if(app.currentScreen != app.gameStates.STORE){
                    app.stage.clear();
                    app.stage.children = [];
                    if(!app.gameScreen){
                        app.gameScreen = new Game("#DDDDDD", app.SCREEN_WIDTH, app.SCREEN_HEIGHT);
                        app.battleScreen = new BattleScreen("#3498DB", app.SCREEN_WIDTH, app.SCREEN_HEIGHT);
                    }
                    app.randomizeShop();

                    app.stage.addChild(app.gameScreen);
                    app.currentScreen = app.gameStates.STORE;
                }
                break;
            case app.gameStates.BATTLE:
                app.stateText.text = "BATTLE";
                if(app.currentScreen != app.gameStates.BATTLE){
                    app.stage.clear();
                    app.stage.children = [];
                    if(!app.battleScreen){
                        console.log("new battle")
                    }
                    app.stage.addChild(app.battleScreen);
                    app.currentScreen = app.gameStates.BATTLE;
                    
                }
                break;
            case app.gameStates.VICTORY:
                app.stateText.text = "VICTORY";
                if(app.currentScreen != app.gameStates.VICTORY){
                    app.stage.clear();
                    app.stage.addChild(new Victory("#3CB371", app.SCREEN_WIDTH, app.SCREEN_HEIGHT));
                    app.currentScreen = app.gameStates.VICTORY;
                }
            break;
            case app.gameStates.GAME_OVER:
                app.stateText.text = "GAME OVER";
                if(app.currentScreen != app.gameStates.GAME_OVER){
                    app.stage.clear();
                    app.stage.addChild(new GameOver("#CB4335", app.SCREEN_WIDTH, app.SCREEN_HEIGHT));
                    app.currentScreen = app.gameStates.GAME_OVER;
                }
                break;
            case app.gameStates.INSTRUCTIONS:
            app.stateText.text = "INSTRUCTIONS";
            if(app.currentScreen != app.gameStates.INSTRUCTIONS){
                app.stage.clear();
                app.stage.addChild(new Instructions("#d2b48c", app.SCREEN_WIDTH, app.SCREEN_HEIGHT));
                app.currentScreen = app.gameStates.INSTRUCTIONS;
            }
            break;
            default:
                break;
        }
    },

    //Handle keys up and down
    handleKeyDown: function(evt){
        if(!evt) { var evt = windows.event;} // browser compatibility
        switch(evt.keyCode){
            case app.KEYCODE_J.code: 
                app.KEYCODE_J.isPressed=true;
                app.updateText();
                app.player.gold +=1;
            break;
            case app.KEYCODE_S.code: 
                app.KEYCODE_S.isPressed=true;
            break;
        }
    },
    handleKeyUp: function(evt){
        if(!evt) { var evt = windows.event;} // browser compatibility

        switch(evt.keyCode){
            case app.KEYCODE_J.code: app.KEYCODE_J.isPressed=false; break;
            case app.KEYCODE_S.code: app.KEYCODE_S.isPressed=false; break;
        }
    },
    createShipArray(rosterOrbench){
        return rosterOrbench.map(ship => {
            if(ship === "null"){
                return ship
            }
            return ship.name;
        });
    },
    createPlayerObject(player){
        return {
            id:player.id, 
            gold:player.gold, 
            gameSession: player.gameSession, 
            health: player.health,
            roster: app.createShipArray(player.roster)
        }
    },
    initSockets(){
        // Socket setup
        app.socket = io();
        // List evens the client is listening for
        app.socket.on('connected',function(id){
            console.log("SOCKET CONNECTED")
            app.player.id = id;
            app.socket.emit("addplayer", app.createPlayerObject(app.player));
        });
        app.socket.on('players',function(players){
            if(players.length < 2){
                console.log("FIRST PLAYER");
                app.playerOrder = true;
            } else {
                let i = players[0].id !== app.player.id == 0 ? 1 : 0;
                app.opponent.id = players[i].id;
                app.opponent.gold = players[i].gold;
                app.opponent.gameSession = players[i].gameSession;
                app.opponent.health = players[i].health;
                app.opponent.bench = players[i].bench;
                app.opponent.roster = players[i].roster;
                app.setState(app.gameStates.STORE);
            }
        });
        app.socket.on("phasenext",() => {
            app.roundOver();
        });
        app.socket.on("updateOpponent", opponent => {
            app.opponent.id = opponent.id;
            app.opponent.gold = opponent.gold;
            app.opponent.gameSession = opponent.gameSession;
            app.opponent.health = opponent.health;
            app.opponent.roster = opponent.roster;
           
        });
        app.socket.on("playerDisconnected", () => {
            app.opponent.health = 0;
            app.setState(app.gameStates.GAME_OVER);
        })
        app.socket.on('serverFull',function(players){
            alert("Server full!");
        });
    }
}