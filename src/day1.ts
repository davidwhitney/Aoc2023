export default function day1(input: string[], supportWords = false) {

    const valueMap = new Map<string, number>();
    valueMap.set('1', 1);
    valueMap.set('2', 2);
    valueMap.set('3', 3);
    valueMap.set('4', 4);
    valueMap.set('5', 5);
    valueMap.set('6', 6);
    valueMap.set('7', 7);
    valueMap.set('8', 8);
    valueMap.set('9', 9);

    if (supportWords) {
        valueMap.set('one', 1);
        valueMap.set('two', 2);
        valueMap.set('three', 3);
        valueMap.set('four', 4);
        valueMap.set('five', 5);
        valueMap.set('six', 6);
        valueMap.set('seven', 7);
        valueMap.set('eight', 8);
        valueMap.set('nine', 9);
    }

    let sum = 0;

    for (const line of input) {

        let found = [];
        let foundLast = [];

        for (var [value, asNumber] of valueMap) {
            const firstOccurance = line.indexOf(value);
            if (firstOccurance !== -1) {
                found[firstOccurance] = asNumber;
            }

            const lastOccurance = line.lastIndexOf(value);
            if (lastOccurance !== -1) {
                foundLast[lastOccurance] = asNumber;
            }
        }

        found = found.filter(x => x !== undefined);
        foundLast = foundLast.filter(x => x !== undefined);
        const number = found[0] + "" + foundLast[foundLast.length - 1];

        sum += parseInt(number);
    }

    return sum;
}