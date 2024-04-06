const http = require('http');
const fs = require('fs');
const parser = require('./parser_var');
const datos = parser.batman;

http.createServer(function(req, res) {
    fs.readFile('./form.html', function(err, html) {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.write('Error interno');
            res.end();
            return;
        }

        let html_string = html.toString();
        const { parametros, valores } = parser(req);

        for (let i = 0; i < parametros.length; i++) {
            html_string = html_string.replace(`{${parametros[i]}}`, valores[i]);
        }

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(html_string);
        res.end();
    });
}).listen(8080);

