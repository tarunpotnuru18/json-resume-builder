import express, { Express, Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import { exec, execSync } from "child_process";
import { promisify } from "util";
let app = express();
console.log(__dirname);
app.use(express.json());
async function generateResume(req: Request, res: Response) {
  try {
    let { body } = req;
    let resumeObject = JSON.stringify({ ...body.resumeObject });
    let resumePath = path.join(__dirname, "../src", "resume.json");
    let htmlPath = path.join(__dirname, "../src/resume.html");
    let asyncExec = promisify(exec);
    await fs.writeFile(resumePath, resumeObject);
    await asyncExec(`resumed render ${resumePath}`, {
      cwd: path.join(__dirname, "../src"),
    });
    let html = await fs.readFile(htmlPath, "utf-8");

    res.json("done");
  } catch (error: any) {
    console.log(error.message);
    res.send("not done bro");
  }
}

app.post("/resume", generateResume);

app.listen("8080", () => {
  console.log("server started at " + 8080);
});
