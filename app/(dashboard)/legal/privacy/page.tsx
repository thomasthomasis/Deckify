export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl font-bold">Privacy Policy</h1>

      <p className="mt-2 text-zinc-400">Last Updated: June 21, 2026</p>

      <div className="prose prose-invert mt-10 max-w-none">
        <h2>Information We Collect</h2>

        <p>When you use Deckify, we may collect:</p>

        <ul>
          <li>Email address and account information</li>
          <li>Display name and profile information</li>
          <li>Decks, flashcards, and playlists you create</li>
          <li>Study progress and review history</li>
          <li>Usage and performance analytics</li>
        </ul>

        <h2>How We Use Information</h2>

        <p>We use collected information to:</p>

        <ul>
          <li>Provide and improve Deckify</li>
          <li>Save study progress and learning statistics</li>
          <li>Generate AI-powered flashcards</li>
          <li>Recommend decks and learning content</li>
          <li>Maintain platform security</li>
        </ul>

        <h2>Public Content</h2>

        <p>Decks and playlists marked as public may be visible to other users on the Discover page.</p>

        <p>Private content remains accessible only to the account owner.</p>

        <h2>Third-Party Services</h2>

        <p>Deckify may use trusted providers including:</p>

        <ul>
          <li>Supabase</li>
          <li>OpenAI</li>
          <li>Vercel</li>
        </ul>

        <h2>Your Rights</h2>

        <ul>
          <li>Update your profile information</li>
          <li>Delete your account</li>
          <li>Delete decks and playlists</li>
          <li>Request removal of public content</li>
        </ul>

        <h2>Contact</h2>

        <p>For privacy-related questions please contact:</p>

        <p>support@deckify.app</p>
      </div>
    </div>
  );
}
