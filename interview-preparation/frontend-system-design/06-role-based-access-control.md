# 6. Role-Based Access Control (RBAC) Implementation

## Problem Statement

Admin has full dashboard access. Different
users have different levels of access to
specific features. Need centralized access
control.

---

## Centralized Architecture Approach

A centralized RBAC system where permissions
are assigned to roles, and roles are assigned
to users.

Examples:
- Angular → Route guards / structural directives
- React → Protected routes / HOCs
- Backend → Permission middleware / Policy-based access

Instead of hardcoding access logic in each component,
you decouple authorization by using a central permission service.

How it works:
1. Define roles (Admin, Manager, Developer, Viewer)
2. Define permissions (CREATE, READ, UPDATE, DELETE)
3. Assign permissions to roles
4. Assign roles to users
5. Backend returns user permissions on login
6. Frontend renders UI based on permissions
7. Backend validates permissions on every API call

---

## Access Control Matrix Example

| Feature | Admin | Manager | Developer | Viewer |
|---------|-------|---------|-----------|--------|
| View Dashboard | ✅ | ✅ | ✅ | ✅ |
| Create Task | ✅ | ✅ | ✅ | ❌ |
| Edit Task | ✅ | ✅ | ✅ | ❌ |
| Delete Task | ✅ | ✅ | ❌ | ❌ |
| Add Users | ✅ | ❌ | ❌ | ❌ |
| Delete Project | ✅ | ❌ | ❌ | ❌ |
| View Reports | ✅ | ✅ | ❌ | ❌ |
| Export Data | ✅ | ✅ | ✅ | ❌ |

---

## Implementation Layers

**Backend Layer:**
- Role-permission mapping in database
- Authentication middleware
- Authorization middleware per endpoint
- API returns 403 for unauthorized access

**Frontend Layer:**
- Centralized AuthService with permissions
- Route guards for page access
- Directive/Component hiding for UI elements
- Navigation menu filtering

---

## Scaling Considerations

- Cache permissions in memory
- Refresh permissions on role change
- Audit logging for access attempts
- Permission inheritance (role hierarchy)

---

## Real World Example

**Jira:**
- Admin: Delete projects, add users, view billing
- Project Manager: Create sprints, assign tasks
- Developer: View assigned tasks, update status
- Viewer: View only, no edits

**Google Drive:**
- Viewer: See files, cannot edit
- Commenter: Add comments, cannot edit
- Editor: Edit, cannot delete
- Owner: Delete, manage sharing

**GitHub:**
- Admin: Full repo access, manage settings
- Write: Push code, create PRs
- Read: Clone, view, cannot push
- Triage: Manage issues and PRs

---

## Key Security Principles

- Never rely only on frontend hiding
- Backend must enforce all permissions
- Centralized permission service
- Log all access attempts for auditing
- Principle of least privilege