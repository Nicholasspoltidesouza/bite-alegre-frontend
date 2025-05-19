import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native"; 
import { OperatingHoursDto } from "../../@types/OperatingHoursDto";
import Dropdown from "../Dropdown"; 

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

// Componente principal
const HoursSection: React.FC<Props> = ({ hours, onUpdateHours }) => {
  const [operatingHours, setOperatingHours] =
    useState<OperatingHoursDto[]>(hours);
  const [newHour, setNewHour] = useState<OperatingHoursDto>({
    day: "",
    periods: [{ startTime: "", endTime: "" }],
  });
  const [editingDayOriginalPeriods, setEditingDayOriginalPeriods] = useState<OperatingHoursDto['periods'] | null>(null);

  // Adiciona um novo slot de período ao newHour
  const handleAddPeriodToNewHour = () => {
    setNewHour(prev => ({ ...prev, periods: [...prev.periods, { startTime: "", endTime: "" }] }));
  };
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
    setEditingDayOriginalPeriods(null);
  };

  // Remove um slot de período do newHour
  const handleRemovePeriodFromNewHour = (index: number) => {
    setNewHour(prev => ({
      ...prev,
      periods: prev.periods.filter((_, i) => i !== index),
    }));
  };

  // Atualiza um campo (startTime ou endTime) de um período específico no newHour
  const handleUpdatePeriodInNewHour = (index: number, field: 'startTime' | 'endTime', value: string) => {
    setNewHour(prev => {
      const updatedPeriods = prev.periods.map((p, i) => 
        i === index ? { ...p, [field]: value } : p
      );
      return { ...prev, periods: updatedPeriods };
    });
  };

  const timeToMinutes = (time: string): number => {
    if (time === "Fechado" || !time || !time.includes(":")) return -1; // -1 para "Fechado" ou formato inválido
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const handleSaveNewHour = () => {
    if (!newHour.day) {
      Alert.alert("Erro", "Selecione um dia da semana");
      return;
    }

    const isExplicitlyClosed = newHour.periods.some(p => p.startTime === "Fechado" && p.endTime === "Fechado");
    let processedPeriods: OperatingHoursDto['periods'] = [];

    if (isExplicitlyClosed) {
      if (newHour.periods.length > 1) {
        Alert.alert("Erro", "Se um período é 'Fechado', não pode haver outros períodos para este dia.");
        return;
      }
      processedPeriods = [{ startTime: "Fechado", endTime: "Fechado" }];
    } else {
      processedPeriods = newHour.periods.filter(p => {
        const s = p.startTime;
        const e = p.endTime;
        if (s === "Fechado" || e === "Fechado") return false; // Um "Fechado" sozinho não é válido aqui
        if (!s || !e) return false; // Ambos devem estar preenchidos
        return true;
      });

      if (processedPeriods.length === 0) {
        Alert.alert("Erro", "Preencha pelo menos um período de funcionamento ou marque como 'Fechado'.");
        return;
      }

      for (const period of processedPeriods) {
        const startMinutes = timeToMinutes(period.startTime);
        const endMinutes = timeToMinutes(period.endTime);

        if (startMinutes === -1 || endMinutes === -1) {
            Alert.alert("Erro", `Horário inválido no período: ${period.startTime} - ${period.endTime}.`);
            return;
        }
        if (endMinutes <= startMinutes) {
          Alert.alert("Erro", `O horário de fechamento (${period.endTime}) deve ser depois do horário de abertura (${period.startTime})`);
          return;
        }
      }

      // Remover duplicatas exatas
      const uniquePeriods: OperatingHoursDto['periods'] = [];
      processedPeriods.forEach(p => {
          if (!uniquePeriods.some(up => up.startTime === p.startTime && up.endTime === p.endTime)) {
              uniquePeriods.push(p);
          }
      });
      processedPeriods = uniquePeriods;

      // Ordenar por startTime
      processedPeriods.sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

      // Verificar sobreposições
      for (let i = 0; i < processedPeriods.length - 1; i++) {
          const p1 = processedPeriods[i];
          const p2 = processedPeriods[i+1];
          const p1End = timeToMinutes(p1.endTime);
          const p2Start = timeToMinutes(p2.startTime);

          if (p1End > p2Start) {
              Alert.alert(
                  "Erro de Sobreposição",
                  `Os períodos "${p1.startTime} - ${p1.endTime}" e "${p2.startTime} - ${p2.endTime}" se sobrepõem.`
              );
              return;
          }
      }
    }

    if (processedPeriods.length === 0) {
        // Se era pra ser fechado, mas algo deu errado e finalPeriods ficou vazio
        if (isExplicitlyClosed) {
            processedPeriods = [{ startTime: "Fechado", endTime: "Fechado" }];
        } else {
            Alert.alert("Erro", "Nenhum período de funcionamento válido foi definido.");
            return;
        }
    }

    const hourToSave = {
      day: newHour.day,
      periods: processedPeriods,
    };

    const existingDayIndex = operatingHours.findIndex(
      (hour) => hour.day === newHour.day
    );

    let updatedHours;
    if (existingDayIndex >= 0) {
      updatedHours = [...operatingHours];
      updatedHours[existingDayIndex] = hourToSave;
    } else {
      updatedHours = [...operatingHours, hourToSave];
    }

    // Ordenar a lista principal de operatingHours por dia
    const dayOrder = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo", "Feriados"];
    updatedHours.sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));

    setOperatingHours(updatedHours);
    onUpdateHours(updatedHours);
    setIsAddingNew(false);
  };

  const handleCancelNewHour = () => {
    setIsAddingNew(false);
    setEditingDayOriginalPeriods(null);
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
                label="Dia" // Prop 'label' é obrigatória no Dropdown components
                options={dayOptions}
                selected={newHour.day || null}
                onSelect={(selectedDay: string) => {
                  const existingDayConfig = operatingHours.find(h => h.day === selectedDay);
                  let periodsToLoad: OperatingHoursDto['periods'] = [{ startTime: "", endTime: "" }];
                  
                  if (existingDayConfig && existingDayConfig.periods.length > 0) {
                      // Deep copy periods
                      periodsToLoad = JSON.parse(JSON.stringify(existingDayConfig.periods));
                      setEditingDayOriginalPeriods(JSON.parse(JSON.stringify(existingDayConfig.periods)));
                  } else {
                    setEditingDayOriginalPeriods(null);
                  }

                  setNewHour({
                    day: selectedDay,
                    periods: periodsToLoad,
                  });
                }}
                placeholder="Selecione o dia"
                paddingLeft={24}
                width="100%"
              />
            </View>
          </View>

          {newHour.day && newHour.periods.map((period, index) => (
            <View key={index} style={styles.periodEntryRow}>
              <View style={styles.dropdownRowFlex}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text style={styles.dropdownLabel}>Abertura {index + 1}:</Text>
                  <Dropdown
                    label={`Abertura ${index + 1}`}
                    options={timeOptions}
                    selected={period.startTime || null}
                    onSelect={(value) => handleUpdatePeriodInNewHour(index, 'startTime', value)}
                    placeholder="Selecione"
                    paddingLeft={24}
                    width="100%"
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={styles.dropdownLabel}>Fechamento {index + 1}:</Text>
                  <Dropdown
                    label={`Fechamento ${index + 1}`}
                    options={timeOptions}
                    selected={period.endTime || null}
                    onSelect={(value) => handleUpdatePeriodInNewHour(index, 'endTime', value)}
                    placeholder="Selecione"
                    paddingLeft={24}
                    width="100%"
                  />
                </View>
              </View>
              {newHour.periods.length > 1 && (
                <TouchableOpacity
                  onPress={() => handleRemovePeriodFromNewHour(index)}
                  style={styles.removePeriodButtonInternal}
                >
                  <MaterialIcons name="remove-circle-outline" size={22} color="#FF5252" />
                </TouchableOpacity>
              )}
            </View>
          ))}

          {newHour.day && (
            <TouchableOpacity onPress={handleAddPeriodToNewHour} style={styles.addPeriodButton}>
              <MaterialIcons name="add-circle-outline" size={22} color="#FF914B" />
              <Text style={styles.addPeriodButtonText}>Adicionar outro período</Text>
            </TouchableOpacity>
          )}

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
    fontFamily: "Poppins-Regular",
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
    fontFamily: "Poppins-Regular",
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
    fontFamily: "Poppins-Regular",
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
  dropdownRowFlex: {
    flexDirection: "row",
    flex: 1, 
  },
  dropdownLabel: {
    color: "#5B5B5B",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    marginBottom: 4,
  },
  periodSectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
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
    fontFamily: "Poppins-Regular",
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
    fontFamily: "Poppins-Regular",
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
    fontSize: 14,
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
    fontFamily: "Poppins-Regular",
  },
  periodEntryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  removePeriodButtonInternal: {
    marginLeft: 8,
    padding: 4, 
  },
  addPeriodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF914B',
    backgroundColor: 'rgba(255, 179, 112, 0.1)',
    marginTop: 8,
  },
  addPeriodButtonText: {
    marginLeft: 12,
    color: '#FF914B',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
});

export default HoursSection;
