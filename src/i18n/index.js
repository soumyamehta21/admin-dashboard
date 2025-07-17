import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: "Dashboard",
      projects: "Projects",
      estimates: "Estimates",

      // Common
      search: "Search",
      add: "Add",
      edit: "Edit",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      logout: "Logout",
      admin: "Admin",

      // Dashboard
      totalUser: "Total User",
      totalOrder: "Total Order",
      totalSales: "Total Sales",
      totalPending: "Total Pending",
      upFromYesterday: "{{percentage}} Up from yesterday",
      upFromPastWeek: "{{percentage}} Up from past week",
      downFromYesterday: "{{percentage}} Down from yesterday",
      table: "Table",
      productName: "Product Name",
      location: "Location",
      dateTime: "Date - Time",
      piece: "Piece",
      amount: "Amount",
      status: "Status",
      salesDetails: "Sales Details",

      // Months
      january: "January",
      february: "February",
      march: "March",
      april: "April",
      may: "May",
      june: "June",
      july: "July",
      august: "August",
      september: "September",
      october: "October",
      november: "November",
      december: "December",

      // Projects
      addNewProject: "Add New Project",
      editProject: "Edit Project",
      customer: "Customer",
      selectCustomer: "Select customer",
      refNumber: "Ref Number",
      projectName: "Project Name",
      enterProjectName: "Enter your project name",
      projectNumber: "Project Number",
      areaLocation: "Area Location",
      address: "Address",
      dueDate: "Due Date",
      contact: "Contact",
      manager: "Manager",
      selectProjectManager: "Select project manager",
      staff: "Staff",
      email: "Email",

      // Estimates
      addEstimate: "Add Estimate",
      version: "VERSION",
      project: "PROJECT",
      client: "CLIENT",
      createdDate: "CREATED DATE",
      lastModified: "LAST MODIFIED",
      action: "ACTION",
      showing: "Showing",
      of: "of",

      // Status
      created: "Created",
      processing: "Processing",
      rejected: "Rejected",
      onhold: "On Hold",
      intransit: "In Transit",
      delivered: "Delivered",
      pending: "Pending",
      completed: "Completed",

      // Languages
      english: "English",
      french: "Français",
      spanish: "Español",
    },
  },
  fr: {
    translation: {
      // Navigation
      dashboard: "Tableau de bord",
      projects: "Projets",
      estimates: "Devis",

      // Common
      search: "Rechercher",
      add: "Ajouter",
      edit: "Modifier",
      cancel: "Annuler",
      save: "Enregistrer",
      delete: "Supprimer",
      logout: "Déconnexion",
      admin: "Administrateur",

      // Dashboard
      totalUser: "Total Utilisateurs",
      totalOrder: "Total Commandes",
      totalSales: "Total Ventes",
      totalPending: "Total En Attente",
      upFromYesterday: "{{percentage}} En hausse depuis hier",
      upFromPastWeek: "{{percentage}} En hausse depuis la semaine dernière",
      downFromYesterday: "{{percentage}} En baisse depuis hier",
      table: "Tableau",
      productName: "Nom du Produit",
      location: "Emplacement",
      dateTime: "Date - Heure",
      piece: "Pièce",
      amount: "Montant",
      status: "Statut",
      salesDetails: "Détails des Ventes",

      // Months
      january: "Janvier",
      february: "Février",
      march: "Mars",
      april: "Avril",
      may: "Mai",
      june: "Juin",
      july: "Juillet",
      august: "Août",
      september: "Septembre",
      october: "Octobre",
      november: "Novembre",
      december: "Décembre",

      // Projects
      addNewProject: "Ajouter un Nouveau Projet",
      editProject: "Modifier le Projet",
      customer: "Client",
      selectCustomer: "Sélectionner un client",
      refNumber: "Numéro de Référence",
      projectName: "Nom du Projet",
      enterProjectName: "Entrez le nom de votre projet",
      projectNumber: "Numéro de Projet",
      areaLocation: "Zone/Emplacement",
      address: "Adresse",
      dueDate: "Date d'Échéance",
      contact: "Contact",
      manager: "Gestionnaire",
      selectProjectManager: "Sélectionner un chef de projet",
      staff: "Personnel",
      email: "Email",

      // Estimates
      addEstimate: "Ajouter un Devis",
      version: "VERSION",
      project: "PROJET",
      client: "CLIENT",
      createdDate: "DATE DE CRÉATION",
      lastModified: "DERNIÈRE MODIFICATION",
      action: "ACTION",
      showing: "Affichage",
      of: "de",

      // Status
      created: "Créé",
      processing: "En cours",
      rejected: "Rejeté",
      onhold: "En attente",
      intransit: "En transit",
      delivered: "Livré",
      pending: "En attente",
      completed: "Terminé",

      // Languages
      english: "English",
      french: "Français",
      spanish: "Español",
    },
  },
  es: {
    translation: {
      // Navigation
      dashboard: "Panel de Control",
      projects: "Proyectos",
      estimates: "Presupuestos",

      // Common
      search: "Buscar",
      add: "Agregar",
      edit: "Editar",
      cancel: "Cancelar",
      save: "Guardar",
      delete: "Eliminar",
      logout: "Cerrar Sesión",
      admin: "Administrador",

      // Dashboard
      totalUser: "Total Usuarios",
      totalOrder: "Total Pedidos",
      totalSales: "Total Ventas",
      totalPending: "Total Pendientes",
      upFromYesterday: "{{percentage}} Subida desde ayer",
      upFromPastWeek: "{{percentage}} Subida desde la semana pasada",
      downFromYesterday: "{{percentage}} Bajada desde ayer",
      table: "Tabla",
      productName: "Nombre del Producto",
      location: "Ubicación",
      dateTime: "Fecha - Hora",
      piece: "Pieza",
      amount: "Cantidad",
      status: "Estado",
      salesDetails: "Detalles de Ventas",

      // Months
      january: "Enero",
      february: "Febrero",
      march: "Marzo",
      april: "Abril",
      may: "Mayo",
      june: "Junio",
      july: "Julio",
      august: "Agosto",
      september: "Septiembre",
      october: "Octubre",
      november: "Noviembre",
      december: "Diciembre",

      // Projects
      addNewProject: "Agregar Nuevo Proyecto",
      editProject: "Editar Proyecto",
      customer: "Cliente",
      selectCustomer: "Seleccionar cliente",
      refNumber: "Número de Referencia",
      projectName: "Nombre del Proyecto",
      enterProjectName: "Ingrese el nombre de su proyecto",
      projectNumber: "Número de Proyecto",
      areaLocation: "Área/Ubicación",
      address: "Dirección",
      dueDate: "Fecha de Vencimiento",
      contact: "Contacto",
      manager: "Gerente",
      selectProjectManager: "Seleccionar gerente de proyecto",
      staff: "Personal",
      email: "Correo Electrónico",

      // Estimates
      addEstimate: "Agregar Presupuesto",
      version: "VERSIÓN",
      project: "PROYECTO",
      client: "CLIENTE",
      createdDate: "FECHA DE CREACIÓN",
      lastModified: "ÚLTIMA MODIFICACIÓN",
      action: "ACCIÓN",
      showing: "Mostrando",
      of: "de",

      // Status
      created: "Creado",
      processing: "Procesando",
      rejected: "Rechazado",
      onhold: "En Espera",
      intransit: "En Tránsito",
      delivered: "Entregado",
      pending: "Pendiente",
      completed: "Completado",

      // Languages
      english: "English",
      french: "Français",
      spanish: "Español",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
