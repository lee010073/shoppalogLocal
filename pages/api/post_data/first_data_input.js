import prisma from "../../../database/client";

export default async function (req, res) {
  try {
    const gName = req.body.data.given_name;
    const fName = req.body.data.family_name;
    const nName = req.body.data.nickname;
    const name = req.body.data.name;
    const picture = req.body.data.picture;
    const email = req.body.data.email;
    const email_verified = req.body.data.email_verified;
    const sub = req.body.data.sub;
    const idToken = req.body.data.idToken;
    const accessToken = req.body.data.accessToken;
    const accessTokenScope = req.body.data.accessTokenScope;
    const accessTokenExpiresAt = req.body.data.accessTokenExpiresAt;
    const first = req.body.login;

    if (first == true) {
      await prisma.account.create({
        data: {
          givenName: gName,
          familyName: fName,
          nickName: nName,
          name: name,
          email: email,
          sub: sub,
          emailVerified: email_verified,
          idToken: idToken,
          accessToken: accessToken,
          accessTokenScope: accessTokenScope,
          accessTokenExpires: accessTokenExpiresAt,
        },
      });

      await prisma.user.create({
        data: {
          name: name,
          email: email,
          image: picture,
          detail: {
            create: {
              myDescription: null,
            },
          },
        },
      });

      res.send("first done");
    }

    if (first == false) {
      await prisma.account.update({
        where: { email: email },
        data: {
          givenName: gName,
          familyName: fName,
          nickName: nName,
          name: name,
          email: email,
          sub: sub,
          emailVerified: email_verified,
          idToken: idToken,
          accessToken: accessToken,
          accessTokenScope: accessTokenScope,
          accessTokenExpires: accessTokenExpiresAt,
        },
      });

      res.send("update done");
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
