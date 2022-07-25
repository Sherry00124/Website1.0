<table>
    <tr>
        <td @paste="pasteMe($event)"></td>
    </tr>
</table>
 
pasteMe() {

    let self = this;
    var data = null;
    var clipboardData = e.clipboardData; // IE
    if (!clipboardData) {
        //chrome
        clipboardData = e.originalEvent.clipboardData;
    }
    data = clipboardData.getData("Text");
}

pasteExcel() {
    let self = this;
      var data = null;
      var clipboardData = e.clipboardData; // IE
      if (!clipboardData) {
        //chrome
        clipboardData = e.originalEvent.clipboardData;
      }
      data = clipboardData.getData("Text");
      var rowStrArray = data.split("\n");
      var rows = [];
      for (var i = 0; i < rowStrArray.length; i++) {
        var row = [];
        var tdStrArray = rowStrArray[i].split("\t");
        for (var j = 0; j < tdStrArray.length; j++) {
          row.push(tdStrArray[j]);
        }
        rows.push(row);
      }
      //rows就是获得复制excel的二维数组
}