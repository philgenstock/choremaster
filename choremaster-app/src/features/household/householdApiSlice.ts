// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


interface HouseHold {
  id: number,
  name: string
}

export const householdApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/household" }),
  reducerPath: "houseHoldApi",
  tagTypes: ["Households"],
  endpoints: build => ({
    getHouseHolds: build.query<HouseHold[], void>({
      query: () => ``,
    }),
  }),
})

// Hooks are auto-generated by RTK-Query
// Same as `householdApiSlice.endpoints.getQuotes.useQuery`
export const { useGetHouseHoldsQuery } = householdApiSlice
