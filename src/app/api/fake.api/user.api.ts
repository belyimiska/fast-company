import { Profession, professionsObject as professions } from "./professions.api";

export type Quality = {
  _id: string;
  name: string;
  color: "primary" | "secondary" | "success" | "danger" | "info" | "dark";
};
export type QualitiesType = {
  tedious: Quality;
  strange: Quality;
  buller: Quality;
  alcoholic: Quality;
  handsome: Quality;
  uncertain: Quality;
};

export type UserType = {
  _id: string;
  name: string;
  profession: Profession;
  qualities: Quality[];
  completedMeetings: number;
  rate: number;
  bookmark: boolean;
  email: string;
  sex: "male" | "female";
};

const qualities: QualitiesType = {
  tedious: { _id: "67rdca3eeb7f6fgeed471198", name: "Нудила", color: "primary" },
  strange: { _id: "67rdca3eeb7f6fgeed471100", name: "Странный", color: "secondary" },
  buller: { _id: "67rdca3eeb7f6fgeed4711012", name: "Троль", color: "success" },
  alcoholic: { _id: "67rdca3eeb7f6fgeed471101", name: "Алкоголик", color: "danger" },
  handsome: { _id: "67rdca3eeb7f6fgeed471102", name: "Красавчик", color: "info" },
  uncertain: { _id: "67rdca3eeb7f6fgeed471103", name: "Неуверенный", color: "dark" },
};

const users: UserType[] = [
  {
    _id: "67rdca3eeb7f6fgeed471815",
    name: "Джон Дориан",
    email: "Jony7351@tw.com",
    sex: "male",
    profession: professions.doctor,
    qualities: [qualities.tedious, qualities.uncertain, qualities.strange],
    completedMeetings: 36,
    rate: 2.5,
    bookmark: false,
  },
  {
    _id: "67rdca3eeb7f6fgeed471816",
    name: "Кокс",
    email: "white4571@twipet.com",
    sex: "male",
    profession: professions.doctor,
    qualities: [qualities.buller, qualities.handsome, qualities.alcoholic],
    completedMeetings: 15,
    rate: 2.5,
    bookmark: false,
  },
  {
    _id: "67rdca3eeb7f6fgeed471817",
    name: "Боб Келсо",
    email: "bob007@tw.com",
    sex: "male",
    profession: professions.doctor,
    qualities: [qualities.buller],
    completedMeetings: 247,
    rate: 3.5,
    bookmark: false,
  },
  {
    _id: "67rdca3eeb7f6fgeed471818",
    name: "Рэйчел Грин",
    email: "green7311@fam.biz",
    sex: "female",
    profession: professions.waiter,
    qualities: [qualities.uncertain],
    completedMeetings: 148,
    rate: 3.5,
    bookmark: false,
  },
  {
    _id: "67rdca3eeb7f6fgeed471819",
    name: "Шелдон Купер",
    email: "mindgames6878@phis.tech",
    sex: "male",
    profession: professions.physics,
    qualities: [qualities.strange, qualities.tedious],
    completedMeetings: 37,
    rate: 4.6,
    bookmark: false,
  },
  {
    _id: "67rdca3eeb7f6fgeed471820",
    name: "Леонард Хофстедтер",
    email: "mindes000@phis.tech",
    sex: "male",
    profession: professions.physics,
    qualities: [qualities.strange, qualities.uncertain],
    completedMeetings: 147,
    rate: 3.5,
    bookmark: false,
  },
  {
    _id: "67rdca3eeb7f6fgeed471821",
    name: "Говард Воловиц",
    email: "gov1903@phis.tech",
    sex: "male",
    profession: professions.engineer,
    qualities: [qualities.strange, qualities.tedious],
    completedMeetings: 72,
    rate: 3.5,
    bookmark: false,
  },
  {
    _id: "67rdca3eeb7f6fgeed471822",
    name: "Никола Тесла",
    email: "electro@underground.tech",
    sex: "male",
    profession: professions.engineer,
    qualities: [qualities.handsome],
    completedMeetings: 72,
    rate: 5,
    bookmark: false,
  },
  {
    _id: "67rdca3eeb7f6fgeed471823",
    name: "Моника Геллер",
    email: "mono@super.com",
    sex: "female",
    profession: professions.cook,
    qualities: [qualities.strange, qualities.uncertain],
    completedMeetings: 17,
    rate: 4.5,
    bookmark: false,
  },
  {
    _id: "67rdca3eeb7f6fgeed471824",
    name: "Рататуй",
    email: "ratatatata@underground.com",
    sex: "male",
    profession: professions.cook,
    qualities: [qualities.handsome, qualities.buller],
    completedMeetings: 17,
    rate: 4.5,
    bookmark: false,
  },
  {
    _id: "67rdca3eeb7f6fgeed47181f",
    name: "Джоуи Триббиани",
    email: "joe@trib.com",
    sex: "male",
    profession: professions.actor,
    qualities: [qualities.uncertain, qualities.strange],
    completedMeetings: 434,
    rate: 3.5,
    bookmark: false,
  },
  {
    _id: "67rdca3eeb7f6fgeed47181r",
    name: "Брэд Питт",
    email: "superstar@star.com",
    sex: "male",
    profession: professions.actor,
    qualities: [qualities.handsome],
    completedMeetings: 434,
    rate: 5,
    bookmark: false,
  },
];

if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(users));
}

const fetchAll = () =>
  new Promise<UserType[]>((res) => {
    setTimeout(() => {
      const usersString: string | null = localStorage.getItem("users");
      const parsedUsers: UserType[] = usersString ? JSON.parse(usersString) : [];
      res(parsedUsers);
    }, 1500);
  });

const update = (id: UserType["_id"], data: Partial<UserType>) =>
  new Promise<UserType | undefined>((resolve) => {
    const usersString: string | null = localStorage.getItem("users");
    if (usersString === null) return resolve(undefined);

    const users: UserType[] = JSON.parse(usersString);
    const userIndex = users.findIndex((u) => u._id === id);
    if (userIndex === -1) return resolve(undefined);

    users[userIndex] = { ...users[userIndex], ...data };
    localStorage.setItem("users", JSON.stringify(users));
    resolve(users[userIndex]);
  });

const getById = (id: UserType["_id"]) =>
  new Promise<UserType | undefined>((res) => {
    setTimeout(() => {
      const usersString: string | null = localStorage.getItem("users");
      if (usersString !== null) {
        const parsedUsers: UserType[] = JSON.parse(usersString);
        res(parsedUsers.find((user) => user._id === id));
      } else {
        res(undefined);
      }
    }, 1000);
  });

export const usersApi = {
  fetchAll,
  getById,
  update,
};
