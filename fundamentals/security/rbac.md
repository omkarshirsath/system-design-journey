# 🔐 What is RBAC?

### Full Form

```text
RBAC = Role Based Access Control
Instead of giving permissions directly to users, we assign users to roles.

Example HRMS System
text
Admin
Manager
Employee
Permissions:

text
Admin
 ├─ Create User
 ├─ Delete User
 ├─ Approve Leave

Manager
 ├─ Approve Leave
 ├─ View Team

Employee
 ├─ Apply Leave
 ├─ View Profile
Diagram
text
User
 │
 ▼

Role
 │
 ▼

Permissions
Example:

text
Omkar
 │
 ▼

Manager
 │
 ▼

Approve Leave
View Team
Database Design
text
users
------
id
name

roles
------
id
name

permissions
-----------
id
name

user_roles
----------
user_id
role_id

role_permissions
----------------
role_id
permission_id
🎯 Why RBAC?
Easy to manage.

Instead of:

text
User1 → 20 permissions
User2 → 20 permissions
User3 → 20 permissions
We do:

text
Users
 ↓
Roles
 ↓
Permissions
⚠️ Problem with RBAC
Suppose:

text
Manager
can approve leave.

But now requirement says:

Manager can only approve leave for employees in their own department.

RBAC struggles here.

Because role alone isn't enough.

🔐 What is ABAC?
Full Form
text
ABAC = Attribute Based Access Control
Access is decided using attributes.

Example
Check:

text
User Department
User Location
User Age
User Designation
Time
Resource Owner
Rule
text
Can Approve Leave

IF

User.Department
=
Employee.Department
Example
text
Manager
Department = IT

Employee
Department = IT
✅ Allow

text
Manager
Department = IT

Employee
Department = HR
❌ Deny

ABAC Diagram
text
User Attributes
        │

Resource Attributes
        │

Environment Attributes
        │

        ▼

 Access Decision
Real Example
text
User Role = Manager

Department = IT

Time = Office Hours

Country = UK
Rule:

text
Allow if:
Role = Manager
AND
Department Match
AND
Office Hours
🎯 Why ABAC?
Very flexible.

Can handle:

Department-based access

Location-based access

Time-based access

Ownership-based access

⚠️ Problem with ABAC
Complex.

After few years:

text
500 Rules
1000 Rules
Hard to maintain.

🔐 What is PBAC?
Full Form
text
PBAC = Policy Based Access Control
Access controlled through policies.

Think:

text
Central Rule Engine
Example Policy
text
Managers can approve leave
only for their department
during office hours.
Stored as policy.

Diagram
text
User Request
      │
      ▼

Policy Engine
      │
      ▼

Allow / Deny
Real Example
Policy:

text
IF

Role = Manager
AND Department Match
AND Time < 6 PM

THEN Allow
Popular tools:

Open Policy Agent (OPA)

AWS IAM Policies

Azure Policies

Comparison
Feature	RBAC	ABAC	PBAC
Based On	Roles	Attributes	Policies
Complexity	Low	Medium	High
Flexibility	Low	High	Very High
Easy To Manage	Yes	Moderate	Difficult
Enterprise Scale	Moderate	Good	Excellent
HRMS Example
RBAC
text
Manager
↓
Can Approve Leave
Simple.

ABAC
text
Manager
AND
Same Department

↓

Can Approve Leave
More flexible.

PBAC
text
Policy Engine evaluates:

Role
Department
Location
Time
Leave Type

↓

Allow / Deny
Most powerful.

🚀 Real World
Small Startup (50 Employees)
Use:

text
RBAC
Enough.

Mid-size Company (500 Employees)
Use:

text
RBAC + ABAC
Most common.

Enterprise (Amazon, Google, Banks)
Use:

text
RBAC + ABAC + PBAC
Together.

🎯 Interview Golden Answer
If interviewer asks:

"Which would you choose?"

Answer:

Small Application
text
RBAC
Simple and easy.

HRMS / SaaS Product
text
RBAC + ABAC
Roles + Department/Ownership checks.

Enterprise System
text
PBAC on top of RBAC/ABAC
Centralized policies with maximum flexibility.

Easy Memory Trick
text
RBAC
= WHO are you?
(Role)

ABAC
= What attributes do you have?
(Department, Location, Time)

PBAC
= What does company policy say?
(Rules Engine)
For your HRMS project, a RBAC + ABAC hybrid is usually the best design:

RBAC → Admin, Manager, Employee

ABAC → Manager can only see/approve employees in their own hierarchy/department.


Summary of the Flow :- 

Login: You log in, and the backend gives you a JWT (containing your Global Role) and a list of your specific Permissions.
Frontend UI: The frontend looks at your role and permissions to decide which pages to let you route to, and which buttons to render on your screen.
Backend API: When you click a button to interact with data, the request is sent to the backend with your JWT attached. The Authorization Guard checks the "decorators" on that specific API route (like @AdminOnly()). If your JWT role matches, the action succeeds. If not, the server rejects it.