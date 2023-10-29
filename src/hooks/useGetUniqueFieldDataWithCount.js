import { useState, useEffect } from "react";
import axios from "axios";

const useGetUniqueFieldDataWithCount = (fieldName) => {
  const [fieldDataWithCount, setFieldDataWithCount] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lms-server-sigma.vercel.app/api/v1/courses?limit=${100}`
        );

        const allData = response?.data?.data;
        const uniqueFieldData = [...new Set(allData.map(data => data[fieldName]))];

        // Calculate the total count for each unique field value
        const fieldDataWithCounts = uniqueFieldData.map(fieldValue => ({
          fieldValue,
          totalCount: allData.filter(data => data[fieldName] === fieldValue).length,
        }));

        setFieldDataWithCount(fieldDataWithCounts);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fieldName]);

  return { fieldDataWithCount, isLoading, error };
};

export default useGetUniqueFieldDataWithCount;
