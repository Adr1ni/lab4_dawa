const fs = require('fs');

function generateHTMLResponse(req, res, templatePath, data) {
    fs.readFile(templatePath, function(err, html) {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.write('Internal Server Error');
            res.end();
            return;
        }

        let html_string = html.toString();
        for (const key in data) {
            html_string = html_string.replace(`{${key}}`, data[key]);
        }

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(html_string);
        res.end();
    });
}

module.exports = generateHTMLResponse;
