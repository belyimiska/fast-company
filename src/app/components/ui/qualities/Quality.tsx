import { useQualities } from "../../../hooks/useQualities";
import { ServerQuality } from "../../../types/quality";

type QualityProps = {
  id: ServerQuality["_id"];
};

const Quality = ({ id }: QualityProps) => {
  const quality = useQualities().getQuality(id);

  if (quality === undefined) return <span>Качество не найдено</span>;

  const { name, color } = quality;

  return <span className={`badge bg-${color} m-1`}>{name}</span>;
};

export default Quality;
