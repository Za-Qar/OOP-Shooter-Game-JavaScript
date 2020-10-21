class Player{
    constructor(health, x, y){
        this.health = 100;
        this.x = 0;
        this.y = 0;
    }
    //Getter for head and body comes here
    //Produce an array of coordinates with the space that the player occupies at any given moement in time

    move(deltaX, deltaY){
        this.x += deltaX;
        this.y += deltaY;
    }

    shoot(endPosition){
        //Create bullet here that uses a new position
    }

    //Loop to prevent collision
    onBulletCollision(){
        this.health--;
    }
    
}