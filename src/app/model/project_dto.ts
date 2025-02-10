import {Task_dto} from "./task_dto";

export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  tasks: Task_dto[] | null;
}
