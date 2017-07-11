define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RandomUtils {
        /**
         * Returns a random int between min and max, inclusive on both sides
         * @param min
         * @param max
         */
        static getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
        }
        /**
         Generate X random numbers between 0 and Z that add to Z
         */
        static constrainedAdditive(x, z) {
            let xMinusOne = x - 1;
            let intervals = [0];
            for (let i = xMinusOne; i > 0; i -= 1) {
                let rndInt = RandomUtils.getRandomIntInclusive(0, z);
                intervals.push(rndInt);
            }
            intervals.sort();
            console.log(intervals);
            let toReturn = [];
            intervals.push(z);
            intervals.reverse();
            for (let i = 1; i < intervals.length; i += 1) {
                let priorEl = intervals[i - 1];
                let curEl = intervals[i];
                toReturn.push(priorEl - curEl);
            }
            return toReturn;
        }
    }
    exports.RandomUtils = RandomUtils;
});
//# sourceMappingURL=randomUtils.js.map