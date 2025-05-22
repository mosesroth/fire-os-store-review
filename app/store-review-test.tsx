import React, { useState } from 'react';
import { StyleSheet, View, Button, Text, Platform } from 'react-native';
import * as StoreReview from 'expo-store-review';
import { Stack } from 'expo-router';

export default function StoreReviewTestScreen() {
  const [result, setResult] = useState<string>('');
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [hasAction, setHasAction] = useState<boolean | null>(null);
  const [storeUrl, setStoreUrl] = useState<string | null>(null);

  const checkAvailability = async () => {
    try {
      const available = await StoreReview.isAvailableAsync();
      setIsAvailable(available);
      setResult(`isAvailableAsync: ${available}`);
    } catch (error) {
      setResult(`Error checking availability: ${error}`);
    }
  };

  const checkHasAction = async () => {
    try {
      const action = await StoreReview.hasAction();
      setHasAction(action);
      setResult(`hasAction: ${action}`);
    } catch (error) {
      setResult(`Error checking hasAction: ${error}`);
    }
  };

  const getStoreUrl = async () => {
    try {
      const url = await StoreReview.storeUrl();
      setStoreUrl(url);
      setResult(`Store URL: ${url || 'Not available'}`);
    } catch (error) {
      setResult(`Error getting store URL: ${error}`);
    }
  };

  const requestReview = async () => {
    try {
      await StoreReview.requestReview();
      setResult('Review requested successfully');
    } catch (error) {
      setResult(`Error requesting review: ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Store Review Test' }} />
      
      <Text style={styles.title}>Expo Store Review Test</Text>
      <Text style={styles.subtitle}>Platform: {Platform.OS}</Text>
      
      <View style={styles.buttonContainer}>
        <Button title="Check Availability" onPress={checkAvailability} />
        {isAvailable !== null && (
          <Text style={styles.resultText}>
            Is Available: {isAvailable ? 'Yes' : 'No'}
          </Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Check Has Action" onPress={checkHasAction} />
        {hasAction !== null && (
          <Text style={styles.resultText}>
            Has Action: {hasAction ? 'Yes' : 'No'}
          </Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Get Store URL" onPress={getStoreUrl} />
        {storeUrl !== null && (
          <Text style={styles.resultText}>
            Store URL: {storeUrl || 'Not available'}
          </Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button 
          title="Request Review" 
          onPress={requestReview}
          disabled={isAvailable === false} 
        />
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>Result:</Text>
        <Text style={styles.resultText}>{result}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  resultText: {
    fontSize: 16,
    marginTop: 5,
  },
});
