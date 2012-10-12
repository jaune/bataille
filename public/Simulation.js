var Simulation = function () {
	this.cycle_ = 0;
	this.units_ = [];
};


Simulation.prototype.createUnit = function (opts) {
	var options = opts || {};

	if (!options.hasOwnProperty('name') || !options.hasOwnProperty('group')) {
		throw new Error('Invalid options.');
	}

	if (this.cycle_ !== 0) {
		throw new Error('Simulation already start.');
	}
	
	this.units_.push(new Unit(this.units_.length, options.name, options.group));
};


Simulation.prototype.findActive = function () {
	var current = null;
	this.units_.forEach(function (unit) {
		if (unit.isActivable()) {
			if (current === null) {
				current = unit;
			} else if (unit.getLastActiveCycle() === null) {
				current = unit;
			} else if (unit.getLastActiveCycle() < current.getLastActiveCycle()) {
				current = unit;
			}
		}
	});
	return current;
};

Simulation.prototype.findWinner = function () {
	var groups = [];

	this.units_.forEach(function (unit) {
		if (unit.isAlive()) {
			var group = unit.getGroup();
			if (groups.indexOf(group) === -1) {
				groups.push(group);
			}
		}
	});
	return groups.length < 2;
};


Simulation.prototype.doActionAttack = function (unit, target_id) {
	console.debug(target_id);
};

Simulation.prototype.doActionEngage = function (unit, target_id) {
	console.debug(target_id);
};

Simulation.prototype.doAction = function (unit, action) {
	var matches = /(attack ([0-9]+))|(engage ([0-9]+))/g.exec(action);
	if (!matches) {
		throw new Error('Invalid action `'+action+'`.');
	}
	if (matches[1]) {
		this.doActionAttack(unit, matches[2]);
	} else if (matches[3]) {
		this.doActionEngage(unit,matches[4]);
	} else {
		throw new Error('Invalid action `'+action+'`.');
	}
};

Simulation.prototype.step = function (action) {
	if (this.units_.length < 2) {
		throw new Error('Need units.');
	}
	var winner = this.findWinner();
	if (winner) {
		throw new Error('Winner is `'+winner+'`.');
	}
	var current = this.findActive();

	this.doAction(current, action);

	this.cycle_++;
	if (current) {
		current.active(this.cycle_);
	}
};

Simulation.prototype.subjectiveSnap = function (subject) {
	var others = [];
	var me = null;

	this.units_.forEach(function (unit) {
		if (subject === unit) {
			me = unit.omniscientSnap();
		} else {
			others.push(unit.subjectiveSnap());
		}
	});

	return {
		cycle: this.cycle_,
		me: me,
		others: others
	};
};

Simulation.prototype.omniscientSnap = function () {
	var units = [];

	this.units_.forEach(function (unit) {
		units.push(unit.omniscientSnap());
	});

	return {
		cycle: this.cycle_,
		active: this.findActive().omniscientSnap(),
		units: units
	};
};



Simulation.prototype.snap = function (subject) {
	if (subject) {
		return this.subjectiveSnap(subject);
	} else {
		return this.omniscientSnap();
	}

/*
var snapshot = {
		me : {
			name : 'Bernard', // unknown, <name>
			health : 'hurt', // unknown, fine, hurt, dead
			group : 'groupe-a', // unknown, <name>
			position : 'support' // support, engage
		},
		others : [
			{
				name : 'Adrien', // unknown, <name>
				health : 'fine', // unknown, fine, hurt, dead
				group : 'groupe-b', // unknown, <name>
				position : 'support' // support, engage
			}
		]
	};
*/
};