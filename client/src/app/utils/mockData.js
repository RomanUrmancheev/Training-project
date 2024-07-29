import professions from "../mockData/professions.json";
import users from "../mockData/users.json";
import qualities from "../mockData/qualities.json";
import httpService from "../services/http.service";
import { useEffect, useState } from "react";

const useMockData = () => {
  const statusConsts = {
    idle: "Not started",
    pending: "In process",
    successed: "Ready",
    error: "Error occured"
  };

  const [error, setError] = useState();
  const [status, setStatus] = useState(statusConsts.idle);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const summaryCount = professions.length + users.length + qualities.length;
  const incrementCount = () => {
    setCount((prevState) => prevState + 1);
  };

  function updateProgress() {
    if (count > 0 && status === statusConsts.idle) {
      setStatus(statusConsts.pending);
    }
    const newProgress = Math.floor((count / summaryCount) * 100);
    setProgress(() => newProgress);
    if (newProgress === 100) {
      setStatus(statusConsts.successed);
    }
  }

  useEffect(() => {
    updateProgress();
  }, [count]);

  async function initialize() {
    try {
      for (const prof of professions) {
        await httpService.put("profession/" + prof._id, prof);
        incrementCount();
      }
      for (const qual of qualities) {
        await httpService.put("quality/" + qual._id, qual);
        incrementCount();
      }
      for (const user of users) {
        await httpService.put("user/" + user._id, user);
        incrementCount();
      }
    } catch (error) {
      setError(error);
      setStatus(statusConsts.error);
    }
  }
  return { error, initialize, progress, status };
};

export default useMockData;
