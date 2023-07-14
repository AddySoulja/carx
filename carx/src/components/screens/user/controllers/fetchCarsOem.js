export const fetchOemData = async (query) => {
  const { make, model, year } = query;
  let url = ``;
  if (!model && !year) {
    url = `https://api.api-ninjas.com/v1/cars?limit=50&make=${make}`;
  } else if (!year) {
    url = `https://api.api-ninjas.com/v1/cars?limit=50&make=${make}&model=${model}`;
  } else {
    url = `https://api.api-ninjas.com/v1/cars?limit=50&make=${make}&model=${model}&year=${year}`;
  }
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": "Nl7MLOuENfrBe21o9bxfqA==92euDiKjbUSZNg8l",
    },
  });
  const data = await res.json();
  return data;
};
