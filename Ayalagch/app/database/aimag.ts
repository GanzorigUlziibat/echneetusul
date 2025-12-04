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
      (2, 'Баян-Өлгий', 'https://mn.wikipedia.org/wiki/Баян-Өлгий_аймаг', 0, 'bayanulgii.jpg'),
      (3, 'Баянхонгор', 'https://mn.wikipedia.org/wiki/Баянхонгор_аймаг', 0, 'bayanhongor.jpg'),
      (4, 'Булган', 'https://mn.wikipedia.org/wiki/Булган_аймаг', 0, 'bulgan.jpg'),
      (5, 'Говь-Алтай', 'https://mn.wikipedia.org/wiki/Говь-Алтай_аймаг', 0, 'govi-altai.jpg'),
      (6, 'Говьсүмбэр', 'https://mn.wikipedia.org/wiki/Говьсүмбэр_аймаг', 0, 'govisumber.jpg'),
      (7, 'Дархан-Уул', 'https://mn.wikipedia.org/wiki/Дархан-Уул_аймаг', 0, 'darkhan.jpg'),
      (8, 'Дорноговь', 'https://mn.wikipedia.org/wiki/Дорноговь_аймаг', 0, 'dornogovi.jpg'),
      (9, 'Дорнод', 'https://mn.wikipedia.org/wiki/Дорнод_аймаг', 0, 'dornod.jpg'),
      (10, 'Дундговь', 'https://mn.wikipedia.org/wiki/Дундговь_аймаг', 0, 'dundgovi.jpg'),
      (11, 'Завхан', 'https://mn.wikipedia.org/wiki/Завхан_аймаг', 0, 'zavkhan.jpg'),
      (12, 'Орхон', 'https://mn.wikipedia.org/wiki/Орхон_аймаг', 0, 'orkhon.jpg'),
      (13, 'Өвөрхангай', 'https://mn.wikipedia.org/wiki/Өвөрхангай_аймаг', 0, 'uvurkhangai.jpg'),
      (14, 'Өмнөговь', 'https://mn.wikipedia.org/wiki/Өмнөговь_аймаг', 0, 'umnugovi.jpg'),
      (15, 'Сүхбаатар', 'https://mn.wikipedia.org/wiki/Сүхбаатар_аймаг', 0, 'sukhbaatar.jpg'),
      (16, 'Сэлэнгэ', 'https://mn.wikipedia.org/wiki/Сэлэнгэ_аймаг', 0, 'sukhbaatar.jpg'),
      (17, 'Төв', 'https://mn.wikipedia.org/wiki/Төв_аймаг', 0, 'tuv.jpg'),
      (18, 'Увс', 'https://mn.wikipedia.org/wiki/Увс_аймаг', 0, 'uvs.jpg'),
      (19, 'Ховд', 'https://mn.wikipedia.org/wiki/Ховд_аймаг', 0, 'khovd.jpg'),
      (20, 'Хөвсгөл', 'https://mn.wikipedia.org/wiki/Хөвсгөл_аймаг', 0, 'khuvsgul.jpg'),
      (21, 'Хэнтий', 'https://mn.wikipedia.org/wiki/Хэнтий_аймаг', 0, 'khentii.jpg');
  `);
};
