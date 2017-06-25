import * as $ from 'jquery';
import { Menu } from '../Templates/Menu/menu';
import { Frame } from 'frame';

class Startup {
    public static main(): number {
        console.log('Hello World');
        return 0;
    }
}
//https://gist.github.com/olanod/ede8befb771057bb004c4f57be591640/
$(document).ready(function () {
    Startup.main();
    Frame.switch(new Menu());
    //document.getElementById("main-frame").innerHTML = Menu.menu.toString();
    //Menu.bindings();
});