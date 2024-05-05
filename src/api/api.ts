export const fetchJobCards = async (limit:number, offset:number) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      limit,
      offset,
    });
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };
  
    try {
      const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json(); 
    } catch (error) {
      console.error("Error fetching job cards:", error);
      throw error;
    }
  };
  