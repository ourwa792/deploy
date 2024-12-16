//import { ComputeEngine } from "https://unpkg.com/@cortex-js/compute-engine?module";
import { ComputeEngine } from "/library/compute-engine.esm.js";
/* import {
    MathfieldElement,
    convertLatexToMarkup,
    renderMathInElement,
    renderMathInDocument,
} from '/library/mathlive.mjs' */
import JXG from "https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraphcore.mjs";

import {
  MathfieldElement,
  convertLatexToMarkup,
  renderMathInElement,
  renderMathInDocument,
} from "//unpkg.com/mathlive?module";

window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-1"); // تحديد جميع الأزرار

  const audio = new Audio(btn.getAttribute("data-sound"));
  btn.addEventListener("click", (e) => {
    if (!audio.playing) {
      audio.play();
      btn.disabled = true; // تعطيل الزر أثناء تشغيل الصوت

      audio.onended = () => {
        btn.disabled = false;
      };
    }
  });

  // render math
  renderMathInDocument({
    TeX: {
      delimiters: {
        inline: [
          ["$", "$"],
          ["\\(", "\\)"],
        ],
        display: [
          ["\\[", "\\]"],
          ["$$", "$$"],
        ],
      },
    },
  });

  const board = JXG.JSXGraph.initBoard("box1", {
    boundingbox: [-8, 8, 8, -8],
    axis: false,
  });

  const view = board.create(
    "view3d",
    [
      [-6, -3],
      [8, 8],
      [
        [-5, 5],
        [-5, 5],
        [-5, 5],
      ],
    ],
    {
      xPlaneRear: { visible: false },
      yPlaneRear: { visible: false },
    }
  );

  // تعريف المستوى
  const p0 = view.create("point3d", [0, 0, 2], {
    name: "p_0",
    visible: false,
    fixed: true,
  });

  // جعل المتجهات موازية للحواف
  const v1 = () => [1, 0, 0]; // موازٍ للحافة بين bottom1 و bottom2
  const v2 = () => [0, 1, 1]; // موازٍ للحافة بين bottom1 و bottom4

  view.create(
    "plane3d",
    [p0, v1, v2, [-Infinity, Infinity], [-Infinity, Infinity]],
    {
      fillColor: "blue",
      strokeWidth: 1,
      strokeColor: "#888888",
      strokeOpacity: 0.6,
    }
  );

  // تعريف رؤوس المكعب
  const bottom1 = view.create("point3d", [-3, -3, 0], {
    visible: false,
    fixed: true,
  });
  const bottom2 = view.create("point3d", [3, -3, 0], {
    visible: false,
    fixed: true,
  });
  const bottom3 = view.create("point3d", [3, 3, 0], {
    visible: false,
    fixed: true,
  });
  const bottom4 = view.create("point3d", [-3, 3, 0], {
    visible: false,
    fixed: true,
  });

  const top1 = view.create("point3d", [-3, -3, 4], {
    visible: false,
    fixed: true,
  });
  const top2 = view.create("point3d", [3, -3, 4], {
    visible: false,
    fixed: true,
  });
  const top3 = view.create("point3d", [3, 3, 4], {
    visible: false,
    fixed: true,
  });
  const top4 = view.create("point3d", [-3, 3, 4], {
    visible: false,
    fixed: true,
  });

  view.create("polygon3d", [bottom1, bottom2, bottom3, bottom4], {
    fillColor: "rgba(255, 165, 0, 0.5)", // اللون والتعبئة
    strokeColor: "#FF8C00", // اللون الخارجي
    strokeWidth: 1,
  });
  view.create("polygon3d", [top1, top2, top3, top4], {
    fillColor: "rgba(255, 165, 0, 0.5)", // اللون والتعبئة
    strokeColor: "#FF8C00", // اللون الخارجي
    strokeWidth: 1,
  });
  view.create("polygon3d", [top1, top2, bottom2, bottom1], {
    fillColor: "rgba(255, 165, 0, 0.5)", // اللون والتعبئة
    strokeColor: "#FF8C00", // اللون الخارجي
    strokeWidth: 1,
  });
  view.create("polygon3d", [bottom3, bottom4, top4, top3], {
    fillColor: "rgba(255, 165, 0, 0.5)", // اللون والتعبئة
    strokeColor: "#FF8C00", // اللون الخارجي
    strokeWidth: 1,
  });
  view.create("polygon3d", [bottom1, bottom4, top4, top1], {
    fillColor: "rgba(255, 165, 0, 0.5)", // اللون والتعبئة
    strokeColor: "#FF8C00", // اللون الخارجي
    strokeWidth: 1,
  });

  // تعريف وجوه المكعب
  const faces = [
    [bottom1, bottom2, bottom3, bottom4], // القاعدة السفلية
    [top1, top2, top3, top4], // القاعدة العلوية
    [bottom1, bottom2, top2, top1], // وجه جانبي
    [bottom2, bottom3, top3, top2], // وجه جانبي
    [bottom3, bottom4, top4, top3], // وجه جانبي
    [bottom4, bottom1, top1, top4], // وجه جانبي
  ];

  // دالة تقاطع مستقيم مع مستوى
  function intersectLinePlane(pA, pB, normal, d) {
    const lineDir = [pB.X() - pA.X(), pB.Y() - pA.Y(), pB.Z() - pA.Z()];
    const numerator = -(
      normal[0] * pA.X() +
      normal[1] * pA.Y() +
      normal[2] * pA.Z() +
      d
    );
    const denominator =
      normal[0] * lineDir[0] + normal[1] * lineDir[1] + normal[2] * lineDir[2];

    if (denominator === 0) return null; // الخط موازي للمستوى

    const t = numerator / denominator;
    if (t < 0 || t > 1) return null; // النقطة خارج الضلع

    return [
      pA.X() + t * lineDir[0],
      pA.Y() + t * lineDir[1],
      pA.Z() + t * lineDir[2],
    ];
  }

  // معادلات المستوى
  const planeNormal = () => JXG.Math.crossProduct(v1(), v2());
  const planeD = () => {
    const normal = planeNormal();
    return -(normal[0] * p0.X() + normal[1] * p0.Y() + normal[2] * p0.Z());
  };

  // حساب التقاطع لكل وجه
  function calculateIntersectionPoints() {
    const intersectionPoints = [];
    const normal = planeNormal();
    const d = planeD();

    faces.forEach((face) => {
      for (let i = 0; i < face.length; i++) {
        const pA = face[i];
        const pB = face[(i + 1) % face.length];
        const intersection = intersectLinePlane(pA, pB, normal, d);

        if (intersection) {
          // تحقق من النقاط المكررة
          const isDuplicate = intersectionPoints.some(
            (p) =>
              Math.abs(p[0] - intersection[0]) < 1e-6 &&
              Math.abs(p[1] - intersection[1]) < 1e-6 &&
              Math.abs(p[2] - intersection[2]) < 1e-6
          );
          if (!isDuplicate) {
            intersectionPoints.push(intersection);
          }
        }
      }
    });

    return intersectionPoints.map((coords) =>
      view.create("point3d", coords, { size: 3, color: "red", fixed: true })
    );
  }

  // رسم المضلع الناتج عن التقاطع
  let intersectionPolygon;
  function updateIntersection() {
    // إزالة المضلع السابق
    if (intersectionPolygon) {
      board.removeObject(intersectionPolygon);
    }

    // حساب النقاط الجديدة
    const points = calculateIntersectionPoints();

    if (points.length >= 3) {
      intersectionPolygon = view.create(
        "polygon3d",
        [points[0], points[1], points[3], points[2]],
        {
          fillColor: "red",
          fillOpacity: 0.4,
          strokeColor: "red",
          strokeWidth: 2,
        }
      );
    }
  }

  updateIntersection();
});
