import Link from "next/link";
import {
  Minimize2, ArrowRightLeft, Maximize,
  FileImage, Merge, SplitSquareHorizontal,
  Braces, Hash, Fingerprint, Diff, Palette,
  QrCode, KeyRound, Scale, CaseSensitive, Type,
  ChevronRight, ExternalLink, Monitor, Database
} from "lucide-react";

const CATEGORIES = [
  {
    id: "image",
    label: "🖼️ Image Tools",
    color: "from-soft-blue to-vibrant-purple",
    glow: "rgba(79,140,255,0.2)",
    tools: [
      {
        icon: Minimize2,
        title: "Image Compressor",
        href: "/tools/image/compressor",
        tagline: "Shrink any image without visible quality loss.",
        description:
          "Upload a JPG, PNG, or WebP image and drag the quality slider to find the perfect balance between file size and visual clarity. Your image is processed entirely in your browser — nothing is uploaded anywhere.",
        steps: [
          "Click the upload zone or drag & drop an image.",
          "Use the Quality slider to set compression level.",
          "Compare the original vs. compressed preview side by side.",
          "Click Download Compressed Image to save.",
        ],
        tip: "For web images, 70–80% quality gives the best size/quality balance.",
      },
      {
        icon: ArrowRightLeft,
        title: "Image Converter",
        href: "/tools/image/converter",
        tagline: "Convert between JPG, PNG, and WebP instantly.",
        description:
          "Need a PNG but only have a JPG? Or WebP for a faster web page? This tool re-encodes images in your chosen format, all in-browser with no server involved.",
        steps: [
          "Upload your source image.",
          "Select the output format (JPG / PNG / WebP).",
          "Download the converted file.",
        ],
        tip: "WebP is up to 30% smaller than JPG at the same quality — great for websites.",
      },
      {
        icon: Maximize,
        title: "Resize Image",
        href: "/tools/image/resize",
        tagline: "Scale images to exact pixel dimensions.",
        description:
          "Enter a target width and height — or lock the aspect ratio and enter just one value. Handles scaling up and down without distorting your image.",
        steps: [
          "Upload an image.",
          "Enter target Width and/or Height in pixels.",
          "Toggle 'Lock Aspect Ratio' to prevent distortion.",
          "Download the resized image.",
        ],
        tip: "Lock aspect ratio is ON by default. Turn it off only for intentional stretching.",
      },
    ],
  },
  {
    id: "pdf",
    label: "📄 PDF Tools",
    color: "from-vibrant-purple to-neon-purple",
    glow: "rgba(123,97,255,0.2)",
    tools: [
      {
        icon: FileImage,
        title: "Image to PDF",
        href: "/tools/pdf/image-to-pdf",
        tagline: "Turn images into a single PDF in seconds.",
        description:
          "Upload multiple JPG, PNG, or WebP files and merge them all into one clean PDF document. Useful for scanning documents with your phone, submitting homework, or archiving photos.",
        steps: [
          "Upload one or more image files.",
          "Reorder the images by dragging if needed.",
          "Click Generate PDF.",
          "Download the combined PDF.",
        ],
        tip: "Images are added to the PDF in the order shown — reorder for the right sequence.",
      },
      {
        icon: Merge,
        title: "PDF Merger",
        href: "/tools/pdf/merge",
        tagline: "Combine multiple PDF files into one document.",
        description:
          "Drag in two or more PDF files and click Merge. They'll be stitched together in order, creating a single unified document — all done locally in your browser.",
        steps: [
          "Upload the PDFs you want to merge.",
          "Drag to reorder them as needed.",
          "Click Merge PDFs.",
          "Download the merged PDF.",
        ],
        tip: "Works with password-free PDFs. No limits on number of pages.",
      },
      {
        icon: SplitSquareHorizontal,
        title: "Split PDF",
        href: "/tools/pdf/split",
        tagline: "Extract specific pages from any PDF.",
        description:
          "Need just pages 2–5 from a 50-page report? Enter a page range and this tool will extract exactly those pages into a new PDF file.",
        steps: [
          "Upload a PDF file.",
          "Enter the page range (e.g. '1-3' or '5').",
          "Click Extract Pages.",
          "Download your new, smaller PDF.",
        ],
        tip: "You can enter multiple ranges comma-separated, e.g. '1, 3-7, 10'.",
      },
    ],
  },
  {
    id: "developer",
    label: "⚙️ Developer Tools",
    color: "from-soft-glow-blue to-soft-blue",
    glow: "rgba(96,165,250,0.2)",
    tools: [
      {
        icon: Braces,
        title: "JSON Formatter",
        href: "/tools/developer/json-formatter",
        tagline: "Beautify, minify, and validate JSON data.",
        description:
          "Paste messy JSON and it will be instantly formatted with proper indentation. Catches syntax errors and highlights the exact problem location. Also supports minification for production builds.",
        steps: [
          "Paste your JSON into the left panel.",
          "The formatted output appears on the right.",
          "Switch to Minify mode to compress it.",
          "Copy the output with one click.",
        ],
        tip: "Invalid JSON will show a red error badge pointing to the problem line.",
      },
      {
        icon: Hash,
        title: "Base64 Encoder / Decoder",
        href: "/tools/developer/base64",
        tagline: "Encode text or files to Base64, and reverse.",
        description:
          "Paste plain text to encode it as Base64, or paste a Base64 string to decode it back to the original. Great for embedding images in CSS, working with JWT tokens, or debugging API payloads.",
        steps: [
          "Choose Encode or Decode mode.",
          "Paste your text or Base64 string.",
          "Instantly see the result.",
          "Click Copy to save.",
        ],
        tip: "For the 'data:image/png;base64,...' format, paste only the part after the comma.",
      },
      {
        icon: Fingerprint,
        title: "UUID Generator",
        href: "/tools/developer/uuid",
        tagline: "Generate unique IDs for your projects.",
        description:
          "Generate v1 (timestamp-based) or v4 (random) UUIDs. Batch generate dozens at once for seeding databases or creating mock data.",
        steps: [
          "Choose v1 or v4 UUID version.",
          "Set the quantity to generate.",
          "Click Generate.",
          "Copy individual UUIDs or all at once.",
        ],
        tip: "Use v4 for most cases. v1 includes the machine timestamp, which can be a privacy concern.",
      },
      {
        icon: Diff,
        title: "Text Diff Checker",
        href: "/tools/developer/diff",
        tagline: "Spot changes between two text blocks instantly.",
        description:
          "Side-by-side view with line-level diff highlighting. Perfect for comparing API responses, reviewing config file changes, or proofreading document edits.",
        steps: [
          "Paste the original text in the left panel.",
          "Paste the modified text in the right panel.",
          "View highlighted differences instantly.",
        ],
        tip: "Green highlights are additions, red are deletions.",
      },
      {
        icon: Monitor,
        title: "Code-to-Image Snap",
        href: "/tools/developer/code-to-image",
        tagline: "Create beautiful, shareable code screenshots.",
        description:
          "Turn raw code into a designer-grade image. Choose from multiple syntax themes and glassmorphic backgrounds. Perfect for sharing on X (Twitter), LinkedIn, or technical blogs.",
        steps: [
          "Paste your snippet into the editor.",
          "Select your programming language and preferred theme.",
          "Pick a gradient or glass background from the presets.",
          "Adjust padding and window controls.",
          "Click Download PNG or JPG to save.",
        ],
        tip: "Switch to 'High Quality JPG' for smaller file sizes when sharing on social media.",
      },
      {
        icon: Palette,
        title: "Color Code Generator",
        href: "/tools/developer/color-picker",
        tagline: "Pick a color and get HEX, RGB, and HSL codes.",
        description:
          "Click on the color wheel to pick any color. Instantly get all three color format codes — ready to paste into your CSS, Figma, or design tool of choice.",
        steps: [
          "Use the color picker to choose a color.",
          "Copy the HEX, RGB, or HSL code.",
          "Explore the generated complementary palette.",
        ],
        tip: "HSL is the easiest format to tweak — adjust Lightness to get tints and shades.",
      },
    ],
  },
  {
    id: "utilities",
    label: "🛠️ Everyday Utilities",
    color: "from-logo-cyan to-soft-glow-blue",
    glow: "rgba(6,182,212,0.2)",
    tools: [
      {
        icon: QrCode,
        title: "QR Code Generator",
        href: "/tools/utilities/qr-generator",
        tagline: "Create scannable QR codes in seconds.",
        description:
          "Enter a URL, plain text, or WiFi credentials and get a high-resolution QR code. Download as a PNG for printing, sharing, or embedding in presentations.",
        steps: [
          "Choose the QR type (URL, Text, WiFi, etc.).",
          "Enter your content.",
          "Preview the QR code live.",
          "Download as PNG.",
        ],
        tip: "Add extra error correction for QR codes that will be printed on physical materials.",
      },
      {
        icon: KeyRound,
        title: "Password Generator",
        href: "/tools/utilities/password-generator",
        tagline: "Generate strong, random passwords instantly.",
        description:
          "Set your desired length and toggle character sets (uppercase, lowercase, numbers, symbols). Every password is generated locally — nothing is sent to any server.",
        steps: [
          "Set the password length with the slider.",
          "Toggle which character types to include.",
          "Click Generate or hit Space to re-roll.",
          "Click Copy.",
        ],
        tip: "For most accounts, 16 characters with all types enabled is excellent security.",
      },
      {
        icon: Scale,
        title: "Unit Converter",
        href: "/tools/utilities/unit-converter",
        tagline: "Convert lengths, weights, temperatures and more.",
        description:
          "Select a category (Length, Weight, Temperature…), enter a value in any unit, and see the converted results in all other units instantly.",
        steps: [
          "Choose a category (e.g. Length).",
          "Select the source unit.",
          "Type in a value.",
          "Read the conversions in the table.",
        ],
        tip: "Temperature conversions use exact formulas, not approximations.",
      },
      {
        icon: CaseSensitive,
        title: "Text Case Converter",
        href: "/tools/utilities/text-case",
        tagline: "Convert text to any casing format in one click.",
        description:
          "Paste text and convert it to UPPERCASE, lowercase, Title Case, camelCase, PascalCase, snake_case, kebab-case, or CONSTANT_CASE instantly.",
        steps: [
          "Paste your text in the input.",
          "Click any case format button.",
          "Copy the converted output.",
        ],
        tip: "Use camelCase for JavaScript variables and snake_case for Python / Ruby.",
      },
      {
        icon: Type,
        title: "Word Counter",
        href: "/tools/utilities/word-counter",
        tagline: "Analyze word count, characters, and reading time.",
        description:
          "Paste any text and instantly see total words, characters (with and without spaces), sentences, paragraphs, and estimated reading time.",
        steps: [
          "Paste or type your text into the input.",
          "Read the stats dashboard on the side.",
        ],
        tip: "Average reading speed used is 200 WPM — adjust your expectations for technical text.",
      },
      {
        icon: Database,
        title: "Universal Data Transformer",
        href: "/tools/utilities/data-transformer",
        tagline: "Convert between CSV, JSON, and Excel formats.",
        description:
          "Professional-grade conversion between common data formats. Supports drag & drop for CSV, JSON, and Excel (.xlsx). Includes a live table preview and search filter for quick data inspection.",
        steps: [
          "Drop your CSV, JSON, or Excel file into the upload zone.",
          "Inspect the data in the Preview Table.",
          "Search or filter rows if needed.",
          "Switch to JSON or CSV tabs to see the converted output.",
          "Click Download or Copy Output to save.",
        ],
        tip: "You can use this to quickly convert messy Excel sheets into clean JSON for web development.",
      },
    ],
  },
];

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-[#E2E8F0]">
      {/* Ambient Glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-[-5%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-soft-blue/5 blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full bg-vibrant-purple/5 blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-20 md:py-28 relative z-10">
        {/* Header */}
        <div className="mb-20">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#94A3B8] hover:text-[#E2E8F0] mb-10 transition-colors group">
            <div className="h-7 w-7 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <ChevronRight className="h-3.5 w-3.5 rotate-180" />
            </div>
            Back to Home
          </Link>

          <div className="h-1 w-12 rounded-full bg-gradient-to-r from-soft-blue to-vibrant-purple mb-5" />
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-5 text-white">
            Tools Guide
          </h1>
          <p className="text-lg text-[#94A3B8] max-w-2xl leading-relaxed">
            Everything you need to know to get the most out of every tool in CKToolkit.
            Step-by-step instructions, tips, and a direct link to each tool.
          </p>
        </div>

        {/* Quick Nav Pills */}
        <div className="flex flex-wrap gap-3 mb-20">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="px-5 py-2 rounded-2xl bg-white/[0.03] border border-white/10 text-sm font-bold text-[#94A3B8] hover:text-white hover:border-white/20 transition-all"
            >
              {cat.label}
            </a>
          ))}
        </div>

        {/* Category Sections */}
        <div className="space-y-28">
          {CATEGORIES.map((cat) => (
            <section key={cat.id} id={cat.id}>
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-10">
                <div className={`h-1.5 rounded-full w-10 bg-gradient-to-r ${cat.color}`} />
                <h2 className="text-2xl font-black tracking-tight text-white">{cat.label}</h2>
              </div>

              {/* Tool Cards */}
              <div className="space-y-8">
                {cat.tools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <div
                      key={tool.href}
                      className="rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md overflow-hidden"
                    >
                      {/* Card Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b border-white/5">
                        <div className="flex items-center gap-4">
                          <div className={`h-12 w-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${cat.color} shadow-[0_0_20px_${cat.glow}]`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-black text-white">{tool.title}</h3>
                            <p className="text-sm text-[#94A3B8]">{tool.tagline}</p>
                          </div>
                        </div>
                        <Link
                          href={tool.href}
                          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r ${cat.color} text-white font-black text-xs uppercase tracking-widest whitespace-nowrap hover:scale-105 active:scale-95 transition-all`}
                        >
                          Open Tool <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Description */}
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#94A3B8] mb-3">About</p>
                          <p className="text-sm text-[#94A3B8] leading-relaxed">{tool.description}</p>
                        </div>

                        {/* Steps + Tip */}
                        <div className="space-y-5">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#94A3B8] mb-3">How to Use</p>
                            <ol className="space-y-2">
                              {tool.steps.map((step, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-[#E2E8F0]">
                                  <span className={`h-5 w-5 shrink-0 rounded-lg text-[10px] font-black flex items-center justify-center bg-gradient-to-br ${cat.color} text-white mt-0.5`}>
                                    {i + 1}
                                  </span>
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </div>
                          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-vibrant-purple mb-1">💡 Pro Tip</p>
                            <p className="text-xs text-[#94A3B8] leading-relaxed">{tool.tip}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-28 text-center p-12 rounded-3xl bg-white/[0.02] border border-white/5">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-vibrant-purple mb-4">Ready to Build?</p>
          <h2 className="text-3xl font-black text-white mb-4">Start using your tools.</h2>
          <p className="text-[#94A3B8] mb-8 max-w-md mx-auto text-sm">All tools are free, require no sign-up, and process everything locally in your browser.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-soft-blue to-vibrant-purple text-white font-black text-sm uppercase tracking-widest hover:scale-105 hover:shadow-[0_10px_30px_rgba(123,97,255,0.4)] active:scale-95 transition-all"
          >
            Browse All Tools <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
