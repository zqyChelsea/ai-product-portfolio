import { cp, mkdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { planTrip } from "../lib/planner.mjs";

const project = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const target = resolve(project, "../out/travel-agent");
await mkdir(target, { recursive: true });
for (const name of ["index.html", "styles.css", "app.js"]) await cp(join(project, "public", name), join(target, name));
const start = new Date(); start.setDate(start.getDate() + 35);
const end = new Date(start); end.setDate(end.getDate() + 4);
const date = (value) => value.toISOString().slice(0, 10);
const sample = await planTrip({ departureDate: date(start), returnDate: date(end), budgetHkd: 6500, transport: "public", sideTrip: "kobe", pace: "moderate", interests: ["culture", "history", "nature", "anime"], mustSee: ["osaka-castle", "kaiyukan", "nipponbashi"] }, { DATA_MODE: "fixture", MEALS_JPY_PER_DAY: "3000" });
await writeFile(join(target, "sample-plan.json"), JSON.stringify(sample));
console.log(`Exported standalone agent UI and clearly labelled sample to ${target}`);
