import React, { useState } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import Cita from './components/Cita';
import Formulario from './components/Formulario';

const App = () => {

  const [mostrarForm, guardarMostrarForm] = useState(false);

  // Definir el state de citas
  const [citas, setCitas] = useState([]);

  // Eliminar los pacientes del state
  const eliminarPaciente = id => {
    setCitas((citasActuales) => {
      return citasActuales.filter(cita => cita.id !== id);
    });
  };

  // Muestra u oculta el formulario
  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm);
  };

  // Ocultar el teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de Citas</Text>
        <View>
            <TouchableHighlight onPress={() => mostrarFormulario()} style={styles.botonMostrarForm}>
            <Text style={styles.textoMostrarForm}>{mostrarForm ? 'Cancelar crear cita' : 'Crear nueva cita'}</Text>
            </TouchableHighlight>
        </View>
        <View style={styles.contenido}>
          {mostrarForm ? (
            <>        
              <Text style={styles.titulo}>Crear nueva cita</Text>
              <Formulario
                citas={citas}
                setCitas={setCitas}
                guardarMostrarForm={guardarMostrarForm}
              />
            </>          
          ) : (
            <>
              <Text style={styles.titulo}>{citas.length > 0 ? 'Administra tus Citas' : 'No hay citas, agrega una'}</Text>      
              <FlatList
                style={styles.listado}
                data={citas}
                renderItem={ ({item}) => <Cita item={item} eliminarPaciente={eliminarPaciente} />}
                keyExtractor={cita => cita.id}
              />
            </>
          )}  
        </View>      
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#aa076b',
    flex: 1 // Permite crecer en el espacio disponible similar a minHeight: '100%'
  },  
  titulo: {
    color: '#fff',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%'
  },
  listado: {
    flex: 1
  },
  botonMostrarForm: {
      padding: 10,
      backgroundColor: '#7d024e',
      marginVertical: 10
  },
  textoMostrarForm: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center'
  }
});

export default App;