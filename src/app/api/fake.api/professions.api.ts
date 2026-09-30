export type Profession = {
  _id: string;
  name: string;
};

export type ProfessionsType = {
  doctor: Profession;
  waiter: Profession;
  physics: Profession;
  engineer: Profession;
  actor: Profession;
  cook: Profession;
};

export const professionsObject: ProfessionsType = {
  doctor: { _id: "67rdca3eeb7f6fgeed471818", name: "Доктор" },
  waiter: { _id: "67rdca3eeb7f6fgeed471820", name: "Официант" },
  physics: { _id: "67rdca3eeb7f6fgeed471814", name: "Физик" },
  engineer: { _id: "67rdca3eeb7f6fgeed471822", name: "Инженер" },
  actor: { _id: "67rdca3eeb7f6fgeed471824", name: "Актер" },
  cook: { _id: "67rdca3eeb7f6fgeed471829", name: "Повар" },
};

export const professions = [
  { _id: "67rdca3eeb7f6fgeed471818", name: "Доктор" },
  { _id: "67rdca3eeb7f6fgeed471820", name: "Официант" },
  { _id: "67rdca3eeb7f6fgeed471814", name: "Физик" },
  { _id: "67rdca3eeb7f6fgeed471822", name: "Инженер" },
  { _id: "67rdca3eeb7f6fgeed471824", name: "Актер" },
  { _id: "67rdca3eeb7f6fgeed471829", name: "Повар" },
];

const fetchAll = () =>
  new Promise<Profession[] | ProfessionsType>((res) => {
    setTimeout(function () {
      res(professions);
    }, 1000);
  });

const professionsApi = {
  fetchAll,
};

export default professionsApi;
