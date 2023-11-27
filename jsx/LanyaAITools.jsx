#target illustrator
#targetengine main

var vs = "illustrator-" + app.version.substr(0, 2);
var IconsFolder = "C:/TSP/icon";
var micro_distance = "1";
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
// 创建面板 使用 new Window("palette") ，需要 BridgeTalk, 它是 Adobe 应用程序之间进行通信的一种机制。
// 它允许不同的 Adobe 应用程序在同一台计算机上进行交互和数据共享。
// var bt = new BridgeTalk();
// bt.target = "photoshop"; // 目标应用程序名称
// bt.body = "alert('Hello from Illustrator!')"; // 要发送的消息或脚本
// bt.send();

icon_panel(); // main_panel();
function main_panel() {
  var panel = new Window("palette", "蘭雅 Adobe Illustrator 工具箱© 2023.11.11");
  panel.alignChildren = ["left", "top"];
  panel.spacing = 2;
  panel.margins = 3;

  // 创建按钮组
  var BtGroup1 = panel.add("group");
  var BtGroup2 = panel.add("group");

  // 设置按钮组为水平布局
  BtGroup1.orientation = "row";
  BtGroup2.orientation = "row";

  // 设置按钮组的边缘间距 
  BtGroup1.spacing = 2; // 调整按钮之间的间距
  BtGroup2.spacing = 2;

  // 添加按钮
  var button1 = BtGroup1.add("button", undefined, "标注尺寸");
  var button2 = BtGroup1.add("button", undefined, "批量旋转");
  var button3 = BtGroup1.add("button", undefined, "文件日期");
  var button4 = BtGroup1.add("button", undefined, "尺寸取整-微调-统一");

  var button5 = BtGroup2.add("button", undefined, "替换对齐-打包图片");
  var button6 = BtGroup2.add("button", undefined, "自动群组-调整尺寸");
  var button7 = BtGroup2.add("button", undefined, "尺寸复制");
  var button8 = BtGroup2.add("button", undefined, "▲");
  button8.preferredSize = [26, 26];

  button1.helpTip = "标注尺寸, <Alt>增强标注";
  button2.helpTip = "批量左转90度，<Alt>转180度, <Ctrl>任意角度";
  button3.helpTip = "咬口处插入文件名日期,<Alt>红色备注文字";
  button4.helpTip = "尺寸取整, <Alt-Ctrl-Shift>微调统一尺寸";
  button5.helpTip = "快速替换, <Alt>打包连接图";
  button6.helpTip = "自动群组, <Alt>调整尺寸";
  button7.helpTip = "尺寸复制, <Alt>包括轮廓";


  // 设置按钮大小与图片大小相同
  button8.preferredSize = [26, 26];

  button1.onClick = function () {
    if (ScriptUI.environment.keyboardState.ctrlKey) {
      buildMsg("shapes_info();");
    } else if (ScriptUI.environment.keyboardState.altKey) {
      make_size_plus();
    } else {
      buildMsg("make_size();");
    }
  };

  button2.onClick = function () {
    if (ScriptUI.environment.keyboardState.ctrlKey) {
      // Ctrl 加鼠标左键，自定义数字
      var input = prompt("请输入角度数字:", "45");
      if (!isNaN(parseFloat(input)))
        buildMsg("shapes_rotate(" + input + ");");
    } else if (ScriptUI.environment.keyboardState.altKey) {
      buildMsg("shapes_rotate(180);");
    } else {
      buildMsg("shapes_rotate(90);");
    }
  };

  button3.onClick = function () {
    if (ScriptUI.environment.keyboardState.altKey) {
      buildMsg("mark_5mm();");
    } else {
      buildMsg("filename_date();");
    }
  };

  button4.onClick = function () {
    if (ScriptUI.environment.keyboardState.ctrlKey) {
      buildMsg("modify_size(-" + micro_distance + ", -" + micro_distance + ");");
    } else if (ScriptUI.environment.keyboardState.altKey) {
      buildMsg("modify_size(" + micro_distance + ", " + micro_distance + ");");
    } else if (ScriptUI.environment.keyboardState.shiftKey) {
      //  alert("ScriptUI.environment.keyboardState.shiftKey");
      var input = prompt("请输如宽和高两个数字(例如: 100 80):", "100 80");

      // 使用正则表达式匹配数字
      var regex = /(\d+)\s*(\d+)/;
      var match = input.match(regex);

      if (match) {
        var number1 = parseInt(match[1]);
        var number2 = parseInt(match[2]);
        buildMsg("set_size(" + number1 + ", " + number2 + ");");
      } else {
        alert("输入格式不正确！");
      }
    } else {
      buildMsg("size_to_integer();");
    }
  };

  button5.onClick = function () {
    if (ScriptUI.environment.keyboardState.altKey) {
      buildMsg("img_pack_links();");
    } else {
      buildMsg("replace_align_position();");
    }
  };

  button6.onClick = function () {
    if (ScriptUI.environment.keyboardState.altKey) {
      ResizeToSize();
    } else {
      auto_group();
    }
  };

  button7.onClick = function () {
    if (ScriptUI.environment.keyboardState.altKey) {
      buildMsg("size_by_controlBounds();");
    } else {
      buildMsg("size_by_width_height();");
    }
  };

  button8.onClick = function () {
    icon_panel();
    panel.close();
  };

  // 显示面板
  panel.show();
}

function icon_panel() {
  var panel = new Window("palette", "©蘭雅 Adobe Illustrator 工具箱");
  panel.onClose = function () {
    saveWindowPosition(panel);
  };
  panel.alignChildren = ["left", "top"];
  panel.spacing = 2;
  panel.margins = 3;
  // 创建按钮组
  var BtGroup1 = panel.add("group");
  var BtGroup2 = panel.add("group");

  // 设置按钮组为水平布局
  BtGroup1.orientation = "row";
  BtGroup2.orientation = "row";

  // 设置按钮组的边缘间距 
  BtGroup1.spacing = 2; // 调整按钮之间的间距
  BtGroup2.spacing = 2;

  // scriptFile = new File($.fileName); // 获取当前脚本文件的路径
  // var iconFile = new File(scriptFile.path + "/icon/icon.png"); // 拼接图标文件的完整路径

  var iconF1 = IconsFolder + "/size.png";
  var iconF2 = IconsFolder + "/icon.png";
  var iconF3 = IconsFolder + "/mark.png";
  var iconF4 = IconsFolder + "/debug.png";
  var iconF5 = IconsFolder + "/replace.png";
  var iconF6 = IconsFolder + "/gpucard.png";
  var iconF7 = IconsFolder + "/byBounds.png";
  var iconF8 = IconsFolder + "/repeat.png";

  // 添加图标按钮
  var button1 = BtGroup1.add("iconbutton", undefined, iconF1);
  var button2 = BtGroup1.add("iconbutton", undefined, iconF2);
  var button3 = BtGroup1.add("iconbutton", undefined, iconF3);
  var button4 = BtGroup1.add("iconbutton", undefined, iconF4);

  var button5 = BtGroup2.add("iconbutton", undefined, iconF5);
  var button6 = BtGroup2.add("iconbutton", undefined, iconF6);
  var button7 = BtGroup2.add("iconbutton", undefined, iconF7);
  var button8 = BtGroup2.add("iconbutton", undefined, iconF8);

  button1.helpTip = "标注尺寸, <Alt>增强标注";
  button2.helpTip = "批量左转90度，<Alt>转180度, <Ctrl>任意角度";
  button3.helpTip = "咬口处插入文件名日期,<Alt>红色备注文字";
  button4.helpTip = "尺寸取整, <Alt-Ctrl-Shift>微调统一尺寸";
  button5.helpTip = "左上对齐快速替换, <Alt>打包连接图";
  button6.helpTip = "自动群组, <Alt>调整尺寸";
  button7.helpTip = "尺寸复制, <Alt>包括轮廓";
  button8.helpTip = "<Ctrl>微调距离, 最小化窗口";


  // 设置按钮大小与图片大小相同
  button1.preferredSize = [48, 48];
  button2.preferredSize = [48, 48];
  button3.preferredSize = [48, 48];
  button4.preferredSize = [48, 48];
  button5.preferredSize = [48, 48];
  button6.preferredSize = [48, 48];
  button7.preferredSize = [48, 48];
  button8.preferredSize = [48, 48];


  button1.onClick = function () {
    if (ScriptUI.environment.keyboardState.ctrlKey) {
      buildMsg("shapes_info();");
    } else if (ScriptUI.environment.keyboardState.altKey) {
      make_size_plus();
    } else {
      buildMsg("make_size();");
    }
  };

  button2.onClick = function () {
    if (ScriptUI.environment.keyboardState.ctrlKey) {
      // Ctrl 加鼠标左键，自定义数字
      var input = prompt("请输入角度数字:", "45");
      if (!isNaN(parseFloat(input)))
        buildMsg("shapes_rotate(" + input + ");");
    } else if (ScriptUI.environment.keyboardState.altKey) {
      buildMsg("shapes_rotate(180);");
    } else {
      buildMsg("shapes_rotate(90);");
    }
  };

  button3.onClick = function () {
    if (ScriptUI.environment.keyboardState.altKey) {
      buildMsg("mark_5mm();");
    } else {
      buildMsg("filename_date();");
    }
  };

  button4.onClick = function () {
    if (ScriptUI.environment.keyboardState.ctrlKey) {
      buildMsg("modify_size(-" + micro_distance + ", -" + micro_distance + ");");
    } else if (ScriptUI.environment.keyboardState.altKey) {
      buildMsg("modify_size(" + micro_distance + ", " + micro_distance + ");");
    } else if (ScriptUI.environment.keyboardState.shiftKey) {
      //  alert("ScriptUI.environment.keyboardState.shiftKey");
      var input = prompt("请输如宽和高两个数字(例如: 100 80):", "100 80");

      // 使用正则表达式匹配数字
      var regex = /(\d+)\s*(\d+)/;
      var match = input.match(regex);

      if (match) {
        var number1 = parseInt(match[1]);
        var number2 = parseInt(match[2]);
        buildMsg("set_size(" + number1 + ", " + number2 + ");");
      } else {
        alert("输入格式不正确！");
      }
    } else {
      buildMsg("size_to_integer();");
    }
  };

  button5.onClick = function () {
    if (ScriptUI.environment.keyboardState.altKey) {
      buildMsg("img_pack_links();");
    } else {
      buildMsg("replace_align_position();");
    }
  };

  button6.onClick = function () {
    if (ScriptUI.environment.keyboardState.altKey) {
      ResizeToSize();
    } else {
      auto_group();
    }
  };

  button7.onClick = function () {
    if (ScriptUI.environment.keyboardState.altKey) {
      buildMsg("size_by_controlBounds();");
    } else {
      buildMsg("size_by_width_height();");
    }
  };

  button8.onClick = function () {
    if (ScriptUI.environment.keyboardState.ctrlKey) {
      micro_distance = prompt("设置微调距离(mm): ", micro_distance);
    } else if (ScriptUI.environment.keyboardState.altKey) {
      main_panel();
      panel.close();
    } else {
      mini_panel();
      panel.close();
    }
  };

  // 显示面板
  panel.show();
  // 恢复窗口位置
  restoreWindowPosition(panel);
}

function mini_panel() {
    var panel = new Window("palette", "");
    panel.spacing = 0;
    panel.margins = [0, 0, 0, 0];;
    var icon = IconsFolder + "/repeat.png";
    var button_mini = panel.add("iconbutton", undefined, icon);
    button_mini.preferredSize = [40, 40];
    button_mini.spacing = 0;
  
    button_mini.onClick = function () {
      icon_panel();
      panel.close();
    };
    panel.show();
    restoreWindowPosition(panel);
    panel.bounds.height = 42;
    panel.bounds.width = 50;
  }

// 保存窗口位置
function saveWindowPosition(window) {
  var position = window.bounds;
  var settingsFile = new File(IconsFolder + "/windowSettings.ini");
  settingsFile.open("w");
  settingsFile.write(position.left + "," + position.top + "," + position.right + "," + position.bottom);
  settingsFile.close();
}

// 恢复窗口位置
function restoreWindowPosition(window) {
  var settingsFile = new File(IconsFolder + "/windowSettings.ini");
  if (settingsFile.exists) {
    settingsFile.open("r");
    var position = settingsFile.read().split(",");
    settingsFile.close();
    window.bounds.left = parseInt(position[0]);
    window.bounds.top = parseInt(position[1]);
    window.bounds.right = parseInt(position[2]);
    window.bounds.bottom = parseInt(position[3]);
  }
}

//==================================================================================//
// 蘭雅 Adobe Illustrator 工具箱© 2023.11.11  各个按钮功能模块
//==================================================================================//
var mm = 25.4 / 72;  // pt 和 mm 转换系数
// 格式化尺寸为 mm 取整数
function formatSize(size) {
  return Math.round(size * mm).toFixed(0);
}

// 获得选择对象的边界框
function get_Sel_Bounds() {
  var totalBounds = null;
  var sr = app.activeDocument.selection;
  for (var i = 0; i < sr.length; i++) {
    var item = sr[i];

    // 获取对象的边界框
    var bounds = item.geometricBounds;

    // 更新总范围
    if (totalBounds === null) {
      totalBounds = bounds.slice(); // 创建边界框的副本
    } else {
      totalBounds[0] = Math.min(totalBounds[0], bounds[0]); // 左边界
      totalBounds[1] = Math.max(totalBounds[1], bounds[1]); // 上边界
      totalBounds[2] = Math.max(totalBounds[2], bounds[2]); // 右边界
      totalBounds[3] = Math.min(totalBounds[3], bounds[3]); // 下边界
    }
  }
  return totalBounds;
}

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

// 统计物件信息
function shapes_info() {
  var sr = app.activeDocument.selection;
  var str = "选择物件总数:" + sr.length + "\n";
  for (var i = 0; i < sr.length; i++) {
    var s = sr[i];
    var size = formatSize(s.width) + "x" + formatSize(s.height) + "mm";
    if (i < 5) str += "第" + (i + 1) + "个尺寸: " + size + "\n";
  }
  alert(str);
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

  var base = new Array();
  base = docRef.rulerOrigin;    // 画板标尺原点，相对于画板的左上角

  // 默认使用文档页面作为范围
  var pw = docRef.width;  //  文档宽
  var ph = docRef.height; //  文档高
  var x = base[0];    // 画板左下角 x 坐标
  var y = - base[1];  // 画板左下角 y 坐标
  x = pw / 2 - x;     //  转换x坐标: 画板中下x

  // 如果选择物件，使用物件范围
  if (app.activeDocument.selection.length > 0) {
    var bounds = new Array();
    bounds = get_Sel_Bounds();
    x = (bounds[0] + bounds[2]) / 2;
    y = bounds[3];
  }

  var myFont = textFonts.getByName("MicrosoftYaHei");
  var myFontSize = 8;

  function writeText() {
    var textRef = docRef.textFrames.add();    // 建立文本
    textRef.contents = str;                   // 填充文本字符串:   AI文档名称 + 时间
    textRef.textRange.characterAttributes.size = myFontSize;   // 设置字体尺寸
    textRef.textRange.characterAttributes.textFont = myFont;   // 设置字体名称
    textRef.textRange.characterAttributes.fillColor = docRef.swatches[1].color;   // 设置拼版色
    textRef.top = y + 7.4;    // 画板底向上偏移
    textRef.left = x - textRef.width - 10;   // 画板x中，偏移文本宽和间隔宽
    textRef.selected = true;
  }
  writeText();
}

// 借咬口5mm
function mark_5mm() {
  // 获取 AI文档名称
  var docRef = activeDocument;
  var str = docRef.name;
  str = "借咬口5mm"

  var base = new Array();
  base = docRef.rulerOrigin;    // 画板标尺原点，相对于画板的左上角

  // 默认使用文档页面作为范围
  var x = base[0];    // 画板左下角 x 坐标
  var y = - base[1];  // 画板左下角 y 坐标
  x = docRef.width / 2 - x;     //  转换x坐标: 画板中下x

  // 如果选择物件，使用物件范围
  if (app.activeDocument.selection.length > 0) {
    var bounds = new Array();
    bounds = get_Sel_Bounds();
    x = (bounds[0] + bounds[2]) / 2;
    y = bounds[3];
  }

  var myFont = textFonts.getByName("MicrosoftYaHei");
  var myFontSize = 144;

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
    textRef.top = y - 144;
    textRef.left = x - textRef.width / 2;   // 画板x中，偏移文本宽和间隔宽
    textRef.selected = true;
  }
  writeText();
}

// 批量修改尺寸
function set_size(x, y) {
  var sr = app.activeDocument.selection;
  for (var i = 0; i < sr.length; i++) {
    var s = sr[i];
    var scale_x = x / mm / s.width * 100;
    var scale_y = y / mm / s.height * 100;

    // X, Y, Positions, FillPatterns, FillGradients, StrokePattern, LineWidths
    s.resize(scale_x, scale_y, true, true, true, true, 100);
  }
}

// 批量增加减少尺寸
function modify_size(x, y) {
  var sr = app.activeDocument.selection;
  for (var i = 0; i < sr.length; i++) {
    var s = sr[i];
    var scale_x = (formatSize(s.width) / mm + x / mm) / s.width * 100;
    var scale_y = (formatSize(s.height) / mm + y / mm) / s.height * 100;
    s.resize(scale_x, scale_y);
  }
}

// 遍历选择的物件尺寸取整
function size_to_integer() {
  var sr = app.activeDocument.selection;
  for (var i = 0; i < sr.length; i++) {
    var s = sr[i];
    var scale_x = formatSize(s.width) / mm / s.width * 100;
    var scale_y = formatSize(s.height) / mm / s.height * 100;
    s.resize(scale_x, scale_y);
  }
}

// 批量物件旋转角度
function shapes_rotate(angle) {
  var sr = app.activeDocument.selection;
  for (var i = 0; i < sr.length; i++)
    sr[i].rotate(angle);
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

// 读取加载jsxbin文件，传递给AI软件
function load_jsxbin(file) {
  var file = new File(file);
  if (file.open('r')) {
    var fileContent = file.read();
    file.close();
    buildMsg(fileContent);
  } else {
    alert('文件打开失败: ' + file);
  }
}
//==========  以下插件引用使用互联网各位大大的插件  =================//
// 标注尺寸增强版 V2.1
function make_size_plus() { load_jsxbin(IconsFolder + "/makesize.dat"); }
// 自动群组
function auto_group() { load_jsxbin(IconsFolder + "/autogroup.dat"); }
// 调整尺寸
function ResizeToSize() { load_jsxbin(IconsFolder + "/resize.dat"); }
// 打包链接图片
function img_pack_links() { load_jsxbin(IconsFolder + "/packlinks.dat"); }