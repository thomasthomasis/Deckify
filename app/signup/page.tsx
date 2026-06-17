"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function SignupPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Account created!");
    }
  }

  return (
    <div>
      <h1>Create Account</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignup}>
        Sign Up
      </button>
    </div>
  );
}