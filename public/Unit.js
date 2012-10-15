var Unit = function (id, name, group) {
	this.id_ = id;
	this.name_ = name;
	this.group_ = group;

	this.health_ = 100;
	this.attack_ = 10;

	this.engage_ = null;

	this.position_ = 0;

	this.last_active_cycle_ = null;
};


Unit.prototype.omniscientSnap = function () {
	var engage_id = null;
	if (this.engage_) {
		engage_id = this.engage_.id_;
	}

	return {
		id : this.id_,
		name : this.name_,
		group : this.group_,
		position : this.position_,
		health : this.health_,
		engage : engage_id
	};
};

Unit.prototype.subjectiveSnap = function () {
	var engage_id = null;
	if (this.engage_) {
		engage_id = this.engage_.id_;
	}

	return {
		id : this.id_,
		name : this.name_,
		group : this.group_,
		position : this.position_,
		health : this.health_,
		engage : engage_id
	};
};

Unit.prototype.engage = function (target) {
	if (!target.isEngagable()) {
		throw new Error('Target can\'t be engage.');
	}
	this.engage_ = target;
};

Unit.prototype.attack = function (target) {
	if (this.engage_ !== target) {
		throw new Error('Target must be engage.');
	}
	target.health_ -= this.attack_;
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