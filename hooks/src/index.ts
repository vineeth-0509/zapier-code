import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const client = new PrismaClient();
app.use(express.json());

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;
  const body = req.body;
  console.log("Reached here");
  await client.$transaction(async (tx: any) => {
    console.log("Reached here 2");

    const run = await tx.zapRun.create({
      data: {
        zapId: zapId,
        metadata: body,
      },
    });
    console.log("Reached here 3");

    await tx.zapRunOutbox.create({
      data: {
        zapRunId: run.id,
      },
    });
  });
  res.json({
    message: "webhook recieved",
  });
});
app.listen(3000, () => {
  console.log("Hooks server is running on localhost:3000");
});
