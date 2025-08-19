#target illustrator

// 设置当前文档
var doc = activeDocument;
var str = doc.name;
str = "材料尺寸: " 
var mm = 25.4 / 72;  // pt 和 mm 转换系数

var base = new Array();
base = doc.rulerOrigin;    // 画板标尺原点，相对于画板的左上角

var pw = 0;
var ph = 0;
var x = base[0];    // 画板左下角 x 坐标
var y = - base[1];  // 画板左下角 y 坐标
var myFont = textFonts.getByName("MicrosoftYaHei");
var myFontSize = 72;

pw = doc.width;  //  文档宽
ph = doc.height; //  文档高
x = pw / 2 - x;     //  转换x坐标: 画板中下x

if (pw < ph){   // 交换 pw 和 ph 的值
    var temp = pw; 
    pw = ph;
    ph = temp;
}

pwcm = (pw * mm + 3 ) / 10.0;
phcm = (ph * mm + 12 ) / 10.0;
str += pwcm.toFixed(0) + "x" + phcm.toFixed(0) + "cm  数量:" ;

// 设置填充颜色为CMYK红色 (0, 100, 100, 0)
var cmykRed = new CMYKColor();
cmykRed.cyan = 0;  cmykRed.magenta = 100;
cmykRed.yellow = 100;  cmykRed.black = 0;

function writeText() {
  var textRef = doc.textFrames.add();    // 建立文本
  textRef.contents = str;                   // 填充文本字符串
  textRef.textRange.characterAttributes.size = myFontSize;   // 设置字体尺寸
  textRef.textRange.characterAttributes.textFont = myFont;   // 设置字体名称
  textRef.textRange.characterAttributes.fillColor = cmykRed  // 从颜色版取色简单，但是结果不确定
  textRef.top = y - 15 / mm;    // 画板底偏移
  textRef.left = x  - textRef.width / 2  ;   // 画板x中，偏移文本宽和间隔宽
}

// 如果顶层隐藏，创建新图层
var al = doc.activeLayer;
var topLayer = doc.layers[0];
 
if (topLayer.visible == false ||  topLayer.locked == true || al.visible == false || al.locked == true){
    doc.layers.add();  
}

writeText();

// 得到当前画板ID 
var ABID = doc.artboards.getActiveArtboardIndex();
var p = doc.artboards[ABID].artboardRect; // 获取画板矩形

s15mm = 15 / mm;
var k100 = new CMYKColor();  k100.black = 100;

if (doc.width > doc.height){  
  // 创建标记: 印刷拉规线  //  正常印刷横页面，咬口在下
  var r = doc.pathItems.rectangle(p[3] + s15mm * 2, p[2], s15mm, s15mm / 10);   // 参数 top, left, width, height
  r.filled = true;   r.fillColor = k100         // 填充矩形

  var wr = doc.pathItems.rectangle(p[3] + s15mm * 2, p[0] - s15mm, s15mm, s15mm / 10);   // 参数 top, left, width, height
  wr.filled = false; wr.stroked = false; r.stroked = false;      // 透明

  // 增大画板尺寸
  doc.artboards[ABID].artboardRect = [p[0] - s15mm, p[1], p[2] + s15mm, p[3]];     
 
  var newGroup = doc.groupItems.add(); r.moveToEnd(newGroup);  wr.moveToEnd(newGroup);    // 群组
} else { 
  // 创建标记: 印刷拉规线   //  正常印刷竖页面，咬口在左边
  var r = doc.pathItems.rectangle(p[3] , p[0] + s15mm * 2, s15mm/10, s15mm );   // 参数 top, left, width, height
  r.filled = true;   r.fillColor = k100 

  var wr = doc.pathItems.rectangle(p[1] + s15mm, p[0] + s15mm * 2, s15mm/10, s15mm);   // 参数 top, left, width, height
  wr.filled = false; wr.stroked = false; r.stroked = false;      // 透明

  // 增大画板尺寸
  doc.artboards[ABID].artboardRect = [p[0], p[1] + s15mm, p[2] , p[3] - s15mm];     

  var newGroup = doc.groupItems.add(); r.moveToEnd(newGroup);  wr.moveToEnd(newGroup);    // 群组
}
