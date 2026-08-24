Backend → Frontend mapping

| Feature            | Frontend                                | Backend                            |
| ------------------ | --------------------------------------- | ---------------------------------- |
| Home               | `/`                                     | `GET /api/properties`              |
| Properties         | `/properties`                           | `GET /api/properties`              |
| Property Details   | `/properties/[id]`                      | `GET /api/properties/:id`          |
| Register           | `/auth/register`                        | `POST /api/auth/register`          |
| Login              | `/auth/login`                           | `POST /api/auth/login`             |
| Tenant Dashboard   | `/tenant-dashboard`                     | rentals + payments                 |
| Tenant Requests    | `/dashboard/tenant/rental-requests`     | `GET /api/rentals`                 |
| Payment            | `/dashboard/tenant/rental-requests`     | `POST /api/payments/create`        |
| Landlord Dashboard | `/landlord-dashboard`                   | `GET /api/landlord/properties`     |
| My Properties      | `/landlord-dashboard/properties`        | `GET /api/landlord/properties`     |
| Create Property    | `/landlord-dashboard/properties/create` | `POST /api/landlord/properties`    |
| Landlord Requests  |`/landlorddashboard/requests`|`GET api/landlord/requests/landlordsProperties`       |
| Approve/Reject     | same page                               | `PATCH /api/landlord/requests/:id` |
| Admin Dashboard    | `/admin-dashboard`                      | admin APIs                         |
| Admin Users        | `/admin-dashboard/users`                | `GET /api/admin/users`             |
| Admin Properties   | `/admin-dashboard/properties`           |`GET/api/admin/properties`                |
| Payment Success    | `/payment/success`                      | Stripe result                      |
| Payment Cancel     | `/payment/cancel`                       | Stripe result                      |
