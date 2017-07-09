export class Journal extends HTMLElement {

    constructor() {
        super();
    }

    private connectedCallback(): void {
        this.style.display ="block"
        this.style.overflowY = "scroll";
        this.style.width = "100%";
        this.style.border = "1px solid grey";
        this.id = "journal";
        //this.style.maxHeight = "20%"
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