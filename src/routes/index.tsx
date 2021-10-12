import React, { useContext } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

import { useAuth } from "../contexts/AuthContext";

import AuthRoutes from "./Auth.routes";
import AppRoutes from "./App.routes";

export default function Routes() {
  const { signed, loading } = useAuth();
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#999"/>
      </View>
    );
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});