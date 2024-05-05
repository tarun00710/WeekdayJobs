import { useEffect, useState } from "react";
import JobCard from "../JobCard/JobCard";
import { fetchJobCards } from "../../api/api";
import styles from "./Homepage.module.css";
import { CardDataType } from "../JobCard/JobCard.types";
import { debounce } from "../../utils/constants";
import FilterSection from "../Filters/FilterSection";
import { SelectType } from "./Homepage.types";

const Homepage = () => {
  const limit = 10;
  const [jobCards, setJobCards] = useState<CardDataType[]>([]);
  const [offset, setOffset] = useState(0);
  const [isloading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [locations, setLocations] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState<SelectType[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<SelectType[]>([]);

  const filteredJobCards = jobCards.filter((job) => {
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
    return (
      companyName.includes(searchValueLower) &&
      experienceFilter &&
      roleFilter &&
      locationFilter
    );
  });
  

  const fetchData = async () => {
    try {
      const responseData = await fetchJobCards(limit, offset);
      const newCards = responseData?.jdList;
      setJobCards((prevJobCards) => [...prevJobCards, ...newCards]);
      const uniqueLocations = [
        ...new Set(newCards.map((card) => card.location)),
      ];
      const locationsOptions = uniqueLocations.map((location) => ({
        value: location,
        label: location,
      }));
      setLocations(locationsOptions);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [offset]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setIsLoading(true);
      setOffset((prev) => prev + limit);
    }
  };

  const debouncedScroll = debounce(handleScroll, 300);
  useEffect(() => {
    window.addEventListener("scroll", debouncedScroll);
    return () => {
      window.removeEventListener("scroll", debouncedScroll);
    };
  }, [debouncedScroll]);

  const handleExperienceChange = (selectedExperience) => {
    setSelectedExperience(selectedExperience);
  };
  const handleLocationChange = (selectedLocation:SelectType[]) => {
    setSelectedLocation(selectedLocation);
  };

  const handleRoleChange = (selectedRole:SelectType[]) => {
    setSelectedRoles(selectedRole);
  };

  const roleOptions = [...new Set(jobCards.map((card) => card.jobRole))].map(
    (role) => ({ value: role, label: role })
  );

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
      />
      <div className={styles.jobCardsContainer}>
        {filteredJobCards?.map((jobCard, index) => (
          <div key={index}>
            <JobCard cardData={jobCard} />
          </div>
        ))}
      </div>
      {isloading && <p className={styles.loading}>Loading....</p>}
    </div>
  );
};

export default Homepage;
