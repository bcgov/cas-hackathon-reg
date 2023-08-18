import { ReactElement } from "react";
import styles from "./page.module.css";
import { Organization } from "./models"

async function getOrganizationsData() {
  const res = await fetch('http://localhost:8000/api/organizations/')
  if (!res.ok) {
    throw new Error('Failed to fetch organizations data')
  }
  return res.json()
}

const buildOrganizationListElement = (org: Organization): ReactElement => {
  return (
    <div>
      <h1>{org.business_legal_name}</h1>
      <p>CRA Business Number: {org.cra_business_number}</p>
      <p>Status: {org.status}</p>
    </div>
  )
}

export default async function Organizations() {
  const data = await getOrganizationsData()
  console.log(data)

  const organizationsList: ReactElement[] = []

  data.forEach((org: Organization) => {
    organizationsList.push(buildOrganizationListElement(org))
  })

    return (
      <main className={styles.main}>
        {organizationsList}
      </main>
    );
  }