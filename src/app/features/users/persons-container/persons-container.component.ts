// features/users/persons-container/persons-container.component.ts
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

  // Departamentos disponibles
  departments = [
    "Dirección General", "Área Técnica", "Comisaria", "Coordinación Juridica",
    "Gerencia Administrativa", "Gerencia Operativa", "Departamento de Finanzas",
    "Departamento de Planeación", "Departamento de Sistema Eléctrico",
    "Departamento de Sistema Hidrosánitario y Aire Acondicionado",
    "Departamento de Mantenimiento General", "Departamento de Voz y Datos",
    "Departamento de Seguridad e Higiene"
  ];

  // Estado de visualización de cada departamento
  departmentVisibility: { [key: string]: boolean } = {};

  // Usuarios por departamento
  usersByDepartment: { [key: string]: any[] } = {};

  // Datos del formulario
  newUser = {
    email: '',
    password: '',
    department: '',
    nombre: '',
    apellidos: ''
  };

  constructor(private profileService: ProfileService) {
    // Inicializar visibilidad de departamentos
    this.departments.forEach(dept => {
      this.departmentVisibility[dept] = true;
    });
  }

  ngOnInit() {
    this.loadAllUsers();
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

  organizeUsersByDepartment(users: any[]) {
    // Inicializar todos los departamentos como arrays vacíos
    this.departments.forEach(dept => {
      this.usersByDepartment[dept] = [];
    });

    // Organizar usuarios por departamento
    users.forEach(user => {
      if (user.departamento && this.usersByDepartment[user.departamento]) {
        this.usersByDepartment[user.departamento].push(user);
      }
    });
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      // Implementar búsqueda si es necesario
      console.log('Buscando:', this.searchTerm);
    } else {
      this.loadAllUsers();
    }
  }

  toggleDepartmentVisibility(department: string) {
    this.departmentVisibility[department] = !this.departmentVisibility[department];
  }

  toggleAddModal() {
    this.showAddModal = !this.showAddModal;
    if (!this.showAddModal) {
      this.resetForm();
    }
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
      // Preparar datos para enviar al backend
      const userData = {
        email: this.newUser.email,
        password: this.newUser.password,
        departamento: this.newUser.department, // Cambiar a 'departamento' para el backend
        nombre: this.newUser.nombre,
        apellidos: this.newUser.apellidos,
        id_rol: 2 // Asignar rol de jefe (ajusta según tu sistema de roles)
      };

      this.profileService.postUser(userData).subscribe({
        next: (response) => {
          console.log('Usuario agregado exitosamente:', response);
          this.toggleAddModal();
          this.loadAllUsers(); // Recargar usuarios
        },
        error: (error) => {
          console.error('Error al agregar usuario:', error);
          // Mostrar mensaje de error al usuario
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
          this.loadAllUsers(); // Recargar usuarios
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