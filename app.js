function Traveler(name) {
	this.name = name;
	this.food = 1;
	this.isHealthy = true;
}

function Wagon(capacity) {
	Traveler.call(this, name);
	this.capacity = capacity;
	this.passengers = [];
}

Traveler.prototype = {
	constructor: Traveler,
	hunt: function() {
		this.food = this.food + 2;
	},
	eat: function() {
		if (this.food > 0) {
			this.food = this.food - 1;
		} else {
			this.isHealthy = false;
		}
	}
};

Wagon.prototype = {
	constructor: Wagon,
	getAvailableSeatCount: function() {
		return this.capacity - this.passengers.length;
	},
	join: function join(travelers) {
		if (this.passengers.length < this.capacity) {
			this.passengers.push(travelers);
		}
	},
	shouldQuarantine() {
		let passenger = this.passengers;
		let totalPassengers = this.passengers.length;
		for (let i = 0; i < totalPassengers; i++) {
			if (!passenger[i].isHealthy) {
				return true;
			}
		}
		return false;
	},
	totalFood: function totalFood() {
		let totalFood = 0;
		for (i = 0; i < this.passengers.length; i++) {
			totalFood = this.passengers[i].food + totalFood;
		}
		return totalFood;
	}
};

// * Test Code * //
// Create a wagon that can hold 2 people
let wagon = new Wagon(2);
// Create three travelers
let henrietta = new Traveler("Henrietta");
let juan = new Traveler("Juan");
let maude = new Traveler("Maude");
console.log(`${wagon.getAvailableSeatCount()} should be 2`);
wagon.join(henrietta);
console.log(`${wagon.getAvailableSeatCount()} should be 1`);
wagon.join(juan);
wagon.join(maude); // There isn't room for her!
console.log(`${wagon.getAvailableSeatCount()} should be 0`);
henrietta.hunt(); // get more food
juan.eat();
juan.eat(); // juan is now hungry (sick)
console.log(`${wagon.shouldQuarantine()} should be true since juan is sick`);
console.log(`${wagon.totalFood()} should be 3`);
