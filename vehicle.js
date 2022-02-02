function vehicle(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(1, 0);
    this.acc = createVector(-0.2, 0.1);
    this.r = 30;

    vehicle.prototype.update = function() {
        this.edges();
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        //this.acc.set(0, 0);
        
    }

    vehicle.prototype.applyForce = function(force) {
        this.acc.add(force);
    }

    vehicle.prototype.draw = function() {

        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading() - PI/2);
        triangle(this.r/4, 0, -this.r/4, 0, 0, this.r);
        stroke(255);
        pop();
        
    }

    vehicle.prototype.edges = function() {
        if(this.pos.x > width) {
            this.pos.x = 0;
        }
        else if(this.pos.x < 0) {
            this.pos.x = width;
        }
        else if(this.pos.y > height) {
            this.pos.y = 0;
        }
        else if(this.pos.y < 0) {
            this.pos.y = height;
        }
    }
}