# Trail Predictor

A Suunto Plus watch application that predicts estimated remaining time (`ETE`) and estimated total time (`ETT`) by combining live workout progress with planned route or manual goals.

## What it does

- Uses live activity data:
  - Duration
  - Distance
  - Ascent
  - Descent
- Supports planned distance, ascent, and descent from manual settings or navigating a route
- Computes:
  - `remaining_distance`, `remaining_ascent`, `remaining_descent`
  - Equivalent speed anchored to mixed distance/ascent/descent
  - `ETE`: estimated time en route left
  - `ETT`: estimated time to finish

## Display

- Top row: remaining distance and remaining ascent (icon-labeled, unit-aware formatting)
- Middle row: ETE and ETT
- Bottom row: current activity duration
- Durations use the sport-style format on large displays (`1:23'45`) and a compact format on small displays (`23'45` / `2:05`)
- Predictions appear after ~60 s and ~250 m of activity — the app waits for enough real movement data before showing an estimate

## Notes

- The current speed formula in `main.js` weights distance, ascent (×0.6 per 100 m) and descent (×0.4 per 100 m) — a Naismith-style trail model.
- If using route nav, remaining stats are authoritative from navigation provider.
- Remaining descent is used by the prediction but is not shown on screen.
