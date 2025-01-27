import React from 'react';
import { Button } from 'react-native';
import styles from './styles';

const Boton = ({ title }) => {
  return (
    <Button style={styles.button} title={title} />
  );
};

export default Boton;