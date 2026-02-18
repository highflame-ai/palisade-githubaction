const tl = require('azure-pipelines-task-lib/task');
const cp = require('child_process');

async function run() {
    try {
        const args = tl.getInput('args', true);

        console.log("Installing Palisade from PyPI...");
        cp.execSync('python -m pip install --upgrade pip', { stdio: 'inherit' });
        cp.execSync('pip install palisade', { stdio: 'inherit' });

        const command = `palisade ${args}`;

        console.log(`Running command: ${command}`);
        cp.execSync(command, { stdio: 'inherit' });

        console.log("Palisade scan completed successfully.");

    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
