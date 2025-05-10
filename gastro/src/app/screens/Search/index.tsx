import SearchInput from '@/src/components/SearchInput';
import SearchRestaurants from '@/src/components/SearchRestaurants';
import SearchUsers from '@/src/components/SearchUsers';
import Colors from '@/src/constants/Colors';
import { useSearch } from '@/src/hooks/useSearch';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const Search = () => {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState<string>('');

  const { users, restaurants, loading, search: runSearch } = useSearch();

  useEffect(() => {
    runSearch(search);
  }, [search]);

  const isUserSearch = search.trim().startsWith('@');

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
          {loading && (
            <ActivityIndicator size="small" color= {Colors.orange.orangeStandard} style={{ marginTop: 20 }} />
          )}

          {!loading && isUserSearch && users.map((user) => (
            <SearchUsers
              key={user.id}
              name={user.name}
              nickname={user.nickname}
              profilePhoto={user.profilePhoto || ''}
              useId={user.id!}
            />
          ))}

          {!loading && !isUserSearch && restaurants.map((restaurant) => (
            <SearchRestaurants
              name={restaurant.name}
              averagePrice={restaurant.averagePrice}
              note={restaurant.averageScore ?? 0}
              location={restaurant.address}
              restaurantId={restaurant.id!}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  fixedInputWrapper: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: '8%',
    paddingHorizontal: '4%',
    width: '100%',
  },
  input: {
    height: 50,
    borderRadius: 20,
    color: Colors.black,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
});

export default Search;
