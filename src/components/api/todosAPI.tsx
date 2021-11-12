import axiosClient from "./axiosClient";
export interface TypeTodo {
  name: string;
  content: string;
  id: string;
}

const TodosAPI = {
  getAll() {
    const url = `/todos`;
    return axiosClient.get(url);
  },
  get(id: string) {
    const url = `todos${id}`;
    return axiosClient.get(url);
  },
  add(todo: TypeTodo) {
    const url = `/todos`;
    return axiosClient.post(url, todo);
  },
  remove(id: string) {
    const url = `/todos//${id}`;
    return axiosClient.delete(url)
  },
  update(id: string, data: TypeTodo) {
    const url = `/todos/${id}`;
    return axiosClient.put(url, data)
  }
};
export default TodosAPI;
