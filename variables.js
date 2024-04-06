var http = require('http'),
    fs = require('fs');

var parametros = [];
var valores = [];
var arreglo_parametros = [];

http.createServer(function(req, res) {
    fs.readFile('./form.html', function(err, html) {
        var html_string = html.toString();
        if (req.url.indexOf('?') > 0) {
            var url_data = req.url.split('?');
            arreglo_parametros = url_data[1].split('&');
        }
        for (var i = 0; i < arreglo_parametros.length; i++) {
            var parametro = arreglo_parametros[i];
            var param_data = parametro.split('=');
            parametros[i] = param_data[0];
            valores[i] = param_data[1];
        }

        for (var i = 0; i < parametros.length; i++) {
            html_string = html_string.replace('{' + parametros[i] + '}', valores[i]);
        }
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        res.write(html_string);
        res.end();
    });
}).listen(8080);

// Imprimir los valores al finalizar la ejecución del archivo
process.on('exit', function() {
    console.log("arreglo_parametros:", arreglo_parametros);
    console.log("parametros:", parametros);
    console.log("valores:", valores);
});



