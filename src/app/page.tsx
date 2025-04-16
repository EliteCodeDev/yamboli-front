'use client';

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/login");
  };

  return (
    <div>
      Hola mundo desde Yamboli 🧩
      <Button
        variant="primary"
        size="lg"
        className="m-4"
        onClick={handleRedirect}
      >
        Ir a login
      </Button>
    </div>
  );
}
