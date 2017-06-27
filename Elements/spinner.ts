export class Spinner extends HTMLElement {
    private up: HTMLButtonElement;
    private down: HTMLButtonElement;
    private lbl: HTMLLabelElement;
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
