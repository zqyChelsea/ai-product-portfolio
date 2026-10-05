export function calculateBudget({ capHkd, flight, hotel, transit, tickets, days, mealsJpyPerDay, jpyPerHkd, mode }) {
  const rate = Number(jpyPerHkd);
  const meals = Number(mealsJpyPerDay) * days;
  const unknown = [];
  if (!flight) unknown.push("flight");
  if (!hotel) unknown.push("hotel");
  if (transit === null) unknown.push("transit");
  if (tickets === null) unknown.push("attraction tickets");
  if (!Number.isFinite(rate) || rate <= 0) unknown.push("JPY/HKD conversion rate");
  if (!Number.isFinite(meals) || meals < 0) unknown.push("meal allowance");
  const subtotal = (flight?.amount || 0) + (hotel?.amount || 0);
  const converted = Number.isFinite(rate) && rate > 0 && Number.isFinite(meals)
    ? ((transit || 0) + (tickets || 0) + meals) / rate : null;
  const totalHkd = converted === null ? null : Math.round((subtotal + converted) * 100) / 100;
  const complete = unknown.length === 0;
  const status = !complete ? "unknown" : mode === "fixture" ? "sample" : totalHkd > capHkd ? "over" : "within";
  return { status, complete, unknown, totalHkd: complete ? totalHkd : null, capHkd, remainingHkd: complete ? Math.round((capHkd - totalHkd) * 100) / 100 : null,
    breakdown: { flightHkd: flight?.amount ?? null, hotelHkd: hotel?.amount ?? null, transitJpy: transit, ticketsJpy: tickets, mealsJpy: Number.isFinite(meals) ? meals : null, jpyPerHkd: Number.isFinite(rate) && rate > 0 ? rate : null },
    exchangeRateSource: mode === "fixture" ? "Illustrative fixture rate" : "Server configuration; verify before booking",
  };
}
