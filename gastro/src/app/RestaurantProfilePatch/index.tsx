import { RestaurantPatchDTO } from '@/src/@types/DTO';
import {
  LocalOperatingHour,
  OpeningPeriodDto,
} from '@/src/@types/OperatingHoursDto';
import Button from '@/src/components/Button';
import SignupHeader from '@/src/components/SignupHeader';
import CustomTextInput from '@/src/components/TextFieldCadastroUsuario';
import { useRestaurantApi } from '@/src/hooks/useRestaurantApi';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';
import { useLocalSearchParams } from 'expo-router/build/hooks';

const RestaurantProfilePatch = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { restaurantId } = useLocalSearchParams();
  const { patchRestaurant, getRestaurantById, getRestaurantWorkingHours } =
    useRestaurantApi();

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [averagePrice, setAveragePrice] = useState<string>('');
  const [profilePhoto, setProfilePhoto] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userType, setUserType] = useState<string>('Editar Restaurante');
  const [showOperatingHours, setShowOperatingHours] = useState<boolean>(true);

  const [showTimePickerModal, setShowTimePickerModal] = useState(false);
  const [selectedTimeType, setSelectedTimeType] = useState<
    'abertura' | 'fechamento'
  >('abertura');
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(-1);

  const availableTimes = [
    '-',
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
  ];

  const [operatingHours, setOperatingHours] = useState<LocalOperatingHour[]>(
    [],
  );

  const validateNameRestaurant = (text: string): string | null => {
    if (!text) return null;
    if (text.length < 2) return 'Nome deve ter no mínimo 2 caracteres';
    if (text.length > 50) return 'Nome deve ter no máximo 50 caracteres';
    return null;
  };

  const validateDescription = (text: string): string | null => {
    if (!text) return null;
    if (text.length > 200)
      return 'Descrição não pode ter mais de 200 caracteres';
    return null;
  };

  const validateAddress = (text: string): string | null => {
    if (!text) return null;
    if (text.length < 5) return 'Endereço deve ter no mínimo 5 caracteres';
    if (text.length > 100) return 'Endereço deve ter no máximo 100 caracteres';
    return null;
  };

  const validatePhone = (text: string): string | null => {
    if (!text) return null;
    const cleaned = text.replace(/\D/g, '');
    if (!/^\d{10,11}$/.test(cleaned)) return 'Formato de telefone inválido';
    return null;
  };

  const validateAveregePrice = (text: string): string | null => {
    if (!text) return null;
    const number = parseFloat(text.replace(',', '.'));
    if (isNaN(number)) return 'Preço deve ser um número válido';
    if (number <= 0) return 'Preço deve ser maior que zero';
    return null;
  };

  const isFormValid = true;

  const openTimePicker = (
    dayIndex: number,
    type: 'abertura' | 'fechamento',
  ) => {
    setSelectedDayIndex(dayIndex);
    setSelectedTimeType(type);
    setShowTimePickerModal(true);
  };

  const selectTime = (time: string) => {
    if (selectedDayIndex >= 0) {
      const updatedHours = [...operatingHours];
      if (selectedTimeType === 'abertura') {
        updatedHours[selectedDayIndex].openTime = time;
      } else {
        updatedHours[selectedDayIndex].closeTime = time;
      }
      setOperatingHours(updatedHours);
      setShowTimePickerModal(false);
    }
  };

  type OpeningPeriodPatch = {
    add: OpeningPeriodDto[];
    update: {
      periodId: string;
      weekday: string;
      opensAt: string;
      closesAt: string;
    }[];
    delete: string[];
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const patchData: RestaurantPatchDTO = {
        id: restaurantId as string,
      };

      if (name) patchData.name = name;
      if (description) patchData.description = description;
      if (address) patchData.address = address;
      if (averagePrice)
        patchData.averagePrice = parseFloat(averagePrice.replace(',', '.'));
      if (phone) patchData.phone = phone;
      const openingPeriodsPatch: OpeningPeriodPatch = {
        add: [],
        update: [],
        delete: [],
      };

      for (const hour of operatingHours) {
        const { openTime, closeTime, weekday, periodId } = hour;

        const hasValidTime = openTime !== '-' && closeTime !== '-';

        if (periodId) {
          if (hasValidTime) {
            openingPeriodsPatch.update.push({
              periodId,
              weekday,
              opensAt: openTime,
              closesAt: closeTime,
            });
          } else {
            openingPeriodsPatch.delete.push(periodId);
          }
        } else {
          if (hasValidTime) {
            openingPeriodsPatch.add.push({
              weekday,
              opensAt: openTime,
              closesAt: closeTime,
            });
          }
        }
      }

      if (
        openingPeriodsPatch.add.length ||
        openingPeriodsPatch.update.length ||
        openingPeriodsPatch.delete.length
      ) {
        patchData.openingPeriods = openingPeriodsPatch;
      }

      const result = await patchRestaurant(patchData);

      if (result) {
        Alert.alert(
          'Sucesso',
          'Dados do restaurante atualizados com sucesso!',
          [{ text: 'OK', onPress: () => router.push({
                  pathname: '/restaurantProfile',
                  params: {
                    restaurantId: restaurantId,
                  },
                }) 
              }],
        );
      }
    } catch (err) {
      console.error('Submit Error:', err);
      Alert.alert(
        'Erro',
        err instanceof Error
          ? err.message
          : 'Ocorreu um erro ao atualizar os dados',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        if (!restaurantId) return;

        const res = await getRestaurantById(restaurantId as string);
        if (res) {
          setProfilePhoto(res.profilePhoto ?? '');
          setName(res.name?.replace(/(^"|"$)/g, '') ?? '');
          setDescription(res.description ?? '');
          setAddress(res.address ?? '');
          setPhone(res.phone ?? '');
          setAveragePrice(res.averagePrice?.toString() ?? '');

          const resOpenHours = await getRestaurantWorkingHours(res.id ?? '');

          const defaultDays = [
            { day: 'Segunda-feira', weekday: 'MON' },
            { day: 'Terça-feira', weekday: 'TUE' },
            { day: 'Quarta-feira', weekday: 'WED' },
            { day: 'Quinta-feira', weekday: 'THU' },
            { day: 'Sexta-feira', weekday: 'FRI' },
            { day: 'Sábado', weekday: 'SAT' },
            { day: 'Domingo', weekday: 'SUN' },
            { day: 'Feriados', weekday: 'HOL' },
          ];

          const updatedHours = defaultDays.map((dayItem) => {
            const period = resOpenHours?.find(
              (p: any) => p.weekday === dayItem.weekday,
            );
            return {
              ...dayItem,
              openTime: period?.opensAt ?? '-',
              closeTime: period?.closesAt ?? '-',
              periodId: period?.id ?? '',
            };
          });

          setOperatingHours(updatedHours);
        }
      } catch (error) {
        console.error('Erro ao buscar restaurante:', error);
        Alert.alert(
          'Erro',
          'Não foi possível carregar os dados do restaurante.',
        );
      }
    };

    fetchRestaurantData();
  }, [restaurantId]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <SafeAreaView
        style={[
          styles.safeArea,
          { paddingTop: 0 },
          Platform.OS === 'ios' && { marginTop: -insets.top },
        ]}
      >
        <SignupHeader
          userType={userType}
          setUserType={setUserType}
          profileIcon={'store'}
          urlProfilePhoto={profilePhoto}
          onBack={() => router.back()}
        />

        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.inputWrapper}>
            <CustomTextInput
              value={name}
              onChangeText={setName}
              placeholder="Nome Restaurante"
              style={styles.input}
              validation={validateNameRestaurant}
            />
          </View>

          <View style={styles.inputWrapper}>
            <CustomTextInput
              value={address}
              onChangeText={setAddress}
              placeholder="Endereço"
              style={styles.input}
              validation={validateAddress}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <CustomTextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Descrição"
              style={styles.input}
              validation={validateDescription}
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

          <View style={styles.inputWrapper}>
            <CustomTextInput
              value={averagePrice}
              onChangeText={setAveragePrice}
              placeholder="Preço médio"
              style={styles.input}
              validation={validateAveregePrice}
              keyboardType="number-pad"
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              router.push({
                pathname: '/AddMenu',
                params: {
                  restaurantId: restaurantId,
                },
              })
            }
          >
            <Text style={styles.actionButtonText}>Alterar Cardápio</Text>
            <MaterialIcons
              name="add-circle-outline"
              size={24}
              color={Colors.white}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setShowOperatingHours(!showOperatingHours)}
          >
            <Text style={styles.actionButtonText}>Funcionamento</Text>
            <MaterialIcons
              name={
                showOperatingHours ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
              }
              size={24}
              color={Colors.white}
            />
          </TouchableOpacity>
          {showOperatingHours && (
            <View style={styles.hoursContainer}>
              <View style={styles.hoursTableContainer}>
                <View style={styles.hoursHeader}>
                  <Text style={styles.hoursHeaderText}>Dia da semana</Text>
                  <Text style={styles.hoursHeaderText}>Abertura</Text>
                  <Text style={styles.hoursHeaderText}>Fechamento</Text>
                </View>

                <View style={styles.hoursDivider} />

                {operatingHours.map((hour, index) => (
                  <React.Fragment key={index}>
                    <View style={styles.hourRow}>
                      <View style={styles.dayColumn}>
                        <Text
                          style={[
                            styles.dayText,
                            index === 6 && styles.weekendText,
                          ]}
                        >
                          {hour.day}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.timeColumn}
                        onPress={() => openTimePicker(index, 'abertura')}
                      >
                        <Text style={styles.timeText}>{hour.openTime}</Text>
                        <MaterialIcons
                          name="keyboard-arrow-down"
                          size={16}
                          color={Colors.orange.orangeStandard}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.timeColumn}
                        onPress={() => openTimePicker(index, 'fechamento')}
                      >
                        <Text style={styles.timeText}>{hour.closeTime}</Text>
                        <MaterialIcons
                          name="keyboard-arrow-down"
                          size={16}
                          color={Colors.orange.orangeStandard}
                        />
                      </TouchableOpacity>
                    </View>

                    {index < operatingHours.length - 1 && (
                      <View style={styles.hourRowDivider} />
                    )}
                  </React.Fragment>
                ))}
              </View>
            </View>
          )}

          <Modal
            visible={showTimePickerModal}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowTimePickerModal(false)}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => setShowTimePickerModal(false)}
            >
              <View
                style={styles.modalContent}
                onStartShouldSetResponder={() => true}
              >
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    Selecione o horário de{' '}
                    {selectedTimeType === 'abertura'
                      ? 'abertura'
                      : 'fechamento'}
                  </Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setShowTimePickerModal(false)}
                  >
                    <MaterialIcons
                      name="close"
                      size={24}
                      color={Colors.orange.orangeStandard}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.modalDivider} />

                <FlatList
                  data={availableTimes}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => {
                    const isSelected =
                      selectedDayIndex >= 0 &&
                      ((selectedTimeType === 'abertura' &&
                        operatingHours[selectedDayIndex].openTime === item) ||
                        (selectedTimeType === 'fechamento' &&
                          operatingHours[selectedDayIndex].closeTime === item));

                    return (
                      <TouchableOpacity
                        style={[
                          styles.timeItem,
                          isSelected && styles.selectedTimeItem,
                        ]}
                        onPress={() => selectTime(item)}
                      >
                        <Text
                          style={[
                            styles.timeItemText,
                            isSelected && styles.selectedTimeItemText,
                          ]}
                        >
                          {item}
                        </Text>{' '}
                        {isSelected && (
                          <MaterialIcons
                            name="check"
                            size={20}
                            color={Colors.white}
                          />
                        )}
                      </TouchableOpacity>
                    );
                  }}
                  showsVerticalScrollIndicator={true}
                  style={styles.timeList}
                  initialNumToRender={10}
                />
              </View>
            </TouchableOpacity>
          </Modal>

          <View style={styles.buttonContainer}>
            <Button
              title="Salvar"
              type="orange"
              onPress={handleSubmit}
              disabled={!isFormValid}
            />

            <TouchableOpacity
              style={styles.categoriesLink}
              onPress={() => {
                const restaurantData = {
                  id: restaurantId as string,
                  name,
                  description,
                  address,
                  phone,
                  averagePrice: averagePrice
                    ? parseFloat(averagePrice.replace(',', '.'))
                    : undefined,
                  profilePhoto,
                  openingPeriods: operatingHours
                    .filter(
                      (hour) => hour.openTime !== '-' && hour.closeTime !== '-',
                    )
                    .map((hour) => ({
                      weekday: hour.weekday,
                      opensAt: hour.openTime,
                      closesAt: hour.closeTime,
                    })),
                };
                router.push({
                  pathname: '/SignupInterestsScreen',
                  params: {
                    screenTitle: 'Selecione as categorias do seu restaurante',
                    restaurantId: restaurantId,
                  },
                });
              }}
            >
              <Text style={styles.categoriesLinkText}>Categorias</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color={Colors.orange.orangeStandard}
              />
            </TouchableOpacity>
          </View>
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
    backgroundColor: `rgba(${parseInt(Colors.orange.orangeStandard.slice(1, 3), 16)}, ${parseInt(Colors.orange.orangeStandard.slice(3, 5), 16)}, ${parseInt(Colors.orange.orangeStandard.slice(5, 7), 16)}, 0.25)`,
    paddingLeft: 24,
    paddingRight: 16,
    color: Colors.black,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: '2%',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    width: '90%',
    height: 50,
    borderRadius: 20,
    backgroundColor: Colors.orange.orangeStandard,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: '5%',
  },
  actionButtonText: {
    color: Colors.white,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  hoursContainer: {
    width: '90%',
    marginBottom: '5%',
  },
  hoursTableContainer: {
    backgroundColor: `rgba(${parseInt(Colors.orange.orangeStandard.slice(1, 3), 16)}, ${parseInt(Colors.orange.orangeStandard.slice(3, 5), 16)}, ${parseInt(Colors.orange.orangeStandard.slice(5, 7), 16)}, 0.15)`,
    padding: 10,
    borderRadius: 10,
  },
  hoursHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  hoursHeaderText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: Colors.orange.orangeStandard,
    opacity: 0.8,
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 3,
  },
  dayColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '35%',
  },
  timeColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
    justifyContent: 'flex-end',
  },
  dayText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.orange.orangeStandard,
    marginRight: 5,
  },
  timeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.orange.orangeStandard,
    marginRight: 5,
  },
  hoursDivider: {
    height: 1,
    backgroundColor: `rgba(${parseInt(Colors.orange.orangeStandard.slice(1, 3), 16)}, ${parseInt(Colors.orange.orangeStandard.slice(3, 5), 16)}, ${parseInt(Colors.orange.orangeStandard.slice(5, 7), 16)}, 0.3)`,
    marginVertical: 8,
  },
  hourRowDivider: {
    height: 1,
    backgroundColor: `rgba(${parseInt(Colors.orange.orangeStandard.slice(1, 3), 16)}, ${parseInt(Colors.orange.orangeStandard.slice(3, 5), 16)}, ${parseInt(Colors.orange.orangeStandard.slice(5, 7), 16)}, 0.15)`,
    marginVertical: 4,
  },
  weekendText: {
    fontWeight: '600',
  },
  timeSelector: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  categoriesLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesLinkText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.orange.orangeStandard,
    marginRight: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '60%',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: `rgba(${parseInt(Colors.orange.orangeStandard.slice(1, 3), 16)}, ${parseInt(Colors.orange.orangeStandard.slice(3, 5), 16)}, ${parseInt(Colors.orange.orangeStandard.slice(5, 7), 16)}, 0.2)`,
    paddingBottom: 15,
  },
  modalTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: Colors.orange.orangeStandard,
  },
  timeList: {
    maxHeight: Dimensions.get('window').height * 0.5,
  },
  timeItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: `rgba(${parseInt(Colors.orange.orangeStandard.slice(1, 3), 16)}, ${parseInt(Colors.orange.orangeStandard.slice(3, 5), 16)}, ${parseInt(Colors.orange.orangeStandard.slice(5, 7), 16)}, 0.15)`,
    alignItems: 'center',
  },
  timeItemText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.orange.orangeStandard,
    textAlign: 'center',
  },
  selectedTimeItem: {
    backgroundColor: Colors.orange.orangeStandard,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTimeItemText: {
    color: Colors.white,
    fontFamily: 'Poppins-Medium',
    marginRight: 5,
  },
  closeButton: {
    padding: 5,
  },
  modalDivider: {
    height: 1,
    backgroundColor: `rgba(${parseInt(Colors.orange.orangeStandard.slice(1, 3), 16)}, ${parseInt(Colors.orange.orangeStandard.slice(3, 5), 16)}, ${parseInt(Colors.orange.orangeStandard.slice(5, 7), 16)}, 0.2)`,
    marginBottom: 10,
  },
});

export default RestaurantProfilePatch;
