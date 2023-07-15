const registerFormat = {
  username: "",
  email: "",
  photo: null,
  password: "",
  confirmPassword: "",
};
const loginFormat = {
  email: "",
  password: "",
};

const sortFormat = {
  make: {
    active: false,
    dir: "desc",
  },
  price: {
    active: false,
    dir: "desc",
  },
  mileage: {
    active: false,
    dir: "desc",
  },
};
const inventoryFormat = {
  make: "",
  model: "",
  year: "",
  contact: "",
  seller: "",
  price: "",
  mileage: "",
  power: "",
  speed: "",
  images: [],
  title: "",
  description: "",
  driven: "",
  damages: "",
  originalColor: "",
  accidents: "",
  owners: "",
  registration: "",
  tags: "",
};
export { registerFormat, loginFormat, sortFormat, inventoryFormat };
