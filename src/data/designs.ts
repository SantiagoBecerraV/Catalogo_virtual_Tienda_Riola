import d1 from "@/assets/designs/d1.jpg";
import d2 from "@/assets/designs/d2.jpg";
import d3 from "@/assets/designs/d3.jpg";
import d4 from "@/assets/designs/d4.jpg";
import d5 from "@/assets/designs/d5.jpg";
import d6 from "@/assets/designs/d6.jpg";
import d7 from "@/assets/designs/d7.jpg";
import d8 from "@/assets/designs/d8.jpg";
import d9 from "@/assets/designs/d9.jpg";
import d10 from "@/assets/designs/d10.jpg";
import d11 from "@/assets/designs/d11.jpg";

export interface Design {
  id: string;
  name: string;
  image: string;
}

export const designs: Design[] = [
  { id: "design-01", name: "Tokyo Oni", image: d1 },
  { id: "design-02", name: "Red Dragon", image: d2 },
  { id: "design-03", name: "Space", image: d3 },
  { id: "design-04", name: "Good Vibes", image: d4 },
  { id: "design-05", name: "X Smile", image: d5 },
  { id: "design-06", name: "Fuji", image: d6 },
  { id: "design-07", name: "Never Give Up", image: d7 },
  { id: "design-08", name: "No Future", image: d8 },
  { id: "design-09", name: "Los Angeles", image: d9 },
  { id: "design-10", name: "Great Wave", image: d10 },
  { id: "design-11", name: "Red Eye", image: d11 },
];
