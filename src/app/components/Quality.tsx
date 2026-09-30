import type { Quality as QualityType } from "../api/fake.api/user.api";

type QualityProps = {
  color: QualityType["color"];
  name: QualityType["name"];
};

const Quality = ({ color, name }: QualityProps) => {
  return <span className={`badge bg-${color} m-1`}>{name}</span>;
};

export default Quality;
