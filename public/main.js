var unit_template = Handlebars.compile($("#unit-template").text());

var simulation = new Simulation();

simulation.createUnit({
	name: 'Paladin',
	group: 'Gentil'
});

simulation.createUnit({
	name: 'Paladin',
	group: 'Gentil'
});

simulation.createUnit({
	name: 'Paladin',
	group: 'Gentil'
});

simulation.createUnit({
	name: 'Chevalier noir',
	group: 'Méchant'
});

simulation.createUnit({
	name: 'Chevalier noir',
	group: 'Méchant'
});

simulation.createUnit({
	name: 'Chevalier noir',
	group: 'Méchant'
});

render_snapshot(simulation.snap());

$('#step').on('click', function () {

	var action = $('#action').val();
	var target_id = $('#target').val();
	$('#action').val('');
	$('#target').val('');

	var target = simulation.findUnit(target_id);
	if (!target) {
		throw new Error('Missing target `'+target_id+'`.');
	}

	simulation.step(action, target);
	render_snapshot(simulation.snap());
});

function render_snapshot(snapshot) {
	$('#cycle').html(snapshot.cycle);
	$battlefield = $('#battlefield');

	$('#target').html('<option value="">-</option>');
	snapshot.units.forEach(function (unit) {
		var id = '#unit'+unit.id;
		$unit = $(id);
		if (!$unit.size()) {
			$battlefield.append(unit_template(unit));
			$unit = $(id);
		} else {
			$unit.replaceWith(unit_template(unit));
		}
	
		$('#target').append('<option value="'+unit.id+'">'+unit.name +' ('+unit.group+') #'+unit.id+'</option>');
	});

	$('.unit').removeClass('active');
	$('#unit'+snapshot.active.id).addClass('active');
}


