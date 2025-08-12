import {create} from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useAuthStore = create((set)=>({
    user:null,
    token:null,
    isloading:false,

    register: async(username,email,password)=>{

        try {
            const response = await fetch("https://react-native-bookstoreapp-production.up.railway.app/api/auth/register",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"

                },body:JSON.stringify({
                    username,email,password
                })
            })

            const data = await response.json();

            if(!response.ok) throw new Error(data.message||"something went wrong")
            
            await AsyncStorage.setItem("user",JSON.stringify(data.user));
            await AsyncStorage.setItem("token",data.token)

            set({token:data.token,user:data.user,isloading:false})

            return {success:true}
            
        } catch (error) {
            set({isloading:false})
            return {success:false,error:error.message}
            
        }


    },
    login:async(email,password)=>{
        try {
            set({isloading:true})

            const response = await fetch("https://react-native-bookstoreapp-production.up.railway.app/api/auth/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email,password})
            });

            const data = await response.json();
            if(!response.ok) throw new Error(data.message||"something went wrong")

                  await AsyncStorage.setItem("user",JSON.stringify(data.user));
            await AsyncStorage.setItem("token",data.token)

                 set({user:data.user,token:data.token,isloading:false})




                 return {success:true}
            
        } catch (error) {

            set({isloading:false})
             return {success:false,error:error.message}
            
        }
    },
    checkAuth:async()=>{
        try {

            const token = await AsyncStorage.getItem("token");
            const userJson = await AsyncStorage.getItem("user");
            const user = userJson? JSON.parse(userJson):null;

            set({token,user})

            
        } catch (error) {

            console.log("auth check failed:",error)
            
        }
    },
    logout:async()=>{
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");

        set({user:null,token:null})

        
    }

}))