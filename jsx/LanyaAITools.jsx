#target illustrator
#targetengine main

var vs = "illustrator-" + app.version.substr(0, 2);
var panel = new Window("palette", "蘭雅 Adobe Illustrator 工具箱© 2023.11.11");

// 创建面板 使用 new Window("palette") ，需要 BridgeTalk, 它是 Adobe 应用程序之间进行通信的一种机制。
// 它允许不同的 Adobe 应用程序在同一台计算机上进行交互和数据共享。
// var bt = new BridgeTalk();
// bt.target = "photoshop"; // 目标应用程序名称
// bt.body = "alert('Hello from Illustrator!')"; // 要发送的消息或脚本
// bt.send();
// 实际代码建立 buildMsg(code) 函数传送代码
function buildMsg(code) {
  try {
    var bt = new BridgeTalk;
    bt.target = vs;
    var msg = code;
    bt.body = msg;
    bt.send();
  } catch (e) { }
}

with (panel) {
  // 创建按钮组
  var BtGroup1 = panel.add("group");
  var BtGroup2 = panel.add("group");

  // 设置按钮组为水平布局
  BtGroup1.orientation = "row";
  BtGroup2.orientation = "row";

  // 添加按钮
  var button1 = BtGroup1.add("button", undefined, "标注尺寸");
  var button2 = BtGroup1.add("button", undefined, "文件名日期");
  var button3 = BtGroup1.add("button", undefined, "借咬口5mm");
  var button4 = BtGroup1.add("button", undefined, "尺寸取整");

  var button5 = BtGroup2.add("button", undefined, "拼版左上对齐");
  var button6 = BtGroup2.add("button", undefined, "物件尺寸大小");
  var button7 = BtGroup2.add("button", undefined, "物件轮廓边界");

  // 设置按钮组的边缘间距  设置按钮间距
  BtGroup1.spacing = 2; // 调整按钮之间的间距
  BtGroup2.spacing = 2;

  // 按钮点击事件处理程序
  button1.onClick = function () {
    buildMsg("make_size();");
  };

  button2.onClick = function () {
    buildMsg("filename_date();");
  };

  button3.onClick = function () {
    buildMsg("mark_5mm();");
  };

  button4.onClick = function () {
    buildMsg("size_to_integer();");
  };

  button5.onClick = function () {
    buildMsg("replace_align_position();");
  };

  button6.onClick = function () {
    buildMsg("size_by_width_height();");
  };

  button7.onClick = function () {
    buildMsg("size_by_controlBounds();");
  };
}
// 显示面板
panel.show();

//==================================================================================//
// 蘭雅 Adobe Illustrator 工具箱© 2023.11.11  各个按钮功能模块
//==================================================================================//
// 标注尺寸
function make_size() {
  // 定义当前激活文档
  var docRef = activeDocument;
  var mm = 25.4 / 72;  // pt 和 mm 转换系数
  var myFont = textFonts.getByName("MicrosoftYaHei");
  var myFontSize = 24;
  var x, y;

  // 格式化尺寸为 mm 取整数
  function formatSize(size) {
    return Math.round(size * mm).toFixed(0);
  }

  // 设置填充颜色为CMYK红色 (0, 100, 100, 0)
  var cmykRed = new CMYKColor();
  cmykRed.cyan = 0;
  cmykRed.magenta = 100;
  cmykRed.yellow = 100;
  cmykRed.black = 0;

  function writeText(text) {
    var textRef = docRef.textFrames.add();    // 建立文本
    textRef.contents = text;
    textRef.textRange.characterAttributes.size = myFontSize;   // 设置字体尺寸
    textRef.textRange.characterAttributes.textFont = myFont;   // 设置字体名称
    textRef.textRange.characterAttributes.fillColor = cmykRed;   // 设置颜色
    textRef.top = y + 15 / mm;
    textRef.left = x + 10 / mm;
  }

  // 遍历选择的物件标注尺寸
  if (docRef.selection.length > 0) {
    var mySelection = docRef.selection;
    for (var i = 0; i < mySelection.length; i++) {
      var s = mySelection[i]
      x = s.left; y = s.top
      var str = formatSize(s.width) + "x" + formatSize(s.height) + "mm";
      writeText(str)
    }
  }

}

// 文件名日期
function filename_date() {
  // 获取当前时间
  function getdate() {
    var d = new Date(), month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  // 获取 AI文档名称
  var docRef = activeDocument;
  var str = docRef.name;
  str = str + "     " + getdate();

  // alert("本脚本建立一个文本:\n" + str);

  // 文档中建立一个新文本
  // var textRef = docRef.textFrames.add();
  // textRef.top = 100;
  // textRef.left = 200;
  // textRef.contents = str;

  var mm = 25.4 / 72;  // pt 和 mm 转换系数

  var base = new Array();
  base = docRef.rulerOrigin;    // 画板标尺原点，相对于画板的左上角
  // alert("画板标尺原点mm  x:" + base[0] * mm +" y:" + base[1] * mm + "\n画板大小mm 宽:" + docRef.width * mm +"  高:" + docRef.height * mm);

  var pw = 0;
  var ph = 0;
  var x = base[0];    // 画板左下角 x 坐标
  var y = - base[1];  // 画板左下角 y 坐标
  var myFont = textFonts.getByName("MicrosoftYaHei");
  var myFontSize = 8;

  pw = docRef.width;  //  文档宽
  ph = docRef.height; //  文档高
  x = pw / 2 - x;     //  转换x坐标: 画板中下x

  function filenameDate() {
    var textRef = docRef.textFrames.add();    // 建立文本
    textRef.contents = str;                   // 填充文本字符串:   AI文档名称 + 时间
    textRef.textRange.characterAttributes.size = myFontSize;   // 设置字体尺寸
    textRef.textRange.characterAttributes.textFont = myFont;   // 设置字体名称
    textRef.textRange.characterAttributes.fillColor = docRef.swatches[1].color;   // 设置拼版色
    textRef.top = y + 7.4;    // 画板底向上偏移
    textRef.left = x - textRef.width - 10;   // 画板x中，偏移文本宽和间隔宽
  }

  filenameDate();

}

// 借咬口5mm
function mark_5mm() {
  // 获取 AI文档名称
  var docRef = activeDocument;
  var str = docRef.name;
  str = "借咬口5mm"
  var mm = 25.4 / 72;  // pt 和 mm 转换系数

  var base = new Array();
  base = docRef.rulerOrigin;    // 画板标尺原点，相对于画板的左上角

  var pw = 0;
  var ph = 0;
  var x = base[0];    // 画板左下角 x 坐标
  var y = - base[1];  // 画板左下角 y 坐标
  var myFont = textFonts.getByName("MicrosoftYaHei");
  var myFontSize = 64;

  pw = docRef.width;  //  文档宽
  ph = docRef.height; //  文档高
  x = pw / 2 - x;     //  转换x坐标: 画板中下x


  // 设置填充颜色为CMYK红色 (0, 100, 100, 0)
  var cmykRed = new CMYKColor();
  cmykRed.cyan = 0;
  cmykRed.magenta = 100;
  cmykRed.yellow = 100;
  cmykRed.black = 0;

  function writeText() {
    var textRef = docRef.textFrames.add();    // 建立文本
    textRef.contents = str;                   // 填充文本字符串:   AI文档名称 + 时间
    textRef.textRange.characterAttributes.size = myFontSize;   // 设置字体尺寸
    textRef.textRange.characterAttributes.textFont = myFont;   // 设置字体名称
    textRef.textRange.characterAttributes.fillColor = cmykRed  // docRef.swatches[4].color;  // 从颜色版取色简单，但是结果不确定
    textRef.top = y - 15;    // 画板底向上偏移
    textRef.left = x - textRef.width / 2;   // 画板x中，偏移文本宽和间隔宽
  }
  writeText();
}

// 尺寸取整
function size_to_integer() {
  // 定义当前激活文档
  var doc = activeDocument;
  var mm = 25.4 / 72;  // pt 和 mm 转换系数

  // 格式化尺寸为 mm 取整数
  function formatSize(size) {
    return Math.round(size * mm).toFixed(0);
  }

  // 遍历选择的物件尺寸取整
  if (doc.selection.length > 0) {
    var src = doc.selection;
    for (var i = 0; i < src.length; i++) {
      var s = src[i]
      s.width = formatSize(s.width) / mm
      s.height = formatSize(s.height) / mm
    }
  }

}

// 物件轮廓边界
function size_by_controlBounds() {
  var docRef = activeDocument;
  // 判断选择物件2个以上
  if (docRef.selection.length > 1) {
    // 定义选择物件
    mySelection = docRef.selection;

    // 最上层物件为替换源
    var sourceObj = docRef.selection[0];

    // 定义数组保存选择物件controlBounds
    var BoundsArray = new Array();

    for (var i = 0; i < mySelection.length; i++) {
      // PageItem.position  获得物件群组左上角坐标
      var sel_Bounds = mySelection[i].controlBounds;
      BoundsArray.push(sel_Bounds);
    }

    // PageItem.duplicate 复制对象, 需要一个相对对象定位
    var newGroup = sourceObj.parent.groupItems.add();
    for (var i = 1; i < BoundsArray.length; i++) {

      var width = BoundsArray[i][2] - BoundsArray[i][0];
      var height = BoundsArray[i][1] - BoundsArray[i][3];
      sourceObj.width = width;
      sourceObj.height = height;

      // 移动源文件到目的物件左上角对齐
      var sel_xy = new Array(BoundsArray[i][0], BoundsArray[i][1]);
      sourceObj.position = sel_xy;
      sourceObj.duplicate(newGroup, ElementPlacement.PLACEATEND);
    }
    sourceObj.remove();
  }
}

// 物件尺寸大小
function size_by_width_height() {
  var doc = activeDocument;
  // 判断选择物件2个以上
  if (doc.selection.length > 1) {
    // 定义选择物件
    src = doc.selection;
    var taget = doc.selection[0];

    // PageItem.position  获得物件群组左上角坐标
    // PageItem.duplicate 复制对象, 需要一个相对对象定位
    // 修改taget大小, 移动到src物件左上角对齐, 复制副本
    var newGroup = taget.parent.groupItems.add();
    for (var i = 1; i < src.length; i++) {
      var sel_xy = src[i].position;

      taget.width = src[i].width;
      taget.height = src[i].height;

      taget.position = sel_xy;
      taget.duplicate(newGroup, ElementPlacement.PLACEATEND);
    }
    taget.remove();
  }
}

// 拼版左上对齐
function replace_align_position() {
  var docRef = activeDocument;
  // 判断选择物件2个以上
  if (docRef.selection.length > 1) {
    // 定义选择物件
    mySelection = docRef.selection;

    // 最上层物件为替换源
    var sourceObj = docRef.selection[0];

    // 定义数组用来保存选择物件的左上角坐标
    var alterObjectArray = new Array();
    for (var i = 0; i < mySelection.length; i++) {
      // PageItem.position  获得物件群组左上角坐标
      var sel_xy = mySelection[i].position
      alterObjectArray.push(sel_xy);
    }
    // 删除用来定位的下层物件
    for (var i = 1; i < mySelection.length; i++) {
      mySelection[i].remove();
    }
    // PageItem.duplicate 复制对象, 需要一个相对对象定位
    var newGroup = sourceObj.parent.groupItems.add();
    for (var i = 1; i < alterObjectArray.length; i++) {
      sourceObj.position = alterObjectArray[i];     // 设置替换物的左上角位置，达到替换目的
      sourceObj.duplicate(newGroup, ElementPlacement.PLACEATEND);
    }
    sourceObj.remove();

  }
}