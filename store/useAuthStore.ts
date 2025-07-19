import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


interface AuthStore {
    email:string | null,
    signedIn:boolean,
    pin:string,
    setPin:(pin:string)=>void,
    setEmail:(email:string)=>void,
    setSignedIn:(value:boolean)=>void 
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      signedIn:false,
      email:null,
      pin:"",
      setEmail:(email:string)=>set({email:email}),
      setSignedIn:(value:boolean)=>set({signedIn:value}),
      setPin:(pin:string)=>set({pin:pin})
    }),
    {
      name: 'auth-store',   
         storage: createJSONStorage(() => localStorage) // (optional) by default, 'localStorage' is used
    },
  ),
)