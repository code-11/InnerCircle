define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Spinner extends HTMLElement {
        constructor() {
            super();
        }
        connectedCallback() {
            //var shadow = this.attachShadow({ mode: 'open' });
            this.lbl = document.createElement("label");
            this.valLbl = document.createElement("label");
            let displayName = this.getAttribute("data-type");
            this.lbl.innerText = displayName + ":";
            this.val = 0;
            this.valLbl.innerText = this.val.toString();
            this.valLbl.style.marginLeft = "5px";
            this.valLbl.style.cssFloat = "right";
            this.valLbl.id = this.getAttribute("id") + "-val";
            this.style.display = "inline-block";
            this.style.border = "1px solid grey";
            this.style.padding = "3px";
            this.style.borderRadius = "10px";
            this.appendChild(this.lbl);
            this.appendChild(this.constructSpinner());
            this.appendChild(this.valLbl);
        }
        constructSpinner() {
            let toReturn = document.createElement("div");
            this.up = document.createElement("button");
            this.down = document.createElement("button");
            this.up.innerText = "^";
            this.down.innerText = "v";
            this.up.id = this.getAttribute("id") + "-up";
            this.down.id = this.getAttribute("id") + "-down";
            toReturn.style.display = "inline-flex";
            toReturn.style.flexDirection = "column";
            toReturn.style.marginLeft = "15px";
            toReturn.style.cssFloat = "right";
            toReturn.appendChild(this.up);
            toReturn.appendChild(this.down);
            return toReturn;
        }
        assignDown(callBack) {
            this.down.onclick = callBack;
        }
        assignUp(callBack) {
            this.up.onclick = callBack;
        }
        setValLbl(newValue) {
            this.valLbl.innerText = newValue.toString();
        }
        generateHTML(id, displayName) {
            return `<custom-spinner id="${id}" data-type="${displayName}"> </custom-spinner>`;
        }
    }
    exports.Spinner = Spinner;
});
//# sourceMappingURL=spinner.js.map