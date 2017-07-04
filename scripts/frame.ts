export abstract class Frame extends DocumentFragment {
    public static frameBoxID = "main-frame";

    public abstract createContent(): HTMLElement;
    public abstract bindings(): void;
    public abstract structureFrame(): void;

    public appendContent() {
        let stuff: HTMLElement = this.createContent();
        this.appendChild(stuff);
    }


    constructor() {
        super();
        this.appendContent();
    }

    public static switchFrame(newFrame: Frame): void {
        document.getElementById(Frame.frameBoxID).innerHTML = "";
        document.getElementById(Frame.frameBoxID).appendChild(newFrame);
        newFrame.structureFrame();
        newFrame.bindings();
    }
}