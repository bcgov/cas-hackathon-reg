"use client";
import { Organization } from "../../../api/registration/reg/models.py";
import { useEffect, useState } from "react";

const log = (type: any) => console.log.bind(console, type);

export default function Organizations() {
  const organizationsEndpoint = "http://127.0.0.1:8000/organizations/";

  const [results, setResults] = useState([]);
  let organizations;

  useEffect(() => {
    fetch(organizationsEndpoint)
      .then((response) => response.json())
      .then((data) => {
        organizations = data.results;
        console.log("organizations", organizations);
        log(organizations);
        setResults(organizations);
      });
  }, []);

  return (
    <>
      {results.map((org: Organization) => {
        return (
          <>
            <h1>{org.business_legal_name}</h1>
            <p>CRA Business Number: {org.cra_business_number}</p>
            <p>Status: {org.status}</p>
          </>
        );
      })}
    </>
  );
}
