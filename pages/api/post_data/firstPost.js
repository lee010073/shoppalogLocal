import prisma from "../../../database/client";

export default async function (req, res) {
  try {
    const id = req.body.data.id;
    const name = req.body.data.username;
    const description = req.body.data.description;
    const image = req.body.data.image;

    if (name.length < 5 || name.length > 16 || name.indexOf(" ") >= 0) {
      res.send("name length unable");
    } else if (description.length > 30) {
      res.send("description length unable");
    } else {
      await prisma.user.update({
        where: { id: Number(id) },
        data: {
          name: name,
          image: image,
          banner:
            "https://res.cloudinary.com/djccssdr9/image/upload/v1617955545/joanna-kosinska-1_CMoFsPfso-unsplash_knuzsm.jpg",
          detail: {
            upsert: {
              create: {
                myDescription: description,
              },
              update: { myDescription: description },
            },
          },
        },
      });

      res.status(201);
      res.send("first info done");
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
