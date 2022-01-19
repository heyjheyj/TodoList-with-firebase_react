import { set, ref, remove, onValue, off, getDatabase } from "firebase/database";

class TodoRepository {
  constructor(app) {
    this.db = getDatabase(app);
  }

  saveTodo(userId, todo) {
    set(ref(this.db, `${userId}/todos/${todo.id}`), todo);
  }

  removeTodo(userId, todo) {
    remove(ref(this.db, `${userId}/todos/${todo.id}`));
  }

  syncTodos(userId, onUpdate) {
    const query = ref(this.db, `${userId}/todos/`);
    onValue(query, (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
    return () => off(query);
  }
}

export default TodoRepository;
