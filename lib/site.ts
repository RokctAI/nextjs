/* Single source of truth for the brand and business details.
   Change BRAND once and the wordmark, metadata, copy and legal lines follow. */

export const BRAND = "Tloumoka";
export const LEGAL_NAME = `${BRAND} Trading`;
export const LEGAL_ENTITY = `${LEGAL_NAME} (Pty) Ltd`;
export const FOUNDED = 2017;
export const BUILDER = "ROKCT";

export const CONTACT = {
  phones: [
    { label: "Office", display: "013 101 3238", href: "tel:+27131013238" },
    { label: "Mobile", display: "082 055 3911", href: "tel:+27820553911" },
  ],
  email: "tloumoka@gmail.com",
  address: ["No. 8 Chrome Business Park", "Bergesering Street", "Steelpoort", "1133"],
  region: "South Africa",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Chrome Business Park, Bergesering Street, Steelpoort 1133, South Africa"),
};

export const NAV = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** Link to the enquiry form with the product or service pre-filled. */
export function enquireHref(item: string) {
  return `/contact?enquiry=${encodeURIComponent(item)}#enquiry`;
}

export type RenderKey =
  | "suit"
  | "helmet"
  | "boot"
  | "glove"
  | "respirator"
  | "harness"
  | "goggles"
  | "hose"
  | "fitting"
  | "pump"
  | "cylinder"
  | "oil"
  | "gears"
  | "spray"
  | "bottle"
  | "laundry"
  | "excavator"
  | "parts";

export interface Offering {
  name: string;
  note: string;
  render: RenderKey;
}

export interface Service {
  slug: string;
  name: string;
  short: string;
  kicker: string;
  headline: string;
  intro: string;
  render: RenderKey;
  offerings: Offering[];
  includes: string[];
  benefits: { title: string; body: string }[];
}

export const SERVICES: Service[] = [
  {
    slug: "ppe-supply-and-management",
    name: "PPE Supply and Management",
    short: "Head-to-toe protection, sourced and managed for every person on site, including PPE cut for women.",
    kicker: "Personal protective equipment",
    headline: "Protection that fits the people wearing it.",
    intro:
      "We supply and manage personal protective equipment for mining, agriculture and government teams, from everyday essentials to Women in Mining (WIM) PPE and arc wear. One accountable partner for sizing, supply and replenishment.",
    render: "suit",
    offerings: [
      { name: "Women in Mining (WIM) PPE", note: "Workwear designed around women's proportions, not resized men's patterns.", render: "suit" },
      { name: "Arc wear PPE", note: "Protective clothing for electrical and arc-flash work.", render: "helmet" },
      { name: "Safety footwear", note: "Protective boots for underground, plant and field work.", render: "boot" },
      { name: "Hand protection", note: "Gloves matched to the task, from general handling to chemical work.", render: "glove" },
      { name: "Respiratory protection", note: "Masks and respirators for dust, fumes and Covid-19 PPE supply.", render: "respirator" },
      { name: "Eye and fall protection", note: "Goggles, harnesses and the essentials that complete the kit.", render: "goggles" },
    ],
    includes: [
      "Supply and management of personal protective equipment",
      "Women in Mining (WIM) PPE",
      "Arc wear PPE",
      "Covid-19 PPE",
      "Corporate wear and gifts",
    ],
    benefits: [
      { title: "Fit drives compliance", body: "PPE that fits properly is PPE that gets worn, especially for women who are too often handed men's sizes." },
      { title: "One partner, whole kit", body: "Head, eye, hand, foot and body protection through a single supplier who knows your site." },
      { title: "Managed, not just delivered", body: "We help plan sizes, quantities and replenishment so teams are never waiting on stock." },
    ],
  },
  {
    slug: "hydraulic-systems",
    name: "Hydraulic Systems",
    short: "Hoses, fittings, pumps and cylinders: supplied, repaired and kept under pressure.",
    kicker: "Hoses · Fittings · Pumps · Cylinders",
    headline: "Hydraulics that hold their pressure.",
    intro:
      "When a hydraulic line fails, production stops. We supply and manage hydraulic hoses and fittings, repair pumps and hydraulic components, and supply and repair hydraulic cylinders, along with the hydraulic and Engen oils that keep systems running.",
    render: "cylinder",
    offerings: [
      { name: "Hydraulic hoses", note: "Supply and management of hoses made up to your machines' specification.", render: "hose" },
      { name: "Fittings", note: "Couplings, adaptors and connectors to complete every assembly.", render: "fitting" },
      { name: "Pumps", note: "Pump repairs and hydraulic components to restore flow and pressure.", render: "pump" },
      { name: "Cylinders", note: "Supply of hydraulic cylinders and repairs to worn or damaged units.", render: "cylinder" },
      { name: "Hydraulic and Engen oils", note: "The right fluids, supplied with the parts that need them.", render: "oil" },
    ],
    includes: [
      "Supply and management of hydraulic hoses and fittings",
      "Pump repairs and hydraulic components",
      "Supply of hydraulic cylinders and repairs",
      "Supply of hydraulic and Engen oils",
    ],
    benefits: [
      { title: "Less unplanned downtime", body: "Proactive hose and component management catches wear before it becomes a failure." },
      { title: "Repair before replace", body: "Pump and cylinder repairs return components to service at a fraction of the cost of new." },
      { title: "Parts and fluids together", body: "Hoses, fittings, cylinders and oils from one supplier, matched to your equipment." },
    ],
  },
  {
    slug: "plant-maintenance",
    name: "Plant Maintenance",
    short: "Planned care for plant and equipment, so operations stay safe, efficient and running.",
    kicker: "Plant and equipment care",
    headline: "Keep the plant running. Keep people safe.",
    intro:
      "Our plant maintenance service is built around prevention. We work with your team to keep plant and equipment in safe working order, focusing on the issues that cause stoppages before they happen.",
    render: "gears",
    offerings: [
      { name: "Preventive maintenance", note: "Scheduled servicing that targets wear before it causes a stoppage.", render: "gears" },
      { name: "Hydraulic component care", note: "Hoses, pumps and cylinders kept in working order alongside the plant.", render: "pump" },
      { name: "Lubrication and fluids", note: "Hydraulic and Engen oils supplied and changed as part of the plan.", render: "oil" },
    ],
    includes: [
      "Planned and preventive plant maintenance",
      "Support for hydraulic components and systems",
      "Supply of hydraulic and Engen oils",
      "Tailored maintenance solutions for each site",
    ],
    benefits: [
      { title: "Prevention first", body: "We anticipate needs instead of reacting to breakdowns, in line with our proactive approach." },
      { title: "Safer operations", body: "Well-maintained plant is safer plant, for operators and everyone around it." },
      { title: "Operational efficiency", body: "Fewer stoppages and more predictable output across the shift." },
    ],
  },
  {
    slug: "cleaning-services",
    name: "Cleaning Services",
    short: "Industrial and domestic cleaning, cleaning chemicals and laundry, tailored to your environment.",
    kicker: "Industrial and domestic",
    headline: "Clean sites work better.",
    intro:
      "From plant and workshops to offices and change houses, we provide industrial and domestic cleaning services tailored to your environment, together with the supply of cleaning chemicals and laundry services.",
    render: "spray",
    offerings: [
      { name: "Industrial cleaning", note: "Plant, workshop and site cleaning for working environments.", render: "spray" },
      { name: "Domestic cleaning", note: "Offices, residences and facilities kept clean and hygienic.", render: "bottle" },
      { name: "Cleaning chemicals", note: "Supply of cleaning chemicals suited to each surface and task.", render: "bottle" },
      { name: "Laundry services", note: "Workwear and linen laundered and returned ready for use.", render: "laundry" },
    ],
    includes: [
      "Industrial cleaning services",
      "Domestic cleaning services",
      "Supply of cleaning chemicals",
      "Laundry services",
    ],
    benefits: [
      { title: "Tailored to your environment", body: "A cleaning plan built around how your site actually works." },
      { title: "Healthier workplaces", body: "Cleaner facilities support the health and wellbeing of every person on site." },
      { title: "One supplier", body: "Cleaning services, chemicals and laundry managed through a single partner." },
    ],
  },
  {
    slug: "machine-rebuilding-and-refurbishment",
    name: "Machine Rebuilding and Refurbishment",
    short: "Rebuild and refurbishment of Yellow and TMM machines, plus the parts to keep them working.",
    kicker: "Yellow and TMM machines",
    headline: "Give heavy machines a second working life.",
    intro:
      "We rebuild and refurbish Yellow and TMM (trackless mobile machinery) machines and supply Yellow and TMM parts, returning equipment to productive service as a cost-effective alternative to replacement.",
    render: "excavator",
    offerings: [
      { name: "Machine rebuilds", note: "Rebuild and refurbishment of Yellow and TMM machines.", render: "excavator" },
      { name: "Yellow and TMM parts", note: "Supply of parts for earthmoving and trackless mobile machinery.", render: "parts" },
      { name: "Hydraulic cylinders", note: "Cylinder supply and repairs as part of a rebuild.", render: "cylinder" },
    ],
    includes: [
      "Rebuild and refurbishment of Yellow and TMM machines",
      "Supply of Yellow and TMM parts",
      "Hydraulic cylinder supply and repairs",
      "Hydraulic hoses, fittings and oils for rebuilt machines",
    ],
    benefits: [
      { title: "Cost-effective", body: "Refurbishment extends the life of machines you already own." },
      { title: "Back to work", body: "Rebuilt machines return to productive service on your site." },
      { title: "Parts on hand", body: "Yellow and TMM parts supplied by the team doing the work." },
    ],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export const INDUSTRIES = [
  {
    id: "mining",
    name: "Mining",
    scene: "mining" as const,
    lede: "Where Tloumoka began: the local mining industry.",
    challenges: [
      "Harsh underground and surface conditions that wear out PPE and equipment fast",
      "Large, mixed workforces where PPE must fit and be worn correctly, including by women",
      "Hydraulic failures on heavy machines that stop production",
    ],
    response: [
      "PPE supply and management, including Women in Mining (WIM) PPE and arc wear",
      "Hydraulic hoses, fittings, pumps and cylinders, supplied and repaired",
      "Rebuild and refurbishment of Yellow and TMM machines",
    ],
  },
  {
    id: "agriculture",
    name: "Agriculture",
    scene: "agriculture" as const,
    lede: "Equipment and protection for farms and agri-processing.",
    challenges: [
      "Exposure to dust, chemicals and the elements during long working days",
      "Tractors and implements that depend on reliable hydraulics in peak season",
      "Facilities and processing areas that must stay clean and hygienic",
    ],
    response: [
      "Task-matched PPE: gloves, respiratory and eye protection, footwear",
      "Hydraulic hose, fitting and cylinder supply and repairs",
      "Industrial cleaning services and supply of cleaning chemicals",
    ],
  },
  {
    id: "government",
    name: "Government",
    scene: "government" as const,
    lede: "Reliable, compliant supply for government agencies.",
    challenges: [
      "Procurement that must be compliant, transparent and cost-effective",
      "Many facilities and teams to keep equipped, clean and maintained",
      "Transformation goals that call for empowered, local suppliers",
    ],
    response: [
      "A 100% black woman-owned supplier with a tailored, accountable service",
      "PPE, corporate wear and gifts supplied and managed",
      "Industrial and domestic cleaning and laundry services",
    ],
  },
];

export const VALUES = [
  {
    title: "Integrity",
    body: "We conduct our business with the highest level of honesty, transparency, and ethical standards. We are committed to doing what is right, even when it is not the easiest option, building trust with our clients and stakeholders.",
  },
  {
    title: "Empowerment",
    body: "We are dedicated to empowering our clients, employees, and partners with the knowledge and tools they need to succeed. We strive to create opportunities for growth and advancement, particularly for women in industries where they are underrepresented.",
  },
  {
    title: "Excellence",
    body: "We are committed to providing top-quality products and services, continually improving to exceed our clients' expectations. Our pursuit of excellence drives us to offer innovative solutions and maintain the highest standards in everything we do.",
  },
  {
    title: "Proactivity",
    body: "We take a forward-thinking approach to business, anticipating the needs of our clients and proactively providing tailored solutions. By focusing on prevention and long-term success, we ensure our clients are always prepared for what's ahead.",
  },
  {
    title: "Sustainability",
    body: "We are committed to practices that promote the well-being of the environment, our communities, and future generations. Our solutions are designed with sustainability in mind, ensuring that we contribute positively to the world around us.",
  },
];

export const WHY_US = [
  {
    title: "Tailored solutions",
    body: "Every client has unique needs. Whether it's PPE for a specific industry or a cleaning service tailored to your environment, we make sure you get the best fit for your business.",
  },
  {
    title: "Expertise in diverse industries",
    body: "Experience across mining, agriculture and government gives us a deep understanding of the challenges and safety requirements in each sector.",
  },
  {
    title: "Commitment to quality",
    body: "We source reliable, durable products and deliver services that enhance safety and operational efficiency.",
  },
  {
    title: "Empowering women",
    body: "As a 100% black woman-owned business, we are committed to creating safer, more inclusive working environments for women in industries where they are often underrepresented.",
  },
  {
    title: "Proactive approach",
    body: "We don't just react to your needs; we anticipate them, so our clients are prepared and equipped for what lies ahead.",
  },
];

export const OBJECTIVES = [
  "Efficiency",
  "Innovation",
  "Accuracy",
  "Responsiveness",
  "Commitment",
  "Quality service",
  "Reliability",
  "Creativity",
];

export const VISION =
  "To be a leading provider of innovative, sustainable, and cost-effective solutions in the PPE and cleaning services sectors, empowering women in traditionally male-dominated industries, particularly mining, with specialised products and services that ensure safety, comfort, and operational efficiency.";

export const MISSION =
  "To be the leading provider of high-quality, tailored PPE and cleaning solutions, with a strong focus on empowering women in industries where they are underrepresented, and to drive safety, sustainability, and efficiency across mining, agriculture, and government as the trusted partner for innovative, cost-effective solutions.";

export const COMMUNITY = [
  "Renovation of crèches and places of safety",
  "Donation of school uniforms",
  "Donation of sanitary towels",
];

/* Catalogue items carried over from the existing site, shown as a product showcase. */
export const PPE_PRODUCTS: {
  id: string;
  name: string;
  category: "Safety Gear" | "Footwear" | "Accessories";
  description: string;
  specs: string[];
  render: RenderKey;
}[] = [
  {
    id: "boots-b01",
    name: "IronFort Steel-Toe Mining Boots",
    category: "Footwear",
    description: "Double-reinforced steel cap, anti-puncture steel shank, oil and acid-resistant rubber sole.",
    specs: ["Duo-density polyurethane", "Thermal insulating lining"],
    render: "boot",
  },
  {
    id: "respirator-r04",
    name: "Sentinel Dust & Gas Respirator",
    category: "Safety Gear",
    description: "Active charcoal multi-gas filter designed for low-oxygen, high-silica dust levels inside active galleries.",
    specs: ["Multi-gas filter cartridges", "Silicon leak-free facepiece"],
    render: "respirator",
  },
  {
    id: "harness-m1",
    name: "Summit Full-Body Mining Harness",
    category: "Safety Gear",
    description: "Fall protection featuring integrated lumbar tool support and quick-connect rescue handles.",
    specs: ["Webbing strength 25kN", "Salt-spray rustproof buckles"],
    render: "harness",
  },
  {
    id: "helmet-h12",
    name: "Titan Arc-Flash Hardhat",
    category: "Accessories",
    description: "High-density polycarbonate mine shell with integrated lamp bracket and earmuff locks.",
    specs: ["Integrated lamp bracket", "6-point textile suspension"],
    render: "helmet",
  },
  {
    id: "gloves-g07",
    name: "ThermaShield Fire & Acid Gloves",
    category: "Safety Gear",
    description: "Heavy nitrile-coated safety gauntlets providing high chemical resistance and protection up to 250°C.",
    specs: ["Elbow-length protective sleeve", "Nitrile-coated grip"],
    render: "glove",
  },
  {
    id: "goggles-g11",
    name: "Viper Ballistic Goggles",
    category: "Accessories",
    description: "Anti-fog, scratch-resistant polycarbonate lens with a full panoramic seal against fine dust.",
    specs: ["99.9% UVA/UVB shield", "Soft thermoplastic body"],
    render: "goggles",
  },
];

export const WIM_SUIT = {
  name: "Women's ergonomic worksuit",
  range: "Women in Mining (WIM) PPE",
  intro:
    "Most worksuits are shrunk-down men's designs. Ours start from women's proportions, for better mobility, comfort and compliance for women on site.",
  features: [
    {
      id: "waist",
      title: "Ergonomic waist adjusters",
      description: "Elastic inserts tailored to the female form. Removes bunching and allows full range of motion when climbing and crawling.",
      at: { x: 250, y: 272 },
    },
    {
      id: "knee",
      title: "Reinforced knee pockets",
      description: "Double-stitched protective panels built to hold standard knee inserts, for impact and tear resistance in narrow spaces.",
      at: { x: 235, y: 452 },
    },
    {
      id: "vent",
      title: "Ventilated shoulder yoke",
      description: "Mesh-lined vents beneath the shoulder yoke help release heat and humidity on long shifts.",
      at: { x: 262, y: 106 },
    },
    {
      id: "harness",
      title: "Harness-ready fittings",
      description: "D-rings and belt loops placed for safety harnesses, tool belts and battery packs without pressing on pressure points.",
      at: { x: 172, y: 292 },
    },
    {
      id: "stripe",
      title: "Reflective striping",
      description: "Reflective tape around chest, forearms and calves for visibility from every angle.",
      at: { x: 80, y: 292 },
    },
  ],
  materials: ["Breathable cotton-rich blends", "Flame-retardant threads", "Acid-repellent finish", "Knee-insert compatible"],
} as const;
