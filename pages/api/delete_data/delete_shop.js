import prisma from "../../../database/client";

export default async function (req, res) {
  try {
    const id = req.body.data;
    await prisma.shopComment.delete({
      where: {
        id: Number(id),
      },
    });
    await prisma.myShopList.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(201);
    res.send("deleted");
  } catch (e) {
    console.error(e);

    res.status(500);
    res.json({ error: "Sorry unable to save into database" });
  }
}
