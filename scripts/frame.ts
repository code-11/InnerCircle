export abstract class Frame {
    public static frameBoxID = "main-frame";

    public abstract content(): String;
    public abstract bindings(): void;
    public abstract structure(): String;
    public abstract style(): String;

    public static switchFrame(newFrame: Frame): void {
        document.getElementById(Frame.frameBoxID).innerHTML = newFrame.content().toString();
        newFrame.bindings();
    }

    public switchFrame(newFrame: Frame): void {
        Frame.switchFrame(newFrame);
    }
}