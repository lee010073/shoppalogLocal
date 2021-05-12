import prisma from "../../../database/client";

export default async function (req, res) {
  try {
    const id = req.body.data.userId;
    const link = req.body.data.allData.link;
    const nickname = req.body.data.allData.name;
    const realName = req.body.data.allData.realName;
    const icon = req.body.data.allData.icon;
    const category = req.body.data.allData.category.value;
    const subCategory = JSON.stringify(req.body.data.subcategory);
    const bought = req.body.data.allData.visited;
    const comment = req.body.data.allData.comment;

    if (req.body.data.subcategory.length > 6) {
      res.send("subcategory length unable");
    } else {
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
                nickname: nickname,
                category: category,
                subCategory: subCategory,
                comment: {
                  create: { shopDescription: comment },
                },
                bought: bought,
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
                nickname: nickname,
                category: category,
                subCategory: subCategory,
                comment: {
                  create: { shopDescription: comment },
                },
                bought: bought,
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
