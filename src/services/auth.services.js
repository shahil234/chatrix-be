import db from "../db/db.js";

export const GoogleAuthVerify = async (
  accessToken,
  refreshToken,
  data,
  done
) => {
  const user = await db.user.findFirst({
    where: { email: data?._json?.email },
  });

  if (user) {
    return done(null, user);
  }

  const newUser = await db.user.create({
    data: {
      username: data?._json?.name,
      email: data?._json?.email,
    },
  });

  await db.profile.create({
    data: {
      userId: newUser?.id,
      picture: data?._json?.picture,
    },
  });
  return done(null, newUser);
};
