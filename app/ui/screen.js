class ScreenBase extends createjs.Container
{
     constructor(c, w, h)
     {
        super();    

        this._width = w;
        this._height = h;
        this._color = c;

        // Set my bounds and add me to the stage
        this.setBounds(0, 0, this._width, this._height);
        app.stage.addChild(this);

        // Create a shape to fill it
        this._fillShape = new createjs.Shape();
        this._fillShape.graphics.beginFill(this._color).drawRect(0, 0, this._width, this._height);
        this.addChild(this._fillShape);

        // Make a mini button
        // this.button = new createjs.Container();
        // this.button.fill = new createjs.Shape();
        // this.button.addChild(this.button.fill);
        // this.button.text = new createjs.Text("BUTTON", "14px Arial", "white");
        // this.button.addChild(this.button.text);
        // this.addChild(this.button);

        // Button settings
        // this.button.x = 400;
        // this.button.y = 400;
        // this.button.fill.graphics.beginFill("black").drawRect(-75, -25, 150, 50);
        // this.button.text.setBounds(150, 50);
        // this.button.text.textAlign = "center";
        // this.button.text.textBaseline = "middle";

        // Our mouse action callbacks 
        // this.button.on("mouseover", function(evt) {
        //     this.fill.graphics.clear().beginFill("rgba(150, 150, 150, 1)").drawRect(-75, -25, 150, 50);
        // });        
        // this.button.on("mouseout", function(evt) { 
        //     this.fill.graphics.clear().beginFill("black").drawRect(-75, -25, 150, 50);
        // });        
        // this.button.on("mousedown", function(evt) { 
        //     this.fill.graphics.clear().beginFill("rgba(255, 255, 255, 1)").drawRect(-75, -25, 150, 50);
        // }); 
        // this.button.on("click", function(evt) {
        //     this.fill.graphics.clear().beginFill("black").drawRect(-75, -25, 150, 50);
        // }); 

     }

     get container() { return this._container; }
     set container(containerObj) { this._container = containerObj; }

     get width() { return this._width; }
     set width(w) { this._width = w; this.updateScreenSettings(); }

     get height() { return this._height; }
     set height(h) { this._height = h; this.updateScreenSettings(); }

     get color() { return this._color; }
     set color(c) { this._color = c; this.updateScreenSettings(); }

     updateScreenSettings()
     {
        this._fillShape.graphics.beginFill(this._color).drawRect(0, 0, this._width, this._height);
     }

     update(dt)
     {
         // Feel free to do something in here, we expect this to be overridden
     }
}