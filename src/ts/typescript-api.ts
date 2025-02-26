type Operation = (a: number, b: number, printText: string) => void


const sum: Operation = (a, b, printText)  => {
    console.log(printText, a + b);
}

const multiplicator: Operation = (a, b, printText) => {
    console.log(printText, a * b);
}


multiplicator(2, 4, "multiplied numbers, result is...");
multiplicator(3, 4, "multiplied numbers, result is...");


//! WE ARE IN HOME-PAGE BRANCH
