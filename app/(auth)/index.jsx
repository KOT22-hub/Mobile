import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, ActivityIndicator } from 'react-native'
import styles from "../../assets/styles/login.styles"
import React, { useState } from 'react'
import {Image} from "expo-image"
import {Ionicons} from "@expo/vector-icons"
import COLORS from '../../constants/colors'
import { Link } from "expo-router";
import { useAuthStore } from '../../store/authStore'

export default function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [showpassword,setshowPassword]=useState(false);
  const [isLoading,setisloading]=useState(false);
  const {user,login,isloading}= useAuthStore();

  const handleLogin= async()=>{
    const result= await login(email,password);

    if(!result.success) Alert.alert("error",result.error);

    console.log("logined in successfully")
    setEmail("");
    password("");


  }



  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ flex: 1 }}
    keyboardVerticalOffset={60}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>

{/* illustration */}
<View style={styles.topIllustration}>
  <Image
  source={require("../../assets/images/Reading book-rafiki.png")}
  style={styles.illustrationImage}
  contentFit='contain'

  
  />
  

</View>
<View style={styles.card}>
    <View style={styles.formContainer}>
     {/* EMAIL*/}
     <View style={styles.inputGroup}>
      <Text style={styles.label}>Email</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color={COLORS.primary} style={styles.inputIcon}/>

        <TextInput style={styles.input} placeholder='enter your email' placeholderTextColor={COLORS.placeholderText}
        value={email} onChangeText={setEmail} keyboardType='email-address' autoCapitalize='none'
        
        />

      </View>
     </View>
     {/* PASSWORD */}
     <View style={styles.inputGroup}>
      <Text style={styles.label}>password</Text>
      <View style={styles.inputContainer}>
        {/* LEFT ICON  */}
        <Ionicons name="lock-closed-outline" size={20} color={COLORS.primary} style={styles.inputIcon}/>
        <TextInput style={styles.input} placeholder='enter your password' placeholderTextColor={COLORS.placeholderText}
        value={password} onChangeText={setPassword} keyboardType='email-address' secureTextEntry={!showpassword}
        
        />
        <TouchableOpacity onPress={()=>setshowPassword(!showpassword)} style={styles.eyeIcon}>
          <Ionicons
          name={showpassword?"eye-outline":"eye-off-outline"}
          size={20}
          color={COLORS.primary}
          
          />



        </TouchableOpacity>


      </View>

     </View>
     <TouchableOpacity
  style={styles.button}
  onPress={handleLogin}
  disabled={isLoading}
>
  {isLoading ? (
    <ActivityIndicator color="#fff" />
  ) : (
    <Text style={styles.buttonText}>Login</Text>
  )}
</TouchableOpacity>

{/* FOOTER */}
<View style={styles.footer}>
  <Text style={styles.footerText}>Don't have an account?</Text>
  <Link href='/signup'asChild>
  <TouchableOpacity>
    <Text style={styles.link}>Sign up</Text>
  </TouchableOpacity>
  </Link>

</View>




    </View>
  </View>
</View>
        

      </ScrollView>

    </KeyboardAvoidingView>
  )

  
}