export const data = [
  {
    id: 1,
    catName: "Амьтад",
    catIcon: "paw",
    subcategories: [
      {
        sid: 101,
        sname: "Шувуу",
        image: require("../../assets/animal/birds/bird.jpg"),
        items: [
          {
            iid: 1011,
            iname: "Бүргэд",
            image: require("../../assets/animal/birds/burged.jpg"),
          },
          {
            iid: 1012,
            iname: "Тагтаа",
            image: require("../../assets/animal/birds/tagtaa.jpg"),
          },
          {
            iid: 1013,
            iname: "Оронго",
            image: require("../../assets/animal/birds/orongo.jpg"),
          },
        ],
      },
      {
        sid: 102,
        sname: "Далайн амьтан",
        image: require("../../assets/animal/sea/sea.jpg"),
        items: [
          {
            iid: 1021,
            iname: "Халим",
            image: require("../../assets/animal/sea/whale.jpg"),
          },
          {
            iid: 1022,
            iname: "Далайн гахай",
            image: require("../../assets/animal/sea/dolphin.jpg"),
          },
          {
            iid: 1023,
            iname: "Аварга загас",
            image: require("../../assets/animal/sea/shark.jpg"),
          },
        ],
      },
    ],
  },
  {
    id: 2,
    catName: "Далбаа",
    catIcon: "flag",
    subcategories: [
      {
        sid: 201,
        sname: "Азийн далбаа",
        image: require("../../assets/flags/asia/flag.png"),
        items: [
          {
            iid: 2011,
            iname: "Монгол",
            image: require("../../assets/flags/asia/MGL.png"),
          },
          {
            iid: 2012,
            iname: "Япон",
            image: require("../../assets/flags/asia/JPN.jpg"),
          },
          {
            iid: 2013,
            iname: "Солонгос",
            image: require("../../assets/flags/asia/KR.png"),
          },
        ],
      },
      {
        sid: 202,
        sname: "Европын далбаа",
        image: require("../../assets/flags/europe/flag1.jpg"),
        items: [
          {
            iid: 2021,
            iname: "Герман",
            image: require("../../assets/flags/europe/GRM.jpg"),
          },
          {
            iid: 2022,
            iname: "Франц",
            image: require("../../assets/flags/europe/FRC.jpg"),
          },
          {
            iid: 2023,
            iname: "Итали",
            image: require("../../assets/flags/europe/ITL.jpg"),
          },
        ],
      },
    ],
  },
];
