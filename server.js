"use strict"
const addDigits =require('./app/sum.js');
const addToDb=require('./app/insertToDb.js');

const num=parseInt(process.argv[2])
const sum=addDigits(num)

const dbobj={
    number:num,
    sum:sum,
    timeStamp:Date.now()
} 

addToDb(dbobj,function(err,doc){
	if(err)
		console.log(err)
	else
		console.log(doc)
