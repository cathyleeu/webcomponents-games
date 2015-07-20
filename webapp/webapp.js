if (Meteor.isClient) {

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  Meteor.methods({
    getMazeList: function () {
      this.unblock();
      var json = Assets.getText("maze/list.json");
      return JSON.parse(json);
    },
    getMaze: function (type, step) {
      this.unblock();
      var json = Assets.getText("maze/" + type + "/" + step + ".json");
      return JSON.parse(json);
    }
  });
}
