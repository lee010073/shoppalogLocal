import cheerio from "cheerio";
import axios from "axios";

export default async function (req, res) {
  const getLink = async (data) => {
    const array = [];
    for await (const detail of data) {
      if (detail.attribs.rel.includes("icon")) {
        array.push(detail.attribs.href);
      }
    }

    return array;
  };

  try {
    const { data } = await axios.get(`${req.body.data}`);
    const $ = cheerio.load(data);

    const title = $("head > title").text();
    const link = $("head > link");

    const iconLink = await getLink(link);
    const result = { name: title, icon: iconLink[0] };

    res.status(201);
    res.json(result);
  } catch (e) {
    console.error(e);

    res.status(500);
    res.json({ error: "Sorry unable to read from database" });
  }
  // finally {
  //   await prisma.disconnect();
  // }
}
