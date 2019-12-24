

var data = {
  sideBar: {
    layers: ['Layers', '图层'],
    assets: ['Assets', '资源'],
    file: ['File', '文件'],
  }
}



setTimeout(() => {
  function getElementByAttr(tag, attr, value) {
    var aElements = document.getElementsByTagName(tag);
    for (var i = 0; i < aElements.length; i++) {
      
      aElements[i].setAttribute(attr, data.sideBar.layers[1]);
    }
  }


  getElementByAttr('div', 'data-label', data.sideBar.layers[0]);
  // getElementByAttr('div', 'data-label', data.sideBar.assets[0])
  // getElementByAttr('div', 'data-label', data.sideBar.file[0])
  // document.querySelector('.pages_panel--tabActive--JOVKa').setAttribute("data-label", data.sideBar.layout);
}, 6000);