var express = require('express');
var app = express();
var port = process.env.port || 1337;
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.post("/generateInserts",function(req,res)
{
    if(!req.body){
        res.json({"Message":"tiraste mal el post, baboso"}); 
    }
    else{
        let select = req.body.select.split("\n");
        let consultaid = req.body.consultaid;
        let nombreConsulta = req.body.nombreConsulta;
        let result = [];
        let prioridad = 0;
        select.forEach(element => {
            prioridad++;
            let lastIndex = element.lastIndexOf(" AS ");
            let campo = element.substring(0,lastIndex);
            let nombreCampo = element.substring(lastIndex + 4, element.length - 1);
            result.push(
                "INSERT INTO Ganadera.dbo.ConsultaCampo VALUES ('"+consultaid+"', '"+nombreConsulta+"','" 
                + campo.trim()
                +  "','" +nombreCampo.replace(',','').trim() + "','"+nombreCampo.replace(',','').trim()+"','100','2','','',"+prioridad+",GETDATE(),GETDATE())"
            );
        });
        res.json({"MESSAGE":result});
    }
});
 


app.listen(port,function(){
    let datetime = new Date();
    let message = "Server running on Port:- " + port + "\nStarted at:- " + datetime;
    console.log(message);
});