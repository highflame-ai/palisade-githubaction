const tl = require('azure-pipelines-task-lib/task');

async function run() {
    try {
        const argsInput = tl.getInput('args', true);

        if (!argsInput) {
            throw new Error("No arguments provided.");
        }

        // Split arguments safely
        const args = argsInput.match(/(?:[^\s"]+|"[^"]*")+/g) || [];

        console.log("Upgrading pip...");
        await tl.exec('python', ['-m', 'pip', 'install', '--upgrade', 'pip']);

        console.log("Installing Palisade...");
        await tl.exec('pip', ['install', 'palisade']);

        console.log("Running Palisade...");
        await tl.exec('palisade', args);

        tl.setResult(tl.TaskResult.Succeeded, "Palisade scan completed successfully.");

    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();