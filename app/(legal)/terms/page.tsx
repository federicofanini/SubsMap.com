import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Terms and Conditions</h1>
      
      <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
        Welcome to Subs Map. By using our service, you agree to these terms. Please read them carefully.
      </p>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">1. Service Description</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Subs Map is a subscription tracking service that helps you manage and monitor your monthly subscriptions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">2. User Responsibilities</h2>
        <p className="text-gray-600 dark:text-gray-300">
          You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">3. Privacy</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Your privacy is important to us. Please review our Privacy Policy to understand how we collect and use your information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">4. Modifications to the Service</h2>
        <p className="text-gray-600 dark:text-gray-300">
          We reserve the right to modify or discontinue the service at any time, with or without notice.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">5. Termination</h2>
        <p className="text-gray-600 dark:text-gray-300">
          We may terminate or suspend your account at our sole discretion, without prior notice or liability.
        </p>
      </section>

      <div className="mt-12 flex items-center justify-between">
        <Link 
          href="/privacy" 
          className="flex items-center text-primary hover:underline"
        >
          View Privacy Policy
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Link>
        <p className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
