'use client';
import { useAuthState } from "./lib/auth";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import Inicio from "./screens/inicio/page";

export default function Home() {
  const user = useAuthState();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/screens/home');
    }
  }, [user, router]);

  return (
    <Inicio />
  );
}
