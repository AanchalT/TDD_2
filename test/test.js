var expect    = require("chai").expect;
var addToDb=require("../app/insertToDb.js")
var addDigits = require("../app/sum.js");
var connection=require("../connection.js");

describe("Database Related test cases", function(done) {
  it("Check connection to db",function(){
    connection('mongodb://localhost:27017/tdd',function(err,db) {
      expect(err).to.equal(null)
      db.close()
      done();
    })
  })
});

describe("Insert into db", function() {
  it("Check whether the \'addToDb\' is a function", function() {
    expect(typeof addToDb).to.equal('function')
  })

  it("verify existance of data in db", function() {
    var obj={
      number:152,
      sum:8,
      timeStamp:Date.now()
    }
    addToDb(obj,function(err,doc){
      expect(err).to.equal(null)
      expect(doc.number).to.equal(obj.number)
      expect(doc.sum).to.equal(obj.sum)
      expect(doc.timeStamp).to.equal(obj.timeStamp)
      
    })
  });

  it("verify if any of the value is missing", function(done) {
    var obj={
      number:152,
      sum:8
    }
    addToDb(obj,function(err,doc){
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
  describe("Finding sum of digits",function() {

  it("verify whether the \'addDigits\' is a function ", function() {
    expect(typeof addDigits).to.equal('function');
  });

  it("Find sum of digits", function() {
    var val=addDigits(152)
    expect(val).to.equal(8);
  });

  it('if input is special character',function() {
    var val = addDigits('%$#@')
    expect(val).to.equal(0);
  });
  
  it("If input is string", function() {
    var val=addDigits('this is not number')
    expect(val).to.equal(0);
  });

  it( 'should check types', function() {
    var alltypes={
      number:11,
      sum:3,
      timestamp:new Date().toString()
    }
    
      
     expect( alltypes.number ).to.be.a( 'Number' );
     expect( alltypes.sum ).to.be.a( 'Number');
     expect( alltypes.timestamp ).to.be.a( 'String' );
    })


  it("Should not store the data if all the fields are not present", function(done) {
    var obj={
      number:123,
      sum:6
    }
    addToDb(obj,function(err,doc){
      expect(err).not.equal(null)
      done();
    })
  });

});

});
