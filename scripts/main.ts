import * as $ from 'jquery';

class Startup {
    public static main(): number {
        console.log('Hello World');
        return 0;
    }
}
$(document).ready(function () {
    Startup.main();
});