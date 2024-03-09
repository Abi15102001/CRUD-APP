import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../snack/snackbar.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent {
empForm!:FormGroup;
educationalQualification:string[]=['HSC','Diploma','UG','PG','Doctorate']

constructor(private fb: FormBuilder,private empService:EmployeeService,private dialogref:MatDialogRef<EmpAddEditComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any,private snackService:SnackbarService){
  this.empForm =this.fb.group({
    firstName : '',
    lastName : '',
    email : '',
    dob: '',
    gender:'',
    educationalQualification: '',
    company: '',
    experience:'',
    ctc:'',
  })
}

ngOnInit(){this.empForm.patchValue(this.data)};
formSubmission(){
  if (this.empForm.valid){
    if(this.data){
      this.empService.editEmployee(this.data.id,this.empForm.value).subscribe({
        next:(val:any)=>{
          this.snackService.openSnackBar('Employee Updated','done');
          this.dialogref.close(true);
        },
        error:(err:any)=>{console.log(err);
        }
      })
    }else{
   this.empService.addEmployee(this.empForm.value).subscribe({
      next:(val:any)=>{this.snackService.openSnackBar('Employee Added','done');
    this.dialogref.close(true);
  },
      error:(err:any)=>{console.log(err);
      }
    });
  }
  }


}

close(){this.dialogref.close()}
}
