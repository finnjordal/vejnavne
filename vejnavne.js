#! /usr/bin/env node

var program = require('commander')
	,request = require('request');
 
program
  .version('0.0.1')
  .usage('[options] <vejnavn>')
  .option('-f, --fuzzy', 'Fuzzy søgning')
  .parse(process.argv);

if (!program.args[0]) {
   program.outputHelp();
   process.exit(1);
 }

var pvejnavne = new Promise(function(resolve, reject) {
	var options= {};
	options.uri= 'http://dawa.aws.dk/vejnavne';
	options.qs= {q: program.args[0], fuzzy: program.fuzzy, per_side: 20};

	request(options, function (error, response, body) {
		if (error) {
			reject(error);
			return;
		}
		if (response.statusCode !== 200) {
			reject(response.statusCode);
			return;
		}
		try {			
	  	var vejnavne= JSON.parse(body);
	  	resolve(vejnavne);
		}
		catch(e) {
			reject(e.message);
		}
	});
});

pvejnavne
	.then(
		function(vejnavne) {
			for (var i = 0; i < vejnavne.length; i++) {
	  		console.log(vejnavne[i].navn);
	  	};
		})
	.catch(
		function(error) {
			console.log('Fejl: '+error)
		});