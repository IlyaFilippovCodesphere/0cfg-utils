/**
 * Number of file watchers reached?
 * Check here: https://klequis.io/error-enospc-system-limit-for-number-of-file-watchers-reached/#:~:text=It%20turns%20out%20that%20the,easy%20to%20increase%20the%20limit.
 */

const {spawn, execSync} = require('child_process');
const yargs = require('yargs');
const glob = require("glob");
const argv = yargs(process.argv).argv;
const chalk = require("chalk");
const path = require("path");


const art = [()=>
console.log(chalk.yellow`
       ▐▒▒░▄
       ▒▒▒▒▒▒▒▒▄
       ▐▒▒▒▒▒▒▒▒▒▒▒▄                                                                         ▄▄▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▄                                                               ▄▄▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄                                                       ▄▒▒▒▒▒▒▒▒▒▒▒▒▒▌
         ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄                                               ▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
          ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒                                        ▄░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░
           ▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄                                ▄▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
             ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄▄▄▄▄░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
              ▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▀
                ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
                  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
                    ▀▒▒▒░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▀
                       ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒▒▒▒▀
                     ▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░
                     ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
                    ▒▒▒▒▒▒▒▒▒▒░▄▄▄  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▄▄▄  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
                   ▒▒▒▒▒▒▒▒▒▒▒ ▀█▀   ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▐██▀   ▒▒▒▒▒▒▒▒▒▒▒▒▒▒░
                  ▒▒▒▒▒▒▒▒▒▒▒▒       ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░       ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
                 ▐▒▒▒▒▒▒▒▒▒▒▒▒▒▄   ▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄   ▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
                 ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▀▀▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
                ▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄▄  ▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
                ▒▒░░░░░░░░▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░▒▒▒▒▒▒▒▒
               ▐▒░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░▐▒▒▒▒▒▒
               ▒▒░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▀░░░░▄░░░▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░▐▒▒▒▒▒▒▒
               ▐▒▒░░░░░░░▄░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░▒▒▒▒▒▒▒▒
                ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒░▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░▒▒▒▒▒▒▒▒▒▒▒▒
                ▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒░▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
                 ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄░▀▒▒▒▒▀░▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
                  ▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
                   ▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░
`)];

art[Math.floor(Math.random() * art.length)]();

const logErr = (message, tag) => {
    console.log(`[${chalk.red("Error")}, ${new Date().toISOString()}, ${chalk.blue("#" + tag)}]: ${message}`);
};

const log = (message, tag) => {
    console.log(`[${chalk.green("Ok")}, ${new Date().toISOString()}, ${chalk.blue("#" + tag)}]: ${message}`);
};

const locateProjectsViaConfig = async (configFileName) => {
    const pathPattern = path.join(process.cwd(), argv.root, '**', configFileName);
    const paths = await new Promise(resolve =>
        glob(pathPattern, (err, files) => resolve(files)),
    );
    return paths.filter(
        file => !file.includes("node_modules"),
    )
        .map(file => file.replace(`/${configFileName}`, ""))
        .map(file => path.relative(process.cwd(), file));
};

const logBuildMessage = (buffer) => {
    const message = buffer.toString().replace(/\n+/g, "");
    if (message.includes("ttsc")) {
        return;
    }
    let split = message.split(/\: error TS\d+\:/);
    if (split.length >= 2) {
        logErr(`${split[1].trim()}\n(See: file://${process.cwd()}/${split[0]})`, "Build");
    }
    split = message.split("-");
    if (split.length >= 2) {
        log(split[1].trim(), "Build");
    } else {
        log(message, "Build");
    }
};

const getProjectForNpmProject = (npmProject, projectDirs) => {
    for (const projectDir of projectDirs) {
        if (require(path.join(process.cwd(), projectDir, "package.json")).name === npmProject) {
            return projectDir;
        }
    }
    return undefined;
};

const getBuildOrder = (projects) => {
    const npmBuildOrder = execSync("yarn run printBuildOrder")
        .toString()
        .split("\n")
        .map(str => str.trim());
    const buildOrder = [];
    for (const npmProject of npmBuildOrder) {
        const project = getProjectForNpmProject(npmProject, projects);
        if (!project) {
            continue;
        }
        buildOrder.push(project);
    }
    log("Build order: " + buildOrder.map(
        package => package.replace(argv.root + "/", ""),
    ).join("->"), "Build");
    return buildOrder;
};

const logStdBuffer = (buffer, tag = "Run") => {
    const messages = buffer.toString().split("\n");
    for (const message of messages) {
        if (message.trim() === "") {
            continue;
        }
        message.toLowerCase().includes("err") ?
            logErr(message, tag) :
            log(message, tag);
    }
};

const logErrBuffer = (buffer) => {
    const messages = buffer.toString().split("\n");
    for (const message of messages) {
        if (message.includes("warning")
            || message.includes("info")
            || message.trim() == "lerna"
            || message.trim() == ""
            || message.includes("notice")
            || message.includes("webpack is watching the files")
            || message.includes("yarn run watch")) {
            return;
        }
        logErr(message, "Run");
    }
};

const startTscWatcher = (projects) =>
    spawn("yarn", ["ttsc", "-b", "--preserveWatchOutput", "--watch", ...projects], {shell: true});

const startRunWatcher = () => {
    const opts = {
        shell: true,
        env: Object.assign({
            CODESPHERE_HOST: 'localhost:8080',
            CODESPHERE_VERSION: '1.0.0',
            CODESPHERE_ENV: 'local',
            IDE_SERVICE_URL: 'http://localhost:8080/ide-service',
            PAYMENT_SERVICE_URL: 'http://localhost:8080/payment-service',
            PAYMENT_SERVICE_EXTERNAL_URL: 'http://localhost:8080/payment-service',
            APP_SERVICE_URL: 'http://localhost:8080/app-service',
            WORKSPACE_SERVICE_URL: 'http://localhost:8080/workspace-service',
            IDE_EXTERNAL_URL: 'http://localhost:8080/ide',
            STRIPE_PUBLISHABLE_KEY: 'pk_test_51Hy9VJAVVdkDiWTkbFChi6XBPZoCw9vN1D1k4oewc' +
                'arV9XNkI63zeqQOB2K5X3jtdLIWJFmjxP4iNrdndl6Sb5te00jxmKsa9J',
            STRIPE_SECRET_KEY: 'sk_test_51Hy9VJAVVdkDiWTkeEEXLrPpCqbOTpAnxnS5Jea1M' +
                '3bMRPjRmUyeMrUbGbQk7MwZOPC1N6XaJLDwnLNDCyPYcljd00XL4YZhk6',
            STRIPE_WEBHOOK_ENDPOINT_SECRET: '',
            OCTOBAT_SECRET_KEY: 'oc_test_skey_tRz0qH6S9edutgqinPNhgAtt',
            // TODO @jzi change to local
            KUBE_NAMESPACE: 'dev',
            STORAGE_CLASS: 'rook-cephfs-local',
            SUB_DOMAIN_SUFFIX: '-local',
            PRIORITY_CLASS: 'low-priority',
            SEND_GRID_API_KEY: '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',
            CODE_SYNC_FIREBASE_URL: 'https://codesphere-rtc-15db8-local.firebaseio.com',
            FILE_TREE_SYNC_FIREBASE_URL : 'https://codesphere-file-tree-15db8-local.firebaseio.com',
            MASTER_DATA_DB_PASSWORD_APP: 'xWPl1l8KPDJIkYY3Bz1g',
            MASTER_DATA_DB_PASSWORD_PAYMENT: 'oYgmGu1aIPJWWW1T',
            MASTER_DATA_DB_PASSWORD_IDE: 'C8z8zcthWYDmMEA4',
            MASTER_DATA_DB_PASSWORD_AUTH: '6rVGt7HV',
            MSSQL_DB_SERVER: "codesphere-dev.database.windows.net",
        }, process.env),
    };

    return spawn("lerna", ["run", "watch", "--parallel"], opts);
}

const bootstrap = () => {
    const process = spawn("yarn", ["run", "bootstrap"], {shell: true});
    process.stdout.on("data", data => logStdBuffer(data, "Bootstrap"));
    return new Promise(resolve => process.on("close", resolve));
};

(async function main() {

    await bootstrap();

    const ignoreProjects = await locateProjectsViaConfig(".devignore");
    const typeScriptOnlyProjects = (await locateProjectsViaConfig("tsconfig.json"))
        .filter(path => !ignoreProjects.includes(path));
    const tsProjectsSorted = getBuildOrder(typeScriptOnlyProjects);

    const tscWatcher = startTscWatcher(tsProjectsSorted);
    let triggerFirstRun;
    let runWatcher;

    const firstBuildFinished = new Promise(resolve => {
        triggerFirstRun = resolve;
    });
    tscWatcher.stdout.on("data", buffer => {
        if (buffer.toString().includes("Found 0 errors. Watching for file changes.")) {
            triggerFirstRun();
        }
        logBuildMessage(buffer);
    });
    tscWatcher.stderr.on("data", logBuildMessage);
    tscWatcher.on("close", () => {
        logErr("Build watcher failed.", "Build");
        runWatcher && runWatcher.kill();
        process.exit(1);
    });

    await firstBuildFinished;
    if (!argv.buildOnly) {
        runWatcher = startRunWatcher();
        runWatcher.stdout.on("data", logStdBuffer);
        runWatcher.stderr.on("data", logErrBuffer);
        runWatcher.on("close", () => {
            logErr("Run watcher failed.", "Run");
        });
    }

    process.on('SIGINT', function () {
        console.log("Caught CTRL-C.");
        runWatcher && runWatcher.kill();
        tscWatcher && tscWatcher.kill();
        process.exit(1);
    });

})();
