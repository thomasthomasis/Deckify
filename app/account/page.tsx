import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

import AccountSection from "@/components/ui/account/AccountSection";
import PreferencesForm from "@/components/ui/account/PreferencesForm";
import DeleteAccountButton from "@/components/ui/account/DeleteAccountButton";


export default async function AccountPage(){


const supabase = await createClient();


const {
data:{
user
}
}=await supabase.auth.getUser();



if(!user){

return null;

}


const identities = user?.identities ?? [];

const hasGoogleProvider = identities.some((identity) => identity.provider === "google");



const {
data:settings
}=await supabase
.from("user_settings")
.select("*")
.eq(
"user_id",
user.id
)
.single();



return (

<main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">


<div className="mx-auto max-w-4xl">


<Link
href="/profile"
className="text-sm text-zinc-400 hover:text-white"
>
← Back to Profile
</Link>



<h1 className="mt-8 text-4xl font-bold">
Account Settings
</h1>




<div className="mt-10 space-y-6">



<AccountSection title="Account Information">

<p className="text-zinc-400">
Email
</p>

<p className="mt-1 font-semibold">
{user.email}
</p>

</AccountSection>





<AccountSection title="Security">


<Link
href="/reset-password"
className="text-emerald-400"
>
Reset Password →
</Link>


</AccountSection>





<AccountSection title="Preferences">


<PreferencesForm
dailyGoal={settings?.daily_goal ?? 10}
remindersEnabled={settings?.reminders_enabled ?? true}
/>


</AccountSection>





<AccountSection title="Danger Zone">


<DeleteAccountButton/>


</AccountSection>



</div>


</div>


</main>

);


}