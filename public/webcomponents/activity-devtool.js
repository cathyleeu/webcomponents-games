class actTool {
  constructor(doc){
    this.document = doc;
  }
  removeStatusBar(){
    let getEle = this.document.getElementById('element'),
        target = getEle.$.statusBar.shadowRoot;

    d3.select(target).select(".bar_cont").style("display", "none")
    console.log("removeStatusBar");
  }
  getCreateImageDots(){
    let getEle = this.document.getElementById('element');
    getEle.returnAxis()
  }
  // getScreenShot() {
  //   let canvas = this.document.createElement("canvas"),
  //       ctx = canvas.getContext("2d")
  // }
}
