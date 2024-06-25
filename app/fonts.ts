import { Poppins } from "next/font/google";
import { Instrument_Serif } from "next/font/google";

export const poppins = Poppins({ subsets: ["latin"], weight: "400" });
export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
});
