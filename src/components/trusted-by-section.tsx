"use client";

import {
  siGoogle,
  siMeta,
  siApple,
  siNetflix,
  siSpotify,
  siIntel,
  siNvidia,
  siStripe,
} from "simple-icons";
import { FadeIn } from "@/components/ui/fade-in";
import { Marquee } from "@/components/ui/marquee";

type Company = {
  name: string;
  path: string;
  color: string;
};

const siPath = (icon: { svg: string }) => {
  const match = icon.svg.match(/<path d="([^"]+)"/);
  return match ? match[1] : "";
};

const extraLogos: Record<string, { path: string; color: string }> = {
  Microsoft: {
    color: "#5E5E5E",
    path: "M2 2h9v9H2V2zm10 0h10v9H12V2zM2 12h9v10H2V12zm10 0h10v10H12V12z",
  },
  Amazon: {
    color: "#FF9900",
    path: "M1.963 9.353c.01.242.04.46.088.654a3.7 3.7 0 0 0 .287.605c.135.198.315.385.54.56a4.2 4.2 0 0 0 .78.46c.295.13.62.234.975.312a6.6 6.6 0 0 0 1.078.095 8 8 0 0 0 1.35-.11 5.7 5.7 0 0 0 1.35-.37c.4-.18.777-.42 1.116-.716.182-.16.36-.34.523-.54l.002-5.305h-2.71l.018 4.196a2.7 2.7 0 0 1-.305.06 5.7 5.7 0 0 1-.67.054 3.7 3.7 0 0 1-.894-.108 2.2 2.2 0 0 1-.766-.355 2 2 0 0 1-.525-.655 2.5 2.5 0 0 1-.198-.99 2.4 2.4 0 0 1 .21-1 2 2 0 0 1 .572-.69 2.4 2.4 0 0 1 .838-.39 4.4 4.4 0 0 1 1.017-.12 5.3 5.3 0 0 1 1.164.13 3.4 3.4 0 0 1 1.02.408 2.6 2.6 0 0 1 .717.72 2.5 2.5 0 0 1 .31 1.03h2.71a4.5 4.5 0 0 0-.47-2.04 5.3 5.3 0 0 0-1.225-1.63 6.6 6.6 0 0 0-1.737-.988 8.6 8.6 0 0 0-2.085-.336 9.7 9.7 0 0 0-2.206.21 7.7 7.7 0 0 0-2.025.69 5.9 5.9 0 0 0-1.566 1.24 5.1 5.1 0 0 0-.998 1.92 6.1 6.1 0 0 0-.348 2.56 6.3 6.3 0 0 0 .357 2.5 5.4 5.4 0 0 0 1.04 1.93 6 6 0 0 0 1.672 1.27 8 8 0 0 0 2.27.73 11.4 11.4 0 0 0 2.583.213 9 9 0 0 0 2.376-.3 6.8 6.8 0 0 0 2.004-1 5.5 5.5 0 0 0 1.386-1.74 5.4 5.4 0 0 0 .504-2.47v-.66H9.704a4 4 0 0 1-.105.985zM18.6 16.45h-2.15l1.94-2.3c.62-.77 1.05-1.36 1.3-1.78.25-.42.4-.8.45-1.14h2.1c-.22.85-.66 1.64-1.3 2.38-.65.73-1.49 1.64-2.54 2.74l-.6.5z",
  },
  Adobe: {
    color: "#ED2224",
    path: "M13.966 2.2H2.557C2.247 2.2 2 2.448 2 2.758v18.484c0 .31.247.558.557.558h11.41V2.2zM21.443 2.2h-7.476v19.6h7.476c.31 0 .557-.248.557-.558V2.758c0-.31-.247-.558-.557-.558zM8.07 7.793c.313 0 .6.124.678.38.086.28.027.585-.17.86l-2.533 3.86h3.104v-1.11h-1.46c-.41 0-.485-.225-.242-.486l1.65-2.306c.242-.347.458-.57.458-.998 0-.486-.39-.795-1.04-.795H4.466v1.135h3.604z",
  },
  Salesforce: {
    color: "#00A1E0",
    path: "M11.353 21.475c-3.49-.553-6.106-3.26-6.106-6.566 0-2.66 1.54-4.97 3.982-5.956l.567 1.747c-1.728.86-2.823 2.62-2.823 4.565 0 2.31 1.55 4.028 3.98 4.5v-2.978l3.04 2.354-3.04 2.334v-2.06z M18.93 16.41c0 2.6-1.66 4.31-4.46 4.78v-2.96l-3.04 2.355 3.04 2.333v-1.97c3.4-.55 5.7-3.03 5.7-6.15 0-2.72-1.6-5.06-4.2-6.04l-.57 1.748c1.9.86 3.13 2.66 3.13 4.67 0 .46-.06.9-.16 1.3h-4.18v2.123h4.19c.06-.23.11-.46.11-.71z M12.0 2.1C6.7 2.1 2.4 6.4 2.4 11.7c0 4.94 3.85 8.97 8.6 9.27v-2.94l3.04-2.355-3.04-2.333v2.54c-3.04-.3-5.4-2.86-5.4-5.97 0-3.31 2.7-5.98 6.0-5.98 2.53 0 4.66 1.54 5.53 3.72l1.93-.62C17.9 4.55 15.21 2.1 12 2.1z",
  },
  IBM: {
    color: "#1F70C1",
    path: "M0 4.41h9.96v2.06H4.47v4.05h4.49v2.05H4.47v4.78H0V4.41zm11.27 0h4.54v2.06h-4.54v4.92h4.31v2.05h-4.31v4.78h-4.53V4.41h4.53v0zM22.16 4.41h4.53v2.06h-4.53v4.92h4.31v2.05h-4.31v4.78h-4.53V4.41h4.53z",
  },
  Oracle: {
    color: "#F80000",
    path: "M14.99 10.45c-.15.78-.34 1.53-.6 2.24a9.2 9.2 0 0 1-1.64 3.04 9.6 9.6 0 0 1-2.62 1.98c-1.02.49-2.13.74-3.31.74-.7 0-1.37-.08-2.02-.24a8.6 8.6 0 0 1-2.13-.75 9 9 0 0 1-2.1-1.47 9.9 9.9 0 0 1-1.76-2.16 10.4 10.4 0 0 1-1.18-2.64 9.3 9.3 0 0 1-.43-2.67c0-.92.15-1.8.43-2.64A10 10 0 0 1 2.6 6.53 9.9 9.9 0 0 1 4.36 4.36a9.4 9.4 0 0 1 2.1-1.48 8.6 8.6 0 0 1 2.13-.74A9.1 9.1 0 0 1 11.03 1.9c.86 0 1.69.1 2.48.31a9.8 9.8 0 0 1 2.29.83 11.7 11.7 0 0 1 1.62 1.07c.13.1.25.21.37.32v-3.6h4.44v20.5h-4.44v-3.62c-.12.11-.24.22-.37.32a11.7 11.7 0 0 1-1.62 1.07 9.8 9.8 0 0 1-2.29.83 9.1 9.1 0 0 1-2.48.31zm0-3.82c.1-.11.2-.21.3-.32a7 7 0 0 0 3.1-2.33 7.3 7.3 0 0 0 .8-2.05 6.6 6.6 0 0 0 .11-1.16h-4.31v3.6c-.13-.11-.25-.22-.38-.32a11.7 11.7 0 0 0-1.62-1.07 9.8 9.8 0 0 0-2.29-.83 9.1 9.1 0 0 0-2.48-.31 8.8 8.8 0 0 0-2.02.24 8.6 8.6 0 0 0-2.13.75 9 9 0 0 0-2.1 1.47A9.9 9.9 0 0 0 2.6 7.04a10.4 10.4 0 0 0-1.18 2.64 9.3 9.3 0 0 0-.43 2.67c0 .92.14 1.8.43 2.64A10 10 0 0 0 2.6 17.6a9.9 9.9 0 0 0 1.76 2.16 9.4 9.4 0 0 0 2.1 1.48 8.6 8.6 0 0 0 2.13.74 9.1 9.1 0 0 0 2.48.31c1.18 0 2.29-.25 3.31-.74a9.6 9.6 0 0 0 2.62-1.98 9.2 9.2 0 0 0 1.64-3.04c.26-.71.45-1.46.6-2.24V6.63z",
  },
  Slack: {
    color: "#4A154B",
    path: "M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z",
  },
};

const companies: Company[] = [
  { name: "Google", color: "#4285F4", path: siPath(siGoogle) },
  { name: "Microsoft", ...extraLogos.Microsoft },
  { name: "Amazon", ...extraLogos.Amazon },
  { name: "Meta", color: "#0866FF", path: siPath(siMeta) },
  { name: "Apple", color: "#A2AAAD", path: siPath(siApple) },
  { name: "Netflix", color: "#E50914", path: siPath(siNetflix) },
  { name: "Spotify", color: "#1DB954", path: siPath(siSpotify) },
  { name: "Adobe", ...extraLogos.Adobe },
  { name: "Salesforce", ...extraLogos.Salesforce },
  { name: "IBM", ...extraLogos.IBM },
  { name: "Intel", color: "#0071C5", path: siPath(siIntel) },
  { name: "Oracle", ...extraLogos.Oracle },
  { name: "Nvidia", color: "#76B900", path: siPath(siNvidia) },
  { name: "Slack", ...extraLogos.Slack },
  { name: "Stripe", color: "#635BFF", path: siPath(siStripe) },
];

function CompanyLogo({ name, path, color }: Company) {
  return (
    <div className="group/logo mx-6 flex shrink-0 items-center gap-2.5 rounded-lg py-2 grayscale transition-all duration-300 hover:grayscale-0">
      <svg
        viewBox="0 0 24 24"
        className="size-9 transition-transform duration-300 group-hover/logo:scale-110"
        style={{ fill: color }}
        role="img"
        aria-label={name}
        dangerouslySetInnerHTML={{ __html: `<path d="${path}" />` }}
      />
      <span className="text-base font-semibold tracking-tight text-muted-foreground transition-colors duration-300 group-hover/logo:text-foreground">
        {name}
      </span>
    </div>
  );
}

export function TrustedBySection() {
  return (
    <section className="w-full max-w-full overflow-hidden bg-bg py-24 my-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Trusted by teams at top companies
          </h2>
        </FadeIn>
      </div>

      <div className="relative mt-10 flex w-full max-w-full min-w-0 flex-col items-center overflow-hidden">
        <Marquee className="[--duration:40s] py-3">
          {companies.map((company) => (
            <CompanyLogo key={company.name} {...company} />
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-bg" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-bg" />
      </div>
    </section>
  );
}
