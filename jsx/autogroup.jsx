#target illustrator
exp = prompt("蘭雅提示：选择数量不要过多\n\n请输入容差数值(mm)：", "1", "蘭雅AI智能群组 lyvba.com");

var mm = 25.4 / 72;  // pt 和 mm 转换系数
Box_AutoGroup(exp / mm);
function Box_AutoGroup(exp) {
    var doc = activeDocument;

    if (doc.selection.length > 1) {
        var sr = doc.selection; 	// 定义选择物件
        var boxes = [];             // 初始化 boxs 为一个空数组

if (sr.length > 3500)  alert("选择物件数量过多, 请选择2500个以下", "蘭雅AI方框智能群组 lyvba.com");
if (sr.length > 5000)  return;
        
// app.activeDocument.selection = null;   //  清除当前选择
var start = new Date().getTime();

        for (var i = 0; i < sr.length; i++) {
            var bound = sr[i].geometricBounds;
            // box 是物件的边界: x , y , w , h   // 左 上 宽 高
            var box = [bound[0], bound[1], bound[2] - bound[0], bound[1] - bound[3]];
            if (exp !== 0) {
                box = expand_bounding_box(box, exp);
            }
            boxes.push(box);
        }

        var groups = groupIntersectingBoxes(boxes);

        // 取出分组的索引，然后按分组群组
        for (var i = 0; i < groups.length; i++) {
            var len = groups[i].length;
            if (len > 1) {
                var newGroup = doc.groupItems.add();
                for (var j = 0; j < len ;j++) {
                    var item = sr[groups[i][j]];
                    item.moveToEnd(newGroup);
                }
            }
        }

var end = new Date().getTime();
alert("运行时间:" + (end - start).toFixed(2) + "毫秒\n选择物件: " + sr.length + " 个, 批量群组后共 " + groups.length + "个群组",
    "蘭雅AI方框智能群组 lyvba.com");

// 输出记录
// var content = "";
// for (var i = 0; i < Groups.length; i++) {
//     content += Groups[i] + "\n";
// }
// for (var i = 0; i < boxs.length; i++) {
//     var box = boxs[i];
//     content += box[0] + ", " + box[1] + ", " + box[2] + ", " + box[3] + "\n";
// }
// // 写入文本文件
// var file = new File("R:/boxs.txt"); // 修改为你想要保存的位置
// file.open('w'); // 打开文件以写入
// file.write(content); // 写入内容
// file.close(); // 关闭文件
    }
}

// 扩展边界框
function expand_bounding_box(box, exp) {
    return [
        box[0] - exp,      // 向左扩展
        box[1] - exp,      // 向上扩展
        box[2] + 2 * exp,  // 宽度扩展
        box[3] + 2 * exp   // 高度扩展
    ];
}

// 判断两个矩形是否相交
function intersectRect(rect1, rect2) {
    return !(rect1[0] > rect2[0] + rect2[2] ||
        rect2[0] > rect1[0] + rect1[2] ||
        rect1[1] < rect2[1] - rect2[3] ||
        rect2[1] < rect1[1] - rect1[3]);
}

// 分组相交的矩形
function groupIntersectingBoxes(boxes) {
    var parent = [];
    for (var i = 0; i < boxes.length; i++) {
        parent[i] = i;  // 初始化 parent 数组
    }

    function find(x) {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }

    function union(x, y) {
        var rootX = find(x);
        var rootY = find(y);
        if (rootX !== rootY) {
            parent[rootY] = rootX;
        }
    }

    for (var i = 0; i < boxes.length; i++) {
        for (var j = i + 1; j < boxes.length; j++) {
            if (intersectRect(boxes[i], boxes[j])) {
                union(i, j);
            }
        }
    }

    var groupsMap = {};
    for (var i = 0; i < boxes.length; i++) {
        var root = find(i);
        if (!groupsMap[root]) {
            groupsMap[root] = [];
        }
        groupsMap[root].push(i);
    }

    var groups = [];
    for (var key in groupsMap) {
        if (groupsMap.hasOwnProperty(key)) {
            groups.push(groupsMap[key]);
        }
    }

    return groups;
}