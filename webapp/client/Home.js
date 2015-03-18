Router.route('/', function () {
  this.render('Home');
});

// counter starts at 0
Session.setDefault('counter', 0);

Template.Home.helpers({
  counter: function () {
    return Session.get('counter');
  }
});

Template.Home.events({
  'click button': function () {
    // increment the counter when button is clicked
    Session.set('counter', Session.get('counter') + 1);
  }
});
