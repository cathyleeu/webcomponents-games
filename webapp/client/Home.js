Router.route('/', function () {
  this.render('Home');
});

Template.Home.rendered = function() {
  if(!this._rendered) {
    this._rendered = true;

  }
};

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
