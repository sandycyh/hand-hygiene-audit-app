### Hand Hygiene Audit Mobile App

### Overview

The Hand Hygiene Audit App is designed to digitise and streamline hand hygiene auditing in clinical environments.
It replaces paper-based audits with a structured, offline-friendly workflow and a centralised backend for secure data storage and reporting.
The app was built as a real-world digital health project, reflecting practical clinical workflows and data accuracy requirements commonly found in hospital settings.


### Current Features(v1)

- Create a hand hygiene audit set
- Log individual hand hygiene moments within a set
- Automatically calculate compliance metrics
- View completed audit details
- Secure backend persistence with relational integrity


### Architecture Overview

- One audit session is created first and stored in the database.
- The database generates a unique SetID (identity column).
- Individual audit results are mapped to the generated SetID.
- Results are posted only after the audit set is successfully created, ensuring relational integrity.
- This design mirrors real-world healthcare data models where parent-child relationships must be accurate and auditable.


### Planned Enhancements

- Edit and delete audit sets
- Audit history and filtering
- Role-based access (auditor / admin)
- Basic reporting and export
- Offline-first support with sync


### API documentation
Each endpoint performs a single responsibility and uses parameterised queries to ensure data integrity and security.

### Audit Sets
- `POST /api/auditset`  
  Creates a new audit session and returns the generated `SetID`.

- `GET /api/auditset/:setID`  
  Retrieves a completed audit session by ID.

### Audit Results
- `POST /api/results`  
  Inserts multiple audit results linked to a single `SetID`.

- `GET /api/results/:setID`  
  Retrieves all results for a specific audit session.

- `GET /api/results/:setID/:resultID`
   Retrieves a specific result for a specific audit session. 
