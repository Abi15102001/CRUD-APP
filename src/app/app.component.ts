import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SnackbarService } from './snack/snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  displayedColumns: string[] = ['id','firstName','lastName','email','dob','gender','educationalQualification','company','experience','ctc','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
data: any;

  constructor(private dialog:MatDialog,private empService:EmployeeService,private snackService:SnackbarService){}

  ngOnInit(): void {
    this.getEmployeeList()
  }
  

  openAddEditComp(){
   const dialogRef = this.dialog.open(EmpAddEditComponent);
dialogRef.afterClosed().subscribe({
  next:(val)=>{
    if(val){this.getEmployeeList();}
  }
})
  }

  getEmployeeList(){
    this.empService.getEmployee().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort =this.sort;
      this.dataSource.paginator =this.paginator;
    })
  }

  deleteEmp(id:number){
    const confirmation = confirm('Are you sure you want to delete this employee?');
    if(confirmation)
    this.empService.deleteEmployee(id).subscribe({
      next:(_res)=>{
      this.snackService.openSnackBar('Employee Deleted','done');
    this.getEmployeeList()},
      error:console.log,
      
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
}

edit(data:any){
 const dialogRef = this.dialog.open(EmpAddEditComponent,{data,});

 dialogRef.afterClosed().subscribe({
  next:(val)=>{
    if(val){this.getEmployeeList();}
  }
 })
}
}