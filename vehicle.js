function vehicle(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.acc = createVector();
    this.maxSpeed = 2;
    this.maxForce = 0.05;
    this.r = 30;
    this.pRadius = 50;

    vehicle.prototype.setP = function(val) {
        this.pRadius = val;
    }

    vehicle.prototype.update = function() {

        this.applyForce();
        this.edges();
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.set(0, 0);
        
    }

    vehicle.prototype.applyForce = function() {
        let alignment = this.align(movers);
        let separate = this.separation(movers);
        let cohesion = this.cohere(movers);

        this.acc.add(alignment);
        this.acc.add(separate);
        this.acc.add(cohesion);
    }

    vehicle.prototype.draw = function() {

        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading() - PI/2);
        // noFill();
        // stroke(255)
        // circle(0, 0, this.pRadius);
        noStroke();
        fill(255);
        circle(0, 0, 1)
        
        // triangle(this.r/4, 0, -this.r/4, 0, 0, this.r);
        pop();
        
    }

    vehicle.prototype.showPer = function() {
        
            push();
            translate(this.pos.x, this.pos.y);
            noFill();
            stroke(255)
            circle(0, 0, this.pRadius);
            pop();
        
    }

    vehicle.prototype.separation = function(vehicles) {

        let steering = createVector();
        let total = 0;

        for(let mover of vehicles) {
            let d = dist(this.pos.x, this.pos.y, mover.pos.x, mover.pos.y);
            if(mover != this && d < this.pRadius) {
                let diff = p5.Vector.sub(this.pos, mover.pos);
                diff.div(d*d);
                steering.add(diff);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.vel);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    vehicle.prototype.align = function(vehciles) {

        let steering = createVector();
        let total = 0;

        for(let mover of vehciles) {
            let d = dist(this.pos.x, this.pos.y, mover.pos.x, mover.pos.y);
            if(mover != this && d < this.pRadius) {
                steering.add(mover.vel);
                total++;
            }
        }
        if(total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.vel);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    vehicle.prototype.cohere = function(vehciles) {

        let steering = createVector();
        let total = 0;

        for(let mover of vehciles) {
            let d = dist(this.pos.x, this.pos.y, mover.pos.x, mover.pos.y);
            if(mover != this && d < this.pRadius) {
                steering.add(mover.pos);
                total++;
            }
        }
        if(total > 0) {
            steering.div(total);
            steering.sub(this.pos);
            steering.setMag(this.maxSpeed);
            steering.sub(this.vel);
            steering.limit(this.maxForce);
        }
        return steering;
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