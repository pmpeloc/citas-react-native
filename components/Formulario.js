import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button, Platform, TouchableHighlight, ScrollView, Alert } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';

const Formulario = ({citas, setCitas, guardarMostrarForm}) => {

    const [paciente, guardarPaciente] = useState('');
    const [propietario, guardarPropietario] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [fecha, guardarFecha] = useState('');
    const [hora, guardarHora] = useState('');
    const [sintomas, guardarSintomas] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const confirmarFecha = (date) => {
        if (Platform.OS === 'ios') {
            const opciones = {year: 'numeric', month: 'long', day: '2-digit'};
            guardarFecha(date.toLocaleDateString('es-ES', opciones));
        } else {
            const inputDate = new Date(date);
            const day = inputDate.getDate() < 10 ? `0${inputDate.getDate()}` : inputDate.getDate();
            const month = inputDate.getMonth() < 10 ? `0${inputDate.getMonth() + 1}` : inputDate.getMonth() + 1;
            const year = inputDate.getFullYear();
            guardarFecha(`${day}/${month}/${year}`)
        }
        
        hideDatePicker();
    };

    // Muestra u oculta el Time Picker
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const confirmarHora = (hora) => {
        if (Platform.OS === 'ios') {
            const opciones = {hour: 'numeric', minute: '2-digit'};
            guardarHora(hora.toLocaleDateString('en-US', opciones));
        } else {
            const inputDate = new Date(hora);
            const hours = inputDate.getHours() < 10 ? `0${inputDate.getHours()}` : inputDate.getHours();
            const minutes = inputDate.getMinutes() < 10 ? `0${inputDate.getMinutes()}` : inputDate.getMinutes();
            guardarHora(`${hours}:${minutes}`);
        }
        
        hideTimePicker();
    };

    // Crear una nueva cita
    const crearNuevaCita = () => {
        // Validar
        if (paciente.trim() === '' || propietario.trim() === '' || telefono.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
            // Falla la validación
            mostrarAlerta();
            return;
        }
        // Crear una nueva cita
        const cita = {paciente, propietario, telefono, fecha, hora, sintomas};
        cita.id = shortid.generate();        
        // Agrear al state
        const citasNuevo = [...citas, cita];
        setCitas(citasNuevo);
        // Ocultar el formulario
        guardarMostrarForm(false);
        // Resetear el formulario
    };

    // Muestra la alerta si falla la validación
    const mostrarAlerta = () => {
        Alert.alert(
            'Error', // título
            'Todos los campos son obligatorios', // mensaje
            [{
                text: 'OK' // arreglo de botones
            }]
        )
    }

    return (
        <>            
            <ScrollView style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Paciente: </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => guardarPaciente(texto)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Dueño: </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => guardarPropietario(texto)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Teléfono de Contacto: </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => guardarTelefono(texto)}
                        keyboardType="numeric"
                    />
                </View>
                <View>
                    <Text style={styles.label}>Fecha:</Text>
                    <Button title="Seleccionar Fecha" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={confirmarFecha}
                        onCancel={hideDatePicker}
                        locale='es_ES'
                        headerTextIOS="Elige una Fecha"
                        cancelTextIOS="Cancelar"
                        confirmTextIOS="Confirmar"
                    />
                    <Text>{fecha}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Hora:</Text>
                    <Button title="Seleccionar Hora" onPress={showTimePicker} />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={confirmarHora}
                        onCancel={hideTimePicker}
                        locale='es_ES'
                        headerTextIOS="Elige una Hora"
                        cancelTextIOS="Cancelar"
                        confirmTextIOS="Confirmar"
                        is24Hour
                    />
                    <Text>{hora}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Síntomas: </Text>
                    <TextInput
                        multiline
                        style={styles.input}
                        onChangeText={texto => guardarSintomas(texto)}
                    />
                </View>
                <View>
                    <TouchableHighlight onPress={() => crearNuevaCita()} style={styles.botonSubmit}>
                        <Text style={styles.textoSubmit}>Crear nueva cita</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>                
        </>
    );
};

const styles = StyleSheet.create({    
    formulario: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    botonSubmit: {
        padding: 10,
        backgroundColor: '#7d024e',
        marginVertical: 10
    },
    textoSubmit: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
 
export default Formulario;