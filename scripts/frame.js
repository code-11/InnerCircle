define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Frame {
        static switchFrame(newFrame) {
            document.getElementById(Frame.frameBoxID).innerHTML = newFrame.content().toString();
            newFrame.bindings();
        }
        switchFrame(newFrame) {
            Frame.switchFrame(newFrame);
        }
    }
    Frame.frameBoxID = "main-frame";
    exports.Frame = Frame;
});
//# sourceMappingURL=frame.js.map