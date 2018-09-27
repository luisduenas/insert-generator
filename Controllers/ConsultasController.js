var express = require('express');
var router = express.Router();
let consultaResult;
let consultaCampoResult;
let consultaid;
let nombreConsulta;


router.route('/consultas').post(function (req, res) {
    if (!req.body) {
        res.json({ "Message": "tiraste mal el post, baboso" });
    }
    else {

        if (!req.body.select) {
            res.json({ "Message": "te falto meter el select animal" });
        }
        else if (!req.body.from) {
            res.json({ "Message": "te falto meter el from estupido" });
        }
        else if (!req.body.consultaid) {
            res.json({ "Message": "y el ID de la consulta cara de pene?" });
        }
        else if (!req.body.nombreConsulta) {
            res.json({ "Message": "crees que soy adivino o que?, pon el pinche nombre de la consulta" });
        }
        else {
            consultaid = req.body.consultaid;
            nombreConsulta = req.body.nombreConsulta;
            generaConsultaCampo(req.body.select);
            generateConsulta(req.body.from, req.body.where, req.body.orderby, req.body.groupby);
        }
    }
    res.json({ "Delete": "DELETE FROM ConsultaCampo WHERE ConsultaId = " + consultaid + ";DELETE FROM Consulta WHERE ConsultaId = " + consultaid + ";", "Consulta": consultaResult, "ConsultaCampo": consultaCampoResult });
});
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})
router.route('/consultas').get(function(req,res){
    res.json({ "LOL": " te awitaste alv" });
});

function generaConsultaCampo(_select) {
    consultaCampoResult = [];
    let select = _select.split(/\n|\r/gm);
    let prioridad = 0;
    select.forEach(element => {
        if (!element) {
            return;
        }
        prioridad++;
        let lastIndex = element.toLowerCase().lastIndexOf(" as ");
        let campo = element.substring(0, lastIndex);
        let nombreCampo = element.substring(lastIndex + 4, element.length - 1);
        consultaCampoResult.push(
            "INSERT INTO Ganadera.dbo.ConsultaCampo VALUES ('" + consultaid + "', '" + nombreConsulta + "','"
            + campo.trim()
            + "','" + nombreCampo.replace(',', '').trim() + "','" + nombreCampo.replace(',', '').trim() + "','100','2','',''," + prioridad + ",GETDATE(),GETDATE())"
        );
    });
}

function generateConsulta(_from, _where, _orderby, _groupby) {
    let regex = /(\t|\n|\r)+|\ {2,}/gm;
    let from = _from.replace(regex, "");
    let where = _where.replace(regex, "");
    let orderby = _orderby.replace(regex, "");
    let groupby = _groupby.replace(regex, "");
    consultaResult =
        "INSERT INTO Ganadera.dbo.Consulta VALUES ('100', '" + nombreConsulta
        + "', '" + from.trim() + "', '" + where.trim() + "','" + orderby.trim() + "','" + groupby.trim() + "','','1','','','','',GETDATE(),GETDATE())";
}

module.exports = router;