var unit_template = Handlebars.compile($("#unit-template").text());

var simulation = new Simulation();

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

simulation.createUnit({
	name: 'Chevalier noir',
	group: 'Méchant'
});

render_snapshot(simulation.snap());

$('#step').on('click', function () {

	var action = $('#action').val();
	$('#action').val('');
	simulation.step(action);
	render_snapshot(simulation.snap());
});

function render_snapshot(snapshot) {
	$('#cycle').html(snapshot.cycle);
	$battlefield = $('#battlefield');

	snapshot.units.forEach(function (unit) {
		var id = '#unit'+unit.id;
		$unit = $(id);
		if (!$unit.size()) {
			$battlefield.append(unit_template(unit));
			$unit = $(id);
		} else {
			$unit.replaceWith(unit_template(unit));
		}
	});

	$('.unit').removeClass('active');
	$('#unit'+snapshot.active.id).addClass('active');
}


