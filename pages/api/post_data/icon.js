import prisma from "../../../database/client";

export default async function (req, res) {
  try {
    const id = req.body.data.id;
    const link = req.body.data.link;

    await prisma.user.update({
      where: { id: Number(id) },
      data: {
        image: link,
      },
    });

    res.status(201);
    res.send("new icon");
  } catch (e) {
    console.error(e);

    res.status(500);
    res.json({ error: "Sorry unable to save into database" });
  }
  // finally {
  //   await prisma.disconnect();
  // }
}
