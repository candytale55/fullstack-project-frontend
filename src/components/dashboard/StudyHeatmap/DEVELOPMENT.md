<!-- Documents the StudyHeatmap data flow and its relationship with DashboardPage and progress APIs. -->

# StudyHeatmap development notes

`DashboardPage` collects `studyDays` from every course-progress record, removes duplicates, and passes the resulting `YYYY-MM-DD` keys to `buildHeatmapMonths` and `StudyHeatmap`.

## Calendar keys

The heatmap generates cell keys with the browser's local calendar components (`getFullYear`, `getMonth`, and `getDate`). It must not use `toISOString()` for these keys because that converts local midnight to UTC and can place an activity on the preceding or following visible day.

When a study session is saved, `progress.service.ts` sends the browser's IANA time zone. The progress controller uses that zone to persist the session day as a `YYYY-MM-DD` key. Both sides therefore use the learner's local calendar day.

## Visible months

`buildHeatmapMonths(studyDays)` creates one calendar block for every month from the earliest valid recorded study day through the current month. With no valid study days, it renders only the current month. `DashboardPage` derives the subtitle and accessibility text from the returned block count, so no month count is hardcoded.

The helper accepts an optional `today` argument for deterministic date-boundary tests.
