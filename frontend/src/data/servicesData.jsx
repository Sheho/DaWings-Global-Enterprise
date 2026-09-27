import { Shirt, Briefcase, Award, Scissors, Globe, Edit3, Store, Wrench } from 'lucide-react';

export const allServices = [
  {
    id: 1,
    slug: 'agbada-digitizing',
    title: 'Agbada Digitizing',
    icon: Shirt,
    desc: 'Mastering the art of traditional attire. We translate intricate patterns into flawless machine-ready files, ensuring every stitch reflects true cultural heritage.',
    ctas: [
      { text: "Order Now", link: "/shop", primary: true },
      { text: "View Gallery", link: "/portfolio", primary: false }
    ],
    features: [
      { title: "Cultural Accuracy", desc: "We preserve the authentic flow and heritage of traditional Agbada embroidery patterns." },
      { title: "Flawless Precision", desc: "Engineered for zero thread breaks and perfectly balanced stitch densities on any fabric." },
      { title: "Rapid Delivery", desc: "Fast turnaround times so your production line never stops moving." }
    ]
  },
  {
    id: 2,
    slug: 'flap-and-pocket-designs',
    title: 'Flap & Pocket Designs',
    icon: Briefcase,
    desc: 'Precision detailing for modern tailoring. Elevate your garments with bespoke flap and pocket embroidery that commands attention and defines luxury.',
    ctas: [
      { text: "Order Now", link: "/shop", primary: true },
      { text: "View Gallery", link: "/portfolio", primary: false }
    ],
    features: [
      { title: "Bespoke Detailing", desc: "Intricate, high-end finishing that adds a premium touch to bespoke tailoring." },
      { title: "Scaling Consistency", desc: "Perfectly scaled designs whether applied to a small pocket or a large coat flap." },
      { title: "Fabric Optimization", desc: "Stitch densities calculated precisely for suiting fabrics to prevent puckering." }
    ]
  },
  {
    id: 3,
    slug: 'monogram-designs',
    title: 'Monogram Designs',
    icon: Award,
    desc: 'The hallmark of bespoke tailoring. From initials on cuffs to complex corporate crests, our monograms are digitized for perfect clarity and elegance.',
    ctas: [
      { text: "Order Now", link: "/shop", primary: true },
      { text: "View Gallery", link: "/portfolio", primary: false }
    ],
    features: [
      { title: "Perfect Clarity", desc: "Even the smallest serif fonts and initials are digitized for maximum readability." },
      { title: "Corporate Standards", desc: "We match exact brand guidelines and pantone colors for corporate crests." },
      { title: "Elegant Finishes", desc: "Smooth satin stitches that create a raised, luxurious feel on cuffs and collars." }
    ]
  },
  {
    id: 4,
    slug: 'cap-digitizing',
    title: 'Cap Digitizing',
    icon: Scissors,
    desc: 'Specialized 3D puff and flat digitizing optimized specifically for the unique curvature of headwear, guaranteeing zero distortion during production.',
    ctas: [
      { text: "Order Now", link: "/shop", primary: true },
      { text: "View Gallery", link: "/portfolio", primary: false }
    ],
    features: [
      { title: "3D Puff Mastery", desc: "Expert digitizing for raised, dimensional embroidery that stands out on any cap." },
      { title: "Curve Optimization", desc: "Center-out digitizing techniques specifically designed for the curvature of headwear." },
      { title: "Zero Distortion", desc: "Eliminate registration issues and fabric shifting during high-speed cap production." }
    ]
  },
  {
    id: 5,
    slug: 'global-logo-digitizing',
    title: 'Global Logo Digitizing',
    icon: Globe,
    desc: 'Transforming corporate identities into stitch-perfect files. We ensure your brand\'s integrity is maintained impeccably across all fabric types.',
    ctas: [
      { text: "Order Now", link: "/shop", primary: true },
      { text: "View Gallery", link: "/portfolio", primary: false }
    ],
    features: [
      { title: "Brand Integrity", desc: "We flawlessly translate complex vector logos into exact stitch representations." },
      { title: "Fabric Adaptability", desc: "Files optimized for polo shirts, heavy jackets, or delicate fabrics with equal perfection." },
      { title: "Stitch Perfection", desc: "Optimized pathing to reduce jumps, trims, and production time for bulk orders." }
    ]
  },
  {
    id: 6,
    slug: 'design-editing-resizing',
    title: 'Design Editing & Resizing',
    icon: Edit3,
    desc: 'Expert adjustments to your existing files. We resize, optimize, and clean up stitch densities to prevent thread breaks and save valuable production time.',
    ctas: [
      { text: "Order Now", link: "/shop", primary: true },
      { text: "View Gallery", link: "/portfolio", primary: false }
    ],
    features: [
      { title: "Density Optimization", desc: "We fix bullet-proof designs by recalculating stitch density for smoother runs." },
      { title: "Thread Break Prevention", desc: "Clean up messy files, removing unnecessary trims and jumps that cause machine stops." },
      { title: "Fast Adjustments", desc: "Need a logo slightly larger or smaller? We recalculate stitches instantly without losing quality." }
    ]
  },
  {
    id: 7,
    slug: 'digitizer-marketplace',
    title: 'Digitizer Marketplace',
    icon: Store,
    desc: 'A global stage for creators. Register as a designer to upload, price, and sell your premium embroidery files directly to tailors worldwide.',
    ctas: [
      { text: "Register As Designer", link: "/register", primary: true }
    ],
    features: [
      { title: "Global Reach", desc: "Get your best designs in front of thousands of tailors and production houses globally." },
      { title: "Fair Commission", desc: "Earn consistent passive income with industry-leading payout structures for creators." },
      { title: "Secure Platform", desc: "Your files are protected. We handle all licensing, payments, and delivery securely." }
    ],
    hideBottomCTA: true
  },
  {
    id: 8,
    slug: 'machine-engineering',
    title: 'Machine Engineering',
    icon: Wrench,
    desc: 'Keep your production running flawlessly. Access our trusted network of certified engineers for expert maintenance and rapid repair of your embroidery machines.',
    ctas: [
      { text: "View Engineers", link: "/engineers", primary: true }
    ],
    features: [
      { title: "Certified Experts", desc: "Connect with highly experienced, vetted engineers specializing in industrial machines." },
      { title: "Affordable Rates", desc: "Browse competitive, transparent pricing for routine maintenance and emergency repairs." },
      { title: "Rapid Deployment", desc: "Filter by state and location to find an available engineer near you instantly." }
    ],
    hideBottomCTA: true
  }
];
