export class Journal extends HTMLElement {

    constructor() {
        super();
    }

    private connectedCallback(): void {
        this.style.overflowY = "scroll";
        this.style.position = "fixed";
        this.style.width = "100%";
        this.style.bottom = "0";
        this.style.left = "0";
        this.style.border = "1px solid grey";
        this.style.maxHeight = "20%"
    }

    public log(line: string): void{
        let lineEl: HTMLParagraphElement = document.createElement("p");
        lineEl.style.backgroundColor = "#efefef";
        lineEl.style.margin = "0px";
        lineEl.style.marginTop = "3px";
        lineEl.style.marginLeft = "10px";
        lineEl.innerText = line;
        this.appendChild(lineEl);
        this.scrollTop = this.scrollHeight;
    }
}