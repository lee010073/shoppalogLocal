import prisma from "../../../database/client";

export default async function (req, res) {
  try {
    const id = req.body.data.id;
    const name = req.body.data.username;
    const description = req.body.data.description;

    if (name.length < 5 || name.length > 16 || name.indexOf(" ") >= 0) {
      res.send("name length unable");
    } else if (description.length > 30) {
      res.send("description length unable");
    } else {
      await prisma.user.update({
        where: { id: Number(id) },
        data: {
          name: name,
          detail: {
            update: {
              myDescription: description,
            },
          },
        },
      });

      res.status(201);
      res.send("edit done");
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
