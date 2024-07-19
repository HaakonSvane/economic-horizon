# Ecomonic Horizon

This is the repository for the finance-calculator named [økonomisk horisont](https://økonomiskhorisont.no).
The calculator is based on Norwegian laws and rates, so it only applies to Norwegians.

## What goes in to the calculations?

This section contains information about how the various types of loans, transactions and savings are calculated. It describes the system AS IS, and is therefore subject to change. No guarantees are made that the calculations reflect the actual financial outcomes due to the complexity of finance calculation the ever-changing nature of laws and rates surrounding Norwegian finance and uncertainties related to projecting into the future.

### Funds

All funds are assumed to be stock funds. This means profit is subject to shielding deduction.
Calculating return on funds involves the following elements:

**Shielding deduction:**

> The app assumes all fund-savings start at todays date. This means shielding deductions for long-standing funds will be lower than in reality. For projecting fund returns into the future, the current shielding rate for 2023 is assumed (_3.2%_).
