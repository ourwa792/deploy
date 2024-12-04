//import { ComputeEngine } from "https://unpkg.com/@cortex-js/compute-engine?module";
import { ComputeEngine } from "/library/compute-engine.esm.js";
import {
    MathfieldElement,
    convertLatexToMarkup,
    renderMathInElement,
    renderMathInDocument,
} from '/library/mathlive.mjs'
/* import {
  MathfieldElement,
  convertLatexToMarkup,
  renderMathInElement,
  renderMathInDocument,
} from "//unpkg.com/mathlive?module";  */ 

window.addEventListener("DOMContentLoaded", ()=> {
    const btn = document.getElementById("btn-1"); // تحديد جميع الأزرار

    const audio = new Audio(btn.getAttribute("data-sound"));
    btn.addEventListener("click", e => {
        if (!audio.playing) {
        audio.play();
        btn.disabled = true;  // تعطيل الزر أثناء تشغيل الصوت

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

    
})