import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";

config({ path: ".env.local" });
config();

const prisma = new PrismaClient();

type SeedProduct = {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  stock: number;
  featured: boolean;
  specs: string[];
  images: string[];
};

type SeedCategory = {
  name: string;
  slug: string;
  description: string;
  products: SeedProduct[];
};

const catalog: SeedCategory[] = [
  {
    name: "Audio Premium",
    slug: "audio-premium",
    description: "Inmersion sonora total",
    products: [
      {
        name: "Auralith X9 ANC",
        slug: "auralith-x9-anc",
        shortDescription: "Audio inmersivo hi-res con cancelacion inteligente.",
        description:
          "Auriculares premium con arquitectura acustica de doble camara, cancelacion activa adaptativa y modo transparencia natural.",
        price: 349,
        compareAtPrice: 399,
        rating: 4.9,
        stock: 14,
        featured: true,
        specs: ["Bluetooth 5.4", "ANC Hibrido", "40h de bateria"],
        images: [
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
          "https://images.unsplash.com/photo-1484704849700-f032a568e944",
          "https://images.unsplash.com/photo-1577174881658-0f30ed549adc",
        ],
      },
    ],
  },
  {
    name: "Mechanical Performance",
    slug: "mechanical-performance",
    description: "Tacto y velocidad",
    products: [
      {
        name: "NovaKeys Pro 75",
        slug: "novakeys-pro-75",
        shortDescription: "Teclado mecanico premium con switch hot-swap.",
        description:
          "Construccion en aluminio CNC, estabilizadores prelubricados y perfil sonoro limpio para largas sesiones.",
        price: 279,
        rating: 4.8,
        stock: 9,
        featured: true,
        specs: ["Layout 75%", "QMK/VIA", "RGB per-key"],
        images: [
          "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
          "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef",
          "https://images.unsplash.com/photo-1611078489935-0cb964de46d6",
        ],
      },
    ],
  },
  {
    name: "Precision Control",
    slug: "precision-control",
    description: "Movimiento sin friccion",
    products: [
      {
        name: "Vector Glide M8",
        slug: "vector-glide-m8",
        shortDescription: "Mouse ergonomico con sensor de ultra precision.",
        description:
          "Diseno ligero con sensor de alta fidelidad, switches tactiles premium y superficie anti huellas.",
        price: 159,
        compareAtPrice: 189,
        rating: 4.7,
        stock: 22,
        featured: true,
        specs: ["Sensor 30K DPI", "Peso 59g", "Polling 4K"],
        images: [
          "https://images.unsplash.com/photo-1527814050087-3793815479db",
          "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7",
          "https://images.unsplash.com/photo-1563297007-0686b7003af7",
        ],
      },
    ],
  },
  {
    name: "Wearable Intelligence",
    slug: "wearable-intelligence",
    description: "Tu ritmo en tiempo real",
    products: [
      {
        name: "Chronos Pulse S",
        slug: "chronos-pulse-s",
        shortDescription: "Smart watch AMOLED con metricas avanzadas.",
        description:
          "Reloj inteligente para rutinas activas con GPS dual-band, monitoreo continuo y construccion premium.",
        price: 399,
        rating: 4.8,
        stock: 11,
        featured: true,
        specs: ["Pantalla AMOLED", "GPS dual-band", "7 dias de bateria"],
        images: [
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
          "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d",
          "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
        ],
      },
    ],
  },
  {
    name: "Wireless Charging",
    slug: "wireless-charging",
    description: "Energia sin cables",
    products: [
      {
        name: "Flux Charge Pad 3",
        slug: "flux-charge-pad-3",
        shortDescription: "Cargador inalambrico de alta eficiencia termica.",
        description:
          "Base de carga con control termico activo y acabado soft-touch para escritorios premium.",
        price: 89,
        rating: 4.6,
        stock: 28,
        featured: false,
        specs: ["Qi2 Ready", "15W Max", "Base antideslizante"],
        images: [
          "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5",
          "https://images.unsplash.com/photo-1583394838336-acd977736f90",
          "https://images.unsplash.com/photo-1659518248990-f7c497730bf2",
        ],
      },
    ],
  },
  {
    name: "Mobile Power",
    slug: "mobile-power",
    description: "Autonomia extendida",
    products: [
      {
        name: "MagVault 20K",
        slug: "magvault-20k",
        shortDescription: "Power bank de 20,000 mAh con carga inteligente.",
        description:
          "Autonomia extendida para movilidad total, con salida USB-C PD y control preciso de energia.",
        price: 129,
        rating: 4.7,
        stock: 16,
        featured: false,
        specs: ["20,000 mAh", "USB-C PD 45W", "Carga rapida bidireccional"],
        images: [
          "https://images.unsplash.com/photo-1587033411391-5d9e51cce126",
          "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5",
          "https://images.unsplash.com/photo-1620753545301-8e0f16f3d7ad",
        ],
      },
    ],
  },
  {
    name: "Studio Vision",
    slug: "studio-vision",
    description: "Imagen profesional",
    products: [
      {
        name: "StudioCam 4K Air",
        slug: "studiocam-4k-air",
        shortDescription: "Webcam 4K con enfoque automatico por IA.",
        description:
          "Camara premium para streaming y video reuniones con correccion de luz inteligente.",
        price: 229,
        rating: 4.7,
        stock: 8,
        featured: false,
        specs: ["Video 4K 30fps", "Auto-focus IA", "Dual mic beamforming"],
        images: [
          "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04",
          "https://images.unsplash.com/photo-1623949556303-b0d17d198863",
          "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
        ],
      },
    ],
  },
  {
    name: "Connectivity Hub",
    slug: "connectivity-hub",
    description: "Todo en un puerto",
    products: [
      {
        name: "HubSphere 8-in-1",
        slug: "hubsphere-8-in-1",
        shortDescription: "USB hub premium con conectividad integral.",
        description:
          "Expande estaciones de trabajo modernas con HDMI 4K, lector SD dual y ethernet gigabit.",
        price: 109,
        rating: 4.5,
        stock: 19,
        featured: false,
        specs: ["8 puertos", "HDMI 4K", "Ethernet Gigabit"],
        images: [
          "https://images.unsplash.com/photo-1591488320449-011701bb6704",
          "https://images.unsplash.com/photo-1625842268584-8f3296236761",
          "https://images.unsplash.com/photo-1662947284756-3e7c74aa2efa",
        ],
      },
    ],
  },
  {
    name: "High-Speed Storage",
    slug: "high-speed-storage",
    description: "Rendimiento sin espera",
    products: [
      {
        name: "SwiftDisk Nano 2TB",
        slug: "swiftdisk-nano-2tb",
        shortDescription: "Portable SSD ultrarapido para flujo creativo.",
        description:
          "Unidad SSD compacta con velocidad sostenida para edicion de video, backup pro y transferencia masiva.",
        price: 299,
        compareAtPrice: 339,
        rating: 4.9,
        stock: 6,
        featured: true,
        specs: ["2TB NVMe", "USB 3.2 Gen2", "Hasta 2000 MB/s"],
        images: [
          "https://images.unsplash.com/photo-1611735341450-74d61b4f205c",
          "https://images.unsplash.com/photo-1587202372775-e229f172b9d7",
          "https://images.unsplash.com/photo-1593642702744-d377ab507dc8",
        ],
      },
    ],
  },
  {
    name: "Portable Cinema",
    slug: "portable-cinema",
    description: "Experiencia visual expandida",
    products: [
      {
        name: "BeamLite Mini Pro",
        slug: "beamlite-mini-pro",
        shortDescription: "Mini proyector Full HD para cine portatil.",
        description:
          "Proyector compacto con correccion keystone automatica, audio integrado y conectividad inalambrica.",
        price: 459,
        rating: 4.6,
        stock: 5,
        featured: true,
        specs: ["Full HD nativo", "Auto keystone", "Wi-Fi + BT"],
        images: [
          "https://images.unsplash.com/photo-1551818255-e6e10975bc17",
          "https://images.unsplash.com/photo-1478720568477-152d9b164e26",
          "https://images.unsplash.com/photo-1574568347758-8bcc5ad4f82b",
        ],
      },
    ],
  },
];

async function main() {
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  for (const category of catalog) {
    await prisma.category.create({
      data: {
        name: category.name,
        slug: category.slug,
        description: category.description,
        products: {
          create: category.products.map((product) => ({
            name: product.name,
            slug: product.slug,
            shortDescription: product.shortDescription,
            description: product.description,
            price: product.price,
            compareAtPrice: product.compareAtPrice,
            rating: product.rating,
            stock: product.stock,
            featured: product.featured,
            specs: product.specs,
            images: {
              create: product.images.map((url, index) => ({
                url,
                alt: product.name,
                sortOrder: index,
              })),
            },
          })),
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
