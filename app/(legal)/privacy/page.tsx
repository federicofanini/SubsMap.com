import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Privacy Policy</h1>
      
      <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
        At Subs Map, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.
      </p>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">1. Information We Collect</h2>
        <p className="text-gray-600 dark:text-gray-300">
          We collect information you provide directly to us, such as your name, email address, and subscription details.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">2. How We Use Your Information</h2>
        <p className="text-gray-600 dark:text-gray-300">
          We use your information to provide and improve our subscription tracking service, communicate with you, and ensure the security of your account.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">3. Data Security</h2>
        <p className="text-gray-600 dark:text-gray-300">
          We implement appropriate technical and organizational measures to protect your personal information against unauthorized access or disclosure.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">4. Your Rights</h2>
        <p className="text-gray-600 dark:text-gray-300">
          You have the right to access, correct, or delete your personal information. You may also request a copy of the data we hold about you.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">5. Changes to This Policy</h2>
        <p className="text-gray-600 dark:text-gray-300">
          We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
        </p>
      </section>

      <div className="mt-12 flex items-center justify-between">
        <Link 
          href="/terms" 
          className="flex items-center text-primary hover:underline"
        >
          View Terms and Conditions
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Link>
        <p className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
