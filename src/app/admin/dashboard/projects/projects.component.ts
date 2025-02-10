import {Component, OnInit, ViewChild} from '@angular/core';
import {Project} from "../../../model/project_dto";
import {ProjectService} from "../../../services/project.service";
import {Response} from "../../../model/Response";
import {Role} from "../../../model/Role";
import {AlertifyService} from "../../../services/alertify.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AddProjectModalComponent} from "../../../angular_modals/add-project-modal/add-project-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {UpdateProjectModalComponent} from "../../../angular_modals/update-project-modal/update-project-modal.component";
import {DeleteProjectModalComponent} from "../../../angular_modals/delete-project-modal/delete-project-modal.component";
import {Router} from "@angular/router";
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'startDate', 'endDate', 'action'];
  dataSource!: MatTableDataSource<Project>;
  project_list: Project[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private projectService: ProjectService,
    private alert: AlertifyService,
    private dialog: MatDialog,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (response: Project[]) => {
        if (response) {
          this.project_list = response;
          this.dataSource = new MatTableDataSource(this.project_list);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.dataSource.filterPredicate = (data: Project, filter: string) => {
            const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => {
              return currentTerm + (data as any)[key] + '◬';
            }, '').toLowerCase();
            const transformedFilter = filter.trim().toLowerCase();
            return dataStr.indexOf(transformedFilter) !== -1;
          };
        } else {
          this.alert.success('error get roles');
        }
      },
      error: (error) => {
        this.alert.error('error get projects');
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateProject(id: number) {
    const selectedProject = this.project_list.find(project => project.id === id);
    const dialogRef = this.dialog.open(UpdateProjectModalComponent, {
      width: '500px',
      disableClose: false,
      data: selectedProject // Pass the selected project data
    });

    dialogRef.afterClosed().subscribe((response: any) => {
      if (response.success) {
        this.alert.success("Project updated");
        this.loadProjects();
      } else if (!response.success) {
        this.alert.error("Error updating project");
      }
    });
  }

  deleteProject(id: number) {
    const selectedProject = this.project_list.find(project => project.id === id);

    const dialogRef = this.dialog.open(DeleteProjectModalComponent, {
      width: '400px',
      disableClose: true,
      data: { id: selectedProject?.id, name: selectedProject?.name }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.confirmed) {
        this.projectService.deleteProject(id).subscribe({
          next: () => {
            this.alert.success('Project deleted successfully');
            this.loadProjects();
          },
          error: () => {
            this.alert.error('Error deleting project');
          }
        });
      }
    });
  }

  affectation(id: number) {
    // Implement affectation logic
    this.router.navigate(['projects/affectation/'+id])
    console.log('Affect users to project with ID:', id);
  }

  showTasks(id: number) {
    // Implement show tasks logic
    this.router.navigate(['projects/tasks/'+id])
    console.log('Show tasks for project with ID:', id);
  }

  openAddProjectModal(): void {
    const dialogRef = this.dialog.open(AddProjectModalComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((response: any) => {
      //console.log("Response from modal:", response);
      if (response.success) {
        this.alert.success("Project added")
        this.loadProjects();
      }else {
        this.alert.error("Error")

      }
    });
  }
}
