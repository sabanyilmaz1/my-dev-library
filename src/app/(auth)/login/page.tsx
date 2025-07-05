import { LoginForm } from "./login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-12 w-12 items-center justify-center rounded-md text-primary-foreground">
            <Image
              src="/logo.png"
              alt="logo"
              width={64}
              height={64}
              className=" text-white"
            />
          </div>
          <span className="text-2xl font-bold"> Page Cadeau d&apos;Amour</span>
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
