var addDigits = require("./app/sum..js");
var addToDb=require("./app/insertToDb.js")

var num=parseInt(process.argv[2])
var sum=addDigits(num)

var obj={
    number:num,
    sum:sum,
    timeStamp:Date.now()
} 

addToDb(obj,function(err,doc){
	if(err)
		console.log(err)
	else
		console.log(doc)
