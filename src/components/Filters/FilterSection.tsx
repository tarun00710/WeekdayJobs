import React, { useState } from "react";
import styles from "./FilterSection.module.css";
import Select from "react-select";

type SearchValueType = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  onChangeExperience: (value: any) => void;
  locations: any;
  handleLocationChange: any;
  roleOptions: any;
  handleRoleChange: any;
};

const FilterSection = ({
  searchValue,
  setSearchValue,
  onChangeExperience,
  locations,
  handleLocationChange,
  roleOptions,
  handleRoleChange,
}: SearchValueType) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const inputHandler = (value: string) => {
    setSearchValue(value);
  };

  const options = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}`,
  }));
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (onChangeExperience) {
      onChangeExperience(selectedOption);
    }
  };
  return (
    <div className={styles.filterOptions}>
      <input
        value={searchValue}
        placeholder="Search Company Name"
        className={styles.filterSearch}
        type="text"
        onChange={(e) => inputHandler(e.target.value)}
      />
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder="Min Experience"
      />
      <Select
        options={locations}
        onChange={handleLocationChange}
        placeholder="Select Location"
        isMulti
      />
      <Select
        options={roleOptions}
        onChange={handleRoleChange}
        placeholder="Select Roles"
        isMulti
      />
      {/* <Select
        options={roleOptions}
        onChange={handleBasePay}
        placeholder="Minimum Base Pay Salary"
        isMulti
      /> */}
    </div>
  );
};

export default FilterSection;
