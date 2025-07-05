import Image from "next/image";
import Link from "next/link";

export const Logo = ({ href = "/" }: { href?: string }) => {
  return (
    <div className="flex items-center gap-2">
      <Link href={href} className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="logo"
          width={48}
          height={48}
          className="md:w-10 md:h-10 w-8 h-8 text-white"
        />
        <span className="text-xl font-bold text-rose-600">
          Page d&apos;Amour
        </span>
      </Link>
    </div>
  );
};
