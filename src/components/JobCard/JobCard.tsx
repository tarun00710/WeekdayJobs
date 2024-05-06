import { useState } from "react";
import { Button } from "@mui/material";
import styles from "./JobCard.module.css";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { CardDataType } from "./JobCard.types";
import { getSalaryRange, toUpperCamelCase } from "../../utils/constants";
import { CardMuiStyles } from "./MuiStyles";

const JobCard = ({ cardData }: { cardData: CardDataType }) => {
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
            loading="lazy"
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
            <CheckBoxIcon sx={CardMuiStyles.checkBoxStyle} />
          </span>
        </p>
        <p className={styles.companyAbout}>About Company:</p>
        <h4 className={styles.companyAboutUs}>About us</h4>
        <JobDescription
          description={cardData?.jobDetailsFromCompany}
          showFullDescription={showFullDescription}
          toggleDescription={toggleDescription}
        />
        <p className={styles.cardExp}>Minimum Experience</p>
        <p className={styles.cardExpValue}>{cardData?.minExp || "-"} years</p>

        <div className={styles.cardBtnFooter}>
          <Button sx={CardMuiStyles.easyApplyButton} variant="contained">
            <ElectricBoltIcon sx={CardMuiStyles.iconBoltStyle} />
            Easy Apply
          </Button>
          <Button sx={CardMuiStyles.unlockReferralButton} variant="contained">
            Unlock referral asks
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;


const JobDescription = ({
  description,
  showFullDescription,
  toggleDescription,
}: {
  description: string;
  showFullDescription: boolean;
  toggleDescription: () => void;
}) => {
  return (
    <>
      <p className={styles.companyDetails}>
        {showFullDescription ? description : `${description.slice(0, 200)}...`}
      </p>
      {description.length > 200 && (
        <Button
          sx={{ fontSize: "10px" }}
          onClick={toggleDescription}
          variant="text"
        >
          {showFullDescription ? "Show Less" : "Show More"}
        </Button>
      )}
    </>
  );
};
