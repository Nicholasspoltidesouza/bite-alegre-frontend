import CustomTextInput from '@/src/components/CustomTextInput';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const Search = () => {
  const [search, setSearch] = useState<string>('');

  const validateSearch = (text: string): string | null => {
    return null;
  };

  return (
    <View>
      <CustomTextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Pesquisar"
        style={styles.input}
        validation={validateSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    borderRadius: 20,
    backgroundColor: "rgba(255, 179, 112, 0.25)",
    paddingLeft: 24,
    paddingRight: 16,
    color: "#000000",
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
});

export default Search;
