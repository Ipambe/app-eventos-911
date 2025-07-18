CREATE TABLE `eventos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` integer NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`uri` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `eventos_title_unique` ON `eventos` (`title`);