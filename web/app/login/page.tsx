"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveToken } from "@/lib/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const submit = async () => {
    const res = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    saveToken(data.token);
    router.push("/dashboard");
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Login</h1>
      <input className="border p-2 w-full mb-2" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input className="border p-2 w-full mb-4" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button className="bg-black text-white px-4 py-2" onClick={submit}>
        Login
      </button>
    </div>
  );
}
