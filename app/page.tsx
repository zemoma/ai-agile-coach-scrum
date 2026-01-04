"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, Target, Users, Zap } from "lucide-react";

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setIsRedirecting(true);
      router.push("/ai-chat");
    }
  }, [isLoaded, isSignedIn, router]);

  const handleGetStarted = () => {
    setIsRedirecting(true);
    router.push(isSignedIn ? "/ai-chat" : "/sign-in");
  };

  if (isRedirecting) {
    return (
      <div className="flex flex-col space-y-4 min-h-screen items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 dark:from-zinc-950 dark:to-zinc-900">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6" />
          <h1 className="text-3xl max-md:text-lg font-bold text-zinc-800 dark:text-zinc-200">
            Taking you to your workspace...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-800 opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          {/* Logo and Title */}
          <div className="text-center mb-16">
            <div className="flex justify-center">
              <div className="relative w-full h-40 ">
                <Image
                  src="/logo.png"
                  alt="AgileMentor AI Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            {/* <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-zinc-900 dark:text-white mb-6">
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                AgileMentor AI
              </span>
            </h1> */}
            <p className="text-xl sm:text-2xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto mb-8">
              Your AI-powered Scrum Coach for mastering Agile practices and
              accelerating team performance
            </p>
            <button
              onClick={handleGetStarted}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            {/* Feature 1 */}
            <div className="group bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-600/10 dark:bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600/20 transition-colors">
                <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                AI-Powered Coaching
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Get instant answers and guidance on Agile and Scrum practices
                tailored to your needs
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-purple-600/10 dark:bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-600/20 transition-colors">
                <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                Sprint Planning
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Learn best practices for effective sprint planning and backlog
                refinement
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-indigo-600/10 dark:bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-600/20 transition-colors">
                <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                Team Collaboration
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Enhance team dynamics with proven strategies for daily standups
                and retrospectives
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-pink-600/10 dark:bg-pink-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-pink-600/20 transition-colors">
                <Zap className="w-6 h-6 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                Instant Answers
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                24/7 access to expert knowledge on Agile methodologies and Scrum
                frameworks
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-zinc-200 dark:border-zinc-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            <p>
              © {new Date().getFullYear()} AgileMentor AI. All rights reserved.
            </p>
            <p className="mt-2">
              Powered by Gemini AI • Built with ❤️ for Agile Teams
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
