-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isMerchant" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "gender" VARCHAR(16),
    "master_category" VARCHAR(32) NOT NULL,
    "sub_category" VARCHAR(32),
    "article_type" VARCHAR(32),
    "base_colour" VARCHAR(32) NOT NULL,
    "season" VARCHAR(32),
    "release_year" INTEGER NOT NULL,
    "product_usage" VARCHAR(32),
    "display_name" VARCHAR(255) NOT NULL,
    "price" BIGINT NOT NULL DEFAULT 0,
    "discount" BIGINT NOT NULL DEFAULT 0,
    "url" VARCHAR(255) NOT NULL DEFAULT '',

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");
