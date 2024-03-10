import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
import Spinner from "../components/Spinner";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Delay in milliseconds (e.g., 2000ms = 2s)
    // Clear the timeout if the component unmounts before the delay finishes
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <section className="heading">
            <h1>What do you need help with?</h1>
            <p>Please choose from an option below</p>
          </section>
          <Link to="/new-ticket" className="btn btn-reverse btn-block">
            <FaQuestionCircle /> Create New Ticket
          </Link>
          <Link to="/tickets" className="btn btn-block">
            <FaTicketAlt /> View My Tickets
          </Link>
        </>
      )}
    </>
  );
};

export default Home;
