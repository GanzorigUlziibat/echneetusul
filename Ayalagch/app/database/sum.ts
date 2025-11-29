import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("mydb.db");

export const sumDB = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS sum (
      sid INTEGER PRIMARY KEY,
      aid INTEGER,
      sname TEXT,
      swiki TEXT,
      sgone INTEGER
    );

    INSERT OR IGNORE INTO sum (sid, aid, sname, swiki, sgone)
    VALUES
      (1, 1, 'Цэнхэр', 'https://mn.wikipedia.org/wiki/Цэнхэр_сум', 0),
      (2, 1, 'Тариат', 'https://mn.wikipedia.org/wiki/Тариат_сум', 0),
      (3, 2, 'Өлгий', 'https://mn.wikipedia.org/wiki/Өлгий_сум', 0),
      (4, 2, 'Буянт', 'https://mn.wikipedia.org/wiki/Буянт_сум', 0);
  `);
};

export const getSums = () => {
  return db.getAllSync("SELECT * FROM sum");
};
