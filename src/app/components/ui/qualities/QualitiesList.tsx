import { useQualities } from "../../../hooks/useQualities";
import { ServerUser } from "../../../types/user";
import Quality from "./Quality";

type QualitiesListProps = {
  qualities: ServerUser["qualities"];
};

const QualitiesList = ({ qualities }: QualitiesListProps) => {
  const { isLoading, error } = useQualities();

  if (isLoading) return <span>Загрузка...</span>;
  if (error !== null) return <span>{error}</span>;

  return (
    <>
      {qualities.map((qual) => (
        <Quality key={qual} id={qual} />
      ))}
    </>
  );
};

export default QualitiesList;
