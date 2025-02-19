import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const Caja = ({ titulo }) => {
  return (
    <View style={styles.button}>
        <Text>{titulo}</Text>
    </View>
  );
};

export default Caja;