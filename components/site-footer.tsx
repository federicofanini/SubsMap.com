import { ArrowRightIcon, DiscordLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { ReplaceAll } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const footerNavs = [
  {
    label: "Startups",
    items: [
      {
        href: "https://astroport.it",
        name: "🚢 AstroPort",
      },
      {
        href: "https://typefully.com/?via=federicofan",
        name: "🪽 Typefully",
      },
      {
        href: "https://shipfa.st/?via=federicofan",
        name: "⚡️ Shipfa.st",
      },
      {
        href: "https://byedispute.com/?via=federicofan",
        name: "🤝 ByeDispute",
      },
    ],
  },

  {
    label: "Community",
    items: [
      {
        href: "https://discord.gg/3mwjehpSFy",
        name: "💬 Discord",
      },
      {
        href: "https://x.com/FedericoFan",
        name: "🐦 Twitter",
      },
      {
        href: "mailto:f@fanini.eu",
        name: "📧 Email",
      },
    ],
  },
  {
    label: "Legal",
    items: [
      {
        href: "/terms",
        name: "Terms",
      },

      {
        href: "/privacy",
        name: "Privacy",
      },
    ],
  },
];

const footerSocials = [
  {
    href: "https://x.com/FedericoFan",
    name: "Twitter",
    icon: (
      <div className="flex items-center gap-2 group">
        <span className="text-sm font-medium text-gray-500 group-hover:text-gray-900 dark:group-hover:text-gray-600">Follow me on X</span>
        <TwitterLogoIcon className="h-4 w-4" />
        <ArrowRightIcon className="h-3 w-3 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
      </div>
    ),
  },
];

export function SiteFooter() {
  return (
    <footer>
      <div className="mx-auto w-full max-w-screen-xl xl:pb-2">
        <div className="md:flex md:justify-between px-8 p-4 py-16 sm:pb-16 gap-4">
          <div className="mb-12 flex-col flex gap-4">
            <Link href="/" className="flex items-center gap-2">
              <ReplaceAll className="h-8 w-8 text-primary text-black" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Subs Map
              </span>
            </Link>
            <p className="max-w-xs">Track your monthly subscriptions, easily.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:gap-10 sm:grid-cols-3">
            {footerNavs.map((nav) => (
              <div key={nav.label}>
                <h2 className="mb-6 text-sm tracking-tighter font-medium text-gray-900 uppercase dark:text-white">
                  {nav.label}
                </h2>
                <ul className="gap-2 grid">
                  {nav.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="cursor-pointer text-gray-400 hover:text-gray-200 duration-200 font-[450] text-sm"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:flex sm:items-center sm:justify-between rounded-md border-neutral-700/20 py-4 px-8 gap-2">
          <div className="flex space-x-5 sm:justify-center sm:mt-0">
            <div className="flex justify-center items-center mt-4 gap-2">
              <Link href="https://x.com/FedericoFan" target="_blank" className="flex items-center gap-2">
                <Image src="/ff.jpg" alt="Federico Fan" width={24} height={24} className="rounded-full" />
                <span className="text-sm text-gray-500 mr-2">Powered by Federico Fan</span>
              </Link>
            </div>
          </div>
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            Copyright © {new Date().getFullYear()}{" "}
            <Link href="/" className="cursor-pointer">
              Subs Map
            </Link>
            . All Rights Reserved.
          </span>
        </div>
        
      </div>
      {/*   <SiteBanner /> */}
    </footer>
  );
}
