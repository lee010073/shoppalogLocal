import prisma from "../../../database/client";

export default async function (req, res) {
  try {
    const id = req.body.data;

    const data = await prisma.myShopList.findMany({
      where: {
        userId: Number(id),
      },
      include: {
        allShop: true,
        comment: true,
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
