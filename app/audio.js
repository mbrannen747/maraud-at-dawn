var audio = {

    // Booleans to track if sound and music can play
    sfxCanPlay: true,
    musicPlaying: true,
    mainMusic: null,

    // Play a requested sound
    playSoundOnLoop: function(id)
    {
        if(this.sfxCanPlay)
        {
            if(id === "music"){
                this.mainMusic = createjs.Sound.play(id, {loop:-1});
                console.log(this.mainMusic);
            }
            else{
                createjs.Sound.play(id, {loop:-1});
            }
        }
    },

    playSound: function(id){
        if(this.sfxCanPlay){
            createjs.Sound.play(id);
        }
    },

    pauseMainMusic: function(){
        console.log("paused");
            this.mainMusic.paused = true;
    },

    resumeMainMusic: function(){
        this.mainMusic.paused = false;
    }

}