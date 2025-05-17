import SearchRestaurants from '@/src/components/SearchRestaurants';
import Colors from '@/src/constants/Colors';
import { useSearchFilter } from '@/src/hooks/useSearchFilter';
import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const FilterResultScreen = () => {
  const insets = useSafeAreaInsets();
  const { restaurants, loading } = useSearchFilter();

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
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          {loading && (
            <ActivityIndicator
              size="small"
              color={Colors.orange.orangeStandard}
              style={{ marginTop: 20 }}
            />
          )}

          {!loading &&
            restaurants.map((restaurant) => (
              <SearchRestaurants
                key={restaurant.id}
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
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: '8%',
    paddingHorizontal: '4%',
    width: '100%',
  },
});

export default FilterResultScreen;
