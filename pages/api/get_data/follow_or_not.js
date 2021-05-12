import prisma from "../../../database/client";

export default async function (req, res) {
  try {
    const id = req.body.data.input;
    const cuid = req.body.data.cuid;

    const data = await prisma.follower.findMany({
      where: {
        AND: [{ userId: Number(id) }, { followerId: Number(cuid) }],
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
