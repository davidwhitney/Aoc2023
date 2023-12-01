export default function day1(input: string[], supportWords = false) {

    const theWordsOneToNine = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

    if (supportWords) {
        const newInput = [];

        for(let line of input) {
            let cursor = 0;


            while (cursor <= line.length) {
                const slice = line.slice(0, cursor); //?
                
                for(let word of theWordsOneToNine) {
                    if (slice.includes(word)) {
                        const number = theWordsOneToNine.indexOf(word) + 1 + '';
                        line = line.replace(word, number);
                        cursor = -1;
                    }
                }

                if (cursor === -1) {
                    cursor = 0;
                } else {
                    cursor++;
                }
            }

            newInput.push(line);        
        }

        input = newInput; //?
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