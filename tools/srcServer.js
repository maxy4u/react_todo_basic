import express from 'express';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import MongoDB from 'mongodb' ;
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
let db;
let MongoClient = MongoDB.MongoClient ;
let ObjectId = MongoDB.ObjectId;
/* eslint-disable no-console */

const port = 4000;
const app = express();
const compiler = webpack(config);
// function getObject(req){
// 	var d = new Date();
// 		let Obj = { 	
// 					"Identity" : {
// 					"name" : (req.body.constructor === Array) ? req.body[0].project_name : req.body.project_name 
// 				},
// 				"Provenance" : {
// 					"date_added" : d.toJSON().slice(0,10).split('-').reverse().join('/'),
// 					"originator" : req.headers.user
// 				}
// 			}
// 	return Obj;
// }

MongoClient.connect('mongodb://localhost:27017/curdtest', (err, database) => {
	if (err) return console.log(err);
	db = database;
  	// make our db accessible via req
  	app.use((req,res,next)=>{
  		req.db = db ;
  		next();
  	});
  	app.use(bodyParser.urlencoded({extended:true}));
  	app.use(bodyParser.json())
	app.use(require('webpack-dev-middleware')(compiler, {
	  noInfo: true,
	  publicPath: config.output.publicPath
	}));

	app.use(require('webpack-hot-middleware')(compiler));
	// app.get('/quotes',(req,res)=>{
	// 	req.db.collection('todocollection').find().toArray((err,results)=>{
	// 		if (err) res.end(500,"No Quotes record found");
	// 		res.send(results);
	// 	});
	// });
	app.post('/todo',(req,res)=>{
		console.log(req.body);
		var d = new Date();
		let PostObj = getObject(req);
		if (req.body.length){
			req.db.collection('todocollection').insert(PostObj,(err,result)=>{
				if (err) res.status(200).send({"response":"Not able to update"}) ;
				res.status(200).send({"response":result});
			})
		}
		
	})
	// app.put('/projects/*',(req,res)=>{
	// 	let _id = req.params[0];
	// 	console.log(`put req came for ${_id}`);
	// 	let PutObj = getObject(req);
	// 	req.db.collection('projectcollection').updateOne({_id:ObjectId(_id)},{$set:JSON.parse(JSON.stringify(PutObj))},(err,result)=>{
	// 		if (err) console.log(`Failed to update ${_id}`);
	// 		res.status(200).send({"response":result});
	// 	})
	// })
	// app.get('/projects',(req,res)=>{
	// 	req.db.collection('projectcollection').find().toArray((err,results)=>{
	// 		if (err) res.end(500,"No Quotes record found");
	// 		res.send(results);
	// 	});
	// })
	app.get('*', function(req, res) {
	  res.sendFile(path.join( __dirname, '../src/index.html'));
	});
	app.listen(port, function(err) {
	  if (err) {
	    console.log(err);
	  } else {
	    open(`http://localhost:${port}`); // this will open the browser
	  }
	});
})
