import BiometricAuth from "@/components/auth/BiometricAuth";
import { useAuthStore } from "@/store/useAuthStore";
import { PropsWithChildren } from "react";

export default function AuthProvider({children}:PropsWithChildren){
   const signedIn = useAuthStore(state=>state.signedIn)
   const setSignedIn = useAuthStore(state=>state.setSignedIn)
    const handleSuccess=()=>{
    setSignedIn(true)
   }
   return(
<>

      {!signedIn && <BiometricAuth onSuccess={handleSuccess} />}
       {children}
    
</>    )
}