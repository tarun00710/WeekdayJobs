export const getSalaryRange = (minJdSalary?: number, maxJdSalary?: number) => {
    if (minJdSalary && maxJdSalary) {
      return `${minJdSalary}-${maxJdSalary}`;
    } else if (minJdSalary) {
      return `${minJdSalary}+`;
    } else if (maxJdSalary) {
      return `up to ${maxJdSalary}`;
    } else {
      return "N/A";
    }
  };