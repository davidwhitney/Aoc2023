export default function day1(input: string[], supportWords = false) {
    const digits = new Map<string, number>();
    digits.set('1', 1);
    digits.set('2', 2);
    digits.set('3', 3);
    digits.set('4', 4);
    digits.set('5', 5);
    digits.set('6', 6);
    digits.set('7', 7);
    digits.set('8', 8);
    digits.set('9', 9);

    if (supportWords) {
        digits.set('one', 1);
        digits.set('two', 2);
        digits.set('three', 3);
        digits.set('four', 4);
        digits.set('five', 5);
        digits.set('six', 6);
        digits.set('seven', 7);
        digits.set('eight', 8);
        digits.set('nine', 9);
    }

    let sum = 0;
    for (const line of input) {
        sum += toNumber(line, digits);
    }

    return sum;
}

function toNumber(line: string, digits: Map<string, number>) {
    let startDigits: Number[] = [];
    let endDigits: Number[] = [];

    for (var [value, asNumber] of digits) {
        const firstOccurance = line.indexOf(value);
        if (firstOccurance !== -1) {
            startDigits[firstOccurance] = asNumber;
        }

        const lastOccurance = line.lastIndexOf(value);
        if (lastOccurance !== -1) {
            endDigits[lastOccurance] = asNumber;
        }
    }

    startDigits = startDigits.filter(Number);
    endDigits = endDigits.filter(Number);

    const twoDigitCode = startDigits[0] + "" + endDigits[endDigits.length - 1];
    return parseInt(twoDigitCode);
}