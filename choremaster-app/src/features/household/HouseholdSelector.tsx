import { useState } from "react"
import styles from "./Household.module.css"
import { useGetHouseHoldsQuery } from "./householdApiSlice"
import {MenuItem, Select} from "@mui/material";

export const HouseholdSelector = () => {
  const { data, isError, isLoading, isSuccess } =
      useGetHouseHoldsQuery()

  if(isSuccess) {
    return <>
      <Select className={styles.select}>
        {data.map((houseHold) => (
            <MenuItem value={houseHold.id}>{houseHold.name}</MenuItem>
        ))}
      </Select>
    </>

  }

  return <></>
}
