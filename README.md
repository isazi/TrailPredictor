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

## Notes

- The current speed formula in `main.js` uses combined metrics, which is typical for trail time predictors (flat + up/down weighting).
- If using route nav, predicted remaining stats are authoritative from navigation provider.
