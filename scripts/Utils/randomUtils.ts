export class RandomUtils {
    /**
     * Returns a random int between min and max, inclusive on both sides
     * @param min
     * @param max
     */
    public static getRandomIntInclusive(min, max): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }

    /**
     Generate X random numbers between 0 and Z that add to Z
     */
    public static constrainedAdditive(x: number, z: number): Array<number> {
        let xMinusOne: number = x - 1;
        let intervals: Array<number> = [0];
        for (let i: number = xMinusOne; i > 0; i -= 1) {
            let rndInt: number = RandomUtils.getRandomIntInclusive(0, z);
            intervals.push(rndInt);
        }
        intervals.sort();
        console.log(intervals);
        let toReturn: Array<number> = [];
        intervals.push(z);
        intervals.reverse();
        for (let i: number = 1; i < intervals.length; i += 1) {
            let priorEl = intervals[i-1];
            let curEl = intervals[i];
            toReturn.push(priorEl - curEl);
        }
        return toReturn;
    }
}