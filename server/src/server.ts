import express, { Express, Request, Response } from "express";

let app = express();
app.use(express.json());
async function generateResume(req: Request, res: Response) {
  try {
    let { body } = req;
    
  } catch (error) {}
}

app.post("/resume", generateResume);

app.listen("8080", () => {
  console.log("server started at " + 8080);
});
