"use client";


import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";


interface Props {
  userId:string;
}


export default function OnboardingForm({
  userId
}:Props) {


  const router = useRouter();

  const [name,setName] = useState("");

  const [loading,setLoading] = useState(false);

  const [error,setError] = useState("");



  async function handleSubmit(e:React.FormEvent){

    e.preventDefault();


    if(!name.trim()){

      setError("Please enter your name");

      return;

    }


    setLoading(true);

    setError("");



    const supabase = createClient();



    const {
      error
    } = await supabase

      .from("profiles")

      .update({

        display_name:name,

        onboarding_complete:true

      })

      .eq(
        "id",
        userId
      );



    if(error){

      setError(error.message);

      setLoading(false);

      return;

    }



    router.push("/dashboard");

    router.refresh();

  }



  return (

    <div
      className="
      w-full
      max-w-md
      rounded-3xl
      border
      border-white/10
      bg-white/5
      p-8
      backdrop-blur-xl
      "
    >

      <h1
        className="
        text-3xl
        font-bold
        "
      >
        Welcome to Deckify 👋
      </h1>



      <p
        className="
        mt-3
        text-zinc-400
        "
      >
        What should we call you?
      </p>



      <form
        onSubmit={handleSubmit}
        className="
        mt-8
        space-y-5
        "
      >


        <input

          required

          value={name}

          onChange={(e)=>setName(e.target.value)}

          placeholder="Your name"

          className="
          w-full
          rounded-xl
          border
          border-white/10
          bg-black/20
          px-4
          py-3
          outline-none
          transition
          focus:border-emerald-500
          "

        />



        {
          error && (

            <p
              className="
              text-sm
              text-red-400
              "
            >
              {error}
            </p>

          )
        }



        <button

          type="submit"

          disabled={loading}

          className="
          w-full
          rounded-xl
          bg-emerald-500
          py-3
          font-semibold
          text-black
          transition
          hover:scale-[1.02]
          hover:bg-emerald-400
          disabled:opacity-50
          "

        >

          {
            loading
            ? "Saving..."
            : "Continue"
          }

        </button>


      </form>


    </div>

  );

}