import { useState } from "react";
import styles from "./FilterSection.module.css";
import Select from "react-select";
import { SelectType } from "../Homepage/Homepage.types";
import { FilterValuePropsType } from "./FilterSection.types";

const FilterSection = ({
  searchValue,
  setSearchValue,
  onChangeExperience,
  locations,
  handleLocationChange,
  roleOptions,
  handleRoleChange,
  handleBasePay,
}: FilterValuePropsType) => {
  
  const [selectedOption, setSelectedOption] = useState<SelectType | any>(null);
  const inputHandler = (value: string) => {
    setSearchValue(value);
  };

  const optionsExperience = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}`,
  }));
  const optionsPay = Array.from({ length: 21 }, (_, i) => ({
    value: i * 10,
    label: `${i * 10}`,
  }));
  const handleChange = (selectedOption: SelectType) => {
    console.log(selectedOption);

    setSelectedOption(selectedOption);
    if (onChangeExperience) {
      onChangeExperience(selectedOption);
    }
  };
  const handlePay = (selectedOption: SelectType) => {
    if (handleBasePay) {
      handleBasePay(selectedOption);
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
        options={optionsExperience}
        placeholder="Min Experience"
        isClearable
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
      <Select
        options={optionsPay}
        onChange={handlePay}
        placeholder="Minimum Base Pay Salary"
        isClearable
      />
    </div>
  );
};

export default FilterSection;
