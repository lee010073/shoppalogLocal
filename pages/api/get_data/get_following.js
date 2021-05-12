import prisma from "../../../database/client";

export default async function (req, res) {
  const takeFid = async (target) => {
    const idArray = [];
    await target.map((data) => {
      idArray.push(data.followingId);
    });
    return idArray;
  };
  try {
    const following = req.body.data;

    const array = await takeFid(following);

    const data = await prisma.user.findMany({
      where: {
        id: { in: array },
      },
      select: {
        id: true,
        name: true,
        image: true,
        detail: { include: { myList: true, follower: true, following: true } },
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
