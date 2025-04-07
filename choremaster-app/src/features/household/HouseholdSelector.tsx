import { useState } from "react"
import styles from "./Household.module.css"
import { useGetHouseHoldsQuery } from "./householdApiSlice"
import {MenuItem, Select} from "@mui/material";
import {useAppSelector} from "../../app/hooks";
import {selectDisplayName, selectIsLoggedIn} from "../user/userSlice";

export const HouseholdSelector = () => {

  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const { data, isError, isLoading, isSuccess } =
      useGetHouseHoldsQuery(
        undefined, {skip: isLoggedIn}
      )
  if(isLoggedIn) {
    return <>
      <Select className={styles.select}>
      </Select>
    </>
  }



  if(isSuccess) {
    return <>
      <Select className={styles.select}>
        {data.map((houseHold) => (
            <MenuItem key={houseHold.id} value={houseHold.id}>{houseHold.name}</MenuItem>
        ))}
      </Select>
    </>

  }

  return <></>
}
