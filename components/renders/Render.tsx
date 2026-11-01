"use client";

import type { RenderKey } from "@/lib/site";
import SuitRender from "@/components/renders/SuitRender";
import {
  BootRender,
  GloveRender,
  GogglesRender,
  HarnessRender,
  HelmetRender,
  RespiratorRender,
} from "@/components/renders/ProductRenders";
import {
  BottleRender,
  CylinderRender,
  ExcavatorRender,
  FittingRender,
  GearsRender,
  HoseRender,
  LaundryRender,
  OilRender,
  PartsRender,
  PumpRender,
  SprayRender,
} from "@/components/renders/MachineRenders";

interface Props {
  kind: RenderKey;
  title: string;
  className?: string;
  dark?: boolean;
}

/** One entry point for every code-drawn product render. */
export default function Render({ kind, title, className = "", dark }: Props) {
  switch (kind) {
    case "suit":
      return <SuitRender className={className} />;
    case "boot":
      return <BootRender className={className} title={title} />;
    case "helmet":
      return <HelmetRender className={className} title={title} />;
    case "glove":
      return <GloveRender className={className} title={title} />;
    case "respirator":
      return <RespiratorRender className={className} title={title} />;
    case "harness":
      return <HarnessRender className={className} title={title} />;
    case "goggles":
      return <GogglesRender className={className} title={title} />;
    case "hose":
      return <HoseRender className={className} title={title} dark={dark} />;
    case "fitting":
      return <FittingRender className={className} title={title} dark={dark} />;
    case "pump":
      return <PumpRender className={className} title={title} dark={dark} />;
    case "cylinder":
      return <CylinderRender className={className} title={title} dark={dark} />;
    case "oil":
      return <OilRender className={className} title={title} dark={dark} />;
    case "gears":
      return <GearsRender className={className} title={title} dark={dark} />;
    case "spray":
      return <SprayRender className={className} title={title} dark={dark} />;
    case "bottle":
      return <BottleRender className={className} title={title} dark={dark} />;
    case "laundry":
      return <LaundryRender className={className} title={title} dark={dark} />;
    case "excavator":
      return <ExcavatorRender className={className} title={title} dark={dark} />;
    case "parts":
      return <PartsRender className={className} title={title} dark={dark} />;
  }
}
