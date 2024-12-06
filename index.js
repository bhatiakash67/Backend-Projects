// Basic file setup
// const args = process.argv

// if (args.length < 3) {
//     console.log(`
//         Usage:
//           node index.js <tool> [args...]

//         Tools:
//           calc    Run the calculator tool
//           file    Run the file manager tool
//         `);
//     process.exit(1)
// }

// const tool = args[2]
// switch (tool) {
//     case 'calc':
//         require('./projects/calculator')
//         break;
//     case 'file':
//         require('./projects/fileManager')
//     default:
//         console.log(`Unknown tool: ${tool}`);

// }
const readline = require('readline')
const { exec } = require('child_process')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const tools = {
    1: 'Calculator',
    2: 'File Manager',
}

console.log('Select a tool to run:');
Object.entries(tools).forEach(([key, value]) => {
    console.log(`${key}. ${value}`);
})

rl.question("Enter your choice: ", (choice) => {
    switch (choice) {
        case '1':
            // with exec
            rl.question('Enter first number: ', num1 => {
                rl.question('Enter the operator: ', operator => {
                    rl.question('Enter second number: ', num2 => {
                        exec(`npm run start-calculator ${num1} ${operator} ${num2}`, (err, stdout, stderr) => {
                            if (err) console.error(`Error: ${err.message}`)
                            if (stderr) console.log(`Error: ${stderr}`)
                            console.log(stdout);
                        })
                        rl.close()
                    })
                })
            })
            break;
        case '2':
            exec('npm run start-fileManager', (err, stdout, stderr) => {
                if (err) console.error(`Error: ${err.message}`);
                if (stderr) console.log(`Error: ${stderr}`);
                else console.log(stdout);
            })
            break;
        default:
            console.log('Invalid choice.');
            rl.close()
    }
})