-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "given_name" TEXT,
    "family_name" TEXT,
    "nickname" TEXT,
    "name" TEXT,
    "email" TEXT,
    "sub" TEXT,
    "email_verified" BOOLEAN,
    "idToken" TEXT,
    "accessToken" TEXT,
    "accessTokenScope" TEXT,
    "access_token_expires" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "email" TEXT,
    "image" TEXT,
    "banner" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "identity" TEXT NOT NULL DEFAULT E'user',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_detail" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "my_description" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "follower" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "follower_id" INTEGER NOT NULL,
    "get_follow_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "following" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "following_id" INTEGER NOT NULL,
    "follow_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "my_shoplist" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "allShopId" INTEGER NOT NULL,
    "nickname" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "category" TEXT,
    "sub_category" TEXT,
    "bought" BOOLEAN NOT NULL,
    "e2" BOOLEAN NOT NULL,
    "e3" BOOLEAN NOT NULL,
    "e4" BOOLEAN NOT NULL,
    "private" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_comment" (
    "id" SERIAL NOT NULL,
    "shoplist_id" INTEGER NOT NULL,
    "shop_description" TEXT,
    "photo" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "allshop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts.email_unique" ON "accounts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_detail.user_id_unique" ON "user_detail"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "shop_comment_shoplist_id_unique" ON "shop_comment"("shoplist_id");

-- CreateIndex
CREATE UNIQUE INDEX "allshop.name_unique" ON "allshop"("name");

-- AddForeignKey
ALTER TABLE "user_detail" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follower" ADD FOREIGN KEY ("user_id") REFERENCES "user_detail"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "following" ADD FOREIGN KEY ("user_id") REFERENCES "user_detail"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "my_shoplist" ADD FOREIGN KEY ("user_id") REFERENCES "user_detail"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "my_shoplist" ADD FOREIGN KEY ("allShopId") REFERENCES "allshop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_comment" ADD FOREIGN KEY ("shoplist_id") REFERENCES "my_shoplist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
