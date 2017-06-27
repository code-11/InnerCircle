define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Spinner extends HTMLElement {
        constructor() {
            super();
            this.up = document.createElement("button");
            this.down = document.createElement("button");
            this.lbl = document.createElement("label");
            this.up.innerText = "^";
            this.down.innerText = "v";
            this.lbl.innerText = "LBL";
            this.appendChild(this.up);
            this.appendChild(this.down);
            this.appendChild(this.lbl);
        }
    }
    exports.Spinner = Spinner;
});
//# sourceMappingURL=spinner.js.map