import prisma from "../../../database/client";

export default async function (req, res) {
  try {
    const email = req.body.data;

    const data = await prisma.account.findUnique({
      where: {
        email: email,
      },
    });

    if (data == null) {
      res.status(201);
      res.send(true);
    } else {
      if (data.length == 0) {
        res.status(201);
        res.send(true);
      } else {
        res.status(201);
        res.send(false);
      }
    }
  } catch (e) {
    console.error(e);

    res.status(500);
    res.json({ error: "Sorry unable to read from database" });
  }
  // finally {
  //   await prisma.disconnect();
  // }
}
