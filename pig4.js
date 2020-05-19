class Pig4 {
    constructor(x, y){
      var options = {
        'restitution':0.8,
        'friction':1.0,
        'density':1.0
    }
      this.body = Bodies.rectangle(x, y, 10, 10, options);
      this.width = 50;
      this.height = 50;
      this.image1 = loadImage("sprites/Untitled.png");
      this.image2 = loadImage("sprites/B.png");
      this.image3 = loadImage("sprites/I.png");
      this.image4 = loadImage("sprites/N.png");
      this.image5 = loadImage("sprites/G.png");
      //this.image = imagea;
      this.Visiblity = 255;
      World.add(world,this.body)
    }
  
   display(){
     if(this.body.speed < 5){
      var angle = this.body.angle;
      push();
      translate(this.body.position.x, this.body.position.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.image5, 0, -16, this.width, this.height);
      pop();
     }
     else{
       World.remove(world, this.body);
       push();
       this.Visiblity = this.Visiblity - 5;
       tint(255,this.Visiblity);
       image(this.image5, this.body.position.x, this.body.position.y, 50, 50);
       pop();
     }
    }
  
    score(){
      if (this.Visiblity < 0 && this.Visiblity > -1005){
        score++;
      }
    }
  
  
  
  };