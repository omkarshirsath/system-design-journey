# REST vs GraphQL

## Quick Difference

| REST | GraphQL |
|------|---------|
| Multiple endpoints | Single endpoint |
| Fixed response | Client chooses fields |
| Simple | More flexible |
| Easy caching | Complex caching |
| Good for CRUD | Good for complex UI |

## How do you decide?

### Choose REST When
- Simple CRUD APIs
- Public APIs
- Easy caching needed
- Team familiarity

### Choose GraphQL When
- Mobile apps
- Multiple frontend clients
- Over-fetching problem
- Complex data relationships

## Example

### REST
/users/1
/orders/1

text
Multiple API calls.

### GraphQL
```graphql
{
  user {
    name
    orders {
      total
    }
  }
}
Single request.

Don't Say
❌ "GraphQL is modern so always use it."

Say
✅ "I choose based on client data requirements and complexity."