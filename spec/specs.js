describe("Contact", function() {
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
});

describe("Address", function() {
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
});
