CREATE TABLE "koalas" (
"id" serial primary key,
"name" varchar(30),
"age" INTEGER,
"gender" varchar(1),
"ready_to_transfer" BOOLEAN,
"notes" varchar(200)
);

INSERT INTO "koalas" ("name", "age", "gender", "ready_to_transfer", "notes")
VALUES 
('Scotty', 4, 'M', '1', 'Born in Gualtemala'),
('Jean', 5, 'F', '1', 'Allergic to lots of lava'), 
('Ororo', 7, 'F', '0', 'loves listening to Paula (Abdul)'), 
('Logan', 15, 'M', '0', 'Love the sauna'),
('Charlie', 9, 'M', '1', 'Favorite band is Nirvana'),
('Betsy', 4, 'F', '1', 'Has a pet iguana');



DROP TABLE "koalas";