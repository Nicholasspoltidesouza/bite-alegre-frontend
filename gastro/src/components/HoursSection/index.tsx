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
import Colors from '@/src/constants/Colors';
import { OperatingHoursDto } from "../../@types/OperatingHoursDto";
import {
  mapToWeekday,
  mapFromWeekday,
  Weekday,
} from "../../utils/weekdayUtils"; 
import "../Dropdown"; 

interface DisplayPeriod {
  startTime: string;
  endTime: string;
}
interface DisplayHourGroup {
  day: string; 
  periods: DisplayPeriod[];
}

interface Props {
  hours: OperatingHoursDto[];
  onUpdateHours: (hours: OperatingHoursDto[]) => void;
}

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

interface DropdownProps {
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  width?: number | string;
}

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
                    <MaterialIcons name="check" size={18} color={Colors.orange.orangeStandard} />
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
              !selectedValue && { color: Colors.orange.orangeStandard, opacity: 0.8 },
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {selectedValue || placeholder}
          </Text>
          <MaterialIcons
            name={isOpen ? "arrow-drop-up" : "arrow-drop-down"}
            size={24}
            color={disabled ? Colors.gray.grayDisabled : Colors.orange.orangeStandard}
          />
        </TouchableOpacity>
      </View>
      {renderDropdownOptions()}
    </>
  );
};

const HoursSection: React.FC<Props> = ({ hours: operatingHoursProp, onUpdateHours }) => {
  const [displayedHours, setDisplayedHours] = useState<DisplayHourGroup[]>([]);
  const [newHourEntry, setNewHourEntry] = useState<{
    day: string;
    startTime: string;
    endTime: string;
  }>({
    day: '',
    startTime: '',
    endTime: '',
  });
  const [isAddingNew, setIsAddingNew] = useState(false);

  const convertToActualDtoFormat = (
    groups: DisplayHourGroup[] 
  ): OperatingHoursDto[] => { 
    const actualDtos: OperatingHoursDto[] = [];
    groups.forEach(group => {
      const weekday = mapToWeekday(group.day);
      group.periods.forEach(period => {
        if (period.startTime && period.endTime && period.startTime !== "Fechado" && period.endTime !== "Fechado") {
          if (weekday) {
            actualDtos.push({
              weekday: weekday,
              opensAt: period.startTime,
              closesAt: period.endTime,
            });
          }
        }
      });
    });
    return actualDtos;
  };

  useEffect(() => {
    const convertToDisplayFormat = (
      actualDtos: OperatingHoursDto[] 
    ): DisplayHourGroup[] => {
      const grouped: { [key: string]: DisplayHourGroup } = {};
      actualDtos.forEach(dto => {
        const dayName = mapFromWeekday(dto.weekday); 
          if (!grouped[dayName]) {
            grouped[dayName] = { day: dayName, periods: [] };
          }
          grouped[dayName].periods.push({
            startTime: dto.opensAt,
            endTime: dto.closesAt,
          });
      });

      Object.values(grouped).forEach(group => {
        group.periods.sort((a, b) => {
          const timeToMinutes = (timeStr: string) => {
            if (timeStr === "Fechado") return Infinity; 
            const [h, m] = timeStr.split(':').map(Number);
            return h * 60 + m;
          };
          return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
        });
      });

      const dayOrderMap = dayOptions.reduce((acc, day, index) => {
        acc[day] = index;
        return acc;
      }, {} as Record<string, number>);

      return Object.values(grouped).sort((a, b) => {
        const orderA = dayOrderMap[a.day] ?? Infinity;
        const orderB = dayOrderMap[b.day] ?? Infinity;
        return orderA - orderB;
      });
    };

    const initialDisplayHoursFromProps = convertToDisplayFormat(operatingHoursProp);

    const allDisplayDays: DisplayHourGroup[] = dayOptions
      .map(dayString => {
        const existingDay = initialDisplayHoursFromProps.find(dh => dh.day === dayString);
        if (existingDay) {
          return existingDay;
        }
        if (dayString !== "Feriados") { 
          return { day: dayString, periods: [{ startTime: "Fechado", endTime: "Fechado" }] };
        }
        return null; 
      })
      .filter(Boolean) as DisplayHourGroup[]; 

    const dayOrderMap = dayOptions.reduce((acc, day, index) => {
        acc[day] = index;
        return acc;
      }, {} as Record<string, number>);

    allDisplayDays.sort((a, b) => {
        const orderA = dayOrderMap[a.day] ?? Infinity;
        const orderB = dayOrderMap[b.day] ?? Infinity;
        return orderA - orderB;
    });

    setDisplayedHours(allDisplayDays);
  }, [operatingHoursProp]);

  const handleAddNewHour = () => {
    setIsAddingNew(true);
    setNewHourEntry({
      day: '',
      startTime: '',
      endTime: '',
    });
  };

  const handleSaveNewHour = () => {
    const { day: selectedDay, startTime, endTime } = newHourEntry;

    if (!selectedDay) {
      Alert.alert("Erro", "Selecione um dia da semana");
      return;
    }

    if (selectedDay === "Feriados" && (startTime !== "Fechado" || endTime !== "Fechado")) {
      Alert.alert("Aviso", "Horários para 'Feriados' não podem ser salvos como horários regulares. Selecione um dia da semana válido ou marque como 'Fechado'.");
      return;
    }

    const isClosingTime = startTime === 'Fechado' || endTime === 'Fechado';

    if (!isClosingTime && (!startTime || !endTime)) {
      Alert.alert('Erro', 'Preencha os horários de abertura e fechamento, ou marque como "Fechado".');
      return;
    }

    if (!isClosingTime) {
      const startHour = parseInt(startTime.split(':')[0]);
      const startMinutes = parseInt(startTime.split(':')[1] || '0');
      const endHour = parseInt(endTime.split(':')[0]);
      const endMinutes = parseInt(endTime.split(':')[1] || '0');

      const startTimeInMinutes = startHour * 60 + startMinutes;
      const endTimeInMinutes = endHour * 60 + endMinutes;

      if (endTimeInMinutes <= startTimeInMinutes) {
        Alert.alert(
          "Erro",
          "O horário de fechamento deve ser depois do horário de abertura."
        );
        return;
      }
    }

    let updatedDisplayHours = [...displayedHours];
    const existingDayIndex = updatedDisplayHours.findIndex(
      (group) => group.day === selectedDay
    );

    if (existingDayIndex >= 0) {
      const dayGroup = updatedDisplayHours[existingDayIndex];
      if (isClosingTime) {
        dayGroup.periods = [{ startTime: 'Fechado', endTime: 'Fechado' }]; 
      } else {
        dayGroup.periods = dayGroup.periods.filter(p => p.startTime !== "Fechado");
        
        const isDuplicate = dayGroup.periods.some(
          (p) => p.startTime === startTime && 
                  p.endTime === endTime &&
                  p.startTime !== "Fechado" 
        );
        if (!isDuplicate) {
          dayGroup.periods.push({ startTime, endTime });
          dayGroup.periods.sort((a, b) => {
             const timeToMinutes = (timeStr: string) => {
              if (timeStr === "Fechado") return Infinity;
              const [h, m] = timeStr.split(':').map(Number);
              return h * 60 + m;
            };
            return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
          });
        } else {
          Alert.alert("Aviso", "Este período de horário já existe para o dia selecionado.");
          return; 
        }
      }
    } else {
      updatedDisplayHours.push({
        day: selectedDay,
        periods: isClosingTime ? [{ startTime: 'Fechado', endTime: 'Fechado' }] : [{ startTime, endTime }],
      });
    }

    const dayOrderMap = dayOptions.reduce((acc, day, index) => {
      acc[day] = index;
      return acc;
    }, {} as Record<string, number>);
    updatedDisplayHours.sort((a, b) => {
        const orderA = dayOrderMap[a.day] ?? Infinity;
        const orderB = dayOrderMap[b.day] ?? Infinity;
        return orderA - orderB;
    });

    setDisplayedHours(updatedDisplayHours);
    onUpdateHours(convertToActualDtoFormat(updatedDisplayHours));
    setIsAddingNew(false);
    setNewHourEntry({ day: '', startTime: '', endTime: '' }); 
  };

  const handleCancelNewHour = () => {
    setNewHourEntry({ day: '', startTime: '', endTime: '' }); 
    setIsAddingNew(false);
  };

  const handleRemoveHour = (dayNameToRemove: string, periodIndex?: number) => {
    let updatedDisplayHours = [...displayedHours];
    const dayGroupIndex = updatedDisplayHours.findIndex(dg => dg.day === dayNameToRemove);

    if (dayGroupIndex === -1) return;

    if (periodIndex !== undefined) {
      const dayGroup = updatedDisplayHours[dayGroupIndex];
      dayGroup.periods.splice(periodIndex, 1);
      
      const remainingActualPeriods = dayGroup.periods.filter(p => p.startTime !== "Fechado");
      if (remainingActualPeriods.length === 0) {
        dayGroup.periods = [{ startTime: "Fechado", endTime: "Fechado" }];
      }
    } else {
      updatedDisplayHours[dayGroupIndex].periods = [{ startTime: "Fechado", endTime: "Fechado" }];
    }
    setDisplayedHours(updatedDisplayHours);
    onUpdateHours(convertToActualDtoFormat(updatedDisplayHours));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Funcionamento</Text>
        <TouchableOpacity onPress={handleAddNewHour} style={styles.addButton}>
          <MaterialCommunityIcons name="plus" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {/* Show header if there are days to display (excluding Feriados if it's only "Fechado") */}
      {displayedHours.filter(d => d.day !== "Feriados" || d.periods.some(p => p.startTime !== "Fechado")).length > 0 && 
        <View style={styles.listHeader}></View>}

      {displayedHours.filter(d => d.periods.some(p => p.startTime !== "Fechado")).length === 0 && !isAddingNew && (
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
                selectedValue={newHourEntry.day}
                onSelect={(value: string) => {
                  if (value === "Feriados") {
                    Alert.alert("Aviso", "Horários para 'Feriados' não são salvos como horários regulares. Selecione um dia da semana ou marque como 'Fechado'.");
                  }
                  setNewHourEntry({
                    ...newHourEntry,
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
                selectedValue={newHourEntry.startTime}
                onSelect={(value: string) => {
                  setNewHourEntry({
                    ...newHourEntry,
                    startTime: value,
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
                selectedValue={newHourEntry.endTime}
                onSelect={(value: string) => {
                  setNewHourEntry({
                    ...newHourEntry,
                    endTime: value,
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

      {/* Render table if there are displayable hours and not in add mode */}
      {displayedHours.length > 0 && !isAddingNew && (
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Dia</Text>
            <Text style={styles.tableHeaderText}>Horários</Text>
            <Text style={styles.tableHeaderText}></Text>
          </View>
          {/* Filter out "Feriados" from general display if it's always "Fechado" or has no actual times */}
          {displayedHours
            .filter(day => day.day !== "Feriados" || day.periods.some(p => p.startTime !== "Fechado"))
            .map((day, dayIndex) => (
            <View key={dayIndex} style={styles.tableRow}>
              <View style={styles.dayCell}>
                <Text style={styles.dayText}>{day.day}</Text>
              </View>

              <View style={styles.periodsCell}>
                {day.periods.map((period, periodIndex) => (
                  <View key={periodIndex} style={styles.periodBadge}>
                    {period.startTime === 'Fechado' ? (
                      <Text style={[styles.periodText, styles.closedText]}>Fechado</Text>
                    ) : (
                      <Text style={styles.periodText}>
                        {`${period.startTime} – ${period.endTime}`}
                      </Text>
                    )}
                    {/* Show remove button for an actual time period */}
                    {period.startTime !== "Fechado" && (
                      <TouchableOpacity
                        style={styles.removePeriodButton}
                        onPress={() => handleRemoveHour(day.day, periodIndex)}
                        activeOpacity={0.7}
                      >
                        <MaterialIcons
                          name="remove-circle"
                          size={16}
                          color={Colors.redError}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const dropdownStyles = StyleSheet.create({
  container: {
    position: "relative",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.orange.orangeTransparent,
    borderRadius: 20,
    padding: 10,
    paddingLeft: 24,
    paddingRight: 16,
    height: 50,
  },
  buttonDisabled: {
    backgroundColor: Colors.gray.grayTableBorder,
    opacity: 0.7,
  },
  buttonText: {
    color: Colors.orange.orangeStandard,
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
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray.grayTableBorder,
    marginTop: 4,
    shadowColor: Colors.black,
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
    borderBottomColor: Colors.gray.grayBorder,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionSelected: {
    backgroundColor: Colors.orange.orangeSelected,
  },
  optionText: {
    color: Colors.gray.grayText,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    flex: 1,
  },
  optionTextSelected: {
    color: Colors.orange.orangeStandard,
    fontFamily: "Poppins-SemiBold",
  },
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.orange.orangeTransparent,
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
    backgroundColor: Colors.orange.orangeStandard,
    padding: 12,
    borderRadius: 20,
    width: "100%",
    height: 50,
    marginBottom: 10,
  },
  title: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    left: "5%",
  },
  addButton: {
    backgroundColor: Colors.orange.orangeAddButton,
    borderRadius: 999,
    padding: "1%",
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray.grayTableBorder,
  },
  listTitle: {
    color: Colors.orange.orangeWelcome,
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
    borderBottomColor: Colors.gray.grayBorder,
  },
  day: {
    color: Colors.gray.grayText,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  time: {
    color: Colors.gray.grayText,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  removeButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  deleteIconContainer: {
    backgroundColor: Colors.redError,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  dayContainer: {
    marginBottom: 15,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 10,
    shadowColor: Colors.black,
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
    borderBottomColor: Colors.gray.grayBorder,
    paddingBottom: 8,
    marginBottom: 8,
  },
  dayTitle: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: Colors.orange.orangeStandard,
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
    backgroundColor: Colors.gray.grayBackground,
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
    color: Colors.gray.graySubtle,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  newHourContainer: {
    backgroundColor: Colors.orange.orangeTransparentVeryLight,
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
    color: Colors.gray.grayText,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    marginBottom: 4,
  },
  periodSectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: Colors.orange.orangeStandard,
    marginTop: 15,
    marginBottom: 8,
  },
  tableContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.gray.grayTableBorder,
    width: "100%",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: Colors.gray.grayBackground,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray.grayTableBorder,
    gap: 60,
  },
  tableHeaderText: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: Colors.gray.grayText,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray.grayTableBorder,
    alignItems: "center",
  },
  dayCell: {
    flex: 2,
  },
  dayText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: Colors.gray.grayText,
  },
  periodsCell: {
    flex: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  periodBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.gray.grayBackground,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  periodText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: Colors.gray.grayText,
  },
  closedText: {
    color: Colors.gray.graySubtle,
    fontStyle: 'italic',
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
    backgroundColor: Colors.gray.grayDisabled,
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: Colors.orange.orangeStandard,
    marginLeft: 8,
  },
  actionButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
});

export default HoursSection;