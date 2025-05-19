import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Modal,
} from "react-native";
import { OperatingHoursDto } from "../../@types/OperatingHoursDto";
import "../Dropdown";

interface Props {
  hours: OperatingHoursDto[];
  onUpdateHours: (hours: OperatingHoursDto[]) => void;
}

// Opções para os dropdowns
const dayOptions = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
  "Feriados",
];

const timeOptions = [
  "Fechado",
  ...Array.from({ length: 48 }, (_, i) => {
    const hours = String(Math.floor(i / 2)).padStart(2, "0");
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hours}:${minutes}`;
  }),
];

// Componente para o dropdown
interface DropdownProps {
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  width?: number | string;
}

// Componente de dropdown com modal para garantir que as opções apareçam sobre outros elementos
const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  onSelect,
  placeholder,
  disabled = false,
  width = "100%",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownLayout, setDropdownLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const dropdownRef = React.useRef<View>(null);

  const toggleDropdown = () => {
    if (!disabled) {
      if (!isOpen) {
        // Capturar a posição do dropdown antes de abrir
        dropdownRef.current?.measure((_, __, width, height, pageX, pageY) => {
          setDropdownLayout({
            x: pageX,
            y: pageY + height,
            width: width,
            height: height,
          });
          setIsOpen(true);
        });
      } else {
        setIsOpen(false);
      }
    }
  };

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  // Componente de modal para as opções do dropdown
  const renderDropdownOptions = () => {
    return (
      <Modal
        visible={isOpen}
        transparent={true}
        animationType="none"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={dropdownStyles.overlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View
            style={[
              dropdownStyles.dropdown,
              {
                position: "absolute",
                top: dropdownLayout.y,
                left: dropdownLayout.x,
                width: dropdownLayout.width,
              },
            ]}
          >
            <FlatList
              data={options}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    dropdownStyles.option,
                    selectedValue === item && dropdownStyles.optionSelected,
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <Text
                    style={[
                      dropdownStyles.optionText,
                      selectedValue === item &&
                        dropdownStyles.optionTextSelected,
                    ]}
                    numberOfLines={1}
                  >
                    {item}
                  </Text>
                  {selectedValue === item && (
                    <MaterialIcons name="check" size={18} color="#FF914B" />
                  )}
                </TouchableOpacity>
              )}
              style={dropdownStyles.optionsList}
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 4 }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <>
      <View
        ref={dropdownRef}
        style={[dropdownStyles.container, { width: width as any }]}
        collapsable={false}
      >
        <TouchableOpacity
          style={[
            dropdownStyles.button,
            disabled && dropdownStyles.buttonDisabled,
          ]}
          onPress={toggleDropdown}
          activeOpacity={disabled ? 1 : 0.7}
        >
          <Text
            style={[
              dropdownStyles.buttonText,
              !selectedValue && { color: "#FF914B", opacity: 0.8 },
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {selectedValue || placeholder}
          </Text>
          <MaterialIcons
            name={isOpen ? "arrow-drop-up" : "arrow-drop-down"}
            size={24}
            color={disabled ? "#CCCCCC" : "#FF914B"}
          />
        </TouchableOpacity>
      </View>

      {/* Renderizar as opções do dropdown em um modal para garantir que fiquem acima de tudo */}
      {renderDropdownOptions()}
    </>
  );
};

// Componente principal
const HoursSection: React.FC<Props> = ({ hours, onUpdateHours }) => {
  const [operatingHours, setOperatingHours] =
    useState<OperatingHoursDto[]>(hours);
  const [newHour, setNewHour] = useState<OperatingHoursDto>({
    day: "",
    periods: [{ startTime: "", endTime: "" }],
  });
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    // Atualiza o componente quando as horas mudam externamente
    setOperatingHours(hours);
  }, [hours]);

  const handleAddNewHour = () => {
    setIsAddingNew(true);
    setNewHour({
      day: "",
      periods: [{ startTime: "", endTime: "" }],
    });
  };

  const handleSaveNewHour = () => {
    // Validações
    if (!newHour.day) {
      Alert.alert("Erro", "Selecione um dia da semana");
      return;
    }

    // Verificar se já existe um horário para este dia
    const existingDayIndex = operatingHours.findIndex(
      (hour) => hour.day === newHour.day
    );

    // Filtrar períodos vazios
    const validPeriods = newHour.periods.filter(
      (period) =>
        period.startTime &&
        period.endTime &&
        period.startTime !== "Fechado" &&
        period.endTime !== "Fechado"
    );

    // Verificar se pelo menos um período foi preenchido
    if (validPeriods.length === 0) {
      Alert.alert("Erro", "Preencha pelo menos um período de funcionamento");
      return;
    }

    // Validar cada período
    for (const period of validPeriods) {
      // Validar que o horário de fechamento é depois do de abertura
      const startHour = parseInt(period.startTime.split(":")[0]);
      const startMinutes = parseInt(period.startTime.split(":")[1] || "0");
      const endHour = parseInt(period.endTime.split(":")[0]);
      const endMinutes = parseInt(period.endTime.split(":")[1] || "0");

      const startTimeInMinutes = startHour * 60 + startMinutes;
      const endTimeInMinutes = endHour * 60 + endMinutes;

      if (endTimeInMinutes <= startTimeInMinutes) {
        Alert.alert(
          "Erro",
          "O horário de fechamento deve ser depois do horário de abertura"
        );
        return;
      }
    }

    // Criar o objeto de horário com apenas os períodos válidos
    const hourToSave = {
      day: newHour.day,
      periods: validPeriods,
    };

    // Atualizar ou adicionar o horário
    let updatedHours;
    if (existingDayIndex >= 0) {
      // Substituir o dia existente
      updatedHours = [...operatingHours];
      updatedHours[existingDayIndex] = hourToSave;
    } else {
      // Adicionar um novo dia
      updatedHours = [...operatingHours, hourToSave];
    }

    setOperatingHours(updatedHours);
    onUpdateHours(updatedHours);
    setIsAddingNew(false);
  };

  const handleCancelNewHour = () => {
    setIsAddingNew(false);
  };

  const handleRemoveHour = (dayIndex: number, periodIndex?: number) => {
    // Se periodIndex for fornecido, remover apenas o período específico
    if (periodIndex !== undefined) {
      const updatedHours = [...operatingHours];
      const day = updatedHours[dayIndex];

      // Se for o último período, remover o dia inteiro
      if (day.periods.length === 1) {
        updatedHours.splice(dayIndex, 1);
      } else {
        // Remover apenas o período específico
        day.periods.splice(periodIndex, 1);
      }

      setOperatingHours(updatedHours);
      onUpdateHours(updatedHours);
    } else {
      // Remover o dia inteiro
      const updatedHours = [...operatingHours];
      updatedHours.splice(dayIndex, 1);
      setOperatingHours(updatedHours);
      onUpdateHours(updatedHours);
    }
  };

  // Função para formatar a exibição dos horários removida pois agora é feita diretamente no render

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Funcionamento</Text>
        <TouchableOpacity onPress={handleAddNewHour} style={styles.addButton}>
          <MaterialCommunityIcons name="plus" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {operatingHours.length > 0 && <View style={styles.listHeader}></View>}

      {operatingHours.length === 0 && !isAddingNew && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Nenhum horário cadastrado. Clique no + para adicionar.
          </Text>
        </View>
      )}

{isAddingNew && (
        <View style={styles.newHourContainer}>
          <View style={styles.dropdownRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.dropdownLabel}>Dia:</Text>
              <Dropdown
                options={dayOptions}
                selectedValue={newHour.day}
                onSelect={(value: string) => {
                  setNewHour({
                    ...newHour,
                    day: value,
                  });
                }}
                placeholder="Selecione"
                width="100%"
              />
            </View>
          </View>

          <Text style={styles.periodSectionTitle}></Text>
          <View style={styles.dropdownRow}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={styles.dropdownLabel}>Abertura:</Text>
              <Dropdown
                options={timeOptions}
                selectedValue={newHour.periods[0]?.startTime || ""}
                onSelect={(value: string) => {
                  const updatedPeriods = [...newHour.periods];
                  updatedPeriods[0] = {
                    ...updatedPeriods[0],
                    startTime: value,
                  };
                  setNewHour({
                    ...newHour,
                    periods: updatedPeriods,
                  });
                }}
                placeholder="Selecione"
                width="100%"
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.dropdownLabel}>Fechamento:</Text>
              <Dropdown
                options={timeOptions}
                selectedValue={newHour.periods[0]?.endTime || ""}
                onSelect={(value: string) => {
                  const updatedPeriods = [...newHour.periods];
                  updatedPeriods[0] = {
                    ...updatedPeriods[0],
                    endTime: value,
                  };
                  setNewHour({
                    ...newHour,
                    periods: updatedPeriods,
                  });
                }}
                placeholder="Selecione"
                width="100%"
              />
            </View>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={handleCancelNewHour}
            >
              <Text style={styles.actionButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.saveButton]}
              onPress={handleSaveNewHour}
            >
              <Text style={styles.actionButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      {operatingHours.length > 0 && (
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Dia</Text>
            <Text style={styles.tableHeaderText}>Horários</Text>
            <Text style={styles.tableHeaderText}></Text>
          </View>

          {operatingHours.map((day, dayIndex) => (
            <View key={dayIndex} style={styles.tableRow}>
              <View style={styles.dayCell}>
                <Text style={styles.dayText}>{day.day}</Text>
              </View>

              <View style={styles.periodsCell}>
                {day.periods.map((period, periodIndex) => (
                  <View key={periodIndex} style={styles.periodBadge}>
                    <Text style={styles.periodText}>
                      {period.startTime === "Fechado" ||
                      period.endTime === "Fechado"
                        ? "Fechado"
                        : `${period.startTime} – ${period.endTime}`}
                    </Text>
                    {day.periods.length > 1 && (
                      <TouchableOpacity
                        style={styles.removePeriodButton}
                        onPress={() => handleRemoveHour(dayIndex, periodIndex)}
                        activeOpacity={0.7}
                      >
                        <MaterialIcons
                          name="remove-circle"
                          size={16}
                          color="#FF5252"
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>

              <View style={styles.actionCell}>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveHour(dayIndex)}
                  activeOpacity={0.7}
                >
                  <MaterialIcons name="delete" size={20} color="#FF5252" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

// Estilos para o dropdown
const dropdownStyles = StyleSheet.create({
  container: {
    position: "relative",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 179, 112, 0.25)",
    borderRadius: 20,
    padding: 10,
    paddingLeft: 24,
    paddingRight: 16,
    height: 50,
  },
  buttonDisabled: {
    backgroundColor: "#EEEEEE",
    opacity: 0.7,
  },
  buttonText: {
    color: "#FF914B",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    zIndex: 9999,
    elevation: 9999,
  },
  dropdown: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    marginTop: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    maxHeight: 250,
    zIndex: 10000,
  },
  optionsList: {
    maxHeight: 250,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionSelected: {
    backgroundColor: "#FFE5D3",
  },
  optionText: {
    color: "#5B5B5B",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    flex: 1,
  },
  optionTextSelected: {
    color: "#FF914B",
    fontFamily: "Poppins-SemiBold",
  },
});

// Estilos para o componente principal
const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 179, 112, 0.25)",
    borderRadius: 20,
    padding: 10,
    width: "100%",
    height: "auto",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FF914B",
    padding: 12,
    borderRadius: 20,
    width: "100%",
    height: 50,
    marginBottom: 10,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    left: "5%",
  },
  addButton: {
    backgroundColor: "#FFA552",
    borderRadius: 999,
    padding: "1%",
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  listTitle: {
    color: "#FF9500",
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  day: {
    color: "#5B5B5B",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  time: {
    color: "#5B5B5B",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  removeButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  deleteIconContainer: {
    backgroundColor: "#FF5252",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  dayContainer: {
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    paddingBottom: 8,
    marginBottom: 8,
  },
  dayTitle: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#FF914B",
  },
  periodsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: 4,
  },
  periodItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 4,
    backgroundColor: "#F5F5F5",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  periodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  removePeriodButton: {
    padding: 5,
    marginLeft: 4,
  },
  flatListContainer: {
    paddingBottom: 10,
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#999999",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  newHourContainer: {
    backgroundColor: "rgba(255, 179, 112, 0.1)",
    borderRadius: 20,
    padding: 16,
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
  },
  dropdownRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  dropdownLabel: {
    color: "#5B5B5B",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    marginBottom: 4,
  },
  periodSectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#FF914B",
    marginTop: 15,
    marginBottom: 8,
  },
  // Estilos para a tabela
  tableContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    width: "100%",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    gap: 60,
  },
  tableHeaderText: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#5B5B5B",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    alignItems: "center",
  },
  dayCell: {
    flex: 2,
  },
  dayText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#5B5B5B",
  },
  periodsCell: {
    flex: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  periodBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  periodText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#5B5B5B",
  },
  actionCell: {
    flex: 1,
    alignItems: "flex-end",
  },
  emptyTableRow: {
    padding: 20,
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  actionButton: {
    borderRadius: 20,
    padding: 12,
    flex: 1,
    alignItems: "center",
    height: 50,
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#CCCCCC",
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: "#FF914B",
    marginLeft: 8,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
});

export default HoursSection;
