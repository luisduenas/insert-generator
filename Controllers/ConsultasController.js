const express = require('express'),
    router = express.Router()
BodyParser = require('../Utils/BodyParser');

router.use(function timeLog(req, res, next) {
    //console.log('Time: ', Date());
    next();
});
router.route('/consultas').post((req, res) => {
    if (!req.body) {
        res.json({
            "Message": "tiraste mal el post, baboso"
        });
    }

    let body = BodyParser.toLowerCaseKeys(req.body);
    if (!body.select) {
        res.status(400).send({
            "Message": "te falto meter el select animal"
        });
        return;
    } else if (!body.from) {
        res.status(400).send({
            "Message": "te falto meter el from estupido"
        });
        return;
    } else if (!body.consultaid) {
        res.status(400).send({
            "Message": "y el ID de la consulta cara de pene?"
        });
        return;
    } else if (!body.nombreconsulta) {
        res.status(400).send({
            "Message": "crees que soy adivino o que?, pon el pinche nombre de la consulta"
        });
        return;
    }

    //Limpiamos y arreglamos el cuerpo de la petición
    body = BodyParser.makeDoubleQuoted(BodyParser.cleanBody(body));

    const consultaid = body.consultaid;
    const nombreconsulta = body.nombreconsulta;

    const consultaCampo = generaConsultaCampo(body.select, consultaid, nombreconsulta);
    const consulta = generateConsulta(body.from, body.where, body.orderby, body.groupby, nombreconsulta);

    res.status(200).send({
        "Delete": `DELETE FROM ConsultaCampo WHERE ConsultaId = ${consultaid}; DELETE FROM Consulta WHERE ConsultaId = ${consultaid};`,
        "Consulta": consulta,
        "ConsultaCampo": consultaCampo
    });
});

router.route('/consultas').get((req, res) => {
    res.json({
        "LOL": " te awitaste alv"
    });
});

/**
 * Genera los consultas campos apartir de la porción SELECT del script
 * @param {String} _select Porción del SELECT del Script a dividir
 * @returns {Array<String>} Array de String que contienen los inserts de consultaCampo
 */
function generaConsultaCampo(_select, consultaid, nombreConsulta) {
    const regSelect = /([\w\.]+)\ (?:AS\ |\[)(\w+)\]{0,1}\ *(?:,(?:\ |\n|\ |\r|\t)*)*/gi;
    let execSelect;
    let index = 0;
    let consultaCampoResult = ['INSERT INTO Ganadera.dbo.ConsultaCampo VALUES '];
    while ((execSelect = regSelect.exec(_select))) {
        const campo = execSelect[1];
        const nombreCampo = execSelect[2];
        const insert = createConsultaCampoInsert(consultaid, nombreConsulta, campo, nombreCampo, index++);
        consultaCampoResult.push(insert);
    }
    //Removemos la ultima coma
    consultaCampoResult[index - 1] = consultaCampoResult[index - 1].substring(0, consultaCampoResult[index - 1].length - 1);
    return consultaCampoResult;
}

function generateConsulta(from, where, orderby, groupby, nombreConsulta) {
    where = where || '';
    orderby = orderby || "";
    groupby = groupby || "";
    return `INSERT INTO Ganadera.dbo.Consulta VALUES ('100', '${nombreConsulta}', '${from.trim()}', '${where.trim()}','${orderby.trim()}','${groupby.trim()}','','1','','','','',GETDATE(),GETDATE())`;
}


function createConsultaCampoInsert(consultaid, nombreConsulta, campo, nombreCampo, prioridad) {
    const nomCam = nombreCampo.replace(',', '').trim();
    return `('${consultaid}', '${nombreConsulta}', '${campo.trim()}', '${nomCam}', '${nomCam}', '100', '2', '', '', ${prioridad}, GETDATE(), GETDATE())`;
}

module.exports = router;