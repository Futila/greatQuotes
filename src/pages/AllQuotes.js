import { useEffect } from "react";

import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";

// const DUMMY_QUOTES = [
//   { id: "q1", author: "Fernando", text: "Iam learning React" },
//   { id: "q2", author: "Mendes", text: "Learning React is Great" },
// ];

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    error,
    data: loadedQuotes,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }
  return <QuoteList quotes={loadedQuotes} />;
};

export default AllQuotes;
