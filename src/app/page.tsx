import Link from 'next/link';
import { HoverBorderGradient } from '~/components/aceternity/hover-border-gradient';
import { TextGenerateEffect } from '~/components/aceternity/text-generate-effect';
import { SparklesCore } from '~/components/ui/sparkles';

export default async function Home() {
  return (
    <div className="relative flex min-h-dvh w-full max-w-[100vw] items-center justify-center overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 h-screen w-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="h-full w-full"
          particleColor="#FFFFFF"
        />
      </div>
      <h1 className="px-8 text-center text-3xl font-bold">
        <TextGenerateEffect words="Welcome To Web Presensi Magang CAKRAI 2024" />
      </h1>
      <div className="absolute right-8 top-4">
        <HoverBorderGradient
          containerClassName="rounded-xl"
          as="button"
          className="px-4 py-1.5 text-white"
        >
          <Link href="/sign-in">Sign In</Link>
        </HoverBorderGradient>
      </div>
    </div>
  );
}
