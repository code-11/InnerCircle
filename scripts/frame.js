define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Frame extends DocumentFragment {
        constructor() {
            super();
        }
        static switchFrame(newFrame) {
            document.getElementById(Frame.frameBoxID).innerHTML = "";
            document.getElementById(Frame.frameBoxID).appendChild(newFrame);
            newFrame.structureFrame();
        }
    }
    Frame.frameBoxID = "main-frame";
    exports.Frame = Frame;
});
//# sourceMappingURL=frame.js.map