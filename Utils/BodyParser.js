'use strict';
const unwantedCharactersReg = /(\t|\n|\r)+|\ {2,}/gm;
const singleQuoteReg = /\'/g;
const doubleQuote = `''`;
/**
 * Realiza una copia superficial del cuerpo mientras convierte todas
 * las llaves de este a minusculas
 * @param {Object} body Cuerpo de la petición
 * @returns {Object} Objeto consus llaves en minusculas
 */
function toLowerCaseKeys(body) {
    let lowBody = {};
    Object.keys(body).forEach(key => {
        lowBody[key.toLowerCase()] = body[key];
    });
    return lowBody;
}

/**
 *Remueve todos los caracteres que no son necesarios
 * @param {Object} body Cuerpo a limpiar
 * @returns {Object} Cuerpo limpio
 */
function cleanBody(body) {
    let cleanedBody = {};
    Object.keys(body).forEach(key => {
        if (typeof body[key] === 'string') {
            cleanedBody[key] = body[key].replace(unwantedCharactersReg, "");
        } else {
            cleanedBody[key] = body[key];

        }
    });
    return cleanedBody;
}

/**
 *Convierte toda comilla sensilla a comillas dobles
 * @param {Object} body Cuerpo de la petición
 * @returns Regresa el cuerpo y todas sus comillas sensillas convertidas a doble
 */
function makeDoubleQuoted(body) {
    let doubleQuotedBody = {};
    Object.keys(body).forEach(key => {
        if (typeof body[key] === 'string') {
            doubleQuotedBody[key] = body[key].replace(singleQuoteReg, doubleQuote);
        } else {
            doubleQuotedBody[key] = body[key];
        }
    });
    return doubleQuotedBody;
}

module.exports = {
    toLowerCaseKeys: toLowerCaseKeys,
    cleanBody: cleanBody,
    makeDoubleQuoted: makeDoubleQuoted
}