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

var options= {};
options.uri= 'http://dawa.aws.dk/vejnavne';
options.qs= {q: program.args[0], fuzzy: program.fuzzy};

request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
  	var vejnavne= JSON.parse(body);
  	for (var i = 0; i < vejnavne.length; i++) {
  		console.log(vejnavne[i].navn);
  	};
  }
});