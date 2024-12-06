// getting numbers and operator through process arguments method
const args = process.argv
if (args.length < 5) {
    console.log(`Usage: node projects/calculator.js <num1> <operator> <num2>`);
    process.exit(1)
}
const num1 = Number(args[2])
const operator = args[3]
const num2 = Number(args[4])

function calculateWithNums() {
    switch (operator) {
        case '+':
            console.log(`Result of ${num1} + ${num2} =${num1 + num2}`);
            break;
        case '-':
            console.log(`Result of ${num1} - ${num2} =${num1 - num2}`);
            break;
        case '*':
            console.log(`Result of ${num1} * ${num2} =${num1 * num2}`);
            break;
        case '/':
            if (num2 === 0) {
                console.log('Error: Division by 0 is not allowed.');
            } else {
                console.log(`Result of ${num1} / ${num2} =${num1 / num2}`);
            }
            break;
        default:
            console.log('Invalid operator');
    }
}
calculateWithNums()