const fs = require('node:fs/promises')
const path = require('path')
const args = process.argv

const operation = args[2]
const fileName = args[3]
const content = args[4]

const baseDir = path.resolve(__dirname, './randoFiles')
const getFilePath = (fileName) => path.join(baseDir, fileName)

async function ensureDirectory() {
    try {
        await fs.mkdir(baseDir, { recursive: true })
    } catch (err) {
        console.error("Error creating directory:", err.message)
    }
}

function displayHelp() {
    console.log(`
        Usage:
          file-operations <operation> <fileName> [content]
        Operations:
          read    <fileName>           Read the contents of a file.
          write   <fileName> <content> Write content to a file (overwrites existing content).
          delete  <fileName>           Delete a file.
          help                        Display this help message.
        Examples:
          file-operations read example.txt
          file-operations write example.txt "Hello, World!"
          file-operations delete example.txt
        `);
}

async function fileOperations() {
    try {
        await ensureDirectory()

        switch (operation) {
            case 'read':
                if (!fileName) {
                    console.error("Error: File name is required for the 'read' operation.")
                    return
                }
                const filePath = getFilePath(fileName)
                try {
                    const data = await fs.readFile(`${filePath}`, 'utf-8')
                    console.log(`File contents of "${fileName}":\n`, data);
                } catch (err) {
                    console.error(`Error reading file "${fileName}":`, err.message)
                }
                break;
            case 'write':
                if (!fileName || !content) {
                    console.error("Error: File name and content are required for the 'write' operation.");
                    return;
                }
                try {
                    await fs.writeFile(getFilePath(fileName), content)
                    console.log(`File "${fileName}" written successfully.`);
                } catch (err) {
                    console.error(`Error writing to file "${fileName}":`, err.message)
                }
                break;

            case 'delete':
                if (!fileName) {
                    console.error(`Error: File name is required for the 'delete' operation.`)
                    return
                }
                try {
                    await fs.unlink(getFilePath(fileName))
                    console.log(`File "${fileName}" deleted successfully.`)
                } catch (err) {
                    console.error(`Error deleting file "${fileName}":`, err.message)
                }
                break;
            case 'help':
            default:
                displayHelp()
                break;
        }
    } catch (err) {
        console.log("An unexpected error occured:", err.message);
    }
}
fileOperations()