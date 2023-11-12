#target illustrator
#targetengine main
var vs = "illustrator-" + app.version.substr(0, 2);
ShowWindow();
function ShowWindow() {
  var myDialog = new Window("palette", "My dialog");
  var bt = myDialog.add("button", undefined, "标注尺寸");

  bt.onClick = function () { // 标注尺寸.jsx
    make_size();
  }

  myDialog.show();
}
//这里不要动
function buildMsg(code) {
  try {
    var bt = new BridgeTalk;
    bt.target = vs;
    var msg = code;
    bt.body = msg;
    bt.send();
  } catch (e) { }
}

// 标注尺寸.jsx
function make_size() {
  var swap1Message = "@JSXBIN@ES@2.0@MyBbyBnACMIbyBn0ABZJnAEXzHjUjPiGjJjYjFjEBfEXzFjSjPjVjOjECfjzEiNjBjUjIDfRBCzBhKEVzEjTjJjajFFfAjzCjNjNGfnnffRBFdAffABF40BhAB0AzKjGjPjSjNjBjUiTjJjajFHAKMTbyBn0AHJUnASzHjUjFjYjUiSjFjGIAEXzDjBjEjEJfXzKjUjFjYjUiGjSjBjNjFjTKfjzGjEjPjDiSjFjGLfnfnftJVnABXzIjDjPjOjUjFjOjUjTMfVIfAVzEjUjFjYjUNfBnfJWnABXFfXzTjDjIjBjSjBjDjUjFjSiBjUjUjSjJjCjVjUjFjTOfXzJjUjFjYjUiSjBjOjHjFPfVIfAjzKjNjZiGjPjOjUiTjJjajFQfnfJXnABXzIjUjFjYjUiGjPjOjURfXOfXPfVIfAjzGjNjZiGjPjOjUSfnfJYnABXzJjGjJjMjMiDjPjMjPjSTfXOfXPfVIfAjzHjDjNjZjLiSjFjEUfnfJZnABXzDjUjPjQVfVIfACzBhLWjzBjZXfCzBhPYnjGfdPnnnnfJganABXzEjMjFjGjUZfVIfACWjzBjYgafCYnjGfdKnnnnfACN40BhAI40BiABBAzJjXjSjJjUjFiUjFjYjUgbAgbKJBnASLyBjzOjBjDjUjJjWjFiEjPjDjVjNjFjOjUgcfnftJCnASGyBnd8henJkThenJkTmWhfftJDnASSyBEXzJjHjFjUiCjZiOjBjNjFgdfjzJjUjFjYjUiGjPjOjUjTgefRBFeOiNjJjDjSjPjTjPjGjUiZjBiIjFjJffnftJEnASQyBndYftJNnASUyBEjzJiDiNiZiLiDjPjMjPjSgffntnftJOnABXzEjDjZjBjOhAfVUfyBndAfJPnABXzHjNjBjHjFjOjUjBhBfVUfyBndjEfJQnABXzGjZjFjMjMjPjXhCfVUfyBndjEfJRnABXzFjCjMjBjDjLhDfVUfyBndAfOgebgfn0ACJgfnASzLjNjZiTjFjMjFjDjUjJjPjOhEyBXzJjTjFjMjFjDjUjJjPjOhFfVLfyBnftahAbhBn0AFJhBnASzBjThGyBQzAhHfVhEfyBVzBjJhIfyBnftJhCnASgayBXZfVhGfyBnffJyhCnASXyBXVfVhGfyBnffJhDnASzDjTjUjShJyBCWCWCWEjHfRBXzFjXjJjEjUjIhKfVhGfyBffnneBjYEjHfRBXzGjIjFjJjHjIjUhLfVhGfyBffnnnneCjNjNnftJhEnAEjgbfRBVhJfyBffAVhIfyBAXzGjMjFjOjHjUjIhMfVhEfyBByBzBhchNACzBhehOXhMfXhFfVLfyBnndAnALhI4I0AiAhE4H0AiAga4E0AiAX4F0AiAhG4J0AiAL40BiAhJ4K0AiAG4B0AiAS4C0AiAQ4D0AiAU4G0AiAALAhHByB";
  buildMsg(swap1Message);
}