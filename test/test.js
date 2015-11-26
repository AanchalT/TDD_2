"use strict"
const expect    = require('chai').expect;
const addToDb=require('../app/insertToDb.js');
const addDigits = require('../app/sum.js');
const connection=require('../connection.js');

describe('Database Related test cases', function(done) {
  it('Check connection to db',function(){
    connection('mongodb://localhost:27017/tdd',function(err,db) {
      expect(err).to.equal(null)
      db.close()
      done();
    })
  })
});
describe('Insert into db', function() {
  it('Check whether the \'addToDb\' is a function', function() {
    expect(typeof addToDb).to.equal('function')
  })

  it('verify existance of data in db', function() {
    const dbobj={
      number:152,
      sum:8,
      timeStamp:Date.now()
    }
    addToDb(dbobj,function(err,doc){
      expect(err).to.equal(null)
      expect(doc.number).to.equal(dbobj.number)
      expect(doc.sum).to.equal(dbobj.sum)
      expect(doc.timeStamp).to.equal(dbobj.timeStamp)
      
    })
  });

  it('verify if any of the value is missing', function(done) {
    const dbobj={
      number:152,
      sum:8
    }
    addToDb(dbobj,function(err,doc){
      expect(err).not.equal(null)
      done();
    })
  });

  after(function(){
    connection('mongodb://localhost:27017/tdd',function(err,db){
      db.collection('numbers').remove({},function(err,doc){
        db.close()
      });
    })
  })
  describe('Finding sum of digits',function() {
  it('verify whether the \'addDigits\' is a function ', function() {
    expect(typeof addDigits).to.equal('function');
  })
  it('Find sum of digits', function() {
    const val=addDigits(152)
    expect(val).to.equal(8);
  });

  it('if input is special character',function() {
    const val = addDigits('%$#@')
    expect(val).to.equal(0);
  });
  
  it('If input is string', function() {
    const val=addDigits('this is not number')
    expect(val).to.equal(0);
  });

  it( 'It should check types', function() {
    const types={
      number:11,
      sum:3,
      timestamp:new Date().toString()
    }
    
      
     expect( types.number ).to.be.a( 'Number' );
     expect( types.sum ).to.be.a( 'Number');
     expect( types.timestamp ).to.be.a( 'String' );
    })


  it('Should not store the data if all the fields are not present', function(done) {
    const dbobj={
      number:123,
      sum:6
    }
    addToDb(dbobj,function(err,doc){
      expect(err).not.equal(null)
      done();
    })
  });

});

});
