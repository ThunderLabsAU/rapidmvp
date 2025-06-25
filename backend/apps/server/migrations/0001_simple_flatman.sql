CREATE TYPE "public"."thing_type" AS ENUM('thingamabob', 'whatchamacallit', 'doohickey');--> statement-breakpoint
CREATE TABLE "thing" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"thingamabob" "thing_type" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
