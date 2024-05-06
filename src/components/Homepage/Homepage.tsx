import { useEffect, useState, useMemo } from "react";
import JobCard from "../JobCard/JobCard";
import { fetchJobCards } from "../../api/api";
import styles from "./Homepage.module.css";
import { CardDataType } from "../JobCard/JobCard.types";
import { LIMIT, throttledScroll } from "../../utils/constants";
import FilterSection from "../Filters/FilterSection";
import { SelectType } from "./Homepage.types";

const Homepage = () => {
  const [jobCards, setJobCards] = useState<CardDataType[]>([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [selectedExperience, setSelectedExperience] =
    useState<SelectType | null>(null);
  const [locations, setLocations] = useState<SelectType[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<SelectType[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<SelectType[]>([]);
  const [selectedPay, setSelectedPay] = useState<SelectType | null>(null);

  const fetchData = async () => {
    try {
      const responseData = await fetchJobCards(LIMIT, offset);
      const newCards = responseData?.jdList || [];

      const uniqueLocations = [
        ...new Set(newCards.map((card) => card.location)),
      ];
      const locationsOptions = uniqueLocations.map((location) => ({
        value: location,
        label: location,
      }));
      setLocations(locationsOptions);
      setJobCards((prevJobCards) => {
        let uniquePrevJobCards = prevJobCards.filter(
          (card) => !newCards.some((newcard) => newcard.jdUid === card.jdUid)
        );
        return [...uniquePrevJobCards, ...newCards];
      });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [offset]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setIsLoading(true);
        setOffset((prev) => prev + LIMIT);
      }
    };

    const throttledHandleScroll = throttledScroll(handleScroll, 300);

    window.addEventListener("scroll", throttledHandleScroll);

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  const filteredJobCards = useMemo(() => {
    return jobCards.filter((job) => {
      const companyName = job.companyName ? job.companyName.toLowerCase() : "";
      const searchValueLower = searchValue.toLowerCase();
      const experienceFilter =
        !selectedExperience ||
        (job?.minExp <= selectedExperience?.value &&
          job?.maxExp >= selectedExperience?.value);
      const roleFilter =
        selectedRoles.length === 0 ||
        selectedRoles.some((role) => role.value === job.jobRole);
      const locationFilter =
        selectedLocation.length === 0 ||
        selectedLocation.some((location) => location.value === job.location);
      const payFilter = !selectedPay || job?.minJdSalary >= selectedPay?.value;
      return (
        companyName.includes(searchValueLower) &&
        experienceFilter &&
        roleFilter &&
        locationFilter &&
        payFilter
      );
    });
  }, [
    jobCards,
    searchValue,
    selectedExperience,
    selectedRoles,
    selectedLocation,
    selectedPay,
  ]);

  const handleExperienceChange = (selectedExperience: SelectType) => {
    setSelectedExperience(selectedExperience);
  };

  const handleLocationChange = (selectedLocation: SelectType[]) => {
    setSelectedLocation(selectedLocation);
  };

  const handleRoleChange = (selectedRole: SelectType[]) => {
    setSelectedRoles(selectedRole);
  };

  const roleOptions = useMemo(() => {
    return [...new Set(jobCards.map((card) => card.jobRole))].map((role) => ({
      value: role,
      label: role,
    }));
  }, [jobCards]);

  const handleBasePay = (selectedPay: SelectType) => {
    setSelectedPay(selectedPay);
  };

  return (
    <div>
      <FilterSection
        onChangeExperience={handleExperienceChange}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        locations={locations}
        handleLocationChange={handleLocationChange}
        roleOptions={roleOptions}
        handleRoleChange={handleRoleChange}
        handleBasePay={handleBasePay}
      />
      <div className={styles.jobCardsContainer}>
        {filteredJobCards.map((jobCard, index) => (
          <div key={index}>
            <JobCard cardData={jobCard} />
          </div>
        ))}
      </div>
      {isLoading && <p className={styles.loading}>Loading....</p>}
    </div>
  );
};

export default Homepage;
