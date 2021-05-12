import prisma from "../../../database/client";

export default async function (req, res) {
  const takeFid = async (target) => {
    const idArray = [];
    await target.map((data) => {
      idArray.push(data.followingId);
    });
    return idArray;
  };

  const mapData = async (data) => {
    const allShopArray = [];
    const noAdd = [];
    for await (const detail of data) {
      detail.follow = false;
      detail.from = "all";
      if (detail.addedShop.length > 0) {
        allShopArray.push(detail);
      } else if ((detail.addedShop.length = 0)) {
        noAdd.push(detail);
      }
    }
    return allShopArray;
  };

  try {
    const input = req.body.data.input;
    const following = req.body.data.following;

    const array = await takeFid(following);

    const data = await prisma.allShop.findMany({
      where: {
        OR: [
          { name: { contains: `${input}`, mode: "insensitive" } },
          {
            addedShop: {
              some: { category: { contains: `${input}`, mode: "insensitive" } },
            },
          },
          {
            addedShop: {
              some: {
                subCategory: { contains: `${input}`, mode: "insensitive" },
              },
            },
          },
        ],
        AND: { addedShop: { every: { userId: { notIn: array } } } },
      },
      include: { addedShop: true },
    });

    const mapping = await mapData(data);

    res.status(201);
    res.json(mapping);
  } catch (e) {
    console.error(e);

    res.status(500);
    res.json({ error: "Sorry unable to read from database" });
  }
  // finally {
  //   await prisma.disconnect();
  // }
}
