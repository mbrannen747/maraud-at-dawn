
function checkForTriple(){
    return false;
}

function unitOnClick(unit, evt, parentObj){
    if(app.KEYCODE_S.isPressed){
        if(unit.placement === "bench"){
            app.player.gold += unit.cost;
            app.updateText();
            app.player.bench[app.player.bench.indexOf(unit)] = "null";
            unit.kill();
        }
    }
    else{
        if(unit.placement === "shop"){
            attemptToPurchaseUnit(unit, evt, parentObj);
        }
        else if(unit.placement === "bench"){
           addUnitToRoster(unit, evt, parentObj);
        }
        else if(unit.placement === "roster"){
            putUnitOnBenchFromRoster(unit, evt, parentObj)
        }
    }
}

function putUnitOnBenchFromRoster(unit, evt, parentObj){
    if(app.player.bench.includes("null")){
        let indexOfUnitOnRoster = app.player.roster.indexOf(unit);
        if(indexOfUnitOnRoster != -1){
            app.player.roster[indexOfUnitOnRoster] = "null";
            let index = app.player.bench.indexOf("null");
            app.player.bench[index] = app.createUnit(unit.name, app.benchPositions[index], app.benchYPositioning, "bench", app.gameScreen);
            parentObj.removeChild(evt.target);    
        }
        app.socket.emit("updatePlayers",app.createPlayerObject(app.player));

    }
}

function addUnitToRoster(unit, evt, parentObj){
    if(app.player.roster.includes("null")){
        let indexOfUnitOnBench = app.player.bench.indexOf(unit);
        if(indexOfUnitOnBench != -1){
            app.player.bench[indexOfUnitOnBench] = "null";
            let indexRoster = app.player.roster.indexOf("null");
            app.player.roster[indexRoster] = app.createUnit(unit.name, app.rosterPositions[indexRoster], app.rosterYPositioning, "roster", app.gameScreen);
            parentObj.removeChild(evt.target);
            app.socket.emit("updatePlayers",app.createPlayerObject(app.player));
        }
    }
    
}

function purchaseUnit(unit, evt, parentObj){
    app.player.gold -= unit.cost;
    audio.playSound("coinSound");
    app.updateText();
    pushUnitToBench(unit);
    parentObj.removeChild(evt.target);
}

function pushUnitToBench(unit){
    let index = app.player.bench.indexOf("null");
    var newUnit = app.createUnit(unit.name, app.benchPositions[index],  app.benchYPositioning, "bench", app.gameScreen);
    app.player.bench[index] = newUnit;
}

function attemptToPurchaseUnit(unit, evt, parentObj){
    if(app.player.gold >= unit.cost){
        if(checkForTriple()){
        }
        else{
            if(!app.player.bench.includes("null")){
                audio.playSound("errorSound");
            }
            else{
                purchaseUnit(unit, evt, parentObj);
            }
        }
       
    }
    else{
        audio.playSound("errorSound");
    }
}

class Player{
    constructor(id){
        this.gold = 5;
        this.id = id;
        this.gameSession;
        this.health = 100;
        this.bench = ["null","null","null","null","null","null","null","null","null","null"];
        this.roster = ["null","null","null","null"];
    }
}


class Unit
{
    constructor(parentObj, x, y, placement, name, maxHealth, defense, attackPriority, attack, healAmount, cost, image)
    {
        this.placement = placement;
        this.parentObj = parentObj;
        this.name = name;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.defense = defense;
        this.attackPriority = attackPriority;
        this.attack = attack;
        this.healAmount = healAmount;
        this.isDead = false;
        this.cost = cost; 
        this.image = image;
        this.damage = "pristine";
        if(placement !== "shop"){
            this.image.gotoAndPlay("pristine");
        }
        var unit = this;
        this.image.on( "click", function(evt) {
            if(app.isGameInShopState){
                unitOnClick(unit, evt, parentObj);
            }
        });
        this.image.scaleX = app.shipScaling;
        this.image.scaleY = app.shipScaling;
        this.image.x = x;
        this.image.y = y;
        parentObj.addChild(this.image);
    }

    // Update this object when called
    update(dt)
    {
        if(app.state === app.gameStates.STORE){
            this.health = this.maxHealth;
            this.isDead = false;
        }
        // if(this.maxHealth && this.health){
        //     if(this.health <= 0 && this.damage !== "dead"){
        //         console.log("updating image")
        //         this.image.gotoAndPlay("dead");
        //         this.damage = "dead";
        //         this.isDead = true;
        //     } else if(this.health <= (this.maxHealth / 3) && this.damage !== "wrecked" && this.damage !== "dead"){
        //         console.log("updating image")
        //         this.image.gotoAndPlay("wrecked");
        //         this.damage = "wrecked";
        //     } else if(this.health <= (this.maxHealth / 3) * 2  && this.damage !== "damaged" && this.damage !== "wrecked" && this.damage !== "dead"){
        //         console.log("updating image")
        //         this.image.gotoAndPlay("damaged");
        //         this.damage = "damaged";
        //     } 
        // }
    }
    //Kill this actor
    kill() 
    {
        this.parentObj.removeChild(this.image);
    }
}

class TankT1 extends Unit {
    constructor(parentObj, x, y, placement){
        let image;
        if(placement === "shop"){
            image = new createjs.Bitmap(assets.getResult("tankshop"));
        }
        else{
            image = new createjs.Sprite(assets.getResult("T1tank"));
        }
        super(parentObj, x, y, placement, "TankT1", 35, 1, 0, 3, 0, 2, image);
    }
}

class TankT2 extends Unit {
    constructor(parentObj, x, y, placement){
        super(parentObj, x, y, placement, "TankT2", 70, 10, 0, 6, 0, 6, new createjs.Sprite(assets.getResult("T2tank")));    
    }
}

class TankT3 extends Unit {
    constructor(parentObj, x, y, placement){
        super(parentObj, x, y, placement, "TankT3", 140, 15, 0, 12, 0, 18, new createjs.Sprite(assets.getResult("T3tank")));    
    }
}

class ADCarryT1 extends Unit {
    constructor(parentObj, x, y, placement){
        let image;
        if(placement === "shop"){
            image = new createjs.Bitmap(assets.getResult("adcarryshop"));
        }
        else{
            image = new createjs.Sprite(assets.getResult("T1adcarry"));
        }
        super(parentObj, x, y, placement, "ADCarryT1", 20, 1, 0, 5, 0, 3, image); 
    }
}

class ADCarryT2 extends Unit {
    constructor(parentObj, x, y, placement){
        super(parentObj, x, y, placement, "ADCarryT2", 40, 1, 0, 10, 0, 9, new createjs.Sprite(assets.getResult("T2adcarry"))); 
    }
}

class ADCarryT3 extends Unit {
    constructor(parentObj, x, y, placement){
        super(parentObj, x, y, placement, "ADCarryT3", 80, 0, 0, 20, 0, 27, new createjs.Sprite(assets.getResult("T3adcarry"))); 
    }
}

class HealerT1 extends Unit {
    constructor(parentObj, x, y, placement){
        let image;
        if(placement === "shop"){
            image = new createjs.Bitmap(assets.getResult("healershop"));
        }
        else{
            image = new createjs.Sprite(assets.getResult("T1healer"));
        }
        super(parentObj, x, y, placement, "HealerT1", 20, 1, 0, 2, 0, 1, image); 
    }
}

class HealerT2 extends Unit {
    constructor(parentObj, x, y, placement){
        super(parentObj, x, y, placement, "HealerT2", 40, 1, 0, 4, 0, 3, new createjs.Sprite(assets.getResult("T2healer"))); 
    }
}

class HealerT3 extends Unit {
    constructor(parentObj, x, y, placement){
        super(parentObj, x, y, placement, "HealerT3", 80, 1, 0, 8, 0, 9, new createjs.Sprite(assets.getResult("T3healer"))); 
    }
}

class ArcherT1 extends Unit {
    constructor(parentObj, x, y, placement){
        let image;
        if(placement === "shop"){
            image = new createjs.Bitmap(assets.getResult("archershop"));
        }
        else{
            image = new createjs.Sprite(assets.getResult("T1archer"));
        }
        super(parentObj, x, y, placement, "ArcherT1", 25, 1, 3, 4, 0, 2, image); 
    }
}

class ArcherT2 extends Unit {
    constructor(parentObj, x, y, placement){
        super(parentObj, x, y, placement, "ArcherT2", 50, 1, 3, 8, 0, 6, new createjs.Sprite(assets.getResult("T2archer")));     
    }
}

class ArcherT3 extends Unit {
    constructor(parentObj, x, y, placement){
        super(parentObj, x, y, placement, "ArcherT3", 75, 1, 3, 16, 0, 18, new createjs.Sprite(assets.getResult("T3archer")));     
    }
}










