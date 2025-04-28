import SearchInput from '@/src/components/SearchInput';
import SearchRestaurants from '@/src/components/SearchRestaurants';
import SearchUsers from '@/src/components/SearchUsers';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const Search = () => {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState<string>('');
  const isUserSearch = search.trim().startsWith("@");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <SafeAreaView
        style={[
          styles.safeArea,
          { paddingTop: 0 },
          Platform.OS === 'ios' && { marginTop: -insets.top },
        ]}
      >
        <View style={styles.fixedInputWrapper}>
          <SearchInput
            value={search}
            onChangeText={setSearch}
            placeholder="Pesquisar"
            style={styles.input}
          />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          {!isUserSearch && (
            <>
              <SearchRestaurants
                name="Bilhar do seu Zé"
                averagePrice={10}
                note={3.5}
                location="Av. Protásio Alves"
              />
              <SearchRestaurants
                name="Maza Bar"
                averagePrice={10}
                note={4.2}
                location="Av. Bento Gonçalves"
              />
              <SearchRestaurants
                name="Restaurante da Monica"
                averagePrice={10}
                note={5}
                location="Rua das Hortencias"
              />
              {[...Array(6)].map((_, index) => (
                <SearchRestaurants
                  key={index}
                  name="Maza Bar"
                  averagePrice={10}
                  note={4.2}
                  location="Av. Bento Gonçalves"
                />
              ))}
            </>
          )}

          {isUserSearch && (
            <View>
              <SearchUsers name="Joao" nickname="jv" profilePhoto="" />
              <SearchUsers name="Valdir" nickname="John Doe" profilePhoto="" />
              <SearchUsers name="Maria" nickname="littleStar" profilePhoto="bbbbb" />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  fixedInputWrapper: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 12,
    color: '#000000',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: '8%',
    paddingHorizontal: '4%',
    width: '100%',
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 20,
    paddingLeft: 24,
    paddingRight: 16,
    color: '#000000',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
});

export default Search;
