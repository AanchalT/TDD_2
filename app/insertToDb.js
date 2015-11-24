var connection=require("../connection.js");
module.exports=function(obj,callback){
	if(obj.number ===undefined || obj.sum===undefined ||obj.timeStamp===undefined)
		return callback("Some property is missing")
	connection('mongodb://localhost:27017/tdd',function(error,db){
		if(error)
			return callback(error)
		db.collection('numbers').insert(obj,function(err,doc){
			db.close()
			if(err)
				return callback(err)
			else
				return callback(null,doc)
		})
	})
}