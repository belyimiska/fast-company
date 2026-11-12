import { UserType } from "../../api/fake.api/user.api";
import QualitiesList from "./qualities/QualitiesList";

type QualitiesCardProps = {
  qualities: UserType["qualities"];
};

const QualitiesCard = ({ qualities }: QualitiesCardProps) => {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex flex-column justify-content-center text-center">
        <h5 className="card-title">
          <span>Qualities</span>
        </h5>
        <p className="card-text">
          <QualitiesList qualities={qualities.map((quality) => quality._id)} />
        </p>
      </div>
    </div>
  );
};

export default QualitiesCard;
