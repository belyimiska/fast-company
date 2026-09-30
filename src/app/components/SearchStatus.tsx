type SearchStatusProps = {
  length: number;
};

const SearchStatus = ({ length }: SearchStatusProps) => {
  const renderPhrase = (usersQuantity: number): string => {
    if (usersQuantity === 0) {
      return "Никто с тобой не тусанет";
    }

    const lastDigit = usersQuantity % 10;
    const lastTwoDigits = usersQuantity % 100;

    let phrase = "человек тусанет";

    if (lastTwoDigits >= 12 && lastTwoDigits <= 14) {
      phrase = "человек тусанет";
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      phrase = "человека тусанут";
    }

    return `${usersQuantity} ${phrase} с тобой сегодня`;
  };

  return (
    <h2>
      <span className={"badge bg-" + (length > 0 ? "primary" : "danger")}>{renderPhrase(length)}</span>
    </h2>
  );
};

export default SearchStatus;
