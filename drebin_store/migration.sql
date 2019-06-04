CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);


DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20190217200326_initial') THEN
    CREATE TABLE "Products" (
        "Id" serial NOT NULL,
        "Title" text NULL,
        "Price" numeric NOT NULL,
        "IconUrl" text NULL,
        "Description" text NULL,
        "PreviewUrl" text NULL,
        "NumberInStock" integer NOT NULL,
        CONSTRAINT "PK_Products" PRIMARY KEY ("Id")
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20190217200326_initial') THEN
    CREATE TABLE "Users" (
        "Id" serial NOT NULL,
        "Username" text NULL,
        "PasswordHash" bytea NULL,
        "PasswordSalt" bytea NULL,
        "DrebinPoints" numeric NOT NULL,
        "MainQuestStage" integer NOT NULL,
        CONSTRAINT "PK_Users" PRIMARY KEY ("Id")
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20190217200326_initial') THEN
    CREATE TABLE "Orders" (
        "Id" serial NOT NULL,
        "UserId" integer NULL,
        "ProductId" integer NULL,
        "IsCompleted" boolean NOT NULL,
        "OrderTimeStamp" timestamp without time zone NOT NULL,
        "CompletionTimeStamp" timestamp without time zone NOT NULL,
        CONSTRAINT "PK_Orders" PRIMARY KEY ("Id"),
        CONSTRAINT "FK_Orders_Products_ProductId" FOREIGN KEY ("ProductId") REFERENCES "Products" ("Id") ON DELETE RESTRICT,
        CONSTRAINT "FK_Orders_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "Users" ("Id") ON DELETE RESTRICT
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20190217200326_initial') THEN
    CREATE INDEX "IX_Orders_ProductId" ON "Orders" ("ProductId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20190217200326_initial') THEN
    CREATE INDEX "IX_Orders_UserId" ON "Orders" ("UserId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20190217200326_initial') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20190217200326_initial', '2.2.3-servicing-35854');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20190314213614_GroupsAndPermissions') THEN
    ALTER TABLE "Orders" DROP COLUMN "IsCompleted";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20190314213614_GroupsAndPermissions') THEN
    ALTER TABLE "Users" ADD "CanManageOrders" boolean NOT NULL DEFAULT FALSE;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20190314213614_GroupsAndPermissions') THEN
    ALTER TABLE "Users" ADD "CanManageProducts" boolean NOT NULL DEFAULT FALSE;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20190314213614_GroupsAndPermissions') THEN
    ALTER TABLE "Users" ADD "CanManageUsers" boolean NOT NULL DEFAULT FALSE;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20190314213614_GroupsAndPermissions') THEN
    ALTER TABLE "Users" ADD "GroupId" integer NULL;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20190314213614_GroupsAndPermissions') THEN
    ALTER TABLE "Orders" ADD "OrderState" integer NOT NULL DEFAULT 0;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20190314213614_GroupsAndPermissions') THEN
    CREATE TABLE "Groups" (
        "Id" serial NOT NULL,
        "Name" text NULL,
        CONSTRAINT "PK_Groups" PRIMARY KEY ("Id")
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20190314213614_GroupsAndPermissions') THEN
    CREATE INDEX "IX_Users_GroupId" ON "Users" ("GroupId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20190314213614_GroupsAndPermissions') THEN
    ALTER TABLE "Users" ADD CONSTRAINT "FK_Users_Groups_GroupId" FOREIGN KEY ("GroupId") REFERENCES "Groups" ("Id") ON DELETE RESTRICT;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20190314213614_GroupsAndPermissions') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20190314213614_GroupsAndPermissions', '2.2.3-servicing-35854');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20190322212840_OrderCompletionMadeNullable') THEN
    ALTER TABLE "Orders" ALTER COLUMN "CompletionTimeStamp" TYPE timestamp without time zone;
    ALTER TABLE "Orders" ALTER COLUMN "CompletionTimeStamp" DROP NOT NULL;
    ALTER TABLE "Orders" ALTER COLUMN "CompletionTimeStamp" DROP DEFAULT;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20190322212840_OrderCompletionMadeNullable') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20190322212840_OrderCompletionMadeNullable', '2.2.3-servicing-35854');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20190525222101_NotificationsMigration') THEN
    ALTER TABLE "Users" ADD "NotificationSubscriptionString" text NULL;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20190525222101_NotificationsMigration') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20190525222101_NotificationsMigration', '2.2.3-servicing-35854');
    END IF;
END $$;
