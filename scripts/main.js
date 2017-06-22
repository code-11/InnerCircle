/// <reference path="index.d.ts" />
var Startup = (function () {
    function Startup() {
    }
    Startup.main = function () {
        console.log('Hello World');
        return 0;
    };
    return Startup;
}());
$(document).ready(function () {
    Startup.main();
});
