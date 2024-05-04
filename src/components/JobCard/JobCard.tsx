import { Button } from "@mui/material";
import styles from "./JobCard.module.css";

const cardData = {
  jdUid: "cfff35ba-053c-11ef-83d3-06301d0a7178-92012",
  jdLink: "https://weekday.works",
  jobDetailsFromCompany:
    "This is a sample job and you must have displayed it to understand that its not just some random lorem ipsum text but something which was manually written. Oh well, if random text is what you were looking for then here it is: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages and now in this assignment.",
  maxJdSalary: 103,
  minJdSalary: 100,
  salaryCurrencyCode: "USD",
  location: "mumbai",
  minExp: null,
  maxExp: null,
  jobRole: "ios",
  companyName: "LG",
  logoUrl: "https://logo.clearbit.com/lg.com",
};

const JobCard = () => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardContainer}>
        <div className={styles.cardHeadWrapper}>
          <img className={styles.logoUrl} src={cardData?.logoUrl} />
          <div className={styles.cardHeader}>
            <p className={styles?.companyName}>{cardData.companyName}</p>
            <p className={styles?.companyName}>{cardData.jobRole}</p>
            <p className={styles?.companyName}>{cardData.location}</p>
          </div>
        </div>
        <p>
          Estimated Salary:{" "}
          <span>{`${cardData.salaryCurrencyCode} ${cardData?.minJdSalary}-${cardData?.maxJdSalary}`}</span>
        </p>
        <p>About Company:</p>
        <h4>About us</h4>
        <p>
            {cardData.jobDetailsFromCompany}
        </p>
        <p>Minimum Experience</p>
        <p>{cardData?.minExp ? cardData?.minExp : "-"}</p>

        <div className={styles.cardBtnFooter}>
            <Button sx={{backgroundColor:'#54EFC3',padding:"10px",borderRadius:'8px'}} variant="contained">Easy Apply</Button>
            <Button sx={{backgroundColor:'#4943DA',padding:"10px",borderRadius:'8px'}} variant="contained">Unlock referral asks</Button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
