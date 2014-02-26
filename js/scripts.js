var Contact = {
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
};

var Address = {
  fullAddress: function() {
    return this.street + ", " + this.city + ", " + this.state;
  },
  valid: function() {
    var re = /\d+\s{1}\w+\s*\w*\,\s{1}\w+\,\s{1}\w+/;
    return re.test(this.fullAddress());   
  }
};

var Phone = {
  valid: function() {
    var re = /\d{3}\s{1}\d{3}\s{1}\d{4}/;
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
                                   '<label for="new-city">City</label>' + 
                                   '<input type="text" class="form-control new-city">' + 
                                 '</div>' + 
                                 '<div class="form-group">' + 
                                   '<label for="new-state">State</label>' + 
                                   '<input type="text" class="form-control new-state">' + 
                                 '</div>' + 
                               '</div>');
  });

  $("#add-phone").click(function() {
    $("#new-phones").append('<div class="a-phone">' +
                              '<div class="form-group">' +
                                '<label for="new-phone">Phone:</label><br>' +
                                '<input class="new-phone" type="text">' +
                              '</div><br>' +
                            '</div>');
  });

  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var stop = false;

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
 
    var newContact = Object.create(Contact);

    newContact.firstName = inputtedFirstName;
    newContact.lastName = inputtedLastName;

    newContact.phones = [];
    newContact.addresses = [];
    

    // Do Phone Number display loop
    $(".a-phone").each(function() {
      var inputtedPhone = $(this).find("input.new-phone").val();
      var newPhone = Object.create(Phone);
      newPhone.number = inputtedPhone;
      console.log(inputtedPhone);

      if (newPhone.valid()) {
        newContact.phones.push(newPhone.number);
      } else {
        alert("You have an invalid Phone Number format");
        stop = true;
      }
    });

    if (stop) {
      return;
    }

    // Do Address display loop
    $(".new-address").each(function() {
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      
      var newAddress = Object.create(Address);
      newAddress.street = inputtedStreet;
      newAddress.city = inputtedCity;
      newAddress.state = inputtedState;

      if (newAddress.valid()) {
        newContact.addresses.push(newAddress.fullAddress());
      } else {
        alert("You have an invalid Address format");
        stop = true;
      }
    });

    if (stop) {
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



