import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";
import { NextRequest } from "next/server";

type Params = {
  cabinId: string;
};

export async function GET(request: NextRequest, params: Params) {
  const { cabinId } = params;
  const cabinIdNumber = Number(cabinId);

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinIdNumber),
      getBookedDatesByCabinId(cabinIdNumber),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}

// export async function POST() {}
