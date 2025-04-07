import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {baseUrl} from "../../app/baseUrl";
import {getTokenFromLocalStorage} from "../user/authUtils";


interface HouseHold {
  id: number,
  name: string
}

export const householdApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/household` ,prepareHeaders: (headers) => {
      const token = getTokenFromLocalStorage()
          console.debug("TOKEN", token)
      if(token) {
        headers.set("Authorization", token)
      }
    }}),
  reducerPath: "houseHoldApi",
  tagTypes: ["Households"],
  endpoints: build => ({
    getHouseHolds: build.query<HouseHold[], void>({
      query: () => ``,
    }),
  }),
})

export const { useGetHouseHoldsQuery } = householdApiSlice
