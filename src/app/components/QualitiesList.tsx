import { UserType } from "../api/fake.api/user.api";
import Quality from "./Quality";

type QualitiesListProps = {
  qualities: UserType["qualities"];
};

const QualitiesList = ({ qualities }: QualitiesListProps) => {
  return (
    <>
      {qualities.map((qual) => (
        <Quality key={qual._id} {...qual} />
      ))}
    </>
  );
};

export default QualitiesList;
