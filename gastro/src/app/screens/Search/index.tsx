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
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.inputWrapper}>
            <SearchInput
              value={search}
              onChangeText={setSearch}
              placeholder="Pesquisar"
              style={styles.input}
            />
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
                <SearchRestaurants
                  name="Maza Bar"
                  averagePrice={10}
                  note={4.2}
                  location="Av. Bento Gonçalves"
                />
                <SearchRestaurants
                  name="Maza Bar"
                  averagePrice={10}
                  note={4.2}
                  location="Av. Bento Gonçalves"
                />
                <SearchRestaurants
                  name="Maza Bar"
                  averagePrice={10}
                  note={4.2}
                  location="Av. Bento Gonçalves"
                />
                <SearchRestaurants
                  name="Maza Bar"
                  averagePrice={10}
                  note={4.2}
                  location="Av. Bento Gonçalves"
                />
                <SearchRestaurants
                  name="Maza Bar"
                  averagePrice={10}
                  note={4.2}
                  location="Av. Bento Gonçalves"
                />
                <SearchRestaurants
                  name="Maza Bar"
                  averagePrice={10}
                  note={4.2}
                  location="Av. Bento Gonçalves"
                />
              </>
            )}

            {isUserSearch && (
              <View>
                <SearchUsers
                  name='Joao'
                  nickname='jv'
                  profilePhoto=''
                />
                <SearchUsers
                  name='Valdir'
                  nickname='John Doe'
                  profilePhoto=''
                />
                <SearchUsers
                  name='Maria'
                  nickname='littleStar'
                  profilePhoto='bbbbb'
                />
              </View>
            )}
          </View>
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
  container: {
    alignItems: 'center',
    padding: '4%',
    paddingBottom: '8%',
    width: '100%',
  },
  inputWrapper: {
    width: '90%',
    marginBottom: '5%',
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 179, 112, 0.25)',
    paddingLeft: 24,
    paddingRight: 16,
    color: '#000000',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
});

export default Search;
