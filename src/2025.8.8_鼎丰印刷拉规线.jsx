#target illustrator
#targetengine main
var bit = 64; var aiVersion = app.version.split('.')[0]; var vs = "illustrator-" + aiVersion + ".0" + bit; ShowWindow();
function ShowWindow() {
  var panel = new Window("palette", "鼎丰©2025");
  // panel.alignChildren = ["center", "top"];
  panel.spacing = 2;
  panel.margins = 3;

  var isMinimized = false; // 状态变量，用于跟踪面板大小
  var bh = 45;
  var bw = 45;
  BMin = panel.add("radiobutton", [50, 5, 130, 20], "<<--缩小");
  BMin.helpTip = "面板大小切换";
  BMin.onClick = function () {
    if (isMinimized) {
        panel.bounds.height = bh; // 恢复到较大高度
        panel.bounds.width = bw;  // 恢复到较大宽度
    } else {
        panel.bounds.height = 45;  // 切换到较小高度
        panel.bounds.width = 45;    // 切换到较小宽度
    }
    isMinimized = !isMinimized; // 切换状态
};

  var bt  = panel.add("button", undefined, "自动拉规标线");
  var bt2 = panel.add("button", undefined, "批量加页面框");
  var bt3 = panel.add("button", undefined, "标链接文件名");
  var bt4 = panel.add("button", undefined, "选择物件打印");

  bt.onClick = function ()  {   make_guiding_line();  }
  bt2.onClick = function () {   make_artboard_rectangle(); }
  bt3.onClick = function () {   write_link_filename(); }
  bt4.onClick = function () {   buildMsg("SelectedArt_Print();"); }
  panel.show();
  bh = panel.bounds.height;
  bw = panel.bounds.width;
}function buildMsg(code) {
  try {
    var bt = new BridgeTalk;
    bt.target = vs; var msg = code;
    bt.body = msg;  bt.send();
  } catch (e) { }
}
function make_guiding_line() {
  var swap1Message = "@JSXBIN@ES@2.0@MyBbyBnACMhDbyBn0AHJhEnASzHjUjFjYjUiSjFjGBAEXzDjBjEjECfXzKjUjFjYj\
UiGjSjBjNjFjTDfjzDjEjPjDEfnfnftJhFnABXzIjDjPjOjUjFjOjUjTFfVBfAjzDjTjUjSGfnfJhGn\
ABXzEjTjJjajFHfXzTjDjIjBjSjBjDjUjFjSiBjUjUjSjJjCjVjUjFjTIfXzJjUjFjYjUiSjBjOjHjF\
JfVBfAjzKjNjZiGjPjOjUiTjJjajFKfnfJhHnABXzIjUjFjYjUiGjPjOjULfXIfXJfVBfAjzGjNjZiG\
jPjOjUMfnfJhInABXzJjGjJjMjMiDjPjMjPjSNfXIfXJfVBfAjzHjDjNjZjLiSjFjEOfnfJhJnABXzD\
jUjPjQPfVBfACzBhNQjzBjZRfCzBhPSnjzCjNjNTfdPnnnnfJhKnABXzEjMjFjGjUUfVBfACQjzBjYV\
fCSXzFjXjJjEjUjIWfVBfAnndCnnnfABB40BiAABAzJjXjSjJjUjFiUjFjYjUXAhLMhfbyBn0ACJiAn\
ASEAXzOjBjDjUjJjWjFiEjPjDjVjNjFjOjUYfjzDjBjQjQZfnftOiBbiCn0AGJiCnASzHjQjEjGiGjJ\
jMjFgaBEjzEiGjJjMjFgbfRBVzIjGjJjMjFiQjBjUjIgcfFftnftJiDnASzHjQjEjGiJjUjFjNgdCEX\
CfXzLjQjMjBjDjFjEiJjUjFjNjTgefVEfAnfnftJiEnABXzEjGjJjMjFgffVgdfCVgafBnfJiFnABXz\
IjQjPjTjJjUjJjPjOhAfVgdfCARCVVfDVRfEfnfJiHnAEXzJjNjPjWjFiUjPiFjOjEhBfVgdfCRBjzI\
jOjFjXiHjSjPjVjQhCfffJiInAEXzFjFjNjCjFjEhDfVgdfCnfAXzGjFjYjJjTjUjThEfEjgbfRBVgc\
fFffnAGE40BiAV40BhAR4B0AhAgc4C0AhAga4B0AiAgd4C0AiADDAzQjJjNjQjPjSjUifiQjVjMjMif\
jMjJjOjFhFAiNhHJDnASEyBjYfnftJEnASGyBXzEjOjBjNjFhGfVEfyBnftJFnASGyBneG2iQjH2kZj\
F2haic2nYibhahAffJGnASTyBnd8henJkThenJkTmWhfftJInASzEjCjBjTjFhHyBEjzFiBjSjSjBjZ\
hIfntnftJJnAShHyBXzLjSjVjMjFjSiPjSjJjHjJjOhJfVEfyBnffJLnASzCjQjXhKyBndAftJMnASz\
CjQjIhLyBndAftJNnASVyBXzBhQhMfVhHfyBnftJOnASRyBhzBhNhNXzBhRhOfVhHfyBnftJPnASMyB\
EXzJjHjFjUiCjZiOjBjNjFhPfjzJjUjFjYjUiGjPjOjUjThQfRBFeOiNjJjDjSjPjTjPjGjUiZjBiIj\
FjJffnftJQnASKyBndhYftJSnAShKyBXWfVEfyBnffJTnAShLyBXzGjIjFjJjHjIjUhRfVEfyBnffJU\
nASVyBCQCSVhKfyBnndCVVfyBnnnffOWbyXn0ADJXnASzEjUjFjNjQhSyBVhKfyBnftJyXnAShKyBVh\
LfyBnffJyXnAShLyBVhSfyBnffACzBhchTVhKfyBVhLfyBnnnJganABjzEjQjXjDjNhUfCSCzBhLhVC\
zBhKhWVhKfyBVTfyBnnnndCnndKnfJgbnABjzEjQjIjDjNhXfCSChVChWVhLfyBVTfyBnnnndKnndKn\
fJgcnASGyBChVnChVChVChVEXzHjUjPiGjJjYjFjEhYfjhUfRBFdAffnneBjYEXhYfjhXfRBFdAffnn\
nneHjDjNhAhA2jQjF2mPkRhannntfJgfnASOyBEjzJiDiNiZiLiDjPjMjPjShZfntnftJhAnABXzEjD\
jZjBjOhafVOfyBndAfJyhAnABXzHjNjBjHjFjOjUjBhbfVOfyBndjEfJhBnABXzGjZjFjMjMjPjXhcf\
VOfyBndjEfJyhBnABXzFjCjMjBjDjLhdfVOfyBndAfJhOnASzCjBjMheyBXzLjBjDjUjJjWjFiMjBjZ\
jFjShffVEfyBnftJhPnASzIjUjPjQiMjBjZjFjSiAyBXhMfXzGjMjBjZjFjSjTiBfVEfyBnftOhRbyh\
Sn0ABJhSnAEXCfXiBfVEfyBnfAUzCjcjciCUiCUiCCzChdhdiDXzHjWjJjTjJjCjMjFiEfViAfyBnnc\
fCiDXzGjMjPjDjLjFjEiFfViAfyBnnctnnCiDXiEfVhefyBnncfnnCiDXiFfVhefyBnnctnnnJhVnAE\
jXfnfJhYnASzEiBiCiJiEiGyBEXzWjHjFjUiBjDjUjJjWjFiBjSjUjCjPjBjSjEiJjOjEjFjYiHfXzJ\
jBjSjUjCjPjBjSjEjTiIfVEfyBnfnftJhZnASzBjQiJyBXzMjBjSjUjCjPjBjSjEiSjFjDjUiKfQzAi\
LfXiIfVEfyBViGfyBnftJhbnABjzFjThRhVjNjNiMfCSnVTfyBdPnnfJhcnASzEjLhRhQhQiNyBEjhZ\
fntnftJyhcnABXhdfViNfyBndjEfJhdnASzDiLhRhQiOyBEjhZfntnftJyhdnABXhdfViOfyBndKfJh\
enAShCyBEXCfXzKjHjSjPjVjQiJjUjFjNjTiPfVEfyBnfnftOiPbiRn0AMJiRnASzBjSiQyBEXzJjSj\
FjDjUjBjOjHjMjFiRfXzJjQjBjUjIiJjUjFjNjTiSfVEfyBREChVXzBhTiTfViJfyBChWjiMfnndHnn\
XzBhSiUfViJfyBjiMfCSjiMfnndFffnftJiSnABXzGjGjJjMjMjFjEiVfViQfyBnctfJyiSnABXNfVi\
QfyBViNfyBnfJiUnASzCjXjSiWyBEXiRfXiSfVEfyBREChVXiTfViJfyBChWjiMfnndHnnCQXhMfViJ\
fyBjiMfnnjiMfCSjiMfnndFffnftJiVnABXiVfViWfyBnctfJyiVnABXNfViWfyBViOfyBnfJiWnABX\
zHjTjUjSjPjLjFjEiXfViWfyBncffJyiWnABXiXfViQfyBncffJiYnAEjhFfRDXhMfXhAfViQfyBCQX\
hOfXhAfViQfyBCSnVTfyBdFnnnFeZjehPiEjPjDjVjNjFjOjUjThPiQjVjMjMifjMjJjOjFhOjQjEjG\
ffJibnABXiKfQiLfXiIfVEfyBViGfyBARECQXhMfViJfyBjiMfnnXhOfViJfyBChVXiUfViJfyBjiMf\
nnXiTfViJfyBfnfJidnAEXhBfViQfyBRBVhCfyBffJyidnAEXhBfViWfyBRBVhCfyBffACzBheiYXWf\
VEfyBXhRfVEfyBnnbjBn0AMJjBnASiQyBEXiRfXiSfVEfyBREXiTfViJfyBChVXhMfViJfyBChWjiMf\
nndHnnCSjiMfnndFjiMfffnftJjCnABXiVfViQfyBnctfJyjCnABXNfViQfyBViNfyBnfJjEnASiWyB\
EXiRfXiSfVEfyBREChVXhOfViJfyBjiMfnnChVXhMfViJfyBChWjiMfnndHnnCSjiMfnndFjiMfffnf\
tJjFnABXiVfViWfyBnctfJyjFnABXNfViWfyBViOfyBnfJjGnABXiXfViWfyBncffJyjGnABXiXfViQ\
fyBncffJjInAEjhFfRDCQXhMfXhAfViQfyBCSnVTfyBdhUnnnXhOfXhAfViQfyBFegajehPiEjPjDjV\
jNjFjOjUjThPiQjVjMjMifjMjJjOjFhShOjQjEjGffJjLnABXiKfQiLfXiIfVEfyBViGfyBAREXhMfV\
iJfyBChVXhOfViJfyBjiMfnnXiUfViJfyBCQXiTfViJfyBjiMfnnfnfJjNnAEXhBfViQfyBRBVhCfyB\
ffJyjNnAEXhBfViWfyBRBVhCfyBffJjRnASzCjTjTiZyBXzJjTjFjMjFjDjUjJjPjOiafVEfyBnftaj\
SJjTnABXzIjTjFjMjFjDjUjFjEibfQiLfViZfyBVzBjJicfyBncffAVicfyBAXzGjMjFjOjHjUjIidf\
ViZfyBByBhTAXic4W0AiAE40BiAhe4M0AiAiA4N0AiAV4G0AiAiZ4V0AiAR4H0AiAiG4O0AiAhK4E0A\
iAhL4F0AiAiN4Q0AiAiO4R0AiAhC4S0AiAG4B0AiAiJ4P0AiAiQ4T0AiAiW4U0AiAT4C0AiAhH4D0Ai\
AM4I0AiAK4J0AiAO4L0AiAhS4K0AiAAXAiLByB";
  
  buildMsg(swap1Message);
}

function make_artboard_rectangle() {
  var swap1Message = "@JSXBIN@ES@2.0@MyBbyBnABMAbyBn0AFJBnASzDjEjPjDBAXzOjBjDjUjJjWjFiEjPjDjVjNjFjOjUC\
fjzDjBjQjQDfnftJCnASzBjBEBXzJjBjSjUjCjPjBjSjEjTFfVBfAnftJFnASzBjNGCEjzJiDiNiZiL\
iDjPjMjPjSHfntnftJGnABXzHjNjBjHjFjOjUjBIfVGfCndjEfaIbJn0AFJJnAEXzWjTjFjUiBjDjUj\
JjWjFiBjSjUjCjPjBjSjEiJjOjEjFjYJfXFfVBfARBVzBjJKfDffJKnASzBjQLEXzMjBjSjUjCjPjBj\
SjEiSjFjDjUMfQzANfVEfBVKfDnftJNnASzBjSOFEXzJjSjFjDjUjBjOjHjMjFPfXzJjQjBjUjIiJjU\
jFjNjTQfVBfAREXzBhRRfVLfEXzBhQSfVLfECzBhNTXzBhSUfVLfEXSfVLfEnnCTXRfVLfEXzBhTVfV\
LfEnnffnftJOnABXzGjGjJjMjMjFjEWfVOfFnctfJPnABXzJjGjJjMjMiDjPjMjPjSXfVOfFVGfCnfA\
VKfDAXzGjMjFjOjHjUjIYfVEfBByBzBhcZAGO4F0AiAK4D0AiAB40BiAG4C0AiAL4E0AiAE4B0AiAAG\
AzIiBiJ2hbjV2jfjH2lAiS2jVkY2jCkX2iGjIgaARBJTnAEjgafnf0DNByB";
  
  buildMsg(swap1Message);
}


function write_link_filename() {
  var swap1Message = "@JSXBIN@ES@2.0@MyBbyBn0AFJAnASzDjEjPjDByBXzOjBjDjUjJjWjFiEjPjDjVjNjFjOjUCfjzDjBj\
QjQDfnftJBnASzCjQjJEyBXzLjQjMjBjDjFjEiJjUjFjNjTFfVBfyBnftJCnABXzJjTjFjMjFjDjUjJ\
jPjOGfVBfyBnbfJDnASzBjVHyBnd8mSnFmNnBialNGiAftOEbyFn0ABJFnAEjzFjBjMjFjSjUIfRBFe\
I2kHjF2jDjI2KiO2lBjM2JjH2nekU2lFjD2neiWffACzChdhdJXzGjMjFjOjHjUjIKfVEfyBnndAbyH\
n0ABKHbIn0ALJInASzKjQjMjBjDjFjEiQjBjUjILyBXzEjGjJjMjFMfQzANfVEfyBVzBjJOfyBnftJJ\
nASzKjQjMjBjDjFjEiOjBjNjFPyBXzLjEjJjTjQjMjBjZiOjBjNjFQfXMfQNfVEfyBVOfyBnftJKnAS\
zIjQjBjUjIiOjBjNjFRyBXzIjGjVjMjMiOjBjNjFSfXMfQNfVEfyBVOfyBnftJLnASzDjUjYjUTyBEX\
zDjBjEjEUfXzKjUjFjYjUiGjSjBjNjFjTVfVBfyBnfnftbyQn0ABJQnABXzIjDjPjOjUjFjOjUjTWfV\
TfyBEXzIjUjPiTjUjSjJjOjHXfVPfyBnfnfJSnASzEjNhRhQhQYyBEjzJiDiNiZiLiDjPjMjPjSZfnt\
nftJTnABXzHjNjBjHjFjOjUjBgafVYfyBndjEfJVnABXzEjTjJjajFgbfXzTjDjIjBjSjBjDjUjFjSi\
BjUjUjSjJjCjVjUjFjTgcfXzJjUjFjYjUiSjBjOjHjFgdfVTfyBCzBhKgenVHfyBdInnfJWnABXzJjG\
jJjMjMiDjPjMjPjSgffXgcfXgdfVTfyBVYfyBnfJXnABXzEjMjFjGjUhAfVTfyBXhAfQNfVEfyBVOfy\
BnfJYnABXzDjUjPjQhBfVTfyBCzBhNhCChCXhBfQNfVEfyBVOfyBXzGjIjFjJjHjIjUhDfQNfVEfyBV\
OfyBnnCgenVHfyBdInnnnfASOyBndAftCzChBhdhEVOfyBXKfVEfyBnnTOyBBfAJO4D0AiAB40BiAE4\
B0AiAH4C0AiAL4E0AiAP4F0AiAT4H0AiAY4I0AiAR4G0AiAAJANByB";
  
  buildMsg(swap1Message);
}

function SelectedArt_Print() {
  // 获取当前文档的选中对象
  var selectedItems = app.activeDocument.selection;
  // 确保有选中的对象
  if (selectedItems.length > 0) {
      // 执行菜单命令
      app.executeMenuCommand('Fit Artboard to selected Art');
      // 刷新窗口
      app.redraw();
      // 调用打印
      app.executeMenuCommand('Print');
  } else {
      alert('请先选择一些对象!\n脚本功能: 物件适合页面，调用打印。');
  }
}