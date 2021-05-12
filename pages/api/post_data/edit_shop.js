import prisma from "../../../database/client";

export default async function (req, res) {
  try {
    const id = req.body.data.shopId;
    const link = req.body.data.allData.link;
    const nickname = req.body.data.allData.name;
    const category = req.body.data.allData.category.value;
    const subCategory = JSON.stringify(req.body.data.subcategory);
    const bought = req.body.data.allData.visited;
    const comment = req.body.data.allData.comment;

    if (req.body.data.subcategory.length > 6) {
      res.send("subcategory length unable");
    } else {
      await prisma.myShopList.update({
        where: { id: Number(id) },
        data: {
          link: link,
          nickname: nickname,
          category: category,
          subCategory: subCategory,
          bought: bought,
          comment: {
            update: {
              shopDescription: comment,
            },
          },
        },
      });

      res.status(201);
      res.send("it is done");
    }
  } catch (e) {
    console.error(e);

    res.status(500);
    res.json({ error: "Sorry unable to save into database" });
  }
  // finally {
  //   await prisma.disconnect();
  // }
}
