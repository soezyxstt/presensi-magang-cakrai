import { TextGenerateEffect } from '~/components/aceternity/text-generate-effect';

export default function Loading() {
  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <TextGenerateEffect
        words="Loading..."
        className="text-xl md:text-3xl"
      />
    </div>
  );
}
