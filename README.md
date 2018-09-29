# Insert-Generator
### Simple yet effective Query and QueryField generator for DevExpress Reports
## Usage
In order to make a request you must use the `consultas` endpoint located in the route:
```HTTPS
http://<server-ip>/api/consultas
```
The request o be made is a `POST` who's data must contain this structure:
- `consultaid`: 
  Specifies the ID of the query to be generated
- `nombreConsulta`: 
  Contains the name of the query and query-field
- `select`: 
  Contains the *select* portion of the SQL script with the columns name specified with the *AS* keyword followed by the actual name
- `from`: 
  Contains the *from* portion of the SQL script
- `where`: 
  Contains the *qhere* portion of the SQL script
- `groupby`: 
  Contains the *group by* portion of the SQL script
- `orderby`: 
  Contains the *order by* portion of the SQL script

## Example
The information can be send using the `x-wwww-form-urlencoded` and `JSON` format for example:
```JSON
{
	"select":"ca.AreteId as Costo,\nca.CodigoCorral as Corral",
	"from": "Ganadera.dbo.Cabeza ca",
	"where":"ca.EstatusId IN ('AS','AM')",
	"groupby":"ca.AreteId, ca.CodigoCorral",
	"orderby":"ca.AreteId",
	"consultaid": "100",
	"nombreConsulta": "Resumen de Cabezas"
}
```

