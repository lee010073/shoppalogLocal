import prisma from "../../../database/client";

export default async function (req, res) {
  try {
    const input = req.body.data;

    const data = await prisma.user.findMany({
      where: {
        AND: [{ name: { contains: `${input}`, mode: "insensitive" } }],
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
