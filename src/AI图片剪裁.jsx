// script.name = 图像裁剪.jsx; 
// script.description = 裁剪（真正意义上）放置或嵌入在Illustrator中的位图图像
// script.requirements = 需要在图像上方有一个矩形路径作为新图像尺寸或裁剪边界

// 使用方法:   绘制一个矩形作为“裁剪路径”，选择矩形和位图图像，运行脚本。

// 特性:       在运行脚本前按住 Shift 键以使用 TypeOptimized 选项进行栅格化，否则脚本将使用默认的 ArtOptimized
//                     在运行脚本前按住 Alt 键以使用自定义分辨率进行栅格化，否则脚本将使用基础图像分辨率。

#target Illustrator

function 图像裁剪() {
    if (app.documents.length > 0) {
        var 当前文档 = app.activeDocument;
        var 选区 = 当前文档.selection;
        if (选区.length == 2)
            图像裁剪处理(选区[0], 选区[1]);
        else alert('请选择一张图像和一个矩形（用作裁剪区域），然后重试');
        return;
    }
    else alert('没有文档可处理'); return;

    function 图像裁剪处理(矩形, 图像) {
        if (矩形.typename == 'PathItem' && (图像.typename == 'RasterItem' || 图像.typename == 'PlacedItem')) {
            
            var 栅格化选项 = new RasterizeOptions;
            
            if(ScriptUI.environment.keyboardState.shiftKey) { // 按下 Shift 键以切换到 TypeOptimized 抗锯齿，否则使用默认的 ArtOptimized
                栅格化选项.antiAliasingMethod = AntiAliasingMethod.TYPEOPTIMIZED;
            }
            else { 
                栅格化选项.antiAliasingMethod = AntiAliasingMethod.ARTOPTIMIZED;
            } 
            
            if(ScriptUI.environment.keyboardState.altKey) { // 按下 Alt 键以输入自定义分辨率，否则使用图像分辨率
                var 标题 = '图像裁剪脚本';
                var a = prompt('请输入目标分辨率', 72, 标题);
                if (a == null) return;
                else 栅格化选项.resolution = Number(a);
            }
            else {
                栅格化选项.resolution = 获取对象分辨率(图像);
            }
            
            当前文档.rasterize(图像, 矩形.geometricBounds, 栅格化选项);
            矩形.remove();
        }
        else alert('绘制一个矩形，将其置于位图图像上方，然后重试');
    }

    function 获取对象分辨率(对象) {
        var 分辨率宽 = Math.abs(72 / 对象.matrix.mValueA); 
        var 分辨率高 = Math.abs(72 / 对象.matrix.mValueD); 
        var 对象分辨率 = Math.round(分辨率宽 > 分辨率高 ? 分辨率宽 : 分辨率高);
  
        return 对象分辨率; 
    }
}

图像裁剪()