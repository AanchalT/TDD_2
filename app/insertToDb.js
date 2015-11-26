"use strict"
const connection=require('../connection.js');
module.exports=function(dbobj,callback){
	if(dbobj.number ===undefined || dbobj.sum===undefined ||dbobj.timeStamp===undefined)
		return callback("Some property is missing")
	connection('mongodb://localhost:27017/tdd',function(error,db){
		if(error)
			return callback(error)
		db.collection('numbers').insert(dbobj,function(err,doc){
			db.close()
			if(err)
				return callback(err)
			else
				return callback(null,doc)
		})
	})
}