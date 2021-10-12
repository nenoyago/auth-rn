import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from "react-native";

import { useAuth } from "../contexts/AuthContext";

export default function SignIn() {
  const { signIn } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {
    setIsLoading(true);

    await signIn();
  }

  useEffect(() => {
    return () => setIsLoading(false);
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.headerText}>
        <Text>Welcome to</Text><Text style={styles.bolderText}>RN Auth</Text>
      </View>
      <TouchableOpacity 
      style={styles.signInButton} 
      onPress={handleSignIn}
      disabled={isLoading}
      >
        {isLoading
          ? <Text style={styles.signInText}>Loading</Text>
          : <Text style={styles.signInText}>Sign In</Text>
        }
        <ActivityIndicator
          style={styles.signInActivityIndicator}
          color="#2191fb"
          animating={isLoading}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  headerText: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  bolderText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8
  },

  signInButton: {
    width: 164,
    padding: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#2191fb',

    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',

    position: 'relative'
  },

  signInText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#2191fb',
  },

  signInActivityIndicator: {
    position: 'absolute',
    right: 20,
  }
});