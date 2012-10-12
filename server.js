
var modules = {
	express: require('express'),
	http: require('http')
};

var express_static = modules.express['static'];
var app = modules.express();

app.use(express_static(__dirname +'/public'));

var http_server = modules.http.createServer(app);
http_server.listen(80, function () {

	console.log('- Server is listening on port 80.');
});

