const execa = require("execa");
const fs = require("fs");

(async () => {
    try {
        await execa("git", ["checkout", "--orphan", "gh-pages"]);
        console.log("Building...");
        await execa("npm", ["run", "build"]);
        const folderName = fs.existsSync("dist") ? "dist" : "build";
        await execa("git", ["--work-tree", folderName, "add", "--all"]);
        await execa("git", ["--work-tree", folderName, "commit", "-m", "gh-pages"]);
        console.log("Pushing to gh-pages...");
        await execa("git", ["push", "origin", "HEAD:gh-pages", "--force"]);
        await fs.rm(folderName, {recursive: true}, (err) => {
            if(err) throw err;
        });
        await execa("git", ["checkout", "-f", "main"]);
        await execa("git", ["branch", "-D", "gh-pages"]);
        console.log("Successfully deployed");
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
})();
