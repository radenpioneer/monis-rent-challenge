import { MonitorFrame, monitorViewBox, type MonitorShape } from "./monitor-frame";

/** The 27" 4K Multimedia Monitor: the same stance as the 24", one size up. */
const SHAPE: MonitorShape = {
  screen: { width: 158, height: 89 },
  bezel: 4,
  standHeight: 46,
  neckWidth: 16,
  foot: { width: 70, depth: 42 },
  curve: 0,
};

export const MULTIMEDIA_MONITOR_27_VIEW_BOX = monitorViewBox(SHAPE);

export function MultimediaMonitor27() {
  return <MonitorFrame shape={SHAPE} />;
}
