"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function NewDeckPage() {

    const supabase = createClient();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    async function handleCreateDeck() {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            alert("Please log in");
            return;
        }

        const { error } = await supabase
            .from("decks")
            .insert({
                user_id: user.id,
                title,
                description,
                source: "manual",
            });

        if (error) {
            console.error(error);
            alert(error.message)
        }
        else {
            alert("Deck created!");
        }
    }

    return (
        <div>
            <h1>Create Deck</h1>

            <input 
                placeholder="Deck Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <button onClick={handleCreateDeck}>
                Create Deck
            </button>
        </div>
    )
}