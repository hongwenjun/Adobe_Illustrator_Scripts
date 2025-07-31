var doc = app.activeDocument;
var pi = doc.placedItems;
doc.selection = null;
var u = 2.834646; // mm 换算
if (pi.length == 0) {
    alert("文档上没有链接图");
} else {
    for (var i = 0; i != pi.length; ++i) {
        var placedPath = pi[i].file;
        var placedName = pi[i].file.displayName;
        var pathName = pi[i].file.fullName;
        var txt = doc.textFrames.add();
        if (false) {
            // 屏蔽文件路径和名字
            txt.contents = pathName.toString();
        } else {
            txt.contents = placedName.toString()
        }
        var m100 = new CMYKColor();
        m100.magenta = 100;

        txt.textRange.characterAttributes.size = 8 * u;
        txt.textRange.characterAttributes.fillColor = m100
        txt.left = pi[i].left;
        txt.top = pi[i].top - pi[i].height - 8 * u;
    }
}