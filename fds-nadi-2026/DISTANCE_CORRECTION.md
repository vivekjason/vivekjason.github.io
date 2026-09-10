# Correction to closest-NADI analysis

The previous main analysis incorrectly restricted the search to centres marked open. This was a selection error for the requested closest-centre question. All listed NADI centres with usable coordinates are now eligible, and their operational status is shown separately. The main maps, distance tables and site assessments have been updated.

| Long Banga result | Centre | Distance |
|---|---|---:|
| Closest listed NADI: corrected main result | Long Banga (Long Beruang), UNDER RELOCATION | 0.888632 km |
| Closest open NADI: separate comparison only | Bario | 60.049488 km |

The FDS coordinates are 3.20344, 115.40151 (latitude, longitude). The closest NADI coordinates are 3.203576, 115.393507. Its listed status does not change its geometric distance. These coordinates and status come from the supplied workbook, not a field verification of its current location.

## Reconciliation with the attached old results

- All 112 rows match by state, district and locality name. Every closest-centre name agrees with the corrected main result.
- Reproducing the old raw-coordinate handling and Haversine radius reproduces all 112 distances within 0.005 km, the tolerance for two-decimal rounding.
- Independently calculating the full 113 by 287 distance matrix using Python Haversine selects the same centres as R sf/s2 for all 113 records. The largest numerical difference is below 0.000001 metres. This checks the calculation, not survey accuracy of source coordinates.
- The old Haversine default radius is 6,378,137 m; sf/s2 uses 6,371,010 m. The approximately 0.112% radius difference explains small residual differences only. Both round Long Banga to 0.89 km.
- SG. ADANG is the additional 113th record. The old numeric conversion dropped its longitude `115. 317910`. Removing the internal space recovers `115.317910` without changing digits.
- Restricting to open centres changes the nearest centre for 13 records. Those comparisons remain explicitly labelled `nearest_open_*` and are not used for main map arrows or colour classification.

## Revised colour bands

Green <5 km: 3 records. Yellow 5–10 km inclusive: 6 records. Red >10 km: 104 records at 90 distinct coordinates. Thresholds use unrounded distances. Coverage circles remain 5 km; the nearest-centre search is unrestricted by those circles. The original <1 / 1–3 / >3 km bands remain in a separate column.

The main search includes 287 of 288 listed NADI centres. PPR Taman Sri Semarak, Tawau has coordinates in Peninsular Malaysia and remains excluded pending correction. That coordinate exception is retained in `n_invalid_coordinates.csv`. Results establish the closest centre among the supplied usable coordinates, not ground travel distance or verified current operational access.

Files: `nearest_nadi_distances.csv` provides the concise primary results and both endpoint coordinates. `distance_reconciliation.csv` provides the old-export and independent-calculation audit. `nadi_availability_comparison.csv` separates proximity from availability.

Methods: [sf distance documentation](https://r-spatial.github.io/sf/reference/geos_measures.html), [geosphere Haversine source](https://github.com/cran/geosphere/blob/master/R/distHaversine.R).
