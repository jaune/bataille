var Unit = function (id, name, group) {
	this.id_ = id;
	this.name_ = name;
	this.group_ = group;

	this.health_ = 100;

	this.engage_ = null;

	this.last_active_cycle_ = null;
};


Unit.prototype.omniscientSnap = function () {
	return {
		id : this.id_,
		name : this.name_,
		group : this.group_,
		position : this.position_,
		health : this.health_
	};
};

Unit.prototype.subjectiveSnap = function () {
	return {
		id : this.id_,
		name : this.name_,
		group : this.group_,
		position : this.position_,
		health : this.health_
	};
};

Unit.prototype.isActivable = function () {
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