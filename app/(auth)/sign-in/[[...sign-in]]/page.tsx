import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="space-y-6">
      <SignIn />
    </div>
  );
}
