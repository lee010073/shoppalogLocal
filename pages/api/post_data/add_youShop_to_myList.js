import prisma from "../../../database/client";

export default async function (req, res) {
  try {
    const id = req.body.data.id;
    const link = req.body.data.link;
    const realName = req.body.data.realName;
    const icon = req.body.data.icon;
    const category = req.body.data.category;
    const subCategory = JSON.stringify(req.body.data.subcategory);

    const check = await prisma.userDetail.findMany({
      where: {
        userId: Number(id),
        myList: {
          some: {
            link: {
              contains: link,
            },
          },
        },
      },
    });

    if (!check.length) {
      await prisma.allShop.upsert({
        where: { name: realName },
        update: {
          addedShop: {
            create: {
              userId: Number(id),
              link: link,
              nickname: realName,
              category: category,
              subCategory: subCategory,
              comment: {
                create: { shopDescription: "" },
              },
              bought: false,
              e2: false,
              e3: false,
              e4: false,
              private: false,
            },
          },
        },
        create: {
          name: realName,
          link: link,
          icon: icon,
          addedShop: {
            create: {
              userId: Number(id),
              link: link,
              nickname: realName,
              category: category,
              subCategory: subCategory,
              comment: {
                create: { shopDescription: "" },
              },
              bought: false,
              e2: false,
              e3: false,
              e4: false,
              private: false,
            },
          },
        },
      });

      res.send("A New Record of ecommerce shop created");
    } else {
      res.send("You got a record with same Link already");
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
