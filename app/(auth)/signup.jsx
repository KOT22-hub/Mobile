import { View, Text, KeyboardAvoidingView, Platform, TextInput,TouchableOpacity } from 'react-native'
import styles from '../../assets/styles/signup.styles'
import React,{ useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '../../constants/colors'
import { Link, useRouter } from "expo-router";
import { useAuthStore } from '../../store/authStore'

export default function Signup() {
  const [username,setUsername] = useState("");
   const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [showpassword,setshowPassword]=useState(false);
   
      const {user,isLoading,register} = useAuthStore();
    
     
    
      const handleSignup = async()=>{
        const result = await register(username,email,password)

        console.log(result);
        setUsername("");
        setEmail("");
        setPassword("")

        if(!result.success)Alert.alert("Error",result.error)
      }
    

    const router =useRouter();
  
 
  return (
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS==="ios"?"padding":"height"}>
      <View style={styles.container}>
        <View style={styles.card}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>BookWorm </Text>
            <Text style={styles.subtitle}>Share your favorite reads</Text>

          </View>
          <View style={styles.formContainer}>

            {/* USERNAME INPUT */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputContainer}>
                <Ionicons 
                name='person-outline'
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}

                
                />
                <TextInput
                style={styles.input}
                placeholder='john doe'
                placeholderTextColor={COLORS.placeholderText}
                value={username}
                onChangeText={setUsername}
                autoCapitalize='none'
                
                />

              </View>


            </View>
            {/* EMAIL*/}
     <View style={styles.inputGroup}>
      <Text style={styles.label}>Email</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color={COLORS.primary} style={styles.inputIcon}/>

        <TextInput style={styles.input} placeholder='joedoe@gmail.com' placeholderTextColor={COLORS.placeholderText}
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
  onPress={handleSignup}
  disabled={isLoading}
>
  {isLoading ? (
    <ActivityIndicator color="#fff" />
  ) : (
    <Text style={styles.buttonText}>Sign Up</Text>
  )}
</TouchableOpacity>

{/* FOOTER */}
<View style={styles.footer}>
  <Text style={styles.footerText}>Already have an account?</Text>
  
  <TouchableOpacity onPress={()=> router.back()}>
    <Text style={styles.link}>Log in</Text>
  </TouchableOpacity>


</View>



          </View>


        </View>

      </View>
    </KeyboardAvoidingView >
  )
}