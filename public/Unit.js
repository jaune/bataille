var Unit = function (id, name, group) {
	this.id_ = id;
	this.name_ = name;
	this.group_ = group;

	this.health_ = 100;

	this.engage_ = null;

	this.position_ = 0;

	this.last_active_cycle_ = null;
};


Unit.prototype.omniscientSnap = function () {
	return {
		id : this.id_,
		name : this.name_,
		group : this.group_,
		position : this.position_,
		health : this.health_,
		engage : this.engage_
	};
};

Unit.prototype.subjectiveSnap = function () {
	return {
		id : this.id_,
		name : this.name_,
		group : this.group_,
		position : this.position_,
		health : this.health_,
		engage : this.engage_
	};
};

Unit.prototype.engage = function (unit_id) {
	this.engage_ = unit_id;
};

Unit.prototype.isActivable = function () {
	return this.isAlive();
};

Unit.prototype.isEngagable = function () {
	return this.isAlive();
};

Unit.prototype.getLastActiveCycle = function () {
	return this.last_active_cycle_;
};

Unit.prototype.active = function (cycle) {
	this.last_active_cycle_ = cycle;
};

Unit.prototype.getGroup = function () {
	return this.group_;
};


Unit.prototype.isAlive = function () {
	return this.health_ !== 0;
};