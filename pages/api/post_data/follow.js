import prisma from "../../../database/client";

export default async function (req, res) {
  try {
    const id = req.body.data.userId;
    const cuid = req.body.data.cuid;

    await prisma.userDetail.update({
      where: { userId: Number(id) },
      data: {
        follower: {
          create: { followerId: Number(cuid) },
        },
      },
    });

    await prisma.userDetail.update({
      where: { userId: Number(cuid) },
      data: {
        following: {
          create: { followingId: Number(id) },
        },
      },
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
