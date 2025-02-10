export interface ITask {
  id: number;
  name: string;
  description: string;
  status: 'ToDo' | 'InProgress' | 'ToConfirmOrBug' | 'Finished';
  endDate: string;
  projectId: number;
  userId: string;
}

