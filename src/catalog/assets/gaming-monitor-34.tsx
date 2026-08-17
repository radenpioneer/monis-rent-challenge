import { MonitorFrame, monitorViewBox, type MonitorShape } from "./monitor-frame";

/**
 * The 34" 4K Gaming Monitor: the only curved panel Monis lists, and the only
 * one standing on splayed legs rather than a plate.
 */
const SHAPE: MonitorShape = {
  screen: { width: 208, height: 89 },
  bezel: 5,
  standHeight: 44,
  neckWidth: 18,
  foot: { width: 116, depth: 46 },
  curve: 9,
  splayedLegs: true,
};

export const GAMING_MONITOR_34_VIEW_BOX = monitorViewBox(SHAPE);

export function GamingMonitor34() {
  return <MonitorFrame shape={SHAPE} />;
}
