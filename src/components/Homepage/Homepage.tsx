import { useEffect, useState } from "react";
import JobCard from "../JobCard/JobCard";
import { fetchJobCards } from "../../api/api";
import styles from "./Homepage.module.css";
import { CardDataType } from "../JobCard/JobCard.types";
import { debounce } from "../../utils/constants";

const Homepage = () => {
  const limit = 10;
  const [jobCards, setJobCards] = useState<CardDataType[]>([]);
  const [offset, setOffset] = useState(0);
  const [isloading, setIsLoading] = useState(true);

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
      <div className={styles.jobCardsContainer}>
        {jobCards.map((jobCard, index) => (
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
