import prisma from "../../../database/client";

export default async function (req, res) {
  try {
    const id = req.body.data.userId;
    const cuid = req.body.data.cuid;

    await prisma.follower.deleteMany({
      where: { AND: [{ userId: Number(id) }, { followerId: Number(cuid) }] },
    });

    await prisma.following.deleteMany({
      where: { AND: [{ userId: Number(cuid) }, { followingId: Number(id) }] },
    });

    res.status(201);
    res.send("first info done");
  } catch (e) {
    console.error(e);

    res.status(500);
    res.json({ error: "Sorry unable to save into database" });
  }
  // finally {
  //   await prisma.disconnect();
  // }
}
