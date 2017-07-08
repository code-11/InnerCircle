export abstract class Frame extends DocumentFragment {
    public static frameBoxID = "main-frame";

    public abstract bindings(): void;
    public abstract structureFrame(): void;

    constructor() {
        super();
    }

    public static switchFrame(newFrame: Frame): void {
        document.getElementById(Frame.frameBoxID).innerHTML = "";
        document.getElementById(Frame.frameBoxID).appendChild(newFrame);
        newFrame.structureFrame();
    }
}