define(["require", "exports", "jquery"], function (require, exports, $) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Startup {
        static main() {
            console.log('Hello World');
            return 0;
        }
    }
    $(document).ready(function () {
        Startup.main();
    });
});
//# sourceMappingURL=main.js.map