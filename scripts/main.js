define(["require", "exports", "jquery", "../Templates/menu"], function (require, exports, $, menu_1) {
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
        document.getElementById("main-frame").innerHTML = menu_1.Menu.menu.toString();
        menu_1.Menu.binds();
    });
});
//# sourceMappingURL=main.js.map