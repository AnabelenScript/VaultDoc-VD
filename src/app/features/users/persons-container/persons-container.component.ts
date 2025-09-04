import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../core/services/user/user_service';

@Component({
  selector: 'app-persons-container',
  templateUrl: './persons-container.component.html',
  styleUrl: './persons-container.component.css'
})
export class PersonsContainerComponent implements OnInit {
  archiveCount = 0;
  searchTerm = '';
  showAddModal = false;
  showDeleteModal = false;
  userToDelete: any = null;

  departments = [
    "Dirección General", "Área Técnica", "Comisaria", "Coordinación Juridica",
    "Gerencia Administrativa", "Gerencia Operativa", "Departamento de Finanzas",
    "Departamento de Planeación", "Departamento de Sistema Eléctrico",
    "Departamento de Sistema Hidrosánitario y Aire Acondicionado",
    "Departamento de Mantenimiento General", "Departamento de Voz y Datos",
    "Departamento de Seguridad e Higiene"
  ];

  departmentVisibility: { [key: string]: boolean } = {};
  usersByDepartment: { [key: string]: any[] } = {};
  currentUser: any = null;

  newUser = {
    email: '',
    password: '',
    department: '',
    nombre: '',
    apellidos: ''
  };

  constructor(private profileService: ProfileService) {
    this.departments.forEach(dept => {
      this.departmentVisibility[dept] = true;
    });
  }

  ngOnInit() {
  const storedUser = localStorage.getItem('user_data');
  if (storedUser) {
    this.currentUser = JSON.parse(storedUser);
  }

  if (this.currentUser?.roleId === 3) {
    this.departments.forEach(dept => {
      this.departmentVisibility[dept] = true;
    });
    this.loadAllUsers();
  } else if (this.currentUser?.roleId === 2) {
    this.departments = [this.currentUser.department];
    this.departmentVisibility[this.currentUser.department] = true;
    this.loadUsersByDepartment(this.currentUser.department);
  }
}


  loadAllUsers() {
    this.profileService.getAllUsers().subscribe({
      next: (users) => {
        this.organizeUsersByDepartment(users);
        this.archiveCount = users.length;
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });
  }

  loadUsersByDepartment(department: string) {
    this.profileService.getUserByDepartment(department).subscribe({
      next: (users) => {
        this.organizeUsersByDepartment(users);
        this.archiveCount = users.length;
      },
      error: (error) => {
        console.error('Error loading department users:', error);
      }
    });
  }

  organizeUsersByDepartment(users: any[]) {
    this.departments.forEach(dept => {
      this.usersByDepartment[dept] = [];
    });

    users.forEach(user => {
      const dept = user.departamento;
      if (!dept || !this.usersByDepartment[dept]) return;

      this.usersByDepartment[dept].push(user);
    });
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      console.log('Buscando:', this.searchTerm);
    } else {
      if (this.currentUser?.roleId === 3) {
        this.loadAllUsers();
      } else if (this.currentUser?.roleId === 2) {
        this.loadUsersByDepartment(this.currentUser.department);
      }
    }
  }

  toggleDepartmentVisibility(department: string) {
    this.departmentVisibility[department] = !this.departmentVisibility[department];
  }

  toggleAddModal() {
    this.showAddModal = !this.showAddModal;
    if (this.showAddModal && this.currentUser?.roleId === 2) {
      this.newUser.department = this.currentUser.department;
    }
    if (!this.showAddModal) this.resetForm();
  }

  resetForm() {
    this.newUser = {
      email: '',
      password: '',
      department: '',
      nombre: '',
      apellidos: ''
    };
  }

  addUser() {
    if (this.validateForm()) {
      const assignedRoleId = this.currentUser?.roleId === 2 ? 1 : 2;

      const userData = {
        email: this.newUser.email,
        password: this.newUser.password,
        departamento: this.newUser.department,
        nombre: this.newUser.nombre,
        apellidos: this.newUser.apellidos,
        roleId: assignedRoleId
      };

      this.profileService.postUser(userData).subscribe({
        next: (response) => {
          console.log('Usuario agregado exitosamente:', response);
          this.toggleAddModal();

          if (this.currentUser?.roleId === 3) {
            this.loadAllUsers();
          } else if (this.currentUser?.roleId === 2) {
            this.loadUsersByDepartment(this.currentUser.department);
          }
        },
        error: (error) => {
          console.error('Error al agregar usuario:', error);
          alert('Error al agregar usuario. Por favor, verifica los datos e intenta nuevamente.');
        }
      });
    }
  }

  validateForm(): boolean {
    return !!(this.newUser.email &&
              this.newUser.password &&
              this.newUser.department &&
              this.newUser.nombre &&
              this.newUser.apellidos);
  }

  openDeleteModal(user: any) {
    this.userToDelete = user;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.userToDelete = null;
  }

  confirmDeleteUser() {
    if (this.userToDelete && this.userToDelete.id) {
      this.profileService.deleteUserById(this.userToDelete.id).subscribe({
        next: (response) => {
          console.log('Usuario eliminado exitosamente:', response);
          this.closeDeleteModal();

          if (this.currentUser?.roleId === 3) {
            this.loadAllUsers();
          } else if (this.currentUser?.roleId === 2) {
            this.loadUsersByDepartment(this.currentUser.department);
          }
        },
        error: (error) => {
          console.error('Error al eliminar usuario:', error);
          this.closeDeleteModal();
        }
      });
    }
  }

  getUsersForDepartment(department: string): any[] {
    return this.usersByDepartment[department] || [];
  }

  hasUsersInDepartment(department: string): boolean {
    const users = this.getUsersForDepartment(department);
    return users && users.length > 0;
  }
}
