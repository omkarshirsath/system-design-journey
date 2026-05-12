# Load Balancer

## What is a Load Balancer?
A Load Balancer is a device or software that distributes network or application traffic across a number of servers. Load balancers are used to increase capacity (concurrent users) and reliability of applications.

## ASCII Diagram

```text
       +--------+
       | Client |
       +--------+
           | (Requests)
           v
   +---------------+
   | Load Balancer |
   +---------------+
     /     |     \
    v      v      v
 +----+ +----+ +----+
 | S1 | | S2 | | S3 |
 +----+ +----+ +----+
```

## Common Uses
- **Traffic Distribution**: Spreading incoming requests efficiently across multiple servers.
- **High Availability**: Ensuring if one server goes down, traffic is routed to healthy servers.
- **Scalability**: Allowing new servers to be added seamlessly to handle increased load.
- **SSL Termination**: Decrypting incoming requests before passing them to backend servers, saving backend CPU cycles.

## Real-Time Example (URL Shortener)
In a URL Shortener system, millions of users might try to access a short link simultaneously. A load balancer sits between the users and the API servers (which resolve the short link). If traffic spikes (e.g., a viral tweet containing the short link), the load balancer routes the incoming HTTP requests across a cluster of stateless API servers, preventing any single server from crashing under the load.
