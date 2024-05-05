import { useState } from "react";
import { Button } from "@mui/material";
import styles from "./JobCard.module.css";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { CardDataType } from "./JobCard.types";
import toUpperCamelCase, { getSalaryRange } from "../../utils/constants";

const JobCard = ({ cardData }: { cardData: CardDataType}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardContainer}>
        <div className={styles.cardHeadWrapper}>
          <img
            className={styles.logoUrl}
            src={cardData?.logoUrl}
            alt="logo"
          />
          <div className={styles.cardHeader}>
            <p className={styles.companyName}>{cardData?.companyName}</p>
            <p className={styles.jobRole}>
              {cardData?.jobRole && toUpperCamelCase(cardData?.jobRole)}
            </p>
            <p className={styles.companyLocation}>
              {toUpperCamelCase(cardData?.location)}
            </p>
          </div>
        </div>
        <p className={styles.companySalary}>
          Estimated Salary:
          <span>
            {cardData?.salaryCurrencyCode}{" "}
            {getSalaryRange(cardData?.minJdSalary, cardData?.maxJdSalary)}
          </span>
          <span className={styles.checkBox}>
            <CheckBoxIcon color="success" />
          </span>
        </p>
        <p className={styles.companyAbout}>About Company:</p>
        <h4 className={styles.companyAboutUs}>About us</h4>
        <p className={styles.companyDetails}>
          {showFullDescription
            ? cardData?.jobDetailsFromCompany
            : `${cardData?.jobDetailsFromCompany.slice(0, 200)}...`}
        </p>
        {cardData?.jobDetailsFromCompany.length > 200 && (
          <Button sx={{fontSize:"10px"}} onClick={toggleDescription} variant='text'>
            {showFullDescription ? "Show Less" : "Show More"}
          </Button>
        )}
        <p className={styles.cardExp}>Minimum Experience</p>
        <p className={styles.cardExpValue}>{cardData?.minExp || "-"} years</p>

        <div className={styles.cardBtnFooter}>
          <Button
            sx={{
              backgroundColor: "#54EFC3",
              padding: "10px",
              borderRadius: "8px",
              color: "black",
              textTransform: "none",
              fontWeight: "500",
              fontSize: "16px",
            }}
            variant="contained"
          >
            <ElectricBoltIcon sx={{ color: "#FECC3D" }} />
            Easy Apply
          </Button>
          <Button
            sx={{
              backgroundColor: "#4943DA",
              padding: "10px",
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: "500",
              fontSize: "16px",
            }}
            variant="contained"
          >
            Unlock referral asks
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
