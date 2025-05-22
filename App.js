import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Platform, Linking } from 'react-native';
import * as StoreReview from 'expo-store-review';

export default function App() {
  const [logs, setLogs] = useState([]);
  const [isAvailable, setIsAvailable] = useState(null);
  const [storeUrl, setStoreUrl] = useState(null);

  // Add log function to track operations
  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prevLogs => [`[${timestamp}] ${message}`, ...prevLogs]);
  };

  // Check if the StoreReview API is available
  const checkAvailability = async () => {
    try {
      const available = await StoreReview.isAvailableAsync();
      setIsAvailable(available);
      addLog(`Store Review API available: ${available}`);
    } catch (error) {
      addLog(`Error checking availability: ${error.message}`);
    }
  };

  // Get the store URL for the app
  const getStoreUrl = async () => {
    try {
      const url = await StoreReview.storeUrl();
      setStoreUrl(url);
      addLog(`Store URL: ${url || 'Not available'}`);
    } catch (error) {
      addLog(`Error getting store URL: ${error.message}`);
    }
  };

  // Request a review
  const requestReview = async () => {
    try {
      const result = await StoreReview.requestReview();
      addLog(`Review requested. Result: ${result !== undefined ? JSON.stringify(result) : 'No result returned'}`);
    } catch (error) {
      addLog(`Error requesting review: ${error.message}`);
    }
  };

  // Open store page
  const openStorePage = async () => {
    try {
      if (storeUrl) {
        addLog(`Opening store URL: ${storeUrl}`);
        await Linking.openURL(storeUrl);
      } else {
        addLog('Store URL not available. Getting URL first...');
        const url = await StoreReview.storeUrl();
        if (url) {
          setStoreUrl(url);
          addLog(`Opening store URL: ${url}`);
          await Linking.openURL(url);
        } else {
          addLog('Could not get store URL');
        }
      }
    } catch (error) {
      addLog(`Error opening store page: ${error.message}`);
    }
  };

  // Check if running on Fire OS
  const isFireOS = () => {
    // Fire OS is based on Android but has specific characteristics
    // This is a simple check that might need refinement
    const isAndroid = Platform.OS === 'android';
    const manufacturer = Platform.constants?.manufacturer || '';
    return isAndroid && manufacturer.toLowerCase().includes('amazon');
  };

  // Get device info
  const getDeviceInfo = () => {
    try {
      const info = {
        platform: Platform.OS,
        version: Platform.Version,
        ...Platform.constants
      };
      addLog(`Device info: ${JSON.stringify(info, null, 2)}`);
    } catch (error) {
      addLog(`Error getting device info: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>expo-store-review Test</Text>
      <Text style={styles.subtitle}>Fire OS Compatibility Test</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Store Review API Available: {isAvailable === null ? 'Unknown' : isAvailable ? 'Yes' : 'No'}
        </Text>
        <Text style={styles.infoText}>
          Store URL: {storeUrl || 'Unknown'}
        </Text>
        <Text style={styles.infoText}>
          Platform: {Platform.OS} {Platform.Version}
        </Text>
        <Text style={styles.infoText}>
          Fire OS: {isFireOS() ? 'Yes' : 'No/Unknown'}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button 
          title="Check Availability" 
          onPress={checkAvailability} 
        />
        <Button 
          title="Get Store URL" 
          onPress={getStoreUrl} 
        />
        <Button 
          title="Request Review" 
          onPress={requestReview} 
        />
        <Button 
          title="Open Store Page" 
          onPress={openStorePage} 
        />
        <Button 
          title="Get Device Info" 
          onPress={getDeviceInfo} 
        />
      </View>

      <View style={styles.logContainer}>
        <Text style={styles.logTitle}>Logs:</Text>
        <ScrollView style={styles.logScroll}>
          {logs.map((log, index) => (
            <Text key={index} style={styles.logText}>{log}</Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#555',
  },
  infoContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  logContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
  },
  logTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  logScroll: {
    flex: 1,
  },
  logText: {
    fontSize: 12,
    fontFamily: 'monospace',
    marginBottom: 2,
  },
});
