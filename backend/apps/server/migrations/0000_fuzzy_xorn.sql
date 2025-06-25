CREATE TYPE "public"."user_role" AS ENUM('admin', 'user');--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"auth0_id" text NOT NULL,
	"first_name" text,
	"last_name" text,
	"email" text NOT NULL,
	"user" "user_role" DEFAULT 'user' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "unique_user_email" ON "user" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_user_auth0_id" ON "user" USING btree ("auth0_id");