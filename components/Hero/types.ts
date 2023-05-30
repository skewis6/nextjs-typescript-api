import { ReactNode } from "react";

export interface HeroProps {
  title: string | ReactNode;
  subtitle?: string;
}