// import 'react-native-gesture-handler'
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { View, Text, Button } from "react-native";

// function Home({ navigation }) {
//   return (
//     <View>
//       <Text>Home Screen</Text>
//       <Button title="Go to Profile" onPress={() => navigation.navigate("Profile")} />
//     </View>
//   );
// }

// function Profile() {
//   return <Text>Profile Screen</Text>;
// }

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen name="Profile" component={Profile} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { auth, db } from './firebase'; // Import from your file
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';

export default function App() {
  // 1. Variables to hold the text input
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 2. Function to Sign Up & Save Data
  const handleSignUp = async () => {
    if (!email || !password || !name || !rollNo) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      // A. Create User in Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // B. Save Name & Roll No to Firestore Database
      // We use the User UID as the document ID
      await setDoc(doc(db, "users", user.uid), {
        fullName: name,
        rollNumber: rollNo,
        email: email,
        createdAt: new Date()
      });

      Alert.alert("Success", "User Account Created & Data Saved!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  // 3. Function to Delete Data
  const handleDeleteData = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        await deleteDoc(doc(db, "users", user.uid));
        Alert.alert("Deleted", "Your user data has been removed from the database.");
      } catch (error) {
        Alert.alert("Error", "Could not delete data: " + error.message);
      }
    } else {
      Alert.alert("Error", "You must be signed in to delete data.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Sign Up</Text>

      {/* Input Fields */}
      <TextInput 
        style={styles.input} 
        placeholder="Enter Name" 
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Enter Roll No" 
        value={rollNo}
        onChangeText={text => setRollNo(text)}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Enter Email" 
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Enter Password" 
        value={password}
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={handleSignUp} />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button title="Delete My Data" color="red" onPress={handleDeleteData} />
      </View>

    </View>
  );
}

// Simple Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 10,
  }
});
