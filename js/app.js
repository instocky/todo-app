function todoApp() {
    return {
        tasks: [],
        newTask: '',

        init() {
            this.loadTasks();
        },

        loadTasks() {
            try {
                const savedTasks = localStorage.getItem('tasks');
                this.tasks = savedTasks ? JSON.parse(savedTasks) : [];
            } catch (error) {
                console.error('Ошибка при загрузке задач:', error);
                this.tasks = [];
            }
        },

        saveTasks() {
            try {
                localStorage.setItem('tasks', JSON.stringify(this.tasks));
            } catch (error) {
                console.error('Ошибка при сохранении задач:', error);
                alert('Не удалось сохранить задачи. Возможно, вы открыли файл напрямую через file:// протокол. Попробуйте использовать локальный сервер.');
            }
        },

        addTask() {
            if (this.newTask.trim() === '') return;

            const task = {
                id: Date.now(),
                text: this.newTask,
                completed: false,
                editing: false
            };

            this.tasks.push(task);
            this.newTask = '';
            this.saveTasks();
        },

        updateTask(task) {
            task.editing = false;
            if (task.text.trim() === '') {
                this.deleteTask(task.id);
            } else {
                this.saveTasks();
            }
        },

        deleteTask(taskId) {
            this.tasks = this.tasks.filter(task => task.id !== taskId);
            this.saveTasks();
        },

        toggleTask(task) {
            task.completed = !task.completed;
            this.saveTasks();
        }
    };
}