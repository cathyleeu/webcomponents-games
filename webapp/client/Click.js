Router.route('/click', function () {
  this.render('Click');
});

var index = 1;
function addBubble(index) {
  $("#container").append( Blaze.toHTMLWithData(Template.Bubble, {index:index}) );
}

Template.Click.rendered = function() {
  if(!this._rendered) {
    this._rendered = true;
    addBubble(index++);
    addBubble(index++);
    addBubble(index++);
    console.log('Template onLoad');
  }
};

Template.Click.events({
  'click .bubble': function (e) {
    $(e.target).remove();
    if(index <= 10 ) {
      addBubble(index++);
    }
  }
});
