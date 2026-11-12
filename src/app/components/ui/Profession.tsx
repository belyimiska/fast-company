import { useProfessions } from "../../hooks/useProfessions";
import { ServerProfession } from "../../types/profession";

type ProfessionProps = {
  id: ServerProfession["_id"];
};

const Profession = ({ id }: ProfessionProps) => {
  const { getProfession, isLoading, error } = useProfessions();

  if (isLoading) return <span>Загрузка...</span>;
  if (error !== null) return <span>{error}</span>;

  const profession = getProfession(id);

  if (profession === undefined) {
    return <span>Профессия не найдена</span>;
  }

  return <span>{profession.name}</span>;
};

export default Profession;
