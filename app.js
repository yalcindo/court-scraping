
/**
 * Module dependencies.
 */
var fs = require('fs');
var request=require("request");
var cheerio=require("cheerio");
var writeStream = fs.createWriteStream("file.csv");
// development starts here
writeStream.write('LastName,'+'Name,' + 'County,'+'Indictment,'+'Defendant Number,'+'DOB,'+
	'Age Today,' + 'Offense Description,' + 'Sentencing Place,'+'Sentencing Date,'+'Sentencing Type ,'+'Age at sentence,'+
	'Jail,' + 'Parole Ineligibility,'+'Probation,'+'Penalty,' + 'Fine,'+'Lab Fee,'+ 'DEDR,'+'Restitution,'+'Judge,' + 'Comments'+'\n');

	
	request("http://php.app.com/njsent/details.php?recordID=1",function(err,response,body)
	{
		if (!err && response.statusCode == 200) {
			$ =cheerio.load(body);
			var csvString="";
			$(".results tr").each(function(i,el)
			{

				var value1=$(this).children().eq(1).text();
				var value2=$(this).children().eq(3).text();
			
				if(value1!=="" && value2!==""){
					if(csvString==="")
					{
						csvString=value1+','+value2;
					}
					csvString= csvString+','+value1+','+value2 ;
				}else if(value1)
				{
					console.log("value1",value1);
					csvString=csvString+','+ value1;
				}else if(value2)
				{
					console.log("value2",value2);
					csvString= csvString +','+value2;
				}
			});
			  console.log(csvString);
          	writeStream.write(csvString + '\n');
          
		}
	});




