# Difference Between Cron Job and Scheduler

## Quick Comparison

| Aspect | Cron Job | Scheduler |
|--------|----------|-----------|
| **Definition** | Time-based job scheduler in Unix/Linux systems | General term for any system that manages task execution |
| **Scope** | Linux/Unix specific | Cross-platform (Windows, Linux, Cloud, Distributed) |
| **Precision** | Minute-level accuracy (minimum 1 minute) | Millisecond to second-level accuracy |
| **Dependencies** | Cannot handle job dependencies | Can handle complex job chains (Job A → Job B → Job C) |
| **Retry Logic** | No built-in retry on failure | Built-in retry, backoff, and failure handling |
| **Monitoring** | Basic logs only | Dashboards, alerts, notifications |
| **Distributed Support** | Single machine only | Can run across multiple servers |
| **Dynamic Scheduling** | Static (crontab file) | Dynamic (API, database-driven, event-triggered) |
| **Missed Job Handling** | No catch-up for missed runs | Can backfill missed jobs |
| **Examples** | Cron, Anacron | Apache Airflow, AWS EventBridge, Quartz, Celery Beat |

---

## Real-Time Example

### Cron Job

```text
Use Case: Daily backup at 2 AM

┌─────────────────────────────────────┐
│ 0 2 * * * /backup/script.sh         │
└─────────────────────────────────────┘

✅ Works fine for simple recurring tasks
❌ If server is down at 2 AM → backup is missed forever
❌ Can't run backup only after previous task completes