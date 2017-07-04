export class Spinner extends HTMLElement {
    private up: HTMLButtonElement;
    private down: HTMLButtonElement;
    private lbl: HTMLLabelElement;
    private valLbl: HTMLLabelElement;
    private val: number;

    constructor() {
        super();
        this.initSpinner();
    }

    private initSpinner(): void {
        var shadow = this.attachShadow({ mode: 'open' });
        this.lbl = document.createElement("label");
        this.valLbl = document.createElement("label");

        let displayName: string = this.getAttribute("data-type");

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

        shadow.appendChild(this.lbl);
        shadow.appendChild(this.constructSpinner());
        shadow.appendChild(this.valLbl);
    }

    private constructSpinner() {
        let toReturn: HTMLElement = document.createElement("div");
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

    public generateHTML(id: string,displayName: string) {
        return `<custom-spinner id="${id}" data-type="${displayName}"> </custom-spinner>`; 
    }
}
