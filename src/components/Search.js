import React from 'react';
import { StyleSheet, View, TextInput, Text, Pressable } from 'react-native';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { COLORS } from '../theme/colors.js';

const Search = ({ onSearch }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [find, setFind] = useState(false);

  const handleError = (input) => {
    const regex = /^[A-Za-z\s]+$/;
    if (find && input != '') {
      removeInput();
      return;
    }

    if (!input) {
      setError('Input cannot be empty');
    } else if (!regex.test(input)) {
      setError('Input must contain only letters and spaces');
    } else {
      setError('');
    }
    setInput(input);
  };
  const Search = () => {
    if (!error && input) {
      onSearch(input.trim().toLowerCase());
      setFind(true);
    }
  };
  const removeInput = () => {
    setFind(false);
    setInput('');
    setError('');
    onSearch('');
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={error ? styles.inputError : styles.input}
          value={input}
          placeholder={'Search...'}
          onChangeText={handleError}
        />

        {find ? (
          <Pressable onPress={removeInput}>
            <Entypo name="circle-with-cross" style={styles.icon} />
          </Pressable>
        ) : (
          <Pressable onPress={Search}>
            <AntDesign name="search1" style={styles.icon} />
          </Pressable>
        )}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '90%',
    paddingTop: 10,
    marginRight: 2,
    marginLeft: 15,
    marginBottom: 5,
  },

  input: {
    color: COLORS.text,
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderWidth: 1,
    padding: 3,
    borderRadius: 8,
    width: '80%',
    fontSize: 16,
  },
  inputError: {
    height: 40,
    width: '80%',
    borderColor: COLORS.error,
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 5,
  },
  error: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 5,
    paddingLeft: 12,
  },
  icon: {
    color: COLORS.primary,
    fontSize: 30,
    marginRight: 5,
  },
});
