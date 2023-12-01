export default function day1(input: string[], supportWords = false) {

    const theWordsOneToNine = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

    if (supportWords) {
        const newInput = [];

        for (let line of input) {
            let cursor = 0;

            const parsedParts = [];
            const lineSplitOnDigits = line.split(/(\d+)/); //?

            for (let linePart of lineSplitOnDigits) {
                if (parseInt(linePart) > -1) {
                    parsedParts.push(linePart);
                    continue;
                }

                let orderedNumbers = [];

                for (const number of theWordsOneToNine) {
                    const discoveredIndex = linePart.indexOf(number); //?
                    if (discoveredIndex !== -1) {
                        const value = theWordsOneToNine.indexOf(number) + 1 + '';
                        orderedNumbers[discoveredIndex] = value;
                    }
                }

                orderedNumbers = orderedNumbers.filter(x => x !== undefined); //?
                parsedParts.push(...orderedNumbers);
            }

            const newLine = parsedParts.join('');
            newInput.push(newLine);
        }

        input = newInput;
    }

    const regex = /\D/g;
    const withoutChars = input.map(x => x.replace(regex, ''));
    console.log(withoutChars);

    const toNumbers = withoutChars.map(x => {
        const firstAndLast = x.slice(0, 1) + x.slice(-1);
        return parseInt(firstAndLast);
    });
    const sum = toNumbers.reduce((a, b) => a + b, 0);
    return sum;
}