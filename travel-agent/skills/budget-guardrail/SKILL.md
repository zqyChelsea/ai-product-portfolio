---
name: budget-guardrail
description: Calculate trip affordability from sourced quotes, currency conversion and a clearly stated meal allowance without claiming unknown costs are zero.
---

# Budget guardrail

Record every price with currency, timestamp and source. Convert JPY transit and tickets to HKD only when a rate source/configuration is known; disclose that rate's origin. Unknown flight, hotel, transit or attraction ticket prices make the budget incomplete. A meals allowance is an assumption, never a live quote. Distinguish `within`, `over` and `unknown`; only show `within` when all mandatory priced components are present. Calculate total and remaining from numeric inputs, never from model prose. Ask for lower-cost alternatives when over budget, but do not invent inventory.
