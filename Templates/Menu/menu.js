define(["require", "exports", "../../scripts/frame", "../CharacterCreator/characterCreator"], function (require, exports, frame_1, characterCreator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Menu extends frame_1.Frame {
        createContent() {
            let mainMenu = document.createElement("ol");
            let newGameOption = document.createElement("li");
            let loadGameOption = document.createElement("li");
            let aboutOption = document.createElement("li");
            newGameOption.textContent = "New Game";
            newGameOption.id = "test";
            loadGameOption.textContent = "Load Game";
            aboutOption.textContent = "About";
            mainMenu.appendChild(newGameOption);
            mainMenu.appendChild(loadGameOption);
            mainMenu.appendChild(aboutOption);
            return mainMenu;
        }
        bindings() {
            let self = this;
            $("#test").click(function () {
                frame_1.Frame.switchFrame(new characterCreator_1.CharacterCreator());
            });
        }
        structureFrame() {
        }
    }
    exports.Menu = Menu;
});
//# sourceMappingURL=menu.js.map