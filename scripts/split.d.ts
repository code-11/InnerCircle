/* use it like this:
 
import Split = require('split.js');

Split(['#a', '#b'], {
  gutterSize: 8,
  cursor: 'col-resize'
});
*/
declare module 'split' {
    interface SplitOptions {
        sizes?: number[];
        minSize?: number[] | number;
        gutterSize?: number;
        snapOffset?: number;
        direction?: "horizontal" | "vertical";
        cursor?: "col-resize" | "row-resize";
        gutter?: (index: number, direction: string) => HTMLElement;
        elementStyle?: (dimension: number, elementSize: number, gutterSize: number) => any;
        gutterStyle?: (dimension: number, gutterSize: number) => any;
        onDrag?: () => void;
        onDragStart?: () => void;
        onDragEnd?: () => void;
    }

    interface SplitObject {
        setSizes: (sizes: number[]) => void;
        getSizes: () => number[];
        collapse: (index: number) => void;
        destroy: () => void;
    }

    function Split(elements: HTMLElement | string[], options?: SplitOptions): void;

    export = Split;
}