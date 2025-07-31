// 功能: 在当前图层中选中所有与选中对象尺寸相近的对象

// 获取当前文档
var doc = app.activeDocument;

// 获取选中的对象
var sel = doc.selection;

// 确保有选中对象
if (sel.length === 0) {
    alert("请先选择一个对象。");
} else {
    var w = sel[0].width;
    var h = sel[0].height;

    // 设置容差值
    var tolerance = 0.5; // 可以根据需要调整容差值

    // 清空当前选择
    doc.selection = null;

    // 获取当前图层
    var currentLayer = doc.activeLayer;

    // 遍历当前图层中的所有对象并选中相同尺寸的对象
    for (var i = 0; i < currentLayer.pageItems.length; i++) {
        var item = currentLayer.pageItems[i];
        if (Math.abs(item.width - w) <= tolerance && Math.abs(item.height - h) <= tolerance) {
            item.selected = true;
        }
    }

    alert("已选中当前图层中所有与选中对象尺寸相近的对象。");
}