import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("mydb.db");

export const aimagDB = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS aimag (
      aid INTEGER PRIMARY KEY,
      aname TEXT,
      awiki TEXT,
      agone INTEGER,
      aimage TEXT
    );

    INSERT OR IGNORE INTO aimag (aid, aname, awiki, agone, aimage)
    VALUES
      (1, 'Архангай', 'https://mn.wikipedia.org/wiki/Архангай_аймаг', 0, 'arkhangai.jpg'),
      (2, 'Баян-Өлгий', 'https://mn.wikipedia.org/wiki/Баян-Өлгий_аймаг', 0, 'bayanulgii.jpg');
  `);
};

export const getAimags = () => {
  return db.getAllSync("SELECT * FROM aimag");
};
