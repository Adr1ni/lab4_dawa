const http = require('http');
const fs = require('fs');
const calculator = require('./calculator/calculator');
const textProcessor = require('./TextConvertor/text_processor');
const dateCalculator = require('./Days/daysRemainingCalculator');
const parser = require("./parser_var");
const generateHTMLResponse = require("./html_response");

http.createServer(function(req, res) {
    if (req.url.startsWith('/inicio') || req.url.startsWith('/galeria')) {
        handlePaginaInicio(req, res);
    }else if (req.url.startsWith('/calculator')) {
        handleCalculatorRequest(req, res)
    }else if (req.url.startsWith('/text')) {
        handleTextProcessorRequest(req, res);
    } else if(req.url.startsWith('/date')){
        handleDateProcessorRequest(req, res)
    }else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Not Found');
    }
}).listen(8080);


function handlePaginaInicio(req, res){
    try{
        generateHTMLResponse(res,req,'.index.html',{
            titulo:'Bienvenido a la página de inicio',
            mensaje:'Esta es la página de inicio de nuestra aplicación.'
        })
    } catch (error) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('Bad Request: ' + error.message);
    }
}

function handleCalculatorRequest(req, res) {
    const { parametros, valores } = parser(req);

    if (parametros.length !== 3) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('Bad Request: Missing or invalid parameters');
        return;
    }

    const operation = valores[0];
    const num1 = parseFloat(valores[1]);
    const num2 = parseFloat(valores[2]);
    let result;

    try {
        switch(operation) {
            case 'add':
                result = calculator.add(num1, num2);
                break;
            case 'subtract':
                result = calculator.subtract(num1, num2);
                break;
            case 'multiply':
                result = calculator.multiply(num1, num2);
                break;
            case 'divide':
                result = calculator.divide(num1, num2);
                break;
            default:
                throw new Error('Invalid operation');
        }

        generateHTMLResponse(req,res,'./calculator/calculator.html',{
            result:result,
            operation:operation,
            num1:num1,
            num2:num2
        })
    } catch (error) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('Bad Request: ' + error.message);
    }
}

function handleTextProcessorRequest(req, res) {
    const { parametros, valores } = parser(req);

    if (parametros.length !== 2) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('Bad Request: Missing parameters');
        return;
    }

    const operation = valores[0];
    const text = valores[1];
    let result;

    try {
        switch(operation) {
            case 'splitWord':
                result = textProcessor.splitWord(text).join(', ');
                break;
            case 'capitalize':
                result = textProcessor.capitalize(text);
                break;
            case 'extractSubstring':
                result = textProcessor.extractSubstring(text)
                break;
            case 'removeSpaces':
                result = textProcessor.removeSpaces(text)
                break;
            case 'toLowerCase':
                result = textProcessor.toLowerCase(text)
                break;
            case 'countCharacters':
                result = textProcessor.countCharacters(text)
                break;
            case 'toUpperCase':
                result = textProcessor.toUpperCase(text)
                break;
            default:
                throw new Error('Invalid operation');
        }
        generateHTMLResponse(req,res,'./TextConvertor/textConvertor.html',{
            result:result,
            operation:operation,
            text:text
        })
    } catch (error) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('Bad Request: ' + error.message);
    }


}
function handleDateProcessorRequest(req,res){
    const { parametros, valores } = parser(req);
    const date = valores[0];

    try{
        const daysRemaining = dateCalculator.calculateDaysRemaining(date);
        generateHTMLResponse(req, res, './Days/date.html', {
            daysRemaining:daysRemaining,date:date,actualDate:new Date() });
    }catch (error) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('Bad Request: ' + error.message);
    }
}