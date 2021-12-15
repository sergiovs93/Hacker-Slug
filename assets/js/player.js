class Player {
    constructor(ctx){
        this.ctx = ctx

        //Sizing
        this.width = 40
        this.height = 52

        //Map Position
        this.x = 200
        this.y = 390

        this.ay = 0.4

        this.img = new Image ()
        this.img.src = './assets/img/walking-sprites.png'
        this.img.isReady = false
        this.img.onload = () => {
            this.img.isReady = true
        }

        this.vy = 0
        this.vx = 0

        this.movements = {
    
          left : false,
          right : false
  
      }

        this.maxY = 390

        this.horizontalFrames = 9
        this.verticalFrames = 2

        this.xFrame = 0
        this.yFrame = 0

        this.tick = 0

        this.jumping = false
        this.running = false
    }

    draw() {

      if (this.movements.left) {
        this.yFrame = 1
      }
      if (this.movements.right){
        this.yFrame = 0
      }
        this.ctx.drawImage(
          this.img,
          (this.img.width * this.xFrame)  / this.horizontalFrames,
          (this.img.height * this.yFrame) / this.verticalFrames,
          this.img.width / this.horizontalFrames,
          this.img.height / this.verticalFrames,
          this.x,
          this.y,
          this.width,
          this.height
        )  
        this.tick++
      }


    setUpListeners(event) {
      const status = event.type === 'keydown';

    switch(event.keyCode) {
        case KEY_RIGHT:
            this.movements.right = status;
            break;

         case KEY_LEFT:
             this.movements.left = status;
             break;

         default:
             break;
    }
   }

      move (){

        this.vy += this.ay
        this.y += this.vy

        if (this.y <= 0) {
          this.y = 0
        }
        if (this.y >= this.maxY) {
          this.y = this.maxY
          this.jumping = false
        }
    }

    onKeyDown(keyCode) {
        // jumps cant be stacked
        if (keyCode === KEY_SPACEBAR && !this.jumping) {
             this.vy = -6
             this.jumping = true
        }

        if(keyCode === KEY_RIGHT && this.jumping === false){
            // How fast frames run to the right
                if (this.tick % 2 === 0) {
                    this.xFrame += 1
            
                    if (this.xFrame > 8) {
                        this.xFrame = 1
                    }
                }  
        } 
        if(keyCode === KEY_LEFT){
          // How fast frames run ton the left
              if (this.tick % 2 === 0) {
                  this.xFrame += 1
          
                  if (this.xFrame > 7) {
                      this.xFrame = 0
                  }
              }
             
        }
      }

    onKeyUp(keyCode) {
        if (keyCode === KEY_RIGHT || keyCode === KEY_LEFT) {
            this.running = false
        }
        } 


    collidesWith(truck) {
        //numbers added so the player enters the truck
            if (
                this.x < truck.x + truck.width &&
                this.x + this.width > truck.x + 60 &&
                this.y < truck.y + truck.height &&
                this.y + this.width > truck.y +33
            ) {
            return true
            }
        }
    }

        /* if(this.running === true){
        
            if (this.tick % 10 === 0) {
                this.xFrame += 1
        
                if (this.xFrame > 8) {
                    this.xFrame = 2
                }
            }

         } */
    



    /*setUpListeners(event) {

        const status = event.type === 'keydown';

        if (event.keyCode === KEY_SPACEBAR){
            this.vy = 5
            this.jumping = true
        }

    }

    onKeyDown(keyCode) {
        if (keyCode === RIGHT_KEY && !this.jumping) {
          this.vy = -5
          this.jumping = true
        }
    
        if (keyCode === LEFT_KEY) {
          this.running = true
        }
    
        if (keyCode === RIGHT_KEY) {
          this.running = true
        }

        if (keyCode === KEY_SPACEBAR) {
            this.vy = -5
            this.jumping = true
        
      }
    }

      onKeyUp(keyCode) {
        if (keyCode === RIGHT_KEY || keyCode === LEFT_KEY) {
          this.vx = 0
        }
      }

      move() {

       

            
            this.x += this.vx
        
            this.vy += this.ay
            //this.y += this.vy
        
            if (this.x <= 0) {
            this.x = 0
            }
            if (this.x + this.width >= this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.width
            }
        
            if (this.y <= 0) {
            this.y = 0
            }
            if (this.y >= this.maxY) {
            this.y = this.maxY
            this.jumping = false
            }

            if(this.running === true){
        
            if (this.tick % 10 === 0) {
                this.xFrame += 1
        
                if (this.xFrame > 8) {
                    this.xFrame = 2
                }
            }
        }
    
        /* if (this.running === false) {
          this.yFrame = 0
          this.xFrame = 0
        }
    
        if (this.jumping) {
          this.yFrame = 0
          this.xFrame = 0
        } 

      }*/