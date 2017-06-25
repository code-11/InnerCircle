define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Frame {
        static switch(newFrame) {
            document.getElementById(Frame.frameBoxID).innerHTML = newFrame.content().toString();
            newFrame.bindings();
        }
    }
    Frame.frameBoxID = "main-frame";
    exports.Frame = Frame;
});
//# sourceMappingURL=frame.js.map