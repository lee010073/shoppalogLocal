import prisma from "../../../database/client";

export default async function (req, res) {
  try {
    const email = req.body.data;

    const data = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
      },
    });

    res.status(201);
    res.json(data);
  } catch (e) {
    console.error(e);

    res.status(500);
    res.json({ error: "Sorry unable to read from database" });
  }
  // finally {
  //   await prisma.disconnect();
  // }
}
