# FDS, NADI and Klinik Kesihatan: Sabah and Sarawak


Distance audit: all 112 records in the attached old export select the same nearest centre as the corrected analysis. The old Haversine formula reproduces all 112 exported distances to rounding precision. Independent Python Haversine minima agree with sf/s2 for all 113 current records. The extra record is SG. ADANG, whose longitude contains an internal space. The 0.112% Earth-radius difference explains small numeric differences only. See distance_reconciliation.csv.

The main result now selects the closest listed NADI regardless of operational status. Including all listed centres with usable coordinates gives 3 green, 6 yellow and 104 red records, with 3 records within 5 km. Long Banga is 0.89 km from its listed centre marked UNDER RELOCATION, but 60.05 km from Bario, the nearest centre marked open. The previous main maps incorrectly used that restricted open-centre selection for the proximity question. That filter changed the nearest centre for 13 records. Open-only distances are now separate comparison columns; operational status comes from the supplied workbook and has not been independently confirmed. See nadi_availability_comparison.csv for both scenarios for all records.

113 FDS records represent 99 distinct coordinates. 104 records are more than 10 km from the closest listed NADI. 3 records lie within the requested 5 km NADI coverage radius.

Closest listed NADI distances range from 0.89 to 115.93 km. The median across service records is 25.42 km.

Clinic coordinates were linked for 94 records. All 14 Sabah records lack a named clinic. The 5 remaining unmatched Sarawak records name KK Kara, PKD Kanowit or PKB Limbang. Six explicit name aliases are documented in data/kk_name_aliases.csv; approximate string suggestions in the audit are not used automatically.

All 99 distinct locations (including all 90 red locations) have terrain metrics and local maps. 45 have at least one facility candidate within 10 km; 54 have none in the available sources. There are 102 unique candidate features and 128 site-to-candidate associations.

4 FDS records have coordinates stored to two or fewer decimal places on at least one axis. Verify these coordinates before decisions around kilometre-scale thresholds.

Coordinate quality: 1 NADI record (PPR Taman Sri Semarak, Tawau) has coordinates in Peninsular Malaysia. 11 health-register records, including eight KK, have zero or Peninsular-Malaysia coordinates. They are excluded from spatial calculations and listed in n_invalid_coordinates.csv and k_invalid_coordinates.csv. Main analysis uses 287 listed NADI centres and 338 KK with usable coordinates; missing facilities could affect geographic nearest-neighbour and candidate results.


## Files

- maps/Sabah.png and maps/Sarawak.png: requested state maps with all three layers, 5 km circles, coloured arrows and km labels.
- analysis_report.html: offline searchable report with all 99 site assessments and clinic links.
- all_fds_assessment.csv: all 113 original service records, named/nearest KK distances, NADI distances and site assessments.
- infrastructure_candidates.csv: all candidate associations, provenance, ownership evidence, terrain and access measurements.
- all_site_assessment.csv: one summary per distinct coordinate.
- red_site_assessment.csv: the 90 locations currently >10 km from their closest NADI.
- distance_reconciliation.csv: row-by-row comparison against the supplied old results and independent Haversine checks.
- fds_nadi_spatial.gpkg: sf layers, connections, buffers, roads, waterways and candidates.
- terrain/: two-band elevation/slope GeoTIFF for every site.
- site_maps/: one terrain and infrastructure PNG per distinct coordinate.
- kk_match_audit.csv and coordinate_state_audit.csv: matching and coordinate checks.


## Methods and limits


R sf/s2 computes WGS84 great-circle distances in metres, converted to km. Nearest NADI searches cover all listed centres with valid coordinates in both supplied states, regardless of operational status. Green is <5 km, yellow 5–10 km inclusive, and red >10 km before rounding. The coverage radius remains 5 km. Geodesic circles use sf st_buffer with s2. Full raw coordinate strings and source rows are preserved.

The supplied FDS nearest-KK field is used as the requested named clinic link. It does not independently prove clinic responsibility. The genuinely geographically nearest KK is calculated and stored separately. Original reported KK distances are preserved and may describe travel rather than straight-line distance.

Four NADI coordinate strings contain invisible characters and one FDS longitude contains an internal space; these are removed without changing numeric digits. One NADI uses the temporary coordinates in its OPEN AT TEMPORARY LOCATION note. Two under-relocation centres and one temporarily closed centre are included in the main closest-centre search. Separate nearest-open columns retain the operational comparison.

Terrain uses Mapzen zoom-11 GeoTIFFs (nominal tile pixel spacing about 38 m) projected bilinearly to a 40 m UTM grid in zones 49N/50N. terra computes eight-neighbour slope in degrees. Relief equals maximum minus minimum elevation. Metrics cover 5 km and 10 km buffers. Regional DEM values do not establish local building slope, flood risk, road usability or wireless coverage.

Candidates come from OSM tagged facilities, the supplied health-facility register and explicit school names in FDS. OSM polygon facilities use a representative point on the footprint. Identical normalized facility names within 100 m are linked as duplicates, preferring the register. Candidate ranks mean distance order only, not suitability. Confirm public ownership, permissions, structural condition, spare space, electricity, backhaul connectivity, flood exposure and year-round access before selection.

Roads, tracks and paths are separated. Proximities and clipped lengths use local UTM geometry in the 10 km search area. A missing proximity is an unmapped/absent feature in that search, not proof of no physical feature. Candidate line–river intersections are counts of OSM reaches intersecting the straight-line link, not verified route crossings. No road-network travel time or least-cost route is claimed.


## Sources

- Supplied data/fds_list.xlsx, data/nadi_list.xlsx and data/kk_list.xlsx, retained unchanged.
- DOSM Malaysia district boundaries: https://github.com/dosm-malaysia/data-open/blob/main/datasets/geodata/administrative_2_district.geojson
- R sf distance documentation: https://r-spatial.github.io/sf/reference/geos_measures.html
- Geofabrik OSM extract: https://download.geofabrik.de/asia/malaysia-singapore-brunei.html
- OSM attribution and ODbL: https://www.openstreetmap.org/copyright
- Mapzen terrain: https://registry.opendata.aws/terrain-tiles/
- Terrain attribution: https://github.com/tilezen/joerd/blob/master/docs/attribution.md
- terra slope documentation: https://rspatial.github.io/terra/reference/terrain.html


OSM snapshot: 2026-09-08T20:21:01Z. PBF SHA-256: 1117604e75db088b71a1a50d875afc0e0e45f823808e7d42cb3e8277aa23e4e0. SRTM and GMTED2010 terrain data courtesy of the U.S. Geological Survey.