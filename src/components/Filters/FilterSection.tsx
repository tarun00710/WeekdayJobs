import React from "react";
import styles from "./FilterSection.module.css";

type SearchValueType = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

const FilterSection = ({ searchValue, setSearchValue }: SearchValueType) => {
  const inputHandler = (value:string) => {
    setSearchValue(value);
  };

  return (
    <div>
      <input
        value={searchValue}
        placeholder="Search Company Name"
        className={styles.filterSearch}
        type="text"
        onChange={(e)=>inputHandler(e.target.value)}
      />
    </div>
  );
};

export default FilterSection;
