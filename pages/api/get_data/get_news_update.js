import prisma from "../../../database/client";

export default async function (req, res) {
  const takeFid = async (target) => {
    const x = [];
    await target.map((data) => {
      x.push(data.followingId);
    });
    return x;
  };
  try {
    const following = req.body.data;

    const array = await takeFid(following);

    const data = await prisma.myShopList.findMany({
      where: {
        userId: { in: array },
      },
      include: { comment: true, user: { select: { user: true } } },
      orderBy: {
        id: "desc",
      },
      take: 10,
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
