import { useEffect, useState } from "react";
import JobCard from "../JobCard/JobCard";
import { fetchJobCards } from "../../api/api";
import styles from "./Homepage.module.css";
import { CardDataType } from "../JobCard/JobCard.types";
import { debounce } from "../../utils/constants";
import FilterSection from "../Filters/FilterSection";

const Homepage = () => {
  const limit = 10;
  const [jobCards, setJobCards] = useState<CardDataType[]>([]);
  const [offset, setOffset] = useState(0);
  const [isloading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");


  const filteredJobCards = jobCards?.filter(job => {
    const companyName = job.companyName ? job.companyName.toLowerCase() : '';
    const searchValueLower = searchValue.toLowerCase(); 
    return companyName.includes(searchValueLower);
  });

  const fetchData = async () => {
    try {
      const responseData = await fetchJobCards(limit, offset);
      const newCards = responseData?.jdList;
      setJobCards((prevJobCards) => [...prevJobCards, ...newCards]);
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

  return (
    <div>
      <FilterSection
        setSearchValue={setSearchValue}
        searchValue={searchValue}
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
