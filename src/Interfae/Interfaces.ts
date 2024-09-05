export interface IContact {
    id:string,
    name: string;
    mobileNumber: string;
    status: "Active" | "Inactive";
}
// Define the structure of each country's data.
export interface ICountryData {
    country: string;
    countryInfo: {
      lat: number;
      long: number;
      flag: string;
    };
    cases: number;
    deaths: number;
    recovered: number;
  }