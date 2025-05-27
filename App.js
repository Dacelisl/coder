import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  const addTask = () => {
    if (task.trim() !== '') {
      setTaskList((prevTasks) => [...prevTasks, { id: Math.random().toString(), title: task }]);
      setTask('');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TextInput placeholder="Agree Task" value={task} onChangeText={setTask} />
      <Button title="ADD" onPress={addTask} />
      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.tarea}> {item.title}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tarea: {
    fontSize: 18,
    backgroundColor: '#f9c2ff',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});
