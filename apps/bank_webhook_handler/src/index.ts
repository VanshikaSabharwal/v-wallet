import express from "express";
import db from "@repo/db/client";
import { z } from "zod";

const app = express();
const PORT = process.env.PORT || 3003;
app.use(express.json());

// zod schema
const paymentInformationSchema = z.object({
  token: z.string(),
  userId: z.string(),
  amount: z.string(),
});

app.post("/hdfcWebhook", async (req, res) => {
  //TODO: Add zod validation here?
  //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
  const validation = paymentInformationSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({
      message: "Invalid data format",
      errors: validation.error.errors,
    });
  }

  const paymentInformation = validation.data;

  try {
    // ensure user exists
    const userExists = await db.user.findUnique({
      where: { id: Number(paymentInformation.userId) },
    });
    if (!userExists) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }

    await db.$transaction([
      db.balance.updateMany({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount: {
            // You can also get this from your DB
            increment: Number(paymentInformation.amount),
          },
        },
      }),
      db.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    res.json({
      message: "Captured",
    });
  } catch (e) {
    console.error(e);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
