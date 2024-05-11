import axios from "axios";

export const getData = () => {
  axios.post("https://localhost:7246/Registro/queue");
};