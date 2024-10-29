import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, Alert, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Modal, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type FormData = {
  name: string;
  email: string;
  sala: string;
  senha: string;
};

const HomeScreen = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    sala: '',
    senha: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const onSubmit = () => {
    Alert.alert(
      'Dados do formulário',
      `Nome: ${formData.name}\n\nEmail: ${formData.email}\n\nSala: ${formData.sala}\n\nSenha: ${formData.senha}`,
      [{ text: 'OK' }]
    );
  };

  const salas = ['Sala C13', 'Sala C19', 'Sala C17', 'Sala C16', 'Elétrica 1', 'Elétrica 2'];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          source={require('./assets/logo-senai.jpg')}
          style={styles.image}
        />

        <Text style={styles.subtitle}>Patrimônios em ordem</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={formData.name}
          onChangeText={(text) => handleInputChange('name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
        />

        <TouchableOpacity
          style={styles.pickerContainer}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.pickerText}>
            {formData.sala || 'Selecione uma sala'}
          </Text>
        </TouchableOpacity>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={salas}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      handleInputChange('sala', item);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.modalItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Senha"
            secureTextEntry={!showPassword}
            value={formData.senha}
            onChangeText={(text) => handleInputChange('senha', text)}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye' : 'eye-slash'}
              size={20}
              color="#333"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 195,
    height: 60,
    alignSelf: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333333',
  },
  input: {
    left: 30,
    paddingLeft: 20,
    height: 45,
    width: 300,
    borderColor: '#CCC',
    borderWidth: 1.5,
    marginBottom: 25,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  pickerContainer: {
    left: 30,
    height: 45,
    width: 300,
    justifyContent: 'center',
    borderColor: '#CCC',
    borderWidth: 1.5,
    marginBottom: 25,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  pickerText: {
    color: '#333333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    left: 30,
    paddingLeft: 20,
    height: 45,
    width: 300,
    borderColor: '#CCC',
    borderWidth: 1.5,
    marginBottom: 25,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  passwordInput: {
    flex: 1,
  },
  icon: {
    marginLeft: 10,
  },
  buttonContainer: {
    marginTop: 20,
    left: 83,
    width: 170,
    borderRadius: 20,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#B22222',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
  },
  modalItemText: {
    fontSize: 16,
    color: '#333333',
  },
});

export default HomeScreen;
