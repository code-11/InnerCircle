define(["require", "exports", "jquery", "../Templates/Menu/menu", "frame"], function (require, exports, $, menu_1, frame_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Startup {
        static main() {
            console.log('Hello World');
            return 0;
        }
    }
    //https://gist.github.com/olanod/ede8befb771057bb004c4f57be591640/
    $(document).ready(function () {
        Startup.main();
        frame_1.Frame.switchFrame(new menu_1.Menu());
        //document.getElementById("main-frame").innerHTML = Menu.menu.toString();
        //Menu.bindings();
    });
});
//# sourceMappingURL=main.js.map