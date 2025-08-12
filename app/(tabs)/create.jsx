import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity,Image, Alert } from 'react-native'
import React, { useState } from 'react'
import {useRouter} from 'expo-router'
import styles from "../../assets/styles/create.styles"
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';
import * as ImagePicker from 'expo-image-picker';
import * as Filesystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useAuthStore} from "../../store/authStore"
import { ActivityIndicator } from 'react-native';




export default function Create() {
  const [title,setTitle]= useState("");
  const [caption,setCaption]=useState("");
  const [rating,setRating]=useState(3);

  const [image,setImage]=useState(null); 
  const [imageBase64,setImageBase64]=useState(null);
  const [loading,isLoading]=useState(false);

  const router = useRouter();

  const {token}= useAuthStore();
  console.log(token)
  

  const pickImage = async()=>{
   try {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
      console.log({ status });

      if (status === "undetermined") {
        // Request permission if status is undetermined
        const permissionResponse = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResponse.status !== "granted") {
          Alert.alert("Permission denied", "We need access to your camera roll.");
          return;
        }
      } else if (status !== "granted") {
        // If already denied, alert the user
        Alert.alert("Permission denied", "We need access to your camera roll.");
        return;
      }
      //launch image library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:"images",
        allowsEditing:true,
        aspect:[4,3],
        quality:0.5,
        base64:true

      })
      if(!result.canceled){
        setImage(result.assets[0].uri)
        //if base64 provided use it

        if(result.assets[0].base64){
          setImageBase64(result.assets[0].uri)
        }
      }
      else{
        //otherwise convert it
        const base64 = await Filesystem.readAsStringAsync(result.assets[0].uri,{
          encoding:Filesystem.EncodingType.Base64
        })

        setImage(base64)

      }
      


    }
    
  }
  catch(error){
    console.log("error picking image",error.message)

  }
}
  const HandleSubmit = async()=>{
    if(!title|| !caption|| !imageBase64|| !rating)
    {
      Alert.alert("Please fill in all fields");
      return;
    }

    try {
      isLoading(true);
      //get file extension from uri or default to jpeg

      const uriParts = image.split(".");
      const filetype = uriParts[uriParts.length-1];

      const imageType = filetype?`image/${filetype.toLowerCase()}`:"image/jpeg";
      const imageDataUrl = `data:${imageType};base64,${imageBase64}`

      const response= await fetch("https://react-native-bookstoreapp-production.up.railway.app/api/books",{
      method:"POST",
      headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
  title,  // ✅ lowercase
  caption,
  image: imageDataUrl,
  rating: rating.toString()
})

    })
    const data = await response.json();
    if(!response.ok) throw new Error(data.message ||"something went wrong");
    Alert.alert("Success,your book recommendation has been added ");
    setTitle("");
    setCaption("");
    setRating(3);
    setImage(null);
    setImageBase64(null);

    router.push("/");

      
    } catch (error) {

      console.log("Error creating post:",error);
      Alert.alert("Error",error.message);


      
    }
    finally{
      isLoading(false);
    }

    


  }
  const renderRatingPicker =()=>{
    const stars = []
    for(let i=1;i<=5;i++){
      stars.push(
        <TouchableOpacity key={i} onPress={()=>setRating(i)} style={styles.starButton}>
          <Ionicons name = {i<=rating ? "star":"star-outline"} size={32} color={i<=rating? "#f4b400":COLORS.textSecondary}/>

        </TouchableOpacity>
      )
    }
    return <View style={styles.ratingContainer}> {stars}</View>
  }


  return (
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS==="ios"?"padding":"height"}>
      <ScrollView contentContainerStyle={styles.container} style={styles.scrollViewStyle}>
        <View style={styles.card}>
          {/* header */}
          <View style={styles.header}>
            <Text style={styles.title}>Add Book Recommendation</Text>
            <Text style={styles.subtitle}>Share your favorite reads with others</Text>


          </View>
          <View style={styles.form}>
            {/* book title  */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Title</Text>
              <View style={styles.inputContainer}>
                <Ionicons name='book-outline' size={20} color={COLORS.textSecondary} style={styles.inputIcon}/>
                <TextInput placeholder='Enter book title' style={styles.input} value={title} onChangeText={setTitle} placeholderTextColor={COLORS.placeholderText}/>

              </View>

            </View>
            {/* rating  */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Rating</Text>
              {renderRatingPicker()}

            </View>
            {/* image */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Image</Text>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                  {image ? (
                  <Image source={{ uri: image }} style={styles.previewImage} />
                ) : (
                  <View style={styles.placeholderContainer}>
                    <Ionicons name="image-outline" size={40} color={COLORS.textSecondary} />
                    <Text style={styles.placeholderText}>Tap to select image</Text>
                  </View>
                )}

              </TouchableOpacity>

            </View>
            {/* caption */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                Caption


              </Text>
              <TextInput
              style={styles.textArea}
              placeholder='Write your review or thoughts about the book'

              placeholderTextColor={COLORS.placeholderText}
              value={caption}
              onChangeText={setCaption}
              multiline
              
              />

              
            </View>
                        <TouchableOpacity style={styles.button}  disabled={loading} onPress={HandleSubmit}>
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <>
                  <Ionicons
                    name="cloud-upload-outline"
                    size={20}
                    color={COLORS.white}
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.buttonText}>Share</Text>
                </>
              )}
            </TouchableOpacity>


          </View>

        </View>

      </ScrollView>

    </KeyboardAvoidingView>
  )
}