import { MonitorFrame, monitorViewBox, type MonitorShape } from "./monitor-frame";

/** The 24" Full HD Office Monitor A24i: flat, plate-footed, the modest one. */
const SHAPE: MonitorShape = {
  screen: { width: 140, height: 79 },
  bezel: 5,
  standHeight: 42,
  neckWidth: 14,
  foot: { width: 62, depth: 38 },
  curve: 0,
};

export const OFFICE_MONITOR_24_VIEW_BOX = monitorViewBox(SHAPE);

export function OfficeMonitor24() {
  return <MonitorFrame shape={SHAPE} />;
}
