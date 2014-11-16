
var mysqldb = require('../mysqldb.js');

exports.signup = function(req, res){
	res.render('signup', {page_title:"Sign Up"});
}

exports.save = function(req, res){
	var input = JSON.parse(JSON.stringify(req.body));
	var data = {
			serialNumber : input.serialNumber,
			modelNumber : input.modelNumber,
			count : input.count
	}
	console.log(data);
	var rest = require('restler');
	
	rest.post('http://newgumball.cfapps.io/machines', {
		  data: data,
		}).on('complete', function(data, response) {
			 rest.get('http://newgumball.cfapps.io/machines').on('complete', function(result) {
				  if (result instanceof Error) {
				    console.log('Error:', result.message);
				    this.retry(5000); // try again after 5 sec
				  } else {
					  console.log(result);
					  res.render('list', {result:result});
				  }
				});
		});

	

}
exports.list = function(req, res){
	var rest = require('restler');
	rest.get('http://newgumball.cfapps.io/machines').on('complete', function(result) {
		  if (result instanceof Error) {
		    console.log('Error:', result.message);
		    this.retry(5000); // try again after 5 sec
		  } else {
			  console.log(result);
			  res.render('list', {result:result});
		  }
		});
}

exports.getDetails = function(req,res){
	var id = req.params.id;
	var rest = require('restler');
	rest.get('http://newgumball.cfapps.io/machines/'+id).on('complete', function(result) {
		  if (result instanceof Error) {
		    console.log('Error:', result.message);
		    this.retry(5000); // try again after 5 sec
		  } else {
			  console.log(result);
			  res.render('details', {result:result});
		  }
		});
}

exports.del = function(req, res){
	var id = req.params.id;
	var rest = require('restler');
	rest.del('http://newgumball.cfapps.io/machines/'+id).on('complete', function(result) {
		  if (result instanceof Error) {
		    console.log('Error:', result.message);
		    this.retry(5000); // try again after 5 sec
		  } else {
			  console.log(result);
			  res.render('signup');
		  }
		});
}

exports.update = function(req, res){
	var id = req.params.id;
	var input = JSON.parse(JSON.stringify(req.body));
	var data = {
			serialNumber : input.serialNumber,
			modelNumber : input.modelNumber,
			count : input.count
	}
	console.log(data);
	var rest = require('restler');
	rest.putJson('http://newgumball.cfapps.io/machines/'+id, data).on('complete', function(data, response) {
		res.render('signup');
	});
}
