beforeEach(function(){
  Contact.all = [];
});

describe("Contact", function() {
  describe("create", function() {    
    it("adds the contact to the .all property", function(){
      var testContact = Contact.create("Mary", "Jane");
      Contact.all.should.eql([testContact]);
    });
  });

  describe("initialize", function() {
    it("sets the first and last name", function() {
      var testContact = Object.create(Contact);
      testContact.initialize("Mary", "Jane");
      testContact.addresses.should.eql([]);
    });
  });

  describe("create", function() {
    it("creates a new instance of a Contact", function() {
      var testContact = Contact.create("Mary", "Jane");
      Contact.isPrototypeOf(testContact).should.equal(true);
    });
  });

  describe("createAddress", function() {
    it("creates an address object", function() {
      var testContact = Contact.create();
      var testAddress = testContact.createAddress("208 5th Ave", "Portland", "Oregeon");
      Address.isPrototypeOf(testAddress).should.equal(true);
    });

    it("Should display full address", function() {
      var testContact = Contact.create();
      var testAddress = testContact.createAddress("208 5th Ave", "Portland", "Oregeon");
      testAddress.fullAddress().should.equal("208 5th Ave, Portland, Oregeon");
    });    

    it("adds the address to the address property of the contact", function() {
      var testContact = Contact.create();
      var testAddress = testContact.createAddress("1 a a", "b", "c");
      console.log(testAddress);
      testContact.addresses.should.eql([testAddress]);
    });

    it("Should display full Phone", function() {
      var testContact = Contact.create();
      var testPhone = testContact.createPhone("555 555 5555");
      testPhone.number.should.equal("555 555 5555");
    });
  });
});


describe("Address", function() {
  describe("initialize", function() {
    it("sets the street, city and state", function() {
      var testAddress = Object.create(Address);
      testAddress.initialize("208 5th Ave", "Portland", "Oregon");
      testAddress.street.should.equal("208 5th Ave");
      testAddress.city.should.equal("Portland");
      testAddress.state.should.equal("Oregon");
    });
  });

  describe("create", function(){
    it("creates a new instance of an address", function() {
      var testAddress = Address.create();
      Address.isPrototypeOf(testAddress).should.equal(true);
    });
  });

  describe("fullAddress", function() {
    it("combines street, city, state", function() {
      var testAddress = Object.create(Address);
      testAddress.street = '1234 High St';
      testAddress.city   = 'Portland';
      testAddress.state  = 'Oregon';
      testAddress.fullAddress().should.equal("1234 High St, Portland, Oregon");
    });
  });
  describe("valid", function() {
    it("should be true if format is correct -> street, city, state", function() {
      var testAddress = Object.create(Address);
      testAddress.street = '1234 High St';
      testAddress.city   = 'Portland';
      testAddress.state  = 'Oregon';
      testAddress.valid().should.equal(true);
    });
  });
});

describe("Phone", function() {
  describe("valid", function() {
    it('returns ten numbers that accepts spaces', function() {
      var testPhone = Object.create(Phone);
      testPhone.number = "404 770 9821";
      testPhone.valid().should.equal(true);
    });
    it("should fail if incorrect format", function() {
      var testPhone2 = Object.create(Phone);
      testPhone2.number = "5555 66667777";
      testPhone2.valid().should.equal(false);
    });
  });
  describe("initialize", function() {
    it("Phone Number", function() {
      var testPhone = Object.create(Phone);
      testPhone.initialize("555 555 5555");
      testPhone.number.should.equal("555 555 5555");
    });
  });

  describe("create", function(){
    it("creates a new instance of a phone number", function() {
      var testPhone = Phone.create();
      Phone.isPrototypeOf(testPhone).should.equal(true);
    });
  });

});




/* describe("Contact", function() {
  describe("fullName", function() {
    it("combines the first and last name separated by a space", function() {
      var testContact = Object.create(Contact);
      testContact.firstName = "Dolly";
      testContact.lastName = "Parton";
      testContact.fullName().should.equal("Dolly Parton");
    });
  });
  it("addresses should equal same as Address when only one address in Addresses", function() {
    var testContact2 = Object.create(Contact);
    testContact2.addresses = [];
    var testAddress = Object.create(Address);
    testAddress.street = '1234 High St';
    testAddress.city   = 'Portland';
    testAddress.state  = 'Oregon';
    testContact2.addresses.push(testAddress.fullAddress());
    testContact2.addresses[0].should.equal("1234 High St, Portland, Oregon");
  });
  it("phone should equal same Phone", function() {
    var testContact = Object.create(Contact);
    testContact.phones = [];
    var testPhone = Object.create(Phone);
    testPhone.number = "404 770 9821";
    testContact.phones.push(testPhone.number);
    testContact.phones[0].should.equal("404 770 9821");
  });
}); */
