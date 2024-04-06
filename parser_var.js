function parser_var(req) {
    let arreglo_parametros = [];
    const parametros = [];
    const valores = [];

    if (req.url.indexOf('?') > 0) {
        const url_data = req.url.split('?');
        arreglo_parametros = url_data[1].split('&');
    }

    for (let i = 0; i < arreglo_parametros.length; i++) {
        const parametro = arreglo_parametros[i];
        const param_data = parametro.split('=');
        parametros.push(param_data[0]);
        valores.push(param_data[1]);
    }

    return {
        parametros,
        valores
    };
}

module.exports = parser_var;
module.exports.batman = {
    identidad: 'Bruce Wayne',
    poder:'Dinero'
};
