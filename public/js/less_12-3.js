window.addEventListener("DOMContentLoaded", e => {
    
  //--------- box1 -----
  var board1 = JXG.JSXGraph.initBoard("box1", {
    boundingbox: [-4, 4, 4, -4],
    keepaspectratio: true,
    axis: false,
  });

  var oo = board1.create("point", [0, 0], { name: "O" });
  var circle1 = board1.create("circle", [oo, 3], { strokeWidth: 3 });

  var M = board1.create("glider", [2, 2, circle1], { name: "M" });
  var A = board1.create("glider", [-3, -1, circle1], { name: "A" });
  var B = board1.create("glider", [1, -3, circle1], { name: "B" });

  board1.create("line", [B, oo], { straightFirst: false, straightLast: false });
  board1.create("line", [A, oo], { straightFirst: false, straightLast: false });
  board1.create("line", [B, M], {
    straightFirst: false,
    straightLast: false,
    strokeColor: "green",
    strokeWidth: 3,
  });
  board1.create("line", [A, M], {
    straightFirst: false,
    straightLast: false,
    strokeColor: "green",
    strokeWidth: 3,
  });

  function ensureMinorAngle(angle) {
    angle = (angle * 180) / Math.PI;
    if (angle < 0) angle += 360;
    if (angle > 180) angle = 360 - angle;
    return angle;
  }

  var centralAngle = board1.create("angle", [A, oo, B], {
    name: "O",
    radius: 0.5,
    fillColor: "yellow",
    withLabel: true,
  });

  board1.create(
    "text",
    [
      () => oo.X() + 0.3,
      () => oo.Y() + 0.3,
      () => ensureMinorAngle(centralAngle.Value()).toFixed(2) + "&deg;",
    ],
    { fontSize: 16 }
  );

  var inscribedAngle = board1.create("angle", [A, M, B], {
    name: "M",
    radius: 0.5,
    fillColor: "lightblue",
    withLabel: true,
    fontSize: 15,
  });

  board1.create(
    "text",
    [
      () => M.X() + 0.3,
      () => M.Y() + 0.5,
      () => ensureMinorAngle(inscribedAngle.Value()).toFixed(2) + "&deg;", // استخدام inscribedAngle.Value() هنا
    ],
    { fontSize: 16 }
  );
})