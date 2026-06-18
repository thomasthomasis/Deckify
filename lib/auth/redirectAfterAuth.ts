import { createClient } from "@/lib/supabase/client";


export async function redirectAfterAuth(router:any){

  const supabase = createClient();

  const {
    data:{
      user
    }
  } = await supabase.auth.getUser();



  const {
    data:profile
  } = await supabase

    .from("profiles")

    .select("onboarding_complete")

    .eq(
      "id",
      user?.id
    )

    .single();



  if(!profile?.onboarding_complete){

    router.push("/onboarding");

  }

  else{

    router.push("/dashboard");

  }

}