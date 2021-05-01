import React, { FC, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Task, List } from '../store/types';
import { updateTask, unsetTaskToEdit, setNotification } from '../store/actions';

interface EditTaskModalProps {
  taskToEdit: {
    task: Task;
    list: List;
  }
}

const EditTaskModal: FC<EditTaskModalProps> = ({ taskToEdit: { task, list }}) => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState(task.name);
  const [taskState, setTaskState] = useState(task.completed);

  const closeModalHandler = () => {
    dispatch(unsetTaskToEdit());
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(taskName.trim() === '') {
      return alert('Danh sách đã tồn tại');
    }

    if(taskName === task.name && taskState === task.completed) {
      return alert('Không đúng');
    }

    dispatch(updateTask(task.id, taskName, taskState, list));
    dispatch(setNotification(`Task "${task.name}" updated!`));
  }

  const nameChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    setTaskName(e.currentTarget.value);
  }

  const stateChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    setTaskState(e.currentTarget.checked);
  }

  return(
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModalHandler}></div>
      <form className="modal-card" onSubmit={submitHandler}>
        <header className="modal-card-head">
          <p className="modal-card-title">Edit Task</p>
          <button type="button" className="delete" onClick={closeModalHandler}></button>
        </header>
        <div className="modal-card-body">
          <div className="field">
            <label className="label">Tên nhiệm vụ</label>
            <div className="control">
              <input type="text" className="input" placeholder="Task Name" value={taskName} onChange={nameChangeHandler} />
            </div>
          </div>
          <div className="field">
            <label className="label">Hoàn thành</label>
            <label className="checkbox">
              <input type="checkbox" checked={taskState} onChange={stateChangeHandler} />
              {' '} Complete
            </label>
          </div>
        </div>
        <footer className="modal-card-foot">
          <button type="submit" className="button is-success">Lưu</button>
          <button type="button" className="button" onClick={closeModalHandler}>Hủy</button>
        </footer>
      </form>
    </div>
  );
}

export default EditTaskModal;