/// <reference path="index.d.ts" />

class Startup {
    public static main(): number {
        console.log('Hello World');
        return 0;
    }
}
$(document).ready(function () {
    Startup.main();
});