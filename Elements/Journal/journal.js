define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Journal extends HTMLElement {
        constructor() {
            super();
        }
        connectedCallback() {
            this.style.overflowY = "scroll";
            this.style.position = "fixed";
            this.style.width = "100%";
            this.style.bottom = "0";
            this.style.left = "0";
            this.style.border = "1px solid grey";
            this.style.maxHeight = "20%";
        }
        log(line) {
            let lineEl = document.createElement("p");
            lineEl.style.backgroundColor = "#efefef";
            lineEl.style.margin = "0px";
            lineEl.style.marginTop = "3px";
            lineEl.style.marginLeft = "10px";
            lineEl.innerText = line;
            this.appendChild(lineEl);
            this.scrollTop = this.scrollHeight;
        }
    }
    exports.Journal = Journal;
});
//# sourceMappingURL=journal.js.map