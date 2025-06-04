import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  Platform,
  KeyboardAvoidingView,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/src/constants/Colors';
import CustomTextInput from '@/src/components/TextFieldCadastroUsuario';
import SignupHeader from '@/src/components/SignupHeader';
import Button from '@/src/components/Button';
import { useRouter } from 'expo-router';
import { useFetchTags } from '@/src/hooks/useFetchTags';
import Tag from '@/src/components/Tag';
import { useCreateUser } from '@/src/hooks/useUserApi';
import { useAuthContext } from '@/src/contexts/authContext';

export default function UserProfileEdit() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { getUserById, data: userData, loading: userLoading } = useCreateUser();
  const { user } = useAuthContext();

  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [userType, setUserType] = useState('Editar Perfil');

  // Tags
  const { getTags, tags, loading: tagsLoading, error } = useFetchTags();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    if (user?.id) {
      getUserById(user.id);
    }
  }, [user?.id]);

  useEffect(() => {
    if (userData) {
      console.log('Dados do usuário:', userData); 
      setNickname(userData.nickname || '');
      setName(userData.name || '');
      setEmail(userData.email || '');
      setPhone(userData.phone || '');

      if (userData.tagIds) {
        setSelectedTags(userData.tagIds);
      }
    }
  }, [userData]);

  const toggleTagSelection = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const renderTagSection = (title: string, type: string) => {
    const filteredTags = tags.filter((tag) => tag.type === type);
    return (
      <View style={{ marginBottom: 16 }}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.tagsRow}>
          {filteredTags.map((tag) => (
            <Tag
              key={tag.id}
              title={tag.name}
              isSelected={selectedTags.includes(tag.id)}
              onPress={() => toggleTagSelection(tag.id)}
            />
          ))}
        </View>
      </View>
    );
  };

  const validateName = (text: string) => {
    if (!text) return 'Nome é obrigatório';
    if (text.length < 2) return 'Nome deve ter no mínimo 2 caracteres';
    return null;
  };

  const validateNickname = (text: string) => {
    if (!text) return 'Usuário é obrigatório';
    if (text.length < 2) return 'Usuário deve ter no mínimo 2 caracteres';
    return null;
  };

  const validateEmail = (text: string) => {
    if (!text.includes('@')) return 'Email inválido';
    return null;
  };

  const validatePassword = (text: string) => {
    if (text.length < 6) return 'Senha deve ter no mínimo 6 caracteres';
    return null;
  };

  const validatePhone = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (!/^\d{10,11}$/.test(cleaned)) return 'Telefone inválido';
    return null;
  };

  const handleSubmit = () => {
    if (selectedTags.length === 0) {
      Alert.alert('Erro', 'Selecione pelo menos uma preferência.');
      return;
    }
    Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <SafeAreaView
        style={[
          styles.safeArea,
          Platform.OS === 'ios' && { marginTop: -insets.top },
        ]}
      >
        <SignupHeader
          userType={userType}
          setUserType={setUserType}
          profileIcon="person"
          onBack={() => router.back()}
        />

        <ScrollView contentContainerStyle={styles.container}>
          {userLoading ? (
            <ActivityIndicator color={Colors.orange.orangeStandard} style={{ marginVertical: 20 }} />
          ) : (
            <>
              <View style={styles.inputWrapper}>
                <CustomTextInput
                  value={nickname}
                  onChangeText={setNickname}
                  placeholder="Editar usuário"
                  style={styles.input}
                  validation={validateNickname}
                />
              </View>

              <View style={styles.inputWrapper}>
                <CustomTextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Editar nome"
                  style={styles.input}
                  validation={validateName}
                />
              </View>

              <View style={styles.inputWrapper}>
                <CustomTextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  style={styles.input}
                  validation={validateEmail}
                />
              </View>

              <View style={styles.inputWrapper}>
                <CustomTextInput
                  value={phone}
                  onChangeText={(text: string) => {
                    const formatted = text
                      .replace(/\D/g, '')
                      .replace(/^(\d{2})(\d)/g, '($1) $2')
                      .replace(/(\d{5})(\d)/, '$1-$2')
                      .slice(0, 15);
                    setPhone(formatted);
                  }}
                  placeholder="Telefone"
                  style={styles.input}
                  validation={validatePhone}
                  keyboardType="phone-pad"
                  maxLength={15}
                />
              </View>

              <Text style={styles.editFiltersTitle}>Editar Filtros</Text>
              {tagsLoading ? (
                <ActivityIndicator color={Colors.orange.orangeStandard} style={{ marginVertical: 20 }} />
              ) : error ? (
                <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
              ) : (
                <>
                  {renderTagSection('Local', 'LOCAL')}
                  {renderTagSection('Categoria', 'CATEGORIA')}
                  {renderTagSection('Ocasião', 'OCASIAO')}
                </>
              )}

              <View style={styles.buttonContainer}>
                <Button title="Concluir" type="orange" onPress={handleSubmit} />
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 20,
    backgroundColor: `rgba(${parseInt(Colors.orange.orangeStandard.slice(1, 3), 16)}, ${parseInt(Colors.orange.orangeStandard.slice(3, 5), 16)}, ${parseInt(Colors.orange.orangeStandard.slice(5, 7), 16)}, 0.25)`,
    paddingLeft: 24,
    paddingRight: 16,
    color: Colors.black,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
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
  buttonContainer: {
    width: '90%',
    marginTop: 20,
    alignItems: 'flex-end',
  },
  editFiltersTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    color: Colors.orange.orangeStandard,
    marginTop: 28,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  sectionTitle: {
    fontWeight: 'semibold',
    fontSize: 16,
    color: Colors.orange.orangeStandard,
    marginBottom: 8,
    marginLeft: 4,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
});