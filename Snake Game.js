
var canvas  = document.getElementById("canvas");

var ctx = canvas.getContext("2d");

function drawRect(x, y, color ) {
    var size = 20;
    var padding = 2;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect( (size + padding)*x, (size + padding)*y, size, size);
    ctx.fill();
}

var tableSize = 10 ;

class User {
    x = 0;
    y = 0;
    color = "#000";
    dire = 2;
    tailList = [];

    update() {

        var prev = {x:this.x , y:this.y};
        for( var i in this.tailList) {
            var temp = this.tailList [i];
            this.tailList [i] = prev ;
            prev = temp ;            
        }

        switch( this.dire ) {
            case 0: this.x -= 1; break ;
            case 1: this.y -= 1; break ;
            case 2: this.x += 1; break ;
            case 3: this.y += 1; break ;
        }

        this.x = this.loop( this.x );
        this.y = this.loop( this.y );

    }  

    addTail() {
        this.tailList.push( {x:this.x, y:this.y} );
    }
    
    loop( value ) {
        if( value < 0 ) {
            value = tableSize -1;
        }  else if( value > tableSize - 1) {
            value = 0;
        }

        return value;
    }

}

class Item {
    x = 0;
    y = 0;
    color = "#ff0000";
    
    randomPosition() {
        this.x = parseInt( Math.random() * tableSize );
        this.y = parseInt( Math.random() * tableSize );
    }
}

var user = new User();
var item = new Item();
item.randomPosition();

setInterval( function() {
  console.log();
    for( var x=0; x<tableSize; x++ ) {
        for( var y=0; y<tableSize; y++ ) {
            drawRect( x, y, "#eee");
        }
    }
    user.update();

    if( user.x == item.x && user.y == item.y) {
        user.addTail();
        item.randomPosition();
    }
    
    for( var i in user.tailList ){
        var p = user.tailList[i];
        drawRect( p.x, p.y, user.color );
    }
    drawRect( user.x, user.y, user.color);
    drawRect( item.x, item.y, item.color);
}, 200);

window.onkeydown = function(e) {
    if( e.keyCode >= 37 && e.keyCode <= 40 ) {
        user.dire = e.keyCode  - 37;
    }
}
