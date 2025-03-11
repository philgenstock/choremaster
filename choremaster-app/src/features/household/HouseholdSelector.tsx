import { useState } from "react"
import styles from "./Household.module.css"
import { useGetHouseHoldsQuery } from "./householdApiSlice"

export const HouseholdSelector = () => {
  // Using a query hook automatically fetches data and returns query values
  const { data, isError, isLoading, isSuccess } =
      useGetHouseHoldsQuery()

  if (isError) {
    return (
      <div>
        <h1>There was an error!!!</h1>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className={styles.container}>
        {data.map(({  id,name }) => (
          <blockquote key={id}>
            &ldquo;{name}&rdquo;
          </blockquote>
        ))}
      </div>
    )
  }

  return null
}
