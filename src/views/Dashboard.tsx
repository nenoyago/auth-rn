import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { signOut, user } = useAuth();

  function handleSignOut() {
    signOut();
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerText}>
        <Text>Welcome</Text><Text style={styles.bolderText}>{user?.name}</Text>
      </View>
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Logout</Text>
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

  signOutButton: {
    width: 164,
    padding: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#BA274A',

    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',

    position: 'relative'
  },

  signOutText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#BA274A',
  }
});