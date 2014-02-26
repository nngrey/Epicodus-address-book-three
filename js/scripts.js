var Contact = {  
  all: [],
  create: function(firstName, lastName) {
    var contact = Object.create(Contact);
    contact.initialize(firstName, lastName);
    this.all.push(contact);
    return contact;
  },
  initialize: function(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.addresses = [];
    this.phones = [];
    this.stop = false;
  },
  createAddress: function(street, city, state) {
    var address = Address.create(street, city, state);
    if (address.valid()) {
      this.addresses.push(address.fullAddress());
      return address;
    } else {
      this.stop = true;
      alert("Invalid Address");
      return null;
    }
  },
  createPhone: function(number) {
    var phone = Phone.create(number);
    if (phone.valid()) {
      this.phones.push(phone.number);
      return phone;
    } else {
      this.stop = true;
      alert("Invalid Phone Number");
      return null;
    }
  },
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
}

var Address = {  
  create: function(street, city, state) {
    var address = Object.create(Address);
    address.initialize(street, city, state);
    return address;
  },
  initialize: function(street, city, state) {
    this.street = street;
    this.city = city;
    this.state = state;
  },
  fullAddress: function() {
    return this.street + ", " + this.city + ", " + this.state;
  },
  valid: function() {
    var re = /\d+\s{1}\w+\s*\w*\,\s{1}\w+\,\s{1}\w+/;
    return re.test(this.fullAddress());   
  }
};


var Phone = {
  create: function(number) {
    var phone = Object.create(Phone);
    phone.initialize(number);
    return phone;
  },  
  initialize: function(number) {
    this.number = number;
  }, 
  valid: function() {
    var re = /\d{10}/;
    return re.test(this.number);
  }
}


$(document).ready(function() {
  $("#add-address").click(function() {
    $("#new-addresses").append('<div class="new-address">' + 
                                 '<div class="form-group">' + 
                                   '<label for="new-street">Street</label>' + 
                                   '<input type="text" class="form-control new-street">' + 
                                 '</div>' + 
                                 '<div class="form-group">' + 
                                   '<label for="new-city">City</label><br />' + 
                                   '<input type="text" class="new-city">' + 
                                 '</div>' + 
                                 '<div class="form-group">' + 
                                   '<label for="new-state">State</label><br />' + 
                                   '<input type="text" class="new-state">' + 
                                 '</div>' + 
                               '</div>');
  });

  $("#add-phone").click(function() {
    $("#new-phones").append('<div class="a-phone">' +
                              '<div class="form-group">' +
                                '<label for="new-phone">Phone:</label><br>' +
                                '<input class="new-phone" maxlength="10" type="text">' +
                              '</div><br>' +
                            '</div>');
  });

  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var stop = false;

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();

    var newContact = Contact.create(inputtedFirstName, inputtedLastName);

    // Do Phone Number display loop
    $(".a-phone").each(function() {
      var inputtedPhone = $(this).find("input.new-phone").val();
      newContact.createPhone(inputtedPhone);

    });

    if (newContact.stop) {
      return;
    }

    // Do Address display loop
    $(".new-address").each(function() {
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      
      newContact.createAddress(inputtedStreet, inputtedCity, inputtedState);
    });

    if (newContact.stop) {
      return;
    }


    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    $(".contact").last().click(function() {
      $("#show-contact").show();

      $("#show-contact h2").text(newContact.fullName());
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);

      $("ul#phone-numbers").text("");
      newContact.phones.forEach(function(phone) {
        $("ul#phone-numbers").append("<li>" + phone + "</li>");
      });

      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address + "</li>");
      });
    });
    this.reset();
  });
});



