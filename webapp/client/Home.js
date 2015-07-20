Router.route('/', function () {
  this.render('Home');
});

Template.Home.created = function (){
  Meteor.call('getMazeList', function(error, result) {
    Session.set("mazeList", result);
  });
}

Template.Home.rendered = function() {
  if(!this._rendered) {
    this._rendered = true;

  }
};

Template.Home.helpers({
  list: function() {
    return Session.get('mazeList');
  },
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
