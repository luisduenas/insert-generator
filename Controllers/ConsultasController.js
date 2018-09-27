var express = require('express');
var router = express.Router();

router.route('/consultas').post(function (req, res) {
    if (!req.body) {
        res.json({ "Message": "tiraste mal el post, baboso" });
    }
    else {
        let select = req.body.select.split("\n");
        let consultaid = req.body.consultaid;
        let nombreConsulta = req.body.nombreConsulta;
        let result = [];
        let prioridad = 0;
        select.forEach(element => {
            if (!element) {
                return;
            }
            prioridad++;
            let lastIndex = element.toLowerCase().lastIndexOf(" as ");
            let campo = element.substring(0, lastIndex);
            let nombreCampo = element.substring(lastIndex + 4, element.length - 1);
            result.push(
                "INSERT INTO Ganadera.dbo.ConsultaCampo VALUES ('" + consultaid + "', '" + nombreConsulta + "','"
                + campo.trim()
                + "','" + nombreCampo.replace(',', '').trim() + "','" + nombreCampo.replace(',', '').trim() + "','100','2','',''," + prioridad + ",GETDATE(),GETDATE())"
            );
        });
        res.json({ "MESSAGE": result });
    }
});
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

module.exports = router;