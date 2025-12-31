'use client';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold text-zinc-800 dark:text-zinc-200">
        Welcome to AgileMentor AI!
      </h1>
      <button className="ml-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" onClick={() => router.push('/ai-chat')}>
        Get Started
      </button>
    </div>
  );
}
