export class Menu {
    public static menu : String = `
    <ol>
        <li id='test'>New Game</li>
        <li>Load Game</li>
        <li>About</li>
    </ol>
    `;

    public static binds(): void {
        $("#test").click(function(){
            console.log("link!");
        });
    } 
}

